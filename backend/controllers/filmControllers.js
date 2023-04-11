const Film = require("../models/film");

exports.getFilms = async (req, res) => {
    const twoFilmsWithDifferentRatings = req.query.twoFilmsWithDifferentRatings;
    try {
        const films = await getFilms(twoFilmsWithDifferentRatings);
        return res.json(films);
    } catch(err) {
        return res.status(503).json({err});
    }
}

async function getFilms(twoFilmsWithDifferentRatings) {
    if (twoFilmsWithDifferentRatings === "true") {
        return await getTwoFilmsWithDifferentRatings();
    } else {
        return await Film.find();
    }
}

async function getTwoFilmsWithDifferentRatings() {
    try {
        const film1 = await getRandomFilm();
        const film2 = await getRandomFilm(film1.averageRatingString);
        return [film1, film2];
    } catch(err) {
        throw(err);
    }
}

async function getRandomFilm(avoidedAverageRatingString) {
    const filmAggregate = getFilmAggregate(avoidedAverageRatingString);
    const [randomFilm] = await filmAggregate.sample(1);
    return randomFilm;
}

function getFilmAggregate(avoidedAverageRatingString) {
    if (avoidedAverageRatingString === null) {
        return Film.aggregate();
    } else {
        return Film.aggregate([{ $match: { averageRatingString: { $ne: avoidedAverageRatingString }}}]);
    }
}