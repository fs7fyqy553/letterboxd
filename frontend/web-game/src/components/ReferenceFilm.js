import FilmDetails from "./FilmDetails.js";

function ReferenceFilm({ filmDetailsObject, onReferenceFilmClick }) {
    return (
        <div
            className="ReferenceFilm"
            onClick={onReferenceFilmClick}
        >
            <FilmDetails
                filmDetailsObject={filmDetailsObject}
                averageRatingShown={true}
            />
        </div>
    );
}

export default ReferenceFilm;
