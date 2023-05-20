import { Schema, model } from 'mongoose';

const FilmSchema = new Schema(
  {
    filmTitle: { type: String, required: true },
    releaseYearString: { type: String, required: true },
    directorNameArray: { type: Array, required: true },
    averageRatingString: { type: String, required: true },
    filmPosterURL: { type: String, required: true },
    filmBackdropImageURL: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default model('Film', FilmSchema);
