import '../mongo-config.js';
import { CronJob } from 'cron';
import processFilmsInList from 'letterboxd-list-scraper';
import Film from '../../models/film.js';

function updateAverageRatingString(existingFilmDoc, newAverageRatingString) {
  const updatedFilmDoc = existingFilmDoc;
  updatedFilmDoc.averageRatingString = newAverageRatingString;
  return updatedFilmDoc;
}

function getUpdatedFilmDoc(existingFilmDoc, filmDetailsObject) {
  const updatedFilmDoc = updateAverageRatingString(
    existingFilmDoc,
    filmDetailsObject.averageRatingString
  );
  return updatedFilmDoc;
}
function makeNewFilmDoc(filmDetailsObject) {
  return new Film(filmDetailsObject);
}
async function getExistingFilmDoc(filmDetailsObject) {
  const { filmTitle, releaseYearString, directorNameArray } = filmDetailsObject;
  return Film.findOne({ filmTitle, releaseYearString, directorNameArray });
}

async function saveScrapedFilmDetailsObject(filmDetailsObject) {
  const existingFilmDoc = await getExistingFilmDoc(filmDetailsObject);
  const savedFilmDoc =
    existingFilmDoc != null
      ? getUpdatedFilmDoc(existingFilmDoc, filmDetailsObject)
      : makeNewFilmDoc(filmDetailsObject);
  await savedFilmDoc.save();
}

async function scrapePopularFilmsList() {
  await processFilmsInList(
    'https://letterboxd.com/bucksalypse/list/letterboxd-500-most-watched-movies-of-all/',
    saveScrapedFilmDetailsObject
  );
}

const job = new CronJob({
  cronTime: '0 0 * * *',
  onTick: scrapePopularFilmsList,
  timeZone: 'Europe/London',
});

job.start();
