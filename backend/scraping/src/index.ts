import puppeteer from "puppeteer";
import { parse } from "node-html-parser";
import { scrollPageToBottom } from "puppeteer-autoscroll-down";

async function closeBrowser(browser: puppeteer.Browser): Promise<void> {
  await browser.close();
}

function getFilmPosterURL(filmPageDoc: HTMLElement) {
  return filmPageDoc.querySelector('#poster-zoom > div > div > img').getAttribute('src');
}

function getAverageRatingString(filmPageDoc: HTMLElement) {
  return filmPageDoc.querySelector('.display-rating').textContent;
}

function getDirectorNameArray(filmPageDoc: HTMLElement) {
  const directorNodeList = filmPageDoc.querySelectorAll("[href^='/director/']>span");
  if (directorNodeList.length === 0) {
    throw new Error('Director data not read correctly');
  }
  return directorNodeList.map((directorNode) => directorNode.text);
}

function getReleaseYearString(filmPageDoc: HTMLElement): string {
  console.log(filmPageDoc.querySelector("[href^='/films/year/']"));
  return filmPageDoc.querySelector("[href^='/films/year/']").textContent;
}

function getFilmTitle(filmPageDoc: HTMLElement): string {
  return filmPageDoc.querySelector('.headline-1').textContent;
}

function checkIfAdult(filmPageDoc: HTMLElement): boolean {
  return !!filmPageDoc.querySelector('.-adult');
}

function getFilmObject(filmPageDoc: HTMLElement) {
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
    console.error(err);
    return null;
  }
}

function getLetterboxdURL(path: string | null) {
  return `https://letterboxd.com${path}`;
}

async function getNextFilmListPageURL(filmListPageDoc: HTMLElement) {
  const nextPageAnchor = filmListPageDoc.querySelector('.next');
  if (nextPageAnchor === null) {
    return null;
  }
  const nextPagePath = nextPageAnchor.getAttribute('href');
  return getLetterboxdURL(nextPagePath);
}

async function getInnerHTMLFromPuppeteerPage(page: puppeteer.Page) {
  return page.evaluate(() => document.body.innerHTML);
}

async function getDynamicFilmPageBody(filmPageURL: string, filmPuppeteerPage: puppeteer.Page) {
  await filmPuppeteerPage.goto(filmPageURL);
  return getInnerHTMLFromPuppeteerPage(filmPuppeteerPage);
}

async function getFilmPageDoc(filmPageURL: string, filmPuppeteerPage: puppeteer.Page): Promise<HTMLElement> {
  const filmPageBody = await getDynamicFilmPageBody(filmPageURL, filmPuppeteerPage);
  return parse(filmPageBody) as unknown as HTMLElement;
}

async function getDetailsObjectFromFilmPage(filmPageURL: string, filmPuppeteerPage: puppeteer.Page): Promise<object | null> {
  const filmPageDoc = await getFilmPageDoc(filmPageURL, filmPuppeteerPage);
  return getFilmObject(filmPageDoc);
}

async function processFilmPage(filmPageURL: string, filmPuppeteerPage: puppeteer.Page, processor: Function): Promise<void> {
  const filmDetailsObject = await getDetailsObjectFromFilmPage(filmPageURL, filmPuppeteerPage);
  if (filmDetailsObject !== null) {
    await processor(filmDetailsObject);
  }
}

function getFilmPagePath(filmAnchorNode: Element) {
  return filmAnchorNode.getAttribute('href');
}

async function processFilmAnchorNode(node: Element, filmPuppeteerPage: puppeteer.Page, processor: Function): Promise<void> {
  const filmPagePath = getFilmPagePath(node);
  const filmPageURL = getLetterboxdURL(filmPagePath);
  await processFilmPage(filmPageURL, filmPuppeteerPage, processor);
}

async function processFilmAnchorNodeList(nodeList: NodeListOf<Element>, filmPuppeteerPage: puppeteer.Page, processor: Function): Promise<void> {
  // TODO: consider parallel programming;
  for (let i = 0; i < nodeList.length; i += 1) {
    const filmAnchorNode = nodeList[i];
    // eslint-disable-next-line no-await-in-loop
    await processFilmAnchorNode(filmAnchorNode, filmPuppeteerPage, processor);
  }
}

async function processFilmsOnListPage(listPageDoc: HTMLElement, filmPuppeteerPage: puppeteer.Page, processor: Function): Promise<void> {
  const filmAnchorNodeList = listPageDoc.querySelectorAll('.film-list .frame');
  await processFilmAnchorNodeList(filmAnchorNodeList, filmPuppeteerPage, processor);
}

async function getDynamicFilmListPageBody(listPageURL: string, puppeteerPage: puppeteer.Page) {
  await puppeteerPage.goto(listPageURL);
  // @ts-ignore
  await scrollPageToBottom(puppeteerPage, {});
  return getInnerHTMLFromPuppeteerPage(puppeteerPage);
}

async function getListPageDoc(listPageURL: string, listPuppeteerPage: puppeteer.Page): Promise<HTMLElement> {
  const listPageBody = await getDynamicFilmListPageBody(listPageURL, listPuppeteerPage);
  return parse(listPageBody) as unknown as HTMLElement;
}

async function processListPageAndGetNextURL(
  listPageURL: string,
  listPuppeteerPage: puppeteer.Page,
  filmPuppeteerPage: puppeteer.Page,
  processor: Function
): Promise<string | null> {
  const listPageDoc = await getListPageDoc(listPageURL, listPuppeteerPage);
  await processFilmsOnListPage(listPageDoc, filmPuppeteerPage, processor);
  return getNextFilmListPageURL(listPageDoc);
}

// TODO: consider parallel programming
async function usePuppeteerPages(
  listPuppeteerPage: puppeteer.Page,
  filmPuppeteerPage: puppeteer.Page,
  firstListPageURL: string,
  processor: Function
): Promise<void> {
  let listPageURL: string | null = firstListPageURL;
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

function getPuppeteerPage(browser: puppeteer.Browser): Promise<puppeteer.Page> {
  return browser.newPage();
}

function getPuppeteerPages(browser: puppeteer.Browser, numberOfPages: number): Promise<puppeteer.Page[]> {
  const promiseArray = Array(numberOfPages).fill(getPuppeteerPage(browser)) as Promise<puppeteer.Page>[];
  return Promise.all(promiseArray);
}

async function useBrowser(browser: puppeteer.Browser, firstListPageURL: string, processor: Function): Promise<void> {
  const [listPuppeteerPage, filmPuppeteerPage] = await getPuppeteerPages(browser, 2);
  await usePuppeteerPages(listPuppeteerPage, filmPuppeteerPage, firstListPageURL, processor);
}

async function getHeadlessBrowser(): Promise<puppeteer.Browser> {
  return puppeteer.launch({ headless: true });
}

async function processFilmsInList(firstListPageURL: string, processor: Function): Promise<void> {
  // NOTE: list page is the page of a Letterboxd list in grid view
  const browser = await getHeadlessBrowser();
  await useBrowser(browser, firstListPageURL, processor);
  await closeBrowser(browser);
}

export default processFilmsInList;
