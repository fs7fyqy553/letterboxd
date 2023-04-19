import "../styles/App.css";
import Game from "./Game";
import invertocat from "../logos/github-mark.svg";
import inLogo from "../logos/LI-In-Bug.png";

function App() {
    return (
        <div className="App">
            <Game/>
            <footer aria-label="Miscellaneous links">
                <a aria-label="Link to GitHub repository" href="https://github.com/JamesGJ5/letterxbod-higher-or-lower">
                    <img src={invertocat} alt="" />
                </a>
                <a aria-label="Link to LinkedIn profile" href="https://www.linkedin.com/in/james-graca-jones/">
                    <img src={inLogo} alt="" />
                </a>
            </footer>
        </div>
    )
}

export default App;
