import FilmDetails from "./FilmDetails.js";

function ReferenceFilm({ filmDetailsObject, onFilmDetailsClick }) {
    return (
        <FilmDetails
            filmDetailsObject={filmDetailsObject}
            averageRatingShown={true}
            onFilmDetailsClick={onFilmDetailsClick}
        />
    );
}

export default ReferenceFilm;
