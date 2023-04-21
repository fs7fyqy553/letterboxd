import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import CurrentScore from "./CurrentScore";

describe("CurrentScore component", () => {
    it("renders correct div", () => {
        const testScore = 10;
        render(<CurrentScore score={testScore}/>);
        const expectedText = `Current Score: ${testScore}`;
        expect(screen.getByText(expectedText)).toBeInTheDocument();
    });
});