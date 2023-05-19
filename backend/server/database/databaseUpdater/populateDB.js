import '../mongoConfig.js';
import processFilmsInList from '../../scraping/dist/index.js';
import Film from '../../models/film.js';
import { CronJob } from 'cron';

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
  try {
    const existingFilmDoc = await getExistingFilmDoc(filmDetailsObject);
    const savedFilmDoc =
      existingFilmDoc != null
        ? getUpdatedFilmDoc(existingFilmDoc, filmDetailsObject)
        : makeNewFilmDoc(filmDetailsObject);
    console.log(savedFilmDoc);
    await savedFilmDoc.save();
  } catch (err) {
    console.log(err);
  }
}

const _ = new CronJob(
  // '0 0 * * *',
  '*/30 * * * *',
  // '* * * * *',
  async () => {
    await processFilmsInList(
      'https://letterboxd.com/bucksalypse/list/letterboxd-500-most-watched-movies-of-all/',
      saveScrapedFilmDetailsObject
    );
  },
  null,
  true,
  'Europe/London'
);
