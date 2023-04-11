import FilmDetails from "./FilmDetails.js";

function ReferenceFilm({ filmObject, onFilmClick }) {
    return (
        <FilmDetails
            filmObject={filmObject}
            showAverageRating={true}
            onFilmClick={onFilmClick}
        />
    );
}

export default ReferenceFilm;
