import { Schema, model } from 'mongoose';

interface IFilm {
  filmTitle: string,
  releaseYearString: string,
  directorNameArray: string[],
  averageRatingString: string,
  filmPosterURL: string,
  filmBackdropImageURL: string,
}

const FilmSchema = new Schema<IFilm>(
  {
    filmTitle: { type: String, required: true },
    releaseYearString: { type: String, required: true },
    directorNameArray: { type: [String], required: true },
    averageRatingString: { type: String, required: true },
    filmPosterURL: { type: String, required: true },
    filmBackdropImageURL: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default model('Film', FilmSchema);
