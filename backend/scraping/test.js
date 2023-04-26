const { processFilmsInList } = require('./index');

const testFilmListScraper = true;

if (testFilmListScraper) {
  const testFilmListURL =
    'https://letterboxd.com/bucksalypse/list/letterboxd-500-most-watched-movies-of-all/';
  processFilmsInList(testFilmListURL, console.log);
}
