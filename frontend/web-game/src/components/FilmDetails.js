function FilmDetails({ filmDetailsObject, averageRatingShown }) {
    const {
        filmTitle,
        releaseYearString,
        directorNameArray,
        averageRatingString,
        filmPosterURL
    }
    = filmDetailsObject;
    return (
        <div className="FilmDetails">
            <img
                src={filmPosterURL}
                alt={`Film Poster For ${filmTitle}`}
            />
            <div>
                {filmTitle} ({releaseYearString})
            </div>
            <div>
                Directed By: {directorNameArray.join(", ")}
            </div>
            {averageRatingShown && 
                <div>
                    Average Rating: {averageRatingString} / 5
                </div>
            }
        </div>
    );
}

export default FilmDetails;
