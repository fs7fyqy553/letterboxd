const { processFilmsInList } = require('./index');

const testFilmListScraper = true;

if (testFilmListScraper) {
  const testFilmListURL =
    'https://letterboxd.com/victorvdb/list/letterboxd-500-most-watched-movies-of-all/';
  processFilmsInList(testFilmListURL, console.log);
}
