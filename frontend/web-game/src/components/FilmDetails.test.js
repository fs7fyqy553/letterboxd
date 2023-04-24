import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FilmDetails from "./FilmDetails";
import userEvent from "@testing-library/user-event";

jest.mock("./FilmPoster", () => ({filmPosterURL}) => 
    <div data-testid="FilmPoster's filmPosterURL prop">{filmPosterURL}</div>
);

jest.mock("./FilmDetailsText", () => ({
    filmTitle,
    releaseYearString,
    directorNameArray,
    averageRatingString,
    showAverageRating
}) => 
    <>
        <div data-testid="FilmDetailsText's filmTitle prop">{filmTitle}</div>
        <div data-testid="FilmDetailsText's releaseYearString prop">{releaseYearString}</div>
        <div data-testid="FilmDetailsText's directorNameArray prop">{directorNameArray}</div>
        <div data-testid="FilmDetailsText's averageRatingString prop">{averageRatingString}</div>
        {showAverageRating && <div data-testid="FilmDetailsText's showAverageRating prop"></div>}
    </>
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

describe("FilmDetails component", () => {
    const testFilmDetails = <FilmDetails
        filmObject={testFilmObject}
        showAverageRating={testShowAverageRating}
        onFilmClick={testOnFilmClick}
    />
    it("renders FilmPoster with correct props", () => {
        render(testFilmDetails);
        expect(screen.getByTestId("FilmPoster's filmPosterURL prop").textContent).toBe(
            testFilmPosterURL
        );
    });
    it("renders FilmDetailsText with correct props", () => {
        render(testFilmDetails);
        expect(screen.getByTestId("FilmDetailsText's filmTitle prop").textContent).toBe(
            testFilmTitle
        );
        expect(screen.getByTestId("FilmDetailsText's releaseYearString prop").textContent).toBe(
            testReleaseYearString
        );
        expect(screen.getByTestId("FilmDetailsText's directorNameArray prop").textContent).toBe(
            testDirectorNameArray.join("")
        );
        expect(screen.getByTestId("FilmDetailsText's averageRatingString prop").textContent).toBe(
            testAverageRatingString
        );
        expect(screen.getByTestId("FilmDetailsText's showAverageRating prop")).toBeInTheDocument();
    });
    describe("renders button", () => {
        it("with correct onClick callback", () => {
            render(testFilmDetails);
            const button = screen.getByRole("button");
            userEvent.click(button);
            expect(testOnFilmClick).toHaveBeenCalledTimes(1);
        });
    });
});