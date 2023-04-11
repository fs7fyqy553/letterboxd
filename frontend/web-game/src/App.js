import "./styles/App.css";
import { useState, useEffect } from "react";
import getTwoFilmsWithDifferentAverageRatings from "./functions/getTwoFilmsWithDifferentAverageRatings";
import HighScore from "./components/HighScore";
import CurrentScore from "./components/CurrentScore";
import ReferenceFilm from "./components/ReferenceFilm";
import FilmToGuess from "./components/FilmToGuess";

function App() {
  const [highScore, setHighScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  // const [referenceFilmDetailsObject, setReferenceFilmDetailsObject] = useState(null);
  // const [filmDetailsObjectToGuess, setFilmDetailsObjectToGuess] = useState(null);
  const [filmDetailsObjectPairArray, setFilmDetailsObjectPairArray] = useState(null);
  const changeFilms = () => {
    getTwoFilmsWithDifferentAverageRatings()
      .then((pairArray) => {
        // setReferenceFilmDetailsObject(film1);
        // setFilmDetailsObjectToGuess(film2);
        setFilmDetailsObjectPairArray(pairArray);
      });
  };
  useEffect(() => {
    changeFilms();
  }, []);
  const processReferenceFilmSelection = () => {
    processFilmSelection(filmDetailsObjectPairArray[0]);
  }
  const processFilmToGuessSelection = () => {
    processFilmSelection(filmDetailsObjectPairArray[1]);
  }
  // TODO: split function up/make it more concise
  const processFilmSelection = (selectedFilmDetailsObject) => {
    let opponentFilmDetailsObject;
    if (selectedFilmDetailsObject === filmDetailsObjectPairArray[0]) {
      opponentFilmDetailsObject = filmDetailsObjectPairArray[1];
    } else {
      opponentFilmDetailsObject = filmDetailsObjectPairArray[0];
    }

    if (selectedFilmDetailsObject.averageRatingString > opponentFilmDetailsObject.averageRatingString) {
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
      {filmDetailsObjectPairArray &&
        <div className="Films">
          <ReferenceFilm
            filmDetailsObject={filmDetailsObjectPairArray[0]}
            onFilmDetailsClick={processReferenceFilmSelection}
          />
          <FilmToGuess
            filmDetailsObject={filmDetailsObjectPairArray[1]}
            onFilmDetailsClick={processFilmToGuessSelection}
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
