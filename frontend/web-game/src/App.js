import { useState } from "react";
import HighScore from "./components/HighScore";
import CurrentScore from "./components/CurrentScore";
import ReferenceFilm from "./components/ReferenceFilm";
import FilmToGuess from "./components/FilmToGuess";

function App() {
  const [highScore, setHighScore] = useState(0);
  return (
    <div className="App">
      <HighScore
        score={highScore}
      />
      <CurrentScore
        score={0}
      />
      <ReferenceFilm
        filmDetailsObject={
          {
            filmTitle: "Film 1",
            releaseYearString: "Year 1",
            directorNameArray: ["Director 1", "Director 2"],
            averageRatingString: "4.3",
            filmPosterURL: "https://thewell.unc.edu/wp-content/uploads/sites/1007/2020/04/film1.jpg",
          }
        }
      />
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
