import "../styles/FilmDetails.css";

function FilmDetails({ filmDetailsObject, averageRatingShown, onFilmDetailsClick }) {
    const {
        filmTitle,
        releaseYearString,
        directorNameArray,
        averageRatingString,
        filmPosterURL
    }
    = filmDetailsObject;
    return (
        <div
            className="FilmDetails"
            onClick={onFilmDetailsClick}
        >
            <img
                src={filmPosterURL}
                alt={`Film Poster For ${filmTitle}`}
            />
            <div className="text">
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
        </div>
    );
}

export default FilmDetails;
