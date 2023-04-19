function FilmDetailsText(
    { filmTitle, releaseYearString, directorNameArray, averageRatingString, showAverageRating }
) {
    return (
        <div className="text">
        <div>
            {filmTitle} ({releaseYearString})
        </div>
        <div>Directed By: {directorNameArray.join(", ")}</div>
        {showAverageRating && (
            <div>Average Rating: {averageRatingString} / 5</div>
        )}
        </div>
    )

}

export default FilmDetailsText;
