const Film = require("../models/film");

// TODO: consider not necessarily wanting to get every single film document in a game and 
// how that might impact how you right the controllers/routes
exports.getFilms = (req, res, next) => {
    res.send("TODO: implement getFilms controller");
}
