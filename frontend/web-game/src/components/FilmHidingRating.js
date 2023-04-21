import FilmDetails from "./FilmDetails.js";

function FilmHidingRating({ filmObject, onFilmClick }) {
  return (
    <FilmDetails
      filmObject={filmObject}
      showAverageRating={false}
      onFilmClick={onFilmClick}
      showTextFirst={false}
    />
  );
}

export default FilmHidingRating;
