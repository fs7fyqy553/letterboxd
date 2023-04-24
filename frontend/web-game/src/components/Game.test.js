import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Game from "./Game";

jest.mock("./CurrentScore", () => ({score}) =>
    <div data-testid="CurrentScore's score prop">{score}</div>
);

jest.mock("./HighScore", () => ({score}) =>
    <div data-testid="HighScore's score prop">{score}</div>
);

// TODO: Make async
jest.mock("../functions/getFilmPair", () => () => {
    // NOTE: omitting keys unnecessary for test of Game component
    const lowerRatingFilm = {
        averageRatingString: "3.7",
    };
    const higherRatingFilm = {
        averageRatingString: "4.5",
    };
    return [lowerRatingFilm, higherRatingFilm];
})

describe("Game component", () => {
    const testGame = <Game />;
    it("renders CurrentScore with correct initial score prop", () => {
        render(testGame);
        expect(screen.getByTestId("CurrentScore's score prop").textContent).toBe("0");
    });
    it("renders HighScore with correct props", () => {
        render(testGame);
        expect(screen.getByTestId("HighScore's score prop").textContent).toBe("0");
    });
});