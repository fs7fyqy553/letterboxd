function FilmDescription({
  filmTitle,
  releaseYearString,
  directorNameArray,
  averageRatingString,
  showAverageRating,
}) {
  return (
    <div className="FilmDescription">
      <div>
        <strong>{filmTitle}</strong> ({releaseYearString})
      </div>
      <div>
        <strong>Directed By:</strong> {directorNameArray.join(", ")}
      </div>
      {showAverageRating && (
        <div>
          <strong>Rating:</strong> {averageRatingString}/5
        </div>
      )}
    </div>
  );
}

export default FilmDescription;
