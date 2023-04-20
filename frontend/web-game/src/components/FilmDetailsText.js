function FilmDetailsText(
    { filmTitle, releaseYearString, directorNameArray, averageRatingString, showAverageRating }
) {
    return (
        <div className="text">
        <div>
            <strong>{filmTitle}</strong> ({releaseYearString})
        </div>
        <div><strong>Directed By:</strong> {directorNameArray.join(", ")}</div>
        {showAverageRating && (
            <div><strong>Average Rating:</strong> {averageRatingString}/5</div>
        )}
        </div>
    )

}

export default FilmDetailsText;
