import Film from '../models/film.js';
import { Request, Response } from 'express';

function get404Message(): string {
  return 'Two films with different average ratings not found';
}

function getFilmAggregate(avoidedAverageRatingString: string | undefined) {
  if (avoidedAverageRatingString === undefined) {
    return Film.aggregate();
  }
  return Film.aggregate([{ $match: { averageRatingString: { $ne: avoidedAverageRatingString } } }]);
}

async function getRandomFilm(avoidedAverageRatingString: string) {
  const filmAggregate = getFilmAggregate(avoidedAverageRatingString);
  const [randomFilm] = await filmAggregate.sample(1);
  return randomFilm;
}

async function getTwoFilmsWithDifferentRatings() {
  const film1 = await getRandomFilm(undefined);
  const film2 = await getRandomFilm(film1.averageRatingString);
  if (!film1 || !film2) {
    throw new Error(get404Message());
  }
  return [film1, film2];
}

function getFilmPairs(numberOfPairs: number) {
  const promiseArray = [];
  for (let i = 0; i < numberOfPairs; i += 1) {
    promiseArray.push(getTwoFilmsWithDifferentRatings());
  }
  return Promise.all(promiseArray);
}

async function getFilmsFromDatabase(twoFilmsWithDifferentRatings: string, numberOfPairs: number) {
  if (twoFilmsWithDifferentRatings !== 'true') {
    return Film.find();
  }
  if (Number.isInteger(numberOfPairs) === true) {
    return getFilmPairs(numberOfPairs);
  }
  return getTwoFilmsWithDifferentRatings();
}

function handleError(res: Response, err: Error) {
  if (err.message === get404Message()) {
    return res.status(404).json({ error: err.message });
  }
  return res.status(503).json({ error: err.message });
}

export default async function getFilms(req: Request, res: Response): Promise<Response> {
  const { twoFilmsWithDifferentRatings } = req.query;
  const numberOfPairs = parseInt(req.query.numberOfPairs as string, 10);
  try {
    const films = await getFilmsFromDatabase(twoFilmsWithDifferentRatings as string, numberOfPairs);
    return res.json({ films });
  } catch (err) {
    return handleError(res, err);
  }
}
