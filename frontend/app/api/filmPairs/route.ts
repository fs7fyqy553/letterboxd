import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function getAPIRequestURL(requestPath: string): string {
    const API_URL = process.env.PUBLIC_API_URL || process.env.DEVELOPMENT_API_URL;
    return API_URL + requestPath;
}

function fetchFilmPairArray(numberOfPairs: string): Promise<Response> {
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

async function getFilmPairArray(numberOfPairs: string): Promise<Array<Array<object>>> {
  try {
    const filmPairArrayFetchResponse = await fetchFilmPairArray(numberOfPairs);
    const responseObject = await filmPairArrayFetchResponse.json();
    const filmPairArray = responseObject.films;
    return filmPairArray;
  } catch (err) {
    console.log(err);
  }
}

function getRequestedNumberOfPairs(request: NextRequest): string {
    const { searchParams } = new URL(request.url);
    return searchParams.get("numberOfPairs");  
}

export async function GET(request: NextRequest) {
    const numberOfPairs = getRequestedNumberOfPairs(request);
    const filmPairArray = await getFilmPairArray(numberOfPairs);
    return NextResponse.json(filmPairArray);
}
