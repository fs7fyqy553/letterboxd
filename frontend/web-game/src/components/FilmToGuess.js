import FilmDetails from "./FilmDetails";

function FilmToGuess({ filmDetailsObject, onFilmDetailsClick }) {
    return (
        <FilmDetails
            filmDetailsObject={filmDetailsObject}
            averageRatingShown={false}
            onFilmDetailsClick={onFilmDetailsClick}
        />
    )
}

export default FilmToGuess;
