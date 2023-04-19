import "../styles/App.css";
import Game from "./Game";
import invertocat from "../logos/github-mark-white.svg";
import inLogo from "../logos/LI-In-Bug.png";

function App() {
    return (
        <div className="App">
            <Game/>
            <div className="Footer">
                <a href="https://github.com/JamesGJ5/letterxbod-higher-or-lower">
                    <img src={invertocat}/>
                </a>
                <a href="https://www.linkedin.com/in/james-graca-jones/">
                    <img src={inLogo}/>
                </a>
            </div>
        </div>
    )
}

export default App;
