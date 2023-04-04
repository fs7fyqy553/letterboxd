// TODO: clean flow of file
// TODO: reconsider Promise.all statements

const { parse } = require("node-html-parser");
const puppeteer = require("puppeteer");

// TODO: clarify variable names

// TODO: clean up below function
async function getDynamicPageDoc(URL) {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(URL);
        const dynamicHTML = await page.evaluate(() => document.body.innerHTML);
        dynamicPageDoc = parse(dynamicHTML);
        return [dynamicPageDoc, browser];
    } catch(err) {
        throw err;
    }
}

// TODO: clean up all of this too; in fact, consider moving it to another file
async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight - window.innerHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

// NOTE: below two functions inspired by 
// https://stackoverflow.com/questions/51529332/puppeteer-scroll-down-until-you-cant-anymore/53527984#53527984
async function getDynamicListPageDoc(URL) {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto(URL);
    await page.setViewport({
        width: 1200,
        height: 800
    });

    await autoScroll(page);

    const dynamicHTML = await page.evaluate(() => document.body.innerHTML);
    dynamicPageDoc = parse(dynamicHTML);

    return [dynamicPageDoc, browser];
}

function checkIfAdult(letterboxdFilmPageDoc) {
    return !!letterboxdFilmPageDoc.querySelector(".-adult");
}

// NOTE: may not be necessary if the titles are already known in order to decide which 
// webpages to scrape
function getFilmTitle(letterboxdFilmPageDoc) {
    return letterboxdFilmPageDoc.querySelector(".headline-1").text;
}

function getReleaseYear(letterboxdFilmPageDoc) {
    return letterboxdFilmPageDoc.querySelector("[href^='/films/year/']").text;
}

function getDirectorNameArray(letterboxdFilmPageDoc) {
    const directorNodes = letterboxdFilmPageDoc.querySelectorAll("[href^='/director/']>span");
    return directorNodes.map((element) => element.text);
}

function getAverageRating(letterboxdFilmPageDoc) {
    return letterboxdFilmPageDoc.querySelector(".display-rating").text;
}

function getFilmPosterURL(letterboxdFilmPageDoc) {
    return letterboxdFilmPageDoc.querySelector("#poster-zoom > div > div > img").getAttribute("src");
}

// TODO: make below code more succinct
function makeFilmDetailsObject(letterboxdFilmPageDoc) {
    let obj = {
        filmTitle: getFilmTitle,
        releaseYear: getReleaseYear,
        directorNames: getDirectorNameArray,
        averageRating: getAverageRating,
        filmPosterURL: getFilmPosterURL,
    };
    try { 
        for (const [detailName, extractor] of Object.entries(obj)) {
            detail = extractor(letterboxdFilmPageDoc);
            obj[detailName] = detail;
        }
    } catch(err) {
        obj = null;
    }
    return obj;
}

function extractFilmDetails(letterboxdFilmPageDoc) {
    if (checkIfAdult(letterboxdFilmPageDoc) === true) {
        return null;
    } else {
        return makeFilmDetailsObject(letterboxdFilmPageDoc);
    }
}

async function getFilmDetails(letterboxdFilmURL) {
    const [letterboxdFilmPageDoc, browser] = await getDynamicPageDoc(letterboxdFilmURL);
    return Promise.all(
        [
            extractFilmDetails(letterboxdFilmPageDoc),
            browser.close()
        ]
    )
    .then(([filmDetails, _]) => filmDetails);
}

async function processFilmsOnPage(letterboxdFilmPageDoc, processorCallback) {
    const filmLinkNodeList = letterboxdFilmPageDoc.querySelectorAll("#content > div > div > section > ul > li > div > div > a");
    const letterboxdFilmURLArray = filmLinkNodeList.map((element) => {
        const filmPath = element.getAttribute("href");
        const URL = "https://letterboxd.com" + filmPath;
        processorCallback(URL);
    });
}

async function getNextPageURL(letterboxdListPageDoc) {
    try {
        const nextPageAnchor = letterboxdListPageDoc.querySelector("#content > div > div > section > div.pagination > div:nth-child(2) > a");
        const nextPagePath = nextPageAnchor.getAttribute("href");
        const nextPageURL = "https://letterboxd.com" + nextPagePath;
        return nextPageURL;
    } catch(err) {
        return null;
    }
}

async function processFilmList(URL, processorCallback) {
    while (URL !== null) {
        const [letterboxdListPageDoc, browser] = await getDynamicListPageDoc(URL);
        URL = await Promise.all(
            [
                processFilmsOnPage(letterboxdListPageDoc, processorCallback),
                browser.close(),
            ]
        )
        .then(() => {
            return getNextPageURL(letterboxdListPageDoc);
        });
    }
}

// TEST
// const url = "https://letterboxd.com/film/the-matrix/"
// getFilmDetails(url).then(console.log);
processFilmList(
    "https://letterboxd.com/victorvdb/list/letterboxd-500-most-watched-movies-of-all/",
    console.log
);