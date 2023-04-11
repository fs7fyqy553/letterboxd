import FilmDetails from "./FilmDetails.js";

function FilmHidingRating({ filmObject, onFilmClick }) {
  return (
    <FilmDetails
      filmObject={filmObject}
      showAverageRating={true}
      onFilmClick={onFilmClick}
    />
  );
}

export default FilmHidingRating;
