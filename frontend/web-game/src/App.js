import { useState } from "react";
import HighScore from "./components/HighScore";
import CurrentScore from "./components/CurrentScore";
import ReferenceFilm from "./components/ReferenceFilm";
import FilmToGuess from "./components/FilmToGuess";

function App() {
  const [highScore, setHighScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [referenceFilmDetailsObject, setReferenceFilmDetailsObject] = useState(null);
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
      <FilmToGuess
        filmDetailsObject={
          {
            filmTitle: "Film 2",
            releaseYearString: "Year 2",
            directorNameArray: ["Director 3", "Director 4"],
            averageRatingString: "3.7",
            filmPosterURL: "https://blogs.kcl.ac.uk/editlab/files/2016/12/film-1155439_960_720.jpg",
          }
        }
      />
    </div>
  );
}

export default App;
