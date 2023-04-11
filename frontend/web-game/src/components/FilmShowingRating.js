import FilmDetails from "./FilmDetails";

function FilmToGuess({ filmObject, onFilmClick }) {
    return (
        <FilmDetails
            filmObject={filmObject}
            showAverageRating={false}
            onFilmClick={onFilmClick}
        />
    )
}

export default FilmToGuess;
