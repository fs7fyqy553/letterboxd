import getAPIRequestURL from "./getAPIRequestURL";

async function getFilmPairArray(numberOfPairs) {
  // NOTE: the two selected films should have different ratings
  const requestURL = getAPIRequestURL(`/films?twoFilmsWithDifferentRatings=true&numberOfPairs=${numberOfPairs}`);
  try {
    const responseJSON = await fetch(
      requestURL,
      {
        cache: "no-store",
        headers: {
          "API-Key": process.env.API_KEY,
        }
      }
    );
    const responseObject = await responseJSON.json();
    const filmPairArray = responseObject.films;
    return filmPairArray;
  } catch (err) {
    console.log(err);
  }
}

export default getFilmPairArray;