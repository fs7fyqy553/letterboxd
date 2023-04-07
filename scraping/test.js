const { getDetailsObjectFromFilmPage, processFilmsInListStartingAt } = require("./index");

const testFilmPageScraper = false;
const testFilmListScraper = true;

if (testFilmPageScraper) {
    const testFilmPageURL = "https://letterboxd.com/film/the-matrix/";
    getDetailsObjectFromFilmPage(testFilmPageURL).then(console.log);
}

if (testFilmListScraper) {
    const testFilmListURL = "https://letterboxd.com/victorvdb/list/letterboxd-500-most-watched-movies-of-all/";
    processFilmsInListStartingAt(testFilmListURL, console.log);
}