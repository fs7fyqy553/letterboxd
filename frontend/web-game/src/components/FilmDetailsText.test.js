import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FilmDetailsText from "./FilmDetailsText";

const testFilmTitle = "Film 1";
const testReleaseYearString = "1989";
const testDirectorNameArray = ["Director 1", "Director 2"];
const testAverageRatingString = "3.7";
describe("FilmDetailsText component", () => {
    describe("chosen to show average rating", () => {
        const testFilmDetailsText = <FilmDetailsText
            filmTitle={testFilmTitle}
            releaseYearString={testReleaseYearString}
            directorNameArray={testDirectorNameArray}
            averageRatingString={testAverageRatingString}
        />
        render(testFilmDetailsText);
        it("mentions correct film", () => {
            expect(screen.getByText(testFilmTitle)).toBeInTheDocument();
        });
    })
});