function FilmPoster({ filmPosterURL }) {
    return (
        <div className="img" style={{backgroundImage: `url(${filmPosterURL})`}}/>
    )
}

export default FilmPoster;
