import FilmDetails from "./FilmDetails";

function FilmShowingRating({ filmObject, onFilmClick }) {
  return (
    <FilmDetails
      filmObject={filmObject}
      showAverageRating={false}
      onFilmClick={onFilmClick}
    />
  );
}

export default FilmShowingRating;
