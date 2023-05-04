import "../styles/FilmDetails.css";
import FilmPoster from "./FilmPoster";
import FilmDetailsText from "./FilmDetailsText";

function FilmDetails({
  filmObject,
  showAverageRating,
  onFilmClick,
  isFilmClickDisabled,
}) {
  const {
    filmTitle,
    releaseYearString,
    directorNameArray,
    averageRatingString,
    filmPosterURL,
  } = filmObject;
  const filmPoster = <FilmPoster filmPosterURL={filmPosterURL} />;
  const filmDetailsText = (
    <FilmDetailsText
      filmTitle={filmTitle}
      releaseYearString={releaseYearString}
      directorNameArray={directorNameArray}
      averageRatingString={averageRatingString}
      showAverageRating={showAverageRating}
    />
  );
  return (
    <button 
      className="FilmDetails"
      onClick={() => onFilmClick(filmObject)}
      disabled={isFilmClickDisabled}
      aria-disabled={isFilmClickDisabled}
    >
      {filmPoster}
      {filmDetailsText}
    </button>
  );
}

export default FilmDetails;
