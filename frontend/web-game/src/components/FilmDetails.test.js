import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FilmDetails from "./FilmDetails";

jest.mock("./FilmPoster", () => ({filmPosterURL}) => 
    <div data-testid="FilmPoster's filmPosterURL prop">{filmPosterURL}</div>
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
    it("renders filmPoster with correct props", () => {
        render(testFilmDetails);
        expect(screen.getByTestId("FilmPoster's filmPosterURL prop").textContent).toBe(
            testFilmPosterURL
        );
    });
});