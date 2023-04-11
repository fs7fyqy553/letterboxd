const { Schema, model } = require("mongoose");

// TODO: consider adding more requirements to the schema definition
const FilmSchema = new Schema({
  filmTitle: { type: String, required: true },
  releaseYearString: { type: String, required: true },
  directorNameArray: { type: Array, required: true },
  averageRatingString: { type: String, required: true },
  filmPosterURL: { type: String, required: true },
});

module.exports = model("Film", FilmSchema);
