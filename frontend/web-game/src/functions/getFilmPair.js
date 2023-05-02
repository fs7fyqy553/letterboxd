async function getFilmPair() {
  // NOTE: the two selected films should have different ratings
  try {
    const responseJSON = await fetch(
      "https://letterxbod-guessing-game-production.up.railway.app/api/films?twoFilmsWithDifferentRatings=true",
      // "http://localhost:8000/getFilmPair",
      {
        mode: "cors",
      }
    );
    const responseObject = await responseJSON.json();
    const filmArray = responseObject.films;
    return filmArray;
  } catch (err) {
    console.log(err);
  }
}

export default getFilmPair;
