import FilmPoster from "../FilmPoster/FilmPoster";
import FilmDetailsText from "../FilmDetailsText/FilmDetailsText";

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

  const filmDetailsText = (
    <FilmDetailsText
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

      <button className="FilmTextButton" onClick={handleClick}>
        {filmDetailsText}
      </button>
      
    </>
  );
}

export default Film;
