import '../mongoConfig.js';
import processFilmsInList from '../../../scraping/dist/index.js';
import Film from '../../models/film.js';

async function saveScrapedFilmDetailsObject(filmDetailsObject) {
  const newFilm = new Film(filmDetailsObject);
  console.log(newFilm);
  await newFilm.save().catch(console.log);
}

processFilmsInList(
  'https://letterboxd.com/bucksalypse/list/letterboxd-500-most-watched-movies-of-all/',
  saveScrapedFilmDetailsObject
);
