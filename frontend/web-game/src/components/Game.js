import "../styles/Game.css";
import { useState, useEffect } from "react";
import getFilmPair from "../functions/getFilmPair";
import HighScore from "./HighScore";
import CurrentScore from "./CurrentScore";
import FilmHidingRating from "./FilmHidingRating";
import FilmShowingRating from "./FilmShowingRating";

function Game() {
  const [highScore, setHighScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [filmObjectArray, setFilmObjectArray] = useState([]);

  useEffect(() => changeFilms, []);
  useEffect(() => {
    setHighScore((highScore) => (currentScore > highScore) ? currentScore : highScore);
  }, [currentScore]);

  const changeFilms = async () => {
    const newFilmObjectArray = await getFilmPair();
    setFilmObjectArray(newFilmObjectArray);
  };
  const selectFilmHidingRating = () => {
    processFilmSelection(0);
  };
  const selectFilmShowingRating = () => {
    processFilmSelection(1);
  };
  const processFilmSelection = (selectedFilmObjectIndex) => {
    const selectedFilmObject = filmObjectArray[selectedFilmObjectIndex];
    const opponentFilmObject = filmObjectArray[1 - selectedFilmObjectIndex];
    updateScore(selectedFilmObject, opponentFilmObject);
    changeFilms();
  };
  const updateScore = (selectedFilmObject, opponentFilmObject) => {
    if (
      selectedFilmObject.averageRatingString >
      opponentFilmObject.averageRatingString
    ) {
      setCurrentScore((currentScore) => currentScore + 1);
    } else {
      setCurrentScore(0);
    }
  };

  return (
    <div className="Game">
      <div className="Header">
        <h1>Guess the film with the higher Letterboxd rating...</h1>
        <div>
          <CurrentScore score={currentScore} />
          <HighScore score={highScore} />
        </div>
      </div>
      {filmObjectArray.length === 2 && (
        <div className="Films">
          <FilmHidingRating
            filmObject={filmObjectArray[0]}
            onFilmClick={selectFilmHidingRating}
          />
          <FilmShowingRating
            filmObject={filmObjectArray[1]}
            onFilmClick={selectFilmShowingRating}
          />
        </div>
      )}
    </div>
  );
}

export default Game;
