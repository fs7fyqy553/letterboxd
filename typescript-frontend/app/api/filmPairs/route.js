import { NextResponse } from "next/server";

function getAPIRequestURL(requestPath) {
    const API_URL = process.env.PUBLIC_API_URL || process.env.DEVELOPMENT_API_URL;
    return API_URL + requestPath;
}

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

function getRequestedNumberOfPairs(request) {
    const { searchParams } = new URL(request.url);
    return searchParams.get("numberOfPairs");  
}

export async function GET(request) {
    const numberOfPairs = getRequestedNumberOfPairs(request);
    const filmPairArray = await getFilmPairArray(numberOfPairs);
    return NextResponse.json(filmPairArray);
}
