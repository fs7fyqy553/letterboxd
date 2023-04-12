// TODO: lint and format file
const { parse } = require('node-html-parser');
const puppeteer = require('puppeteer');
const { scrollPageToBottom } = require('puppeteer-autoscroll-down');

function getFilmPosterURL(filmPageDoc) {
  return filmPageDoc.querySelector('#poster-zoom > div > div > img').getAttribute('src');
}

function getAverageRatingString(filmPageDoc) {
  return filmPageDoc.querySelector('.display-rating').text;
}

function getDirectorNameArray(filmPageDoc) {
  const directorNodeList = filmPageDoc.querySelectorAll("[href^='/director/']>span");
  if (directorNodeList.length === 0) {
    throw new Error('Director data not read correctly');
  }
  return directorNodeList.map((directorNode) => directorNode.text);
}

function getReleaseYearString(filmPageDoc) {
  return filmPageDoc.querySelector("[href^='/films/year/']").text;
}

function getFilmTitle(filmPageDoc) {
  return filmPageDoc.querySelector('.headline-1').text;
}

function checkIfAdult(filmPageDoc) {
  return !!filmPageDoc.querySelector('.-adult');
}

function getFilmDetailsObject(filmPageDoc) {
  if (checkIfAdult(filmPageDoc) === true) {
    return null;
  }
  try {
    return {
      filmTitle: getFilmTitle(filmPageDoc),
      releaseYearString: getReleaseYearString(filmPageDoc),
      directorNameArray: getDirectorNameArray(filmPageDoc),
      averageRatingString: getAverageRatingString(filmPageDoc),
      filmPosterURL: getFilmPosterURL(filmPageDoc),
    };
  } catch (err) {
    return null;
  }
}

async function getInnerHTMLFromPage(puppeteerPage) {
  return puppeteerPage.evaluate(() => document.body.innerHTML);
}

async function getDynamicFilmPageBody(filmPuppeteerPage, filmPageURL) {
  await filmPuppeteerPage.goto(filmPageURL);
  return getInnerHTMLFromPage(filmPuppeteerPage);
}

async function getFilmPageDoc(filmPuppeteerPage, filmPageURL) {
  const filmPageBody = await getDynamicFilmPageBody(filmPuppeteerPage, filmPageURL);
  return parse(filmPageBody);
}

async function getDetailsObjectFromFilmPage(filmPuppeteerPage, filmPageURL) {
  const filmPageDoc = await getFilmPageDoc(filmPuppeteerPage, filmPageURL);
  return getFilmDetailsObject(filmPageDoc);
}

function getLetterboxdURL(path) {
  return `https://letterboxd.com${path}`;
}

async function getNextFilmListPageURL(filmListPageDoc) {
  const nextPageAnchor = filmListPageDoc.querySelector('.next');
  if (nextPageAnchor === null) {
    return null;
  }
  const nextPagePath = nextPageAnchor.getAttribute('href');
  return getLetterboxdURL(nextPagePath);
}

async function processFilmPage(filmPageURL, filmPuppeteerPage, processor) {
  const filmDetailsObject = await getDetailsObjectFromFilmPage(filmPuppeteerPage, filmPageURL);
  if (filmDetailsObject !== null) {
    await processor(filmDetailsObject);
  }
}

function getFilmPagePath(filmAnchorNode) {
  return filmAnchorNode.getAttribute('href');
}

async function processListedFilm(filmAnchorNode, filmPuppeteerPage, processor) {
  const filmPagePath = getFilmPagePath(filmAnchorNode);
  const filmPageURL = getLetterboxdURL(filmPagePath);
  await processFilmPage(filmPageURL, filmPuppeteerPage, processor);
}

async function processFilmAnchorNodeList(nodeList, filmPuppeteerPage, processor) {
  // TODO: consider parallel programming;
  for (let i = 0; i < nodeList.length; i += 1) {
    const filmAnchorNode = nodeList[i];
    // eslint-disable-next-line no-await-in-loop
    await processListedFilm(filmAnchorNode, filmPuppeteerPage, processor);
  }
}

async function processFilmsOnListPage(filmListPageDoc, filmPuppeteerPage, processor) {
  const filmAnchorNodeList = filmListPageDoc.querySelectorAll('.film-list .frame');
  await processFilmAnchorNodeList(filmAnchorNodeList, filmPuppeteerPage, processor);
}

async function getDynamicFilmListPageBody(puppeteerPage, listPageURL) {
  await puppeteerPage.goto(listPageURL);
  await scrollPageToBottom(puppeteerPage);
  return getInnerHTMLFromPage(puppeteerPage);
}

async function getFilmListPageDoc(filmListPuppeteerPage, listPageURL) {
  const filmListPageBody = await getDynamicFilmListPageBody(filmListPuppeteerPage, listPageURL);
  return parse(filmListPageBody);
}

async function closeBrowsers(browserArray) {
  await browserArray.forEach(async (browser) => browser.close());
}

async function processListPageAndGetNextURL(
  listPageURL,
  listPuppeteerPage,
  filmPuppeteerPage,
  processor
) {
  const listPageDoc = await getFilmListPageDoc(listPuppeteerPage, listPageURL);
  await processFilmsOnListPage(listPageDoc, filmPuppeteerPage, processor);
  return getNextFilmListPageURL(listPageDoc);
}

// TODO: consider parallel programming
async function usePuppeteerPages(
  listPuppeteerPage,
  filmPuppeteerPage,
  firstListPageURL,
  processor
) {
  let listPageURL = firstListPageURL;
  while (listPageURL !== null) {
    // eslint-disable-next-line no-await-in-loop
    listPageURL = await processListPageAndGetNextURL(
      listPageURL,
      listPuppeteerPage,
      filmPuppeteerPage,
      processor
    );
  }
}

async function getPuppeteerPages(browserArray) {
  return Promise.all(browserArray.map(async (browser) => browser.newPage()));
}

async function useBrowsers(browserPair, firstListPageURL, processor) {
  const puppeteerPagePair = await getPuppeteerPages(browserPair);
  await usePuppeteerPages(...puppeteerPagePair, firstListPageURL, processor);
}

async function getBrowserArray(quantity) {
  const browserArray = [];
  // TODO: consider parallel programming
  for (let i = 0; i < quantity; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const browser = await puppeteer.launch({ headless: true });
    browserArray.push(browser);
  }
  return browserArray;
}

async function processFilmsInListStartingAt(listPageURL, processor) {
  const browserPair = await getBrowserArray(2);
  await useBrowsers(browserPair, listPageURL, processor);
  await closeBrowsers(browserPair);
}

module.exports = { processFilmsInListStartingAt };
