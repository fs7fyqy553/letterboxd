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
      currentScore.current += 1;
      highScore.current = Math.max(currentScore.current, highScore.current);
    } else {
      currentScore.current = 0;
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
