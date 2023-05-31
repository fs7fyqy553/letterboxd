/* eslint-disable react/display-name */
import React from "react";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import Film from "./Film";
import userEvent from "@testing-library/user-event";

jest.mock("./FilmPoster/FilmPoster", () => ({filmPosterURL}) => 
    <div data-testid="FilmPoster">
        <div data-testid="FilmPoster's filmPosterURL prop">{filmPosterURL}</div>
    </div>
);

jest.mock("./FilmDescription/FilmDescription", () => ({
    filmTitle,
    releaseYearString,
    directorNameArray,
    averageRatingString,
    showAverageRating
}) => 
    <div data-testid="FilmDescription">
        <div data-testid="FilmDescription's filmTitle prop">{filmTitle}</div>
        <div data-testid="FilmDescription's releaseYearString prop">{releaseYearString}</div>
        <div data-testid="FilmDescription's directorNameArray prop">{directorNameArray}</div>
        <div data-testid="FilmDescription's averageRatingString prop">{averageRatingString}</div>
        {showAverageRating && <div data-testid="FilmDescription's showAverageRating prop"></div>}
    </div>
);

const testFilmTitle = "Film 1";
const testReleaseYearString = "1989";
const testDirectorNameArray = ["Director 1", "Director 2"];
const testAverageRatingString = "3.7";
const testFilmPosterURL = "filmposter1.com";

const testFilmObject = {
    filmTitle: testFilmTitle,
    releaseYearString: testReleaseYearString,
    directorNameArray: testDirectorNameArray,
    averageRatingString: testAverageRatingString,
    filmPosterURL: testFilmPosterURL,
};
const testShowAverageRating = true;
const testOnFilmClick = jest.fn();

describe("Film component", () => {

    const testFilm = <Film
        filmObject={testFilmObject}
        showAverageRating={testShowAverageRating}
        onFilmClick={testOnFilmClick}
    />

    describe("renders button", () => {

        it("with correct onClick callback", () => {
            render(testFilm);
            const button = screen.getByRole("button");
            userEvent.click(button);
            expect(testOnFilmClick).toHaveBeenCalledTimes(1);
        });

        it("with FilmPoster inside it", () => {
            render(testFilm);
            const button = screen.getByRole("button");
            expect(within(button).getByTestId("FilmPoster")).not.toBeNull();
        });
        
        it("with FilmDescription inside it", () => {
            render(testFilm);
            const button = screen.getByRole("button");
            expect(within(button).getByTestId("FilmDescription")).not.toBeNull();
        });

    });

    it("renders FilmPoster with correct props", () => {
        render(testFilm);
        expect(screen.getByTestId("FilmPoster's filmPosterURL prop").textContent).toBe(
            testFilmPosterURL
        );
    });

    it("renders FilmDescription with correct props", () => {
        render(testFilm);
        expect(screen.getByTestId("FilmDescription's filmTitle prop").textContent).toBe(
            testFilmTitle
        );
        expect(screen.getByTestId("FilmDescription's releaseYearString prop").textContent).toBe(
            testReleaseYearString
        );
        expect(screen.getByTestId("FilmDescription's directorNameArray prop").textContent).toBe(
            testDirectorNameArray.join("")
        );
        expect(screen.getByTestId("FilmDescription's averageRatingString prop").textContent).toBe(
            testAverageRatingString
        );
        expect(screen.getByTestId("FilmDescription's showAverageRating prop")).toBeInTheDocument();
    });

});