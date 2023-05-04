import "../styles/Game.css";
import { useState, useEffect } from "react";
import getFilmPair from "../functions/getFilmPair";
import HighScore from "./HighScore";
import CurrentScore from "./CurrentScore";
import FilmDetails from "./FilmDetails";
import { useSessionStorage } from "usehooks-ts";

function Game() {
  const [scoreObject, setScoreObject] = useSessionStorage(
    "scoreObject", { currentScore: 0, highScore: 0 }
  );
  const [filmObjectArray, setFilmObjectArray] = useSessionStorage("filmObjectArray", []);
  const [isSelectionProcessing, setIsSelectionProcessing] = useState(false);

  useEffect(() => {
    if (filmObjectArray.length === 0) {
      changeFilms();
    }
  }, []);

  function getNewHighScore(newCurrentScore, prevHighScore) {
    return Math.max(newCurrentScore, prevHighScore);
  }
  function getNewCurrentScore(selectionWasCorrect, prevCurrentScore) {
    return (selectionWasCorrect) ? prevCurrentScore + 1 : 0;
  }

  function getUpdatedScoreObject(selectionWasCorrect, prevCurrentScore, prevHighScore) {
    const newCurrentScore = getNewCurrentScore(selectionWasCorrect, prevCurrentScore);
    const newHighScore = getNewHighScore(newCurrentScore, prevHighScore);
    return { currentScore: newCurrentScore, highScore: newHighScore };
  }

  function updateScoreObject(selectionWasCorrect) {
    setScoreObject(({currentScore, highScore}) => getUpdatedScoreObject(selectionWasCorrect, currentScore, highScore));
  }

  async function changeFilms() {
    const newFilmObjectArray = await getFilmPair();
    console.log(newFilmObjectArray);
    setFilmObjectArray(newFilmObjectArray);
  }
  function updateScore(selectedFilmObject, otherFilmObject) {
    const selectionWasCorrect = selectedFilmObject.averageRatingString > otherFilmObject.averageRatingString;
    updateScoreObject(selectionWasCorrect);
  }

  async function endRound(selectedFilmObject, otherFilmObject) {
    updateScore(selectedFilmObject, otherFilmObject);
    await changeFilms();
  }
  function getOtherFilmObject(selectedFilmObject) {
    return (selectedFilmObject === filmObjectArray[0]) ? filmObjectArray[1] : filmObjectArray[0];
  }

  async function selectFilm(selectedFilmObject) {
    setIsSelectionProcessing(true);
    const otherFilmObject = getOtherFilmObject(selectedFilmObject);
    await endRound(selectedFilmObject, otherFilmObject);
    setIsSelectionProcessing(false);
  }

  return (
    <div className="Game">
      <header aria-label="Instruction and scores">
        <h1 id="instruction">
          Click the Film with the Higher Letterboxd Rating...
        </h1>
        <div aria-label="Scores">
          <CurrentScore score={scoreObject.currentScore} />
          <HighScore score={scoreObject.highScore} />
        </div>
      </header>
      {filmObjectArray.length === 2 && (
        <main aria-labelledby="instruction">
          <FilmDetails
            filmObject={filmObjectArray[0]}
            onFilmClick={selectFilm}
            showAverageRating={true}
            isFilmClickDisabled={isSelectionProcessing}
          />
          <FilmDetails
            filmObject={filmObjectArray[1]}
            onFilmClick={selectFilm}
            showAverageRating={false}
            isFilmClickDisabled={isSelectionProcessing}
          />
        </main>
      )}
    </div>
  );
}

export default Game;
