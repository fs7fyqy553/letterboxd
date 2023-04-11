import "./styles/App.css";
import { useState, useEffect } from "react";
import getFilmPair from "./functions/getFilmPair";
import HighScore from "./components/HighScore";
import CurrentScore from "./components/CurrentScore";
import ReferenceFilm from "./components/ReferenceFilm";
import FilmToGuess from "./components/FilmToGuess";

function App() {
  const [highScore, setHighScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [filmObjectArray, setFilmObjectArray] = useState(null);
  const changeFilms = () => {
    getFilmPair()
      .then((pairArray) => {
        setFilmObjectArray(pairArray);
      });
  };
  useEffect(() => {
    changeFilms();
  }, []);
  const processReferenceFilmSelection = () => {
    processFilmSelection(filmObjectArray[0]);
  }
  const processFilmToGuessSelection = () => {
    processFilmSelection(filmObjectArray[1]);
  }
  // TODO: split function up/make it more concise
  const processFilmSelection = (selectedFilmObject) => {
    let opponentFilmObject;
    if (selectedFilmObject === filmObjectArray[0]) {
      opponentFilmObject = filmObjectArray[1];
    } else {
      opponentFilmObject = filmObjectArray[0];
    }

    if (selectedFilmObject.averageRatingString > opponentFilmObject.averageRatingString) {
      setCurrentScore(currentScore => currentScore + 1);
    } else {
      setCurrentScore(0);
    }

    changeFilms();
  };
  useEffect(() => {
    if (currentScore > highScore) {
      setHighScore(currentScore);
    }
  }, [currentScore])
  return (
    <div className="App">
      <div className="Header">
        <CurrentScore
          score={currentScore}
        />
        Guess the film with the higher Letterboxd rating...
        <HighScore
          score={highScore}
        />
      </div>
      {filmObjectArray &&
        <div className="Films">
          <ReferenceFilm
            filmObject={filmObjectArray[0]}
            onFilmClick={processReferenceFilmSelection}
          />
          <FilmToGuess
            filmObject={filmObjectArray[1]}
            onFilmClick={processFilmToGuessSelection}
          />
        </div>
      }
      <div className="Footer">
        Made by James Graça-Jones
      </div>
    </div>
  );
}

export default App;
