import { NextResponse } from "next/server";
import getFilmPairArray from "@/app/functions/getFilmPairArray";

function getRequestedNumberOfPairs(request) {
    const { searchParams } = new URL(request.url);
    return searchParams.get("numberOfPairs");  
}

export async function GET(request) {
    const numberOfPairs = getRequestedNumberOfPairs(request);
    const filmPairArray = await getFilmPairArray(numberOfPairs);
    return NextResponse.json(filmPairArray);
}
