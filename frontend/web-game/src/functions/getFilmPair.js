import env from "react-dotenv";

async function getFilmPair() {
  // NOTE: the two selected films should have different ratings
  const requestURL = env.DEVELOPMENT_API_URL || env.PRODUCTION_API_URL;
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
