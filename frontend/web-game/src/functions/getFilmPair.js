async function getFilmPair() {
  // NOTE: the two selected films should have different ratings
  try {
    const responseJSON = await fetch(
      "http://localhost:3000/api/films?twoFilmsWithDifferentRatings=true"
    );
    const responseObject = await responseJSON.json();
    const filmArray = responseObject.films;
    return filmArray;
  } catch (err) {
    console.log(err);
  }
}

export default getFilmPair;
