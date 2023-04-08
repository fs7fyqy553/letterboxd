import HighScore from "./components/HighScore";
import CurrentScore from "./components/CurrentScore";
import ReferenceFilm from "./components/ReferenceFilm";

function App() {
  return (
    <div className="App">
      <HighScore
        score={0}
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
            filmPosterURL: "Film poster URL 1",
          }
        }
      />
    </div>
  );
}

export default App;
