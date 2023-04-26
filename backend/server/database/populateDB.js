const Film = require('../models/film');
const { processFilmsInList } = require('../../scraping');
require('./mongoConfig');

async function saveScrapedFilmDetailsObject(filmDetailsObject) {
  const newFilm = new Film(filmDetailsObject);
  console.log(newFilm);
  await newFilm.save().catch(console.log);
}

processFilmsInList(
  'https://letterboxd.com/bucksalypse/list/letterboxd-500-most-watched-movies-of-all/',
  saveScrapedFilmDetailsObject
);
