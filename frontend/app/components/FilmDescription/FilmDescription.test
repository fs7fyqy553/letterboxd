import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FilmDescription from "./FilmDescription";

const testFilmTitle = "Film 1";
const testReleaseYearString = "1989";
const testDirectorNameArray = ["Director 1", "Director 2"];
const testAverageRatingString = "3.7";

describe("FilmDescription component", () => {

    describe("chosen to show average rating", () => {

        const testFilmDescription = <FilmDescription
            filmTitle={testFilmTitle}
            releaseYearString={testReleaseYearString}
            directorNameArray={testDirectorNameArray}
            averageRatingString={testAverageRatingString}
            showAverageRating={true}
        />

        it("mentions correct film", () => {
            render(testFilmDescription);
            expect(screen.getByText(testFilmTitle, {exact: false})).toBeInTheDocument();
        });

        it("mentions correct release year", () => {
            render(testFilmDescription);
            expect(screen.getByText(testReleaseYearString, {exact: false})).toBeInTheDocument();
        });

        it("mentions correct director names", () => {
            render(testFilmDescription);
            const testDirectorNamesString = testDirectorNameArray.join(", ");
            expect(screen.getByText(testDirectorNamesString, {exact: false})).toBeInTheDocument();
        });

        it("shows average rating", () => {
            render(testFilmDescription);
            expect(screen.getByText(testAverageRatingString, {exact: false})).toBeInTheDocument();
        });

    });

    describe("chosen to hide average rating", () => {

        const testFilmDescription = <FilmDescription
            filmTitle={testFilmTitle}
            releaseYearString={testReleaseYearString}
            directorNameArray={testDirectorNameArray}
            averageRatingString={testAverageRatingString}
            showAverageRating={false}
        />
        
        it("mentions correct film", () => {
            render(testFilmDescription);
            expect(screen.getByText(testFilmTitle, {exact: false})).toBeInTheDocument();
        });

        it("mentions correct release year", () => {
            render(testFilmDescription);
            expect(screen.getByText(testReleaseYearString, {exact: false})).toBeInTheDocument();
        });

        it("mentions correct director names", () => {
            render(testFilmDescription);
            const testDirectorNamesString = testDirectorNameArray.join(", ");
            expect(screen.getByText(testDirectorNamesString, {exact: false})).toBeInTheDocument();
        });

        it("hides average rating", () => {
            render(testFilmDescription);
            expect(screen.queryByText(testAverageRatingString, {exact: false})).toBeNull();
        });
        
    });

});