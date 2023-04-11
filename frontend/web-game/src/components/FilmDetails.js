import "../styles/FilmDetails.css";

function FilmDetails({ filmObject, showAverageRating, onFilmClick }) {
  const {
    filmTitle,
    releaseYearString,
    directorNameArray,
    averageRatingString,
    filmPosterURL,
  } = filmObject;
  return (
    <div className="FilmDetails" onClick={onFilmClick}>
      <img src={filmPosterURL} alt={`Film Poster For ${filmTitle}`} />
      <div className="text">
        <div>
          {filmTitle} ({releaseYearString})
        </div>
        <div>Directed By: {directorNameArray.join(", ")}</div>
        {showAverageRating && (
          <div>Average Rating: {averageRatingString} / 5</div>
        )}
      </div>
    </div>
  );
}

export default FilmDetails;
