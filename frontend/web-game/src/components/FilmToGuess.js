import FilmDetails from "./FilmDetails";

function FilmToGuess({ filmDetailsObject, onFilmToGuessClick }) {
    return (
        <div
            className="FilmToGuess"
            onClick={onFilmToGuessClick}
        >
            <FilmDetails
                filmDetailsObject={filmDetailsObject}
                averageRatingShown={false}
            />
        </div>
    )
}

export default FilmToGuess;
