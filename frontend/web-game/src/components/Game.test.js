import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Game from "./Game";

jest.mock("./CurrentScore", () => ({score}) =>
    <div data-testid="CurrentScore's score prop">{score}</div>
);

describe("Game component", () => {
    const testGame = <Game />;
    it("renders CurrentScore with correct initial score prop", () => {
        render(testGame);
        expect(screen.getByTestId("CurrentScore's score prop").textContent).toBe("0");
    });
});