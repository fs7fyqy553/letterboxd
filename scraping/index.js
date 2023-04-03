const { parse } = require("node-html-parser");
const puppeteer = require("puppeteer");

const url = "https://letterboxd.com/film/the-matrix/"

// TODO: clean up below function
async function getDynamicPageDoc() {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        const dynamicHTML = await page.evaluate(() => document.body.innerHTML);
        await browser.close();
        dynamicPageDoc = parse(dynamicHTML);
        return dynamicPageDoc;
    } catch(err) {
        throw err;
    }
}

// TODO: write a function to call getPageDataDoc once and then modify get... functions to 
// accept the resulting page document as a parameter and return the required details

// NOTE: may not be necessary if the titles are already known in order to decide which 
// webpages to scrape
async function getFilmTitle() {
    const dynamicPageDoc = await getDynamicPageDoc();
    return dynamicPageDoc.querySelector(".headline-1").text;
}

async function getReleaseYear() {
    const dynamicPageDoc = await getDynamicPageDoc();
    return dynamicPageDoc.querySelector("[href^='/films/year/']").text;
}

async function getDirectorNameArray() {
    const dynamicPageDoc = await getDynamicPageDoc();
    const directorNodes = dynamicPageDoc.querySelectorAll("[href^='/director/']>span");
    return directorNodes.map((element) => element.text);
}

// async function testGetFunctions() {
//     const filmTitle = await getFilmTitle();
//     const releaseYear = await getReleaseYear();
//     const directors = await getDirectorNameArray();
//     console.log(filmTitle, releaseYear, directors);
// }

// testGetFunctions();
