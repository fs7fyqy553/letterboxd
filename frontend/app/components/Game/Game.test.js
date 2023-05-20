// import React from "react";
// import { render, screen } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import Game from "./Game";
// import userEvent from "@testing-library/user-event";

// // NOTE: omitting keys unnecessary for test of Game component
// const lowerRatingTestFilm = {
//     averageRatingString: "3.7",
// };
// const higherRatingTestFilm = {
//     averageRatingString: "4.5",
// };

// jest.mock("../functions/getFilmPair", () => () => {
//     return [lowerRatingTestFilm, higherRatingTestFilm];
// })

// jest.mock("./CurrentScore/CurrentScore", () => ({score}) =>
//     <div data-testid="CurrentScore's score prop">{score}</div>
// );

// jest.mock("./HighScore/HighScore", () => ({score}) =>
//     <div data-testid="HighScore's score prop">{score}</div>
// );

// jest.mock("./FilmDescription/FilmDescription", () => ({filmObject, onFilmClick, showAverageRating}) =>
//     <button data-testid={filmObject.averageRatingString} onClick={onFilmClick}>
//         <div data-testid="FilmDescription' filmObject prop">
//             {JSON.stringify(filmObject)}
//         </div>
//         {!showAverageRating && <div data-testid="FilmDescription' showAverageRating prop falsy"></div>}
//     </button>
// );

// describe("Game component", () => {
//     const testGame = <Game />;
//     it("renders CurrentScore with correct initial score prop", async () => {
//         render(testGame);
//         const currentScorePropDiv = await screen.findByTestId("CurrentScore's score prop");
//         expect(currentScorePropDiv.textContent).toBe("0");
//     });
//     it("renders HighScore with correct props", async () => {
//         render(testGame);
//         const highScorePropDiv = await screen.findByTestId("HighScore's score prop");
//         expect(highScorePropDiv.textContent).toBe("0");
//     });
//     it("renders FilmDescription components with the correct film object props", async () => {
//         const lowerRatingTestFilmString = JSON.stringify(lowerRatingTestFilm);
//         const higherRatingTestFilmString = JSON.stringify(higherRatingTestFilm);
//         render(testGame);
//         const filmObjectElementArray = await screen.findAllByTestId("FilmDescription' filmObject prop");
//         const filmObjectStringArray = filmObjectElementArray.map((element) => element.textContent);
//         expect(filmObjectStringArray).toContain(lowerRatingTestFilmString, higherRatingTestFilmString);
//     });
//     it("renders at least one FilmDescription with falsy showAverageRating prop", async () => {
//         render(testGame);
//         const falsyShowAverageRatingElementArray = await screen.findAllByTestId("FilmDescription' showAverageRating prop falsy");
//         expect(falsyShowAverageRatingElementArray.length).toBeGreaterThanOrEqual(1);
//     });
//     it("film selections alter scores correctly", async () => {
//         render(testGame);
//         const lowerRatingFilmDescriptionElement = await screen.findByTestId(lowerRatingTestFilm.averageRatingString);
//         const higherRatingFilmDescriptionElement = await screen.findByTestId(higherRatingTestFilm.averageRatingString);
//         userEvent.click(higherRatingFilmDescriptionElement);
//         userEvent.click(higherRatingFilmDescriptionElement);
//         userEvent.click(lowerRatingFilmDescriptionElement);
//         const currentScorePropDiv = await screen.findByTestId("CurrentScore's score prop");
//         expect(currentScorePropDiv.textContent).toBe("0");
//         const highScorePropDiv = await screen.findByTestId("HighScore's score prop");
//         expect(highScorePropDiv.textContent).toBe("2");
//     });
// });