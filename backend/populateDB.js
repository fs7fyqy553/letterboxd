const Film = require("./models/film");
const { processFilmsInListStartingAt } = require("../scraping");
require("./mongoConfig");

async function saveScrapedFilmDetailsObject (filmDetailsObject) {
    const newFilm = new Film(filmDetailsObject);
    console.log(newFilm);
    await newFilm.save().catch(console.log);
}

processFilmsInListStartingAt(
    "https://letterboxd.com/victorvdb/list/letterboxd-500-most-watched-movies-of-all/",
    saveScrapedFilmDetailsObject
)
