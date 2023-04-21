import "../styles/Game.css";
import { useState, useEffect } from "react";
import getFilmPair from "../functions/getFilmPair";
import HighScore from "./HighScore";
import CurrentScore from "./CurrentScore";
import FilmShowingRating from "./FilmShowingRating";
import FilmHidingRating from "./FilmHidingRating";

function Game() {
  const [highScore, setHighScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [filmObjectArray, setFilmObjectArray] = useState([]);

  useEffect(() => changeFilms, []);
  useEffect(() => {
    setHighScore((highScore) =>
      currentScore > highScore ? currentScore : highScore
    );
  }, [currentScore]);

  const selectFilmShowingRating = () => {
    processFilmSelection(0);
  };
  const processFilmSelection = (selectedFilmObjectIndex) => {
    const selectedFilmObject = filmObjectArray[selectedFilmObjectIndex];
    const otherFilmObject = filmObjectArray[1 - selectedFilmObjectIndex];
    updateScore(selectedFilmObject, otherFilmObject);
    changeFilms();
  };
  const updateScore = (selectedFilmObject, otherFilmObject) => {
    if (
      selectedFilmObject.averageRatingString >
      otherFilmObject.averageRatingString
    ) {
      setCurrentScore((currentScore) => currentScore + 1);
    } else {
      setCurrentScore(0);
    }
  };
  const changeFilms = async () => {
    const newFilmObjectArray = await getFilmPair();
    setFilmObjectArray(newFilmObjectArray);
  };
  const selectFilmHidingRating = () => {
    processFilmSelection(1);
  };

  return (
    <div className="Game">
      <header aria-label="Instruction and scores">
        <h1 id="instruction">
          Click the Film with the Higher Letterboxd Rating...
        </h1>
        <div aria-label="Scores">
          <CurrentScore score={currentScore} />
          <HighScore score={highScore} />
        </div>
      </header>
      {filmObjectArray.length === 2 && (
        <main aria-labelledby="instruction">
          <FilmShowingRating
            filmObject={filmObjectArray[0]}
            onFilmClick={selectFilmShowingRating}
          />
          <FilmHidingRating
            filmObject={filmObjectArray[1]}
            onFilmClick={selectFilmHidingRating}
          />
        </main>
      )}
    </div>
  );
}

export default Game;
