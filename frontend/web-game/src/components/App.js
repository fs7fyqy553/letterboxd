import "../styles/App.css";
import Game from "./Game";
import invertocat from "../logos/github-mark-white.svg";

function App() {
    return (
        <div className="App">
            <Game/>
            {/* <div className="Footer">Made by James Graça-Jones</div> */}
            <div className="Footer">
                {/* <a href="https://github.com/JamesGJ5/letterxbod-higher-or-lower">Code</a> */}
                <a href="https://github.com/JamesGJ5/letterxbod-higher-or-lower">
                    <img src={invertocat}/>
                </a>
            </div>
        </div>
    )
}

export default App;
