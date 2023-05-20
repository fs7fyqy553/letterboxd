import getAPIRequestURL from "./getAPIRequestURL";

async function getFilmPair() {
  const requestURL = getAPIRequestURL("/films?twoFilmsWithDifferentRatings=true");
  try {
    const responseJSON = await fetch(
      requestURL,
      {
        headers: {
          "API-Key": process.env.API_KEY,
        }
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
