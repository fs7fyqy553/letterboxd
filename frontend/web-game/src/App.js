import HighScore from "./components/HighScore";
import CurrentScore from "./components/CurrentScore";

function App() {
  return (
    <div className="App">
      <HighScore
        highScore={0}
      />
      <CurrentScore
        currentScore={0}
      />
    </div>
  );
}

export default App;
