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
            showAverageRating={true}
        />
        it("mentions correct film", () => {
            render(testFilmDetailsText);
            expect(screen.getByText(testFilmTitle, {exact: false})).toBeInTheDocument();
        });
        it("mentions correct release year", () => {
            render(testFilmDetailsText);
            expect(screen.getByText(testReleaseYearString, {exact: false})).toBeInTheDocument();
        });
        it("mentions correct director names", () => {
            render(testFilmDetailsText);
            const testDirectorNamesString = testDirectorNameArray.join(", ");
            expect(screen.getByText(testDirectorNamesString, {exact: false})).toBeInTheDocument();
        });
        // it("shows average rating", () => {
        //     render(testFilmDetailsText);
        //     expect(screen.getByText(testAverageRatingString, {exact: false})).toBeInTheDocument();
        // })
    })
});