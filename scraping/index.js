// TODO: rearrange the order of function definitions in this file
// TODO: consider opening the browser just once for all film pages
const { parse } = require("node-html-parser");
const puppeteer = require("puppeteer");
const { scrollPageToBottom } = require("puppeteer-autoscroll-down");

async function getPuppeteerPage(puppeteerBrowser, pageURL) {
    const page = await puppeteerBrowser.newPage();
    await page.goto(pageURL);
    return page;
}

async function getDynamicFilmPageBody(puppeteerBrowser, filmPageURL) {
    const page = await getPuppeteerPage(puppeteerBrowser, filmPageURL);
    return await page.evaluate(() => document.body.innerHTML);
}

async function getFilmPageDoc(puppeteerBrowser, filmPageURL) {
    try {
        const filmPageBody = await getDynamicFilmPageBody(puppeteerBrowser, filmPageURL);
        return parse(filmPageBody);
    } catch(err) {
        throw err;
    }
}

async function getDynamicFilmListPageBody(puppeteerBrowser, listPageURL) {
    const page = await getPuppeteerPage(puppeteerBrowser, listPageURL);
    // NOTE: scrolling is done because list in page is fully loaded upon scroll
    await scrollPageToBottom(page);
    return await page.evaluate(() => document.body.innerHTML);
}

async function getFilmListPageDoc(puppeteerBrowser, listPageURL) {
    const filmListPageBody = await getDynamicFilmListPageBody(puppeteerBrowser, listPageURL);
    filmListPageDoc = parse(filmListPageBody);
    return filmListPageDoc;
}

function checkIfAdult(filmPageDoc) {
    return !!filmPageDoc.querySelector(".-adult");
}

function getFilmTitle(filmPageDoc) {
    return filmPageDoc.querySelector(".headline-1").text;
}

function getReleaseYearString(filmPageDoc) {
    return filmPageDoc.querySelector("[href^='/films/year/']").text;
}

function getDirectorNameArray(filmPageDoc) {
    const directorNodeList = filmPageDoc.querySelectorAll("[href^='/director/']>span");
    if (directorNodeList.length === 0) {
        throw new Error("Director data not read correctly");
    }
    return directorNodeList.map((directorNode) => directorNode.text);
}

function getAverageRatingString(filmPageDoc) {
    return filmPageDoc.querySelector(".display-rating").text;
}

function getFilmPosterURL(filmPageDoc) {
    return filmPageDoc.querySelector("#poster-zoom > div > div > img").getAttribute("src");
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
        }
    } catch(err) {
        console.error(err);
        return null;
    }
}

async function getDetailsObjectFromFilmPage(filmPageURL) {
    const puppeteerBrowser = await puppeteer.launch();
    const filmPageDoc = await getFilmPageDoc(puppeteerBrowser, filmPageURL);
    return Promise.all(
        [
            getFilmDetailsObject(filmPageDoc),
            puppeteerBrowser.close()
        ]
    )
    .then(([filmDetails, _]) => filmDetails);
}

function getLetterboxdURL(path) {
    return "https://letterboxd.com" + path;
}

async function processFilmsOnListPage(filmListPageDoc, processor) {
    const filmAnchorNodeList = filmListPageDoc.querySelectorAll("#content > div > div > section > ul > li > div > div > a");
    filmAnchorNodeList.forEach((filmAnchorNode) => {
        const filmPagePath = filmAnchorNode.getAttribute("href");
        processor(getLetterboxdURL(filmPagePath));
    });
}

async function getNextFilmListPageURL(filmListPageDoc) {
    const nextPageAnchor = filmListPageDoc.querySelector("#content > div > div > section > div.pagination > div:nth-child(2) > a");
    if (nextPageAnchor === null) {
        return null;
    }
    const nextPagePath = nextPageAnchor.getAttribute("href");
    return getLetterboxdURL(nextPagePath);
}

async function processFilmsInList(firstListPageURL, processor) {
    const puppeteerBrowser = await puppeteer.launch({headless: false});
    let listPageURL = firstListPageURL;
    while (listPageURL !== null) {
        const filmListPageDoc = await getFilmListPageDoc(puppeteerBrowser, listPageURL);
        listPageURL = await processFilmsOnListPage(filmListPageDoc, processor)
            .then(() => {
                return getNextFilmListPageURL(filmListPageDoc);
            });
    }
    puppeteerBrowser.close();
}

module.exports = {getDetailsObjectFromFilmPage, processFilmsInList};