// TODO: clean flow of file:
// 1. DONE First, clean up all variable and function names
// TODO: reconsider Promise.all statements

const { parse } = require("node-html-parser");
const puppeteer = require("puppeteer");

// TODO: clarify variable names

// TODO: clean up below function
async function getFilmPageDoc(URL) {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(URL);
        const dynamicFilmPageHTML = await page.evaluate(() => document.body.innerHTML);
        filmPageDoc = parse(dynamicFilmPageHTML);
        return [filmPageDoc, browser];
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
async function getFilmListPageDoc(listPageURL) {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto(listPageURL);
    await page.setViewport({
        width: 1200,
        height: 800
    });

    await autoScroll(page);

    const dynamicHTML = await page.evaluate(() => document.body.innerHTML);
    dynamicPageDoc = parse(dynamicHTML);

    return [dynamicPageDoc, browser];
}

function checkIfAdult(filmPageDoc) {
    return !!filmPageDoc.querySelector(".-adult");
}

// NOTE: may not be necessary if the titles are already known in order to decide which 
// webpages to scrape
function getFilmTitle(filmPageDoc) {
    return filmPageDoc.querySelector(".headline-1").text;
}

function getReleaseYear(filmPageDoc) {
    return filmPageDoc.querySelector("[href^='/films/year/']").text;
}

function getDirectorNameArray(filmPageDoc) {
    const directorNodeList = filmPageDoc.querySelectorAll("[href^='/director/']>span");
    return directorNodeList.map((directorNode) => directorNode.text);
}

function getAverageRatingString(filmPageDoc) {
    return filmPageDoc.querySelector(".display-rating").text;
}

function getFilmPosterURL(filmPageDoc) {
    return filmPageDoc.querySelector("#poster-zoom > div > div > img").getAttribute("src");
}

// TODO: make below code more succinct
function getFilmDetailsObject(filmPageDoc) {
    if (checkIfAdult(filmPageDoc) === true) {
        return null;
    }
    let obj = {
        filmTitle: getFilmTitle,
        releaseYear: getReleaseYear,
        directorNames: getDirectorNameArray,
        averageRatingString: getAverageRatingString,
        filmPosterURL: getFilmPosterURL,
    };
    try { 
        for (const [detailName, detailExtractor] of Object.entries(obj)) {
            detail = detailExtractor(filmPageDoc);
            obj[detailName] = detail;
        }
    } catch(err) {
        obj = null;
    }
    return obj;
}

async function getDetailsObjectFromFilmPage(filmPageURL) {
    const [filmPageDoc, browser] = await getFilmPageDoc(filmPageURL);
    return Promise.all(
        [
            getFilmDetailsObject(filmPageDoc),
            browser.close()
        ]
    )
    .then(([filmDetails, _]) => filmDetails);
}

async function processFilmsOnListPage(filmListPageDoc, processor) {
    const filmAnchorNodeList = filmListPageDoc.querySelectorAll("#content > div > div > section > ul > li > div > div > a");
    filmAnchorNodeList.forEach((filmAnchorNode) => {
        const filmPagePath = filmAnchorNode.getAttribute("href");
        const URL = "https://letterboxd.com" + filmPagePath;
        processor(URL);
    });
}

async function getNextFilmListPageURL(filmListPageDoc) {
    try {
        const nextPageAnchor = filmListPageDoc.querySelector("#content > div > div > section > div.pagination > div:nth-child(2) > a");
        const nextPagePath = nextPageAnchor.getAttribute("href");
        const nextPageURL = "https://letterboxd.com" + nextPagePath;
        return nextPageURL;
    } catch(err) {
        return null;
    }
}

async function processFilmsInList(firstListPageURL, processor) {
    let listPageURL = firstListPageURL;
    while (URL !== null) {
        const [filmListPageDoc, browser] = await getFilmListPageDoc(listPageURL);
        listPageURL = await Promise.all(
            [
                processFilmsOnListPage(filmListPageDoc, processor),
                browser.close(),
            ]
        )
        .then(() => {
            return getNextFilmListPageURL(filmListPageDoc);
        });
    }
}

// TESTS
// const url = "https://letterboxd.com/film/the-matrix/"
// getDetailsObjectFromFilmPage(url).then(console.log);
// processFilmsInList(
//     "https://letterboxd.com/victorvdb/list/letterboxd-500-most-watched-movies-of-all/",
//     console.log
// );