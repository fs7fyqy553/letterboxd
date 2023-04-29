import "../styles/Game.css";
import { useState, useEffect, useRef } from "react";
import getFilmPair from "../functions/getFilmPair";
import HighScore from "./HighScore";
import CurrentScore from "./CurrentScore";
import FilmDetails from "./FilmDetails";

function Game() {
  const currentScore = useRef(0);
  const highScore = useRef(0);
  const [filmObjectArray, setFilmObjectArray] = useState([]);

  useEffect(() => {
    changeFilms();
  }, []);

  function updateHighScore() {
    highScore.current = Math.max(currentScore.current, highScore.current);
  }

  function resetCurrentScore() {
    currentScore.current = 0;
  }
  function incrementCurrentScore() {
    currentScore.current += 1;
    updateHighScore();
  }

  async function changeFilms() {
    const newFilmObjectArray = await getFilmPair();
    setFilmObjectArray(newFilmObjectArray);
  }
  function updateScore(selectedFilmObject, otherFilmObject) {
    if (
      selectedFilmObject.averageRatingString >
      otherFilmObject.averageRatingString
    ) {
      incrementCurrentScore();
    } else {
      resetCurrentScore();
    }
  }

  function endRound(selectedFilmObject, otherFilmObject) {
    updateScore(selectedFilmObject, otherFilmObject);
    changeFilms();
  }
  function getFilmObject(filmObjectIndex) {
    return filmObjectArray[filmObjectIndex];
  }

  function processFilmSelection(selectedFilmObjectIndex) {
    const selectedFilmObject = getFilmObject(selectedFilmObjectIndex);
    const otherFilmObject = getFilmObject(1 - selectedFilmObjectIndex);
    endRound(selectedFilmObject, otherFilmObject);
  }

  function selectFilmHidingRating() {
    processFilmSelection(1);
  }
  function selectFilmShowingRating() {
    processFilmSelection(0);
  }

  return (
    <div className="Game">
      <header aria-label="Instruction and scores">
        <h1 id="instruction">
          Click the Film with the Higher Letterboxd Rating...
        </h1>
        <div aria-label="Scores">
          <CurrentScore score={currentScore.current} />
          <HighScore score={highScore.current} />
        </div>
      </header>
      {filmObjectArray.length === 2 && (
        <main aria-labelledby="instruction">
          <FilmDetails
            filmObject={filmObjectArray[0]}
            onFilmClick={selectFilmShowingRating}
            showAverageRating={true}
          />
          <FilmDetails
            filmObject={filmObjectArray[1]}
            onFilmClick={selectFilmHidingRating}
            showAverageRating={false}
          />
        </main>
      )}
    </div>
  );
}

export default Game;
