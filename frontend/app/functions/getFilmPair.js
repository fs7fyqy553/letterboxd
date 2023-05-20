import getAPIRequestURL from "./getAPIRequestURL";

function fetchFilmPair() {
  const requestURL = getAPIRequestURL("/films?twoFilmsWithDifferentRatings=true");
  return fetch(
    requestURL,
    {
      headers: {
        "API-Key": process.env.API_KEY,
      }
    }
  );
}

async function getFilmPair() {
  try {
    const filmPairFetchResponse = await fetchFilmPair();
    const responseObject = await filmPairFetchResponse.json();
    const filmArray = responseObject.films;
    return filmArray;
  } catch (err) {
    console.log(err);
  }
}

export default getFilmPair;
