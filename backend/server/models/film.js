const { Schema, model } = require('mongoose');

const FilmSchema = new Schema(
  {
    filmTitle: { type: String, required: true },
    releaseYearString: { type: String, required: true },
    directorNameArray: { type: Array, required: true },
    averageRatingString: { type: String, required: true },
    filmPosterURL: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Film', FilmSchema);
