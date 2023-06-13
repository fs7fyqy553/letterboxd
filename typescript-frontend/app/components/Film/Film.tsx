import { ReactElement } from "react";
import FilmPoster from "../FilmPoster/FilmPoster";
import FilmDescription from "../FilmDescription/FilmDescription";

type FilmProps = {
  filmObject: {
    filmTitle: string,
    releaseYearString: string,
    directorNameArray: string[],
    averageRatingString: string,
    filmPosterURL: string,
    filmBackdropImageURL: string,
  },
  showAverageRating: boolean,
  onFilmClick: Function,
}

function Film({
  filmObject,
  showAverageRating,
  onFilmClick,
}: FilmProps): ReactElement {

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
      portraitModeURL={filmPosterURL}
      landscapeModeURL={filmBackdropImageURL}
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
