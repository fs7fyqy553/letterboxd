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
  function getOtherFilmObject(selectedFilmObject) {
    return (selectedFilmObject === filmObjectArray[0]) ? filmObjectArray[1] : filmObjectArray[0];
  }

  function selectFilm(selectedFilmObject) {
    const otherFilmObject = getOtherFilmObject(selectedFilmObject);
    endRound(selectedFilmObject, otherFilmObject);
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
            onFilmClick={selectFilm}
            showAverageRating={true}
          />
          <FilmDetails
            filmObject={filmObjectArray[1]}
            onFilmClick={selectFilm}
            showAverageRating={false}
          />
        </main>
      )}
    </div>
  );
}

export default Game;
