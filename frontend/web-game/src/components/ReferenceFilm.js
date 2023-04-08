import FilmDetails from "./FilmDetails.js";

function ReferenceFilm({ filmDetailsObject }) {
    return (
        <div className="ReferenceFilm">
            <FilmDetails
                filmDetailsObject={filmDetailsObject}
                averageRatingShown={true}
            />
        </div>
    );
}

export default ReferenceFilm;
