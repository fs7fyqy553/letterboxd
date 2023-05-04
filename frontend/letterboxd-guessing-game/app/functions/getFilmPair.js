async function getFilmPair() {
  // NOTE: the two selected films should have different ratings
  const requestURL = "http://localhost:3001/api/films?twoFilmsWithDifferentRatings=true";
  // const requestURL = "https://letterboxd-scraped-server.up.railway.app/api/films?twoFilmsWithDifferentRatings=true";
  try {
    const responseJSON = await fetch(
      requestURL
    );
    const responseObject = await responseJSON.json();
    const filmArray = responseObject.films;
    return filmArray;
  } catch (err) {
    console.log(err);
  }
}

export default getFilmPair;
