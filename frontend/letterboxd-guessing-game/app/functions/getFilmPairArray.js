async function getFilmPairArray(numberOfPairs) {
  // NOTE: the two selected films should have different ratings
  const requestURL = process.env.PUBLIC_API_URL || process.env.DEVELOPMENT_API_URL;
  try {
    const responseJSON = await fetch(
      `${requestURL}&numberOfPairs=${numberOfPairs}`,
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