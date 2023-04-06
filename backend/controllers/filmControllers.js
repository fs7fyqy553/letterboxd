const Film = require("../models/film");

exports.getFilms = (req, res) => {
    const numberOfRandomFilms = parseInt(req.query.numberOfRandomFilms);

    const getRandomFilmsAggregate = (filmQuantity) => Film.aggregate().sample(filmQuantity);
    const getAllFilms = () => Film.find();
    const respondWithFilmsAsJSON = (films) => res.json(films);
    const respondWithServerError = (error) => res.status(503).json({error})

    if (numberOfRandomFilms) {
        getRandomFilmsAggregate(numberOfRandomFilms)
            .then(respondWithFilmsAsJSON)
            .catch(respondWithServerError);
    } else {
        getAllFilms()
            .then(respondWithFilmsAsJSON)
            .catch(respondWithServerError);
    }
}
