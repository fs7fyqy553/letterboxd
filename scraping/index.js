// TODO: clean flow of file:
// 1. DONE First, clean up all variable and function names
// 2. Make functions "single-purpose"
// TODO: reconsider Promise.all statements

const { parse } = require("node-html-parser");
const puppeteer = require("puppeteer");

// TODO: clarify variable names

async function getPuppeteerPage(puppeteerBrowser, pageURL) {
    const page = await puppeteerBrowser.newPage();
    await page.goto(pageURL);
    return page;
}

async function getDynamicFilmPageBody(puppeteerBrowser, filmPageURL) {
    const page = await getPuppeteerPage(puppeteerBrowser, filmPageURL);
    return await page.evaluate(() => document.body.innerHTML);
}

// TODO: clean up below function
async function getFilmPageDoc(puppeteerBrowser, filmPageURL) {
    try {
        const filmPageBody = await getDynamicFilmPageBody(puppeteerBrowser, filmPageURL);
        return parse(filmPageBody);
    } catch(err) {
        throw err;
    }
}

// TODO: clean up all of this too; in fact, consider moving it to another file
// TODO: consider replacing the below with https://www.npmjs.com/package/puppeteer-autoscroll-down
async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 0;
            const distance = 100;
            const timer = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;
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
async function getFilmListPageDoc(puppeteerBrowser, listPageURL) {
    // const puppeteerBrowser = await puppeteer.launch({
    //     headless: false
    // });
    const page = await puppeteerBrowser.newPage();
    await page.goto(listPageURL);
    await page.setViewport({
        width: 1200,
        height: 800
    });
    await autoScroll(page);
    const dynamicFilmListPageBody = await page.evaluate(() => document.body.innerHTML);
    filmListPageDoc = parse(dynamicFilmListPageBody);
    return filmListPageDoc;
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

// TODO: make below code more succinct
function getFilmDetailsObject(filmPageDoc) {
    if (checkIfAdult(filmPageDoc) === true) {
        return null;
    }
    try {
        return {
            filmTitle: getFilmTitle(filmPageDoc),
            releaseYear: getReleaseYear(filmPageDoc),
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

// TESTS
const url = "https://letterboxd.com/film/the-matrix/"
getDetailsObjectFromFilmPage(url).then(console.log);
// processFilmsInList(
//     "https://letterboxd.com/victorvdb/list/letterboxd-500-most-watched-movies-of-all/",
//     console.log
// );