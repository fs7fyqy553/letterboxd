import { NextResponse } from "next/server";
import getFilmPairArray from "@/app/functions/getFilmPairArray";

export async function GET(request) {
    console.log(request.url);
    const { searchParams } = new URL(request.url);
    const numberOfPairs = searchParams.get("numberOfPairs");
    const filmPairArray = await getFilmPairArray(numberOfPairs);
    return NextResponse.json(filmPairArray);
}
