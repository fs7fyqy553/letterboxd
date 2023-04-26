import "../styles/Game.css";
import { useState, useEffect } from "react";
import getFilmPair from "../functions/getFilmPair";
import HighScore from "./HighScore";
import CurrentScore from "./CurrentScore";
import FilmDetails from "./FilmDetails";

function Game() {
  const [scoreObject, setScoreObject] = useState({currentScore: 0, highScore: 0});
  const [filmObjectArray, setFilmObjectArray] = useState([]);

  useEffect(() => {
    changeFilms();
  }, []);
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
      setScoreObject(({currentScore, highScore}) => {
        const newCurrentScore = currentScore + 1;
        const newHighScore = Math.max(newCurrentScore, highScore);
        return {currentScore: newCurrentScore, highScore: newHighScore};
      });
    } else {
      setScoreObject((scoreObject) => ({currentScore: 0, highScore: scoreObject.highScore}));
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
          <CurrentScore score={scoreObject.currentScore} />
          <HighScore score={scoreObject.highScore} />
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
