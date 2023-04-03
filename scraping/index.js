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
        await browser.close();
        dynamicPageDoc = parse(dynamicHTML);
        return dynamicPageDoc;
    } catch(err) {
        throw err;
    }
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

// TODO: consider adding a mechanism that returns null if any of the details aren't found successfully
function extractFilmDetails(letterboxdFilmPageDoc) {
    return checkIfAdult(letterboxdFilmPageDoc)
        ?
            null
        :
            {
                filmTitle: getFilmTitle(letterboxdFilmPageDoc),
                releaseYear: getReleaseYear(letterboxdFilmPageDoc),
                directorNames: getDirectorNameArray(letterboxdFilmPageDoc),
                averageRating: getAverageRating(letterboxdFilmPageDoc),
                filmPosterURL: getFilmPosterURL(letterboxdFilmPageDoc),
            }
}

async function getFilmDetails(letterboxdFilmURL) {
    const letterboxdFilmPageDoc = await getDynamicPageDoc(letterboxdFilmURL);
    return extractFilmDetails(letterboxdFilmPageDoc);
}

// const url = "https://letterboxd.com/film/the-matrix/"
