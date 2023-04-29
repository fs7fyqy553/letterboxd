import puppeteer from "puppeteer";
import { parse } from "node-html-parser";
import { scrollPageToBottom } from "puppeteer-autoscroll-down";
async function closeBrowser(browser) {
    await browser.close();
}
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
function getFilmObject(filmPageDoc) {
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
    }
    catch (err) {
        console.error(err);
        return null;
    }
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
async function getInnerHTMLFromPuppeteerPage(page) {
    return page.evaluate(() => document.body.innerHTML);
}
async function getDynamicFilmPageBody(filmPageURL, filmPuppeteerPage) {
    await filmPuppeteerPage.goto(filmPageURL);
    return getInnerHTMLFromPuppeteerPage(filmPuppeteerPage);
}
async function getFilmPageDoc(filmPageURL, filmPuppeteerPage) {
    const filmPageBody = await getDynamicFilmPageBody(filmPageURL, filmPuppeteerPage);
    return parse(filmPageBody);
}
async function getDetailsObjectFromFilmPage(filmPageURL, filmPuppeteerPage) {
    const filmPageDoc = await getFilmPageDoc(filmPageURL, filmPuppeteerPage);
    return getFilmObject(filmPageDoc);
}
async function processFilmPage(filmPageURL, filmPuppeteerPage, processor) {
    const filmDetailsObject = await getDetailsObjectFromFilmPage(filmPageURL, filmPuppeteerPage);
    if (filmDetailsObject !== null) {
        await processor(filmDetailsObject);
    }
}
function getFilmPagePath(filmAnchorNode) {
    return filmAnchorNode.getAttribute('href');
}
async function processFilmAnchorNode(node, filmPuppeteerPage, processor) {
    const filmPagePath = getFilmPagePath(node);
    const filmPageURL = getLetterboxdURL(filmPagePath);
    await processFilmPage(filmPageURL, filmPuppeteerPage, processor);
}
async function processFilmAnchorNodeList(nodeList, filmPuppeteerPage, processor) {
    // TODO: consider parallel programming;
    for (let i = 0; i < nodeList.length; i += 1) {
        const filmAnchorNode = nodeList[i];
        // eslint-disable-next-line no-await-in-loop
        await processFilmAnchorNode(filmAnchorNode, filmPuppeteerPage, processor);
    }
}
async function processFilmsOnListPage(listPageDoc, filmPuppeteerPage, processor) {
    const filmAnchorNodeList = listPageDoc.querySelectorAll('.film-list .frame');
    await processFilmAnchorNodeList(filmAnchorNodeList, filmPuppeteerPage, processor);
}
async function getDynamicFilmListPageBody(listPageURL, puppeteerPage) {
    await puppeteerPage.goto(listPageURL);
    await scrollPageToBottom(puppeteerPage, {});
    return getInnerHTMLFromPuppeteerPage(puppeteerPage);
}
async function getListPageDoc(listPageURL, listPuppeteerPage) {
    const listPageBody = await getDynamicFilmListPageBody(listPageURL, listPuppeteerPage);
    return parse(listPageBody);
}
async function processListPageAndGetNextURL(listPageURL, listPuppeteerPage, filmPuppeteerPage, processor) {
    const listPageDoc = await getListPageDoc(listPageURL, listPuppeteerPage);
    console.log(typeof listPageDoc);
    await processFilmsOnListPage(listPageDoc, filmPuppeteerPage, processor);
    return getNextFilmListPageURL(listPageDoc);
}
// TODO: consider parallel programming
async function usePuppeteerPages(listPuppeteerPage, filmPuppeteerPage, firstListPageURL, processor) {
    let listPageURL = firstListPageURL;
    while (listPageURL !== null) {
        // eslint-disable-next-line no-await-in-loop
        listPageURL = await processListPageAndGetNextURL(listPageURL, listPuppeteerPage, filmPuppeteerPage, processor);
    }
}
function getPuppeteerPage(browser) {
    return browser.newPage();
}
async function getPuppeteerPages(browser, numberOfPages) {
    const promiseArray = Array(numberOfPages).fill(getPuppeteerPage(browser));
    return Promise.all(promiseArray).then((pageArray) => pageArray);
}
async function useBrowser(browser, firstListPageURL, processor) {
    const [listPuppeteerPage, filmPuppeteerPage] = await getPuppeteerPages(browser, 2);
    await usePuppeteerPages(listPuppeteerPage, filmPuppeteerPage, firstListPageURL, processor);
}
async function getHeadlessBrowser() {
    return puppeteer.launch({ headless: true });
}
async function processFilmsInList(firstListPageURL, processor) {
    // NOTE: list page is the page of a Letterboxd list in grid view
    const browser = await getHeadlessBrowser();
    await useBrowser(browser, firstListPageURL, processor);
    await closeBrowser(browser);
}
export default processFilmsInList;
