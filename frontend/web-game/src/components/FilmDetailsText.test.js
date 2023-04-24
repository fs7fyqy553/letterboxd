import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FilmDetailsText from "./FilmDetailsText";

function checkAverageRating(testFilmDetailsText, testAverageRatingString) {
    render(testFilmDetailsText);
    expect(screen.getByText(testAverageRatingString, {exact: false})).toBeInTheDocument();
}

function checkDirectorNames(testFilmDetailsText, testDirectorNameArray) {
    render(testFilmDetailsText);
    const testDirectorNamesString = testDirectorNameArray.join(", ");
    expect(screen.getByText(testDirectorNamesString, {exact: false})).toBeInTheDocument();
}

function checkReleaseYear(testFilmDetailsText, testReleaseYearString) {
    render(testFilmDetailsText);
    expect(screen.getByText(testReleaseYearString, {exact: false})).toBeInTheDocument();
}

function checkFilmTitle(testFilmDetailsText, testFilmTitle) {
    render(testFilmDetailsText);
    expect(screen.getByText(testFilmTitle, {exact: false})).toBeInTheDocument();
}

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
            checkFilmTitle(testFilmDetailsText, testFilmTitle);
        });
        it("mentions correct release year", () => {
            checkReleaseYear(testFilmDetailsText, testReleaseYearString);
        });
        it("mentions correct director names", () => {
            checkDirectorNames(testFilmDetailsText, testDirectorNameArray);
        });
        it("shows average rating", () => {
            checkAverageRating(testFilmDetailsText, testAverageRatingString);
        });
    });
    describe("chosen to hide average rating", () => {
        const testFilmDetailsText = <FilmDetailsText
            filmTitle={testFilmTitle}
            releaseYearString={testReleaseYearString}
            directorNameArray={testDirectorNameArray}
            averageRatingString={testAverageRatingString}
            showAverageRating={false}
        />
        it("mentions correct film", () => {
            checkFilmTitle(testFilmDetailsText, testFilmTitle);
        });
        it("mentions correct release year", () => {
            checkReleaseYear(testFilmDetailsText, testReleaseYearString);
        });
        it("mentions correct director names", () => {
            checkDirectorNames(testFilmDetailsText, testDirectorNameArray);
        });
    });
});