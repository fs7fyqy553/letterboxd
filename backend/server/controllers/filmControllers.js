const Film = require('../models/film');

function get404Message() {
  return 'Two films with different average ratings not found';
}

function getFilmAggregate(avoidedAverageRatingString) {
  if (avoidedAverageRatingString === null) {
    return Film.aggregate();
  }
  return Film.aggregate([{ $match: { averageRatingString: { $ne: avoidedAverageRatingString } } }]);
}

async function getRandomFilm(avoidedAverageRatingString) {
  const filmAggregate = getFilmAggregate(avoidedAverageRatingString);
  const [randomFilm] = await filmAggregate.sample(1);
  return randomFilm;
}

async function getTwoFilmsWithDifferentRatings() {
  const film1 = await getRandomFilm();
  const film2 = await getRandomFilm(film1.averageRatingString);
  if (!film1 || !film2) {
    throw new Error(get404Message());
  }
  return [film1, film2];
}

// TODO: improve performance
function getFilmPairs(numberOfPairs) {
  const promiseArray = [];
  for (let i = 0; i < numberOfPairs; i += 1) {
    promiseArray.push(getTwoFilmsWithDifferentRatings());
  }
  return Promise.all(promiseArray);
}

async function getFilms(twoFilmsWithDifferentRatings, numberOfPairs) {
  if (twoFilmsWithDifferentRatings !== 'true') {
    return Film.find();
  }
  if (Number.isInteger(numberOfPairs) === true) {
    return getFilmPairs(numberOfPairs);
  }
  return getTwoFilmsWithDifferentRatings();
}

function handleError(res, err) {
  if (err.message === get404Message()) {
    return res.status(404).json({ error: err.message });
  }
  return res.status(503).json({ error: err.message });
}

exports.getFilms = async (req, res) => {
  const { twoFilmsWithDifferentRatings } = req.query;
  const numberOfPairs = parseInt(req.query.numberOfPairs, 10);
  try {
    const films = await getFilms(twoFilmsWithDifferentRatings, numberOfPairs);
    return res.json({ films });
  } catch (err) {
    return handleError(res, err);
  }
};
