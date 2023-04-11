async function getFilmPair() {
    // NOTE: the two selected films should have different ratings
    try {
        const filmArrayJSON = await fetch("http://localhost:3000/api/films?twoFilmsWithDifferentRatings=true");
        const filmArray = await filmArrayJSON.json();
        return filmArray;
    } catch(err) {
        console.log(err);
    }
}

export default getFilmPair;
