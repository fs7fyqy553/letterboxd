const cheerio = require("cheerio");
const axios = require("axios");

const url = "https://letterboxd.com/film/the-matrix/"

// NOTE: may not be necessary if the titles are already known in order to decide which 
// webpages to scrape
async function getFilmTitle() {
    try {
        const response = await axios.get(url);
        const responseDataDoc = cheerio.load(response.data);
        const filmTitle = responseDataDoc(".headline-1").text();
        return filmTitle;
    } catch(err) {
        console.error(err);
    }
}