import FilmDetails from "./FilmDetails";

function FilmShowingRating({ filmObject, onFilmClick }) {
  return (
    <FilmDetails
      filmObject={filmObject}
      showAverageRating={true}
      onFilmClick={onFilmClick}
    />
  );
}

export default FilmShowingRating;
