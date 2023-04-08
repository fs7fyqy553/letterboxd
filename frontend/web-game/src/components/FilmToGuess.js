import FilmDetails from "./FilmDetails";

function FilmToGuess({ filmDetailsObject }) {
    return (
        <div className="FilmToGuess">
            <FilmDetails
                filmDetailsObject={filmDetailsObject}
                averageRatingShown={false}
            />
        </div>
    )
}

export default FilmToGuess;
