import FilmPoster from "../FilmPoster/FilmPoster";
import FilmDescription from "../FilmDescription/FilmDescription";

function Film({
  filmObject,
  showAverageRating,
  onFilmClick,
}) {

  const {
    filmTitle,
    releaseYearString,
    directorNameArray,
    averageRatingString,
    filmPosterURL,
    filmBackdropImageURL,
  } = filmObject;

  const filmPoster = (
    <FilmPoster
      filmPosterURL={filmPosterURL}
      filmBackdropImageURL={filmBackdropImageURL}
    />
  )

  const filmDescription = (
    <FilmDescription
      filmTitle={filmTitle}
      releaseYearString={releaseYearString}
      directorNameArray={directorNameArray}
      averageRatingString={averageRatingString}
      showAverageRating={showAverageRating}
    />
  );

  function handleClick() {
    onFilmClick(filmObject);
  }

  return (
    <>

      <div className="FilmPosterCell" onClick={handleClick}>
        {filmPoster}
      </div>

      <button className="FilmDescriptionButton" onClick={handleClick}>
        {filmDescription}
      </button>

    </>
  );
}

export default Film;
