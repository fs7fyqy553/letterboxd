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

async function getFilms(twoFilmsWithDifferentRatings) {
  if (twoFilmsWithDifferentRatings === 'true') {
    return getTwoFilmsWithDifferentRatings();
  }
  return Film.find();
}

function handleError(res, err) {
  if (err.message === get404Message()) {
    return res.status(404).json({ err });
  }
  return res.status(503).json({ err });
}

exports.getFilms = async (req, res) => {
  const { twoFilmsWithDifferentRatings } = req.query;
  try {
    const films = await getFilms(twoFilmsWithDifferentRatings);
    return res.json({ films });
  } catch (err) {
    handleError(res, err);
  }
};
