import { useState } from "react";
import HighScore from "./components/HighScore";
import CurrentScore from "./components/CurrentScore";
import ReferenceFilm from "./components/ReferenceFilm";
import FilmToGuess from "./components/FilmToGuess";

function App() {
  const [highScore, setHighScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [referenceFilmDetailsObject, setReferenceFilmDetailsObject] = useState(null);
  const [filmDetailsObjectToGuess, setFilmDetailsObjectToGuess] = useState(null);
  return (
    <div className="App">
      <HighScore
        score={highScore}
      />
      <CurrentScore
        score={currentScore}
      />
      {referenceFilmDetailsObject && 
        <ReferenceFilm
          filmDetailsObject={referenceFilmDetailsObject}
        />
      }
      {filmDetailsObjectToGuess &&
        <FilmToGuess
          filmDetailsObject={filmDetailsObjectToGuess}
        />
      }
    </div>
  );
}

export default App;
