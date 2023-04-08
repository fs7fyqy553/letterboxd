import HighScore from "./components/HighScore";
import CurrentScore from "./components/CurrentScore";

function App() {
  return (
    <div className="App">
      <HighScore
        score={0}
      />
      <CurrentScore
        score={0}
      />
    </div>
  );
}

export default App;
