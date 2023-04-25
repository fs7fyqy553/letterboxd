import React from "react";
import { findAllByTestId, render, screen, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import Game from "./Game";

// NOTE: omitting keys unnecessary for test of Game component
const lowerRatingTestFilm = {
    averageRatingString: "3.7",
};
const higherRatingTestFilm = {
    averageRatingString: "4.5",
};

jest.mock("../functions/getFilmPair", () => () => {
    return [lowerRatingTestFilm, higherRatingTestFilm];
})

jest.mock("./CurrentScore", () => ({score}) =>
    <div data-testid="CurrentScore's score prop">{score}</div>
);

jest.mock("./HighScore", () => ({score}) =>
    <div data-testid="HighScore's score prop">{score}</div>
);

jest.mock("./FilmDetails", () => ({filmObject, onFilmClick, showAverageRating}) => 
    <button data-testid="FilmDetails" onClick={onFilmClick}>
        <div data-testid="FilmDetails' filmObject prop">
            {JSON.stringify(filmObject)}
        </div>
        {showAverageRating && <div data-testid="FilmDetails' showAverageRating prop"></div>}
    </button>
);

describe("Game component", () => {
    const testGame = <Game />;
    it("renders CurrentScore with correct initial score prop", async () => {
        render(testGame);
        const currentScorePropDiv = await screen.findByTestId("CurrentScore's score prop");
        expect(currentScorePropDiv.textContent).toBe("0");
    });
    it("renders HighScore with correct props", async () => {
        render(testGame);
        const highScorePropDiv = await screen.findByTestId("HighScore's score prop");
        expect(highScorePropDiv.textContent).toBe("0");
    });
    it("renders FilmDetails components with the correct film object props", async () => {
        const lowerRatingTestFilmString = JSON.stringify(lowerRatingTestFilm);
        const higherRatingTestFilmString = JSON.stringify(higherRatingTestFilm);
        render(testGame);
        const filmObjectElementArray = await screen.findAllByTestId("FilmDetails' filmObject prop");
        const filmObjectStringArray = filmObjectElementArray.map((element) => element.textContent);
        expect(filmObjectStringArray).toContain(lowerRatingTestFilmString, higherRatingTestFilmString);
    });
});