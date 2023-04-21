import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import HighScore from "./HighScore";

describe("HighScore component", () => {
    it("renders correct div", () => {
        const testScore = 10;
        render(<HighScore score={testScore}/>);
        const expectedText = `High Score: ${testScore}`;
        expect(screen.getByText(expectedText)).toBeInTheDocument();
    });
});