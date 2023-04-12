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

async function processListedFilm(filmAnchorNode, filmPuppeteerPage, processor) {
  const filmPagePath = filmAnchorNode.getAttribute('href');
  const filmDetailsObject = await getDetailsObjectFromFilmPage(
    filmPuppeteerPage,
    getLetterboxdURL(filmPagePath)
  );
  // TODO: ensure this conditional doesn't cause issues
  if (filmDetailsObject !== null) {
    await processor(filmDetailsObject);
  }
}

async function processFilmsOnListPage(filmListPageDoc, filmPuppeteerPage, processor) {
  const filmAnchorNodeList = filmListPageDoc.querySelectorAll('.film-list .frame');
  for (let i = 0; i < filmAnchorNodeList.length; i += 1) {
    const filmAnchorNode = filmAnchorNodeList[i];
    await processListedFilm(filmAnchorNode, filmPuppeteerPage, processor);
  }
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

// TODO: enable parallel programming
async function processFilmsInListStartingAt(listPageURL, processor) {
  const puppeteerBrowser = await puppeteer.launch({ headless: true });
  const filmListPuppeteerPage = await puppeteerBrowser.newPage();
  const filmPuppeteerBrowser = await puppeteer.launch({ headless: true });
  const filmPuppeteerPage = await filmPuppeteerBrowser.newPage();
  while (listPageURL !== null) {
    const filmListPageDoc = await getFilmListPageDoc(filmListPuppeteerPage, listPageURL);
    await processFilmsOnListPage(filmListPageDoc, filmPuppeteerPage, processor);
    listPageURL = await getNextFilmListPageURL(filmListPageDoc);
  }
  puppeteerBrowser.close();
  filmPuppeteerBrowser.close();
}

module.exports = { processFilmsInListStartingAt };
