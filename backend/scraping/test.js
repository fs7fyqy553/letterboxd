// TODO: '.js' extension specified for the sake of NodeNext (see https://www.youtube.com/watch?v=H91aqUHn8sE), 
// adjust ESLint accordingly
import processFilmsInList from './dist/index.js';

const testFilmListScraper = true;

if (testFilmListScraper) {
  const testFilmListURL =
    'https://letterboxd.com/bucksalypse/list/letterboxd-500-most-watched-movies-of-all/';
  processFilmsInList(testFilmListURL, console.log);
}
