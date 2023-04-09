// TODO: clean up file structure
const Film = require("../models/film");

exports.getFilms = (req, res) => {
    const twoFilmsWithDifferentRatings = req.query.twoFilmsWithDifferentRatings;

    // TODO: add error handling for when required films aren't found
    const getRandomFilmWithoutThisAverageRatingString = (avoidedAverageRatingString) => {
        return candidatesAggregate = Film.aggregate([
            { $match: { averageRatingString: { $ne: avoidedAverageRatingString }}},
        ])
        .sample(1)
        .then(([film]) => film);
    }
    const getRandomFilm = () => {
        return Film.aggregate()
            .sample(1)
            .then(([film]) => film);
    };
    const getTwoFilmsWithDifferentRatings = async () => {
        const firstFilm = await getRandomFilm();
        const secondFilm = await getRandomFilmWithoutThisAverageRatingString(firstFilm.averageRatingString);
        return [firstFilm, secondFilm];
    };
    const getAllFilms = () => Film.find();
    const respondWithFilmsAsJSON = (films) => res.json(films);
    const respondWithServerError = (error) => res.status(503).json({error})
    if (twoFilmsWithDifferentRatings === "true") {
        getTwoFilmsWithDifferentRatings()
            .then(respondWithFilmsAsJSON)
            .catch(respondWithServerError);
    } else {
        getAllFilms()
            .then(respondWithFilmsAsJSON)
            .catch(respondWithServerError);
    }
}
