import getAPIRequestURL from "./getAPIRequestURL";

function fetchFilmPairArray(numberOfPairs) {
  const requestURL = getAPIRequestURL(`/films?twoFilmsWithDifferentRatings=true&numberOfPairs=${numberOfPairs}`);
  return fetch(
    requestURL,
    {
      cache: "no-store",
      headers: {
        "API-Key": process.env.API_KEY,
      }
    }
  );
}

async function getFilmPairArray(numberOfPairs) {
  try {
    const filmPairArrayFetchResponse = await fetchFilmPairArray(numberOfPairs);
    const responseObject = await filmPairArrayFetchResponse.json();
    const filmPairArray = responseObject.films;
    return filmPairArray;
  } catch (err) {
    console.log(err);
  }
}

export default getFilmPairArray;