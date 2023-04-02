const cheerio = require("cheerio");
const axios = require("axios");

const url = "https://letterboxd.com/film/the-matrix/"

async function getPageDataDoc() {
    try {
        const response  = await axios.get(url);
        return cheerio.load(response.data);
    } catch(err) {
        throw err;
    }
}

// TODO: write a function to call getPageDataDoc once and then modify get... functions to 
// accept the resulting page document as a parameter and return the required details

// NOTE: may not be necessary if the titles are already known in order to decide which 
// webpages to scrape
async function getFilmTitle() {
    const pageDataDoc = await getPageDataDoc();
    return pageDataDoc(".headline-1").text();
}

async function getReleaseYear() {
    const pageDataDoc = await getPageDataDoc();
    return pageDataDoc("[href^='/films/year/']").text();
}

// async function testGetFunctions() {
//     const filmTitle = await getFilmTitle();
//     const releaseYear = await getReleaseYear();
//     console.log(filmTitle, releaseYear);
// }

// testGetFunctions();
