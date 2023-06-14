import '../mongo-config.js';
import { Document } from 'mongoose';
import { CronJob } from 'cron';
import processFilmsInList from 'letterboxd-list-scraper';
import Film from '../../models/film.js';

type FilmObject = {
    filmTitle: string,
    releaseYearString: string,
    directorNameArray: string[],
    averageRatingString: string,
    filmPosterURL: string,
    filmBackdropImageURL: string,
}

function updateAverageRatingString(existingFilmDoc, newAverageRatingString: string): Document {
  const updatedFilmDoc = existingFilmDoc;
  updatedFilmDoc.averageRatingString = newAverageRatingString;
  return updatedFilmDoc;
}

function getUpdatedFilmDoc(existingFilmDoc: Document, filmDetailsObject: FilmObject): Document {
  const updatedFilmDoc = updateAverageRatingString(
    existingFilmDoc,
    filmDetailsObject.averageRatingString
  );
  return updatedFilmDoc;
}
function makeNewFilmDoc(filmDetailsObject: FilmObject): Document {
  return new Film(filmDetailsObject);
}
async function getExistingFilmDoc(filmDetailsObject: FilmObject): Promise<Document> {
  const { filmTitle, releaseYearString, directorNameArray } = filmDetailsObject;
  return Film.findOne({ filmTitle, releaseYearString, directorNameArray });
}

async function saveScrapedFilmDetailsObject(filmDetailsObject: FilmObject) {
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

const job: CronJob = new CronJob({
  cronTime: '0 0 * * *',
  onTick: scrapePopularFilmsList,
  timeZone: 'Europe/London',
});

job.start();
