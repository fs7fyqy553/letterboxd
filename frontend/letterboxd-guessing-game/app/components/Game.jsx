"use client";

import "../styles/Game.css";
import { useState, useEffect, useRef } from "react";
import HighScore from "./HighScore";
import CurrentScore from "./CurrentScore";
import FilmDetails from "./FilmDetails";

function Game({ filmPairArray }) {
  const [scoreObject, setScoreObject] = useState({ currentScore: 0, highScore: 0 });
  const [filmObjectArray, setFilmObjectArray] = useState([]);

  const filmPairs = useRef([...filmPairArray]);

  useEffect(loadScoreObject, []);
  useEffect(() => {
    storeInSession("scoreObject", scoreObject);
  }, [scoreObject]);

  useEffect(loadFilmObjectArray, []);
  useEffect(() => {
    storeInSession("filmObjectArray", filmObjectArray);
  }, [filmObjectArray]);

  function getNewHighScore(newCurrentScore, prevHighScore) {
    return Math.max(newCurrentScore, prevHighScore);
  }
  function getNewCurrentScore(selectionWasCorrect, prevCurrentScore) {
    return (selectionWasCorrect) ? prevCurrentScore + 1 : 0;
  }

  function getUpdatedScoreObject(selectionWasCorrect, prevCurrentScore, prevHighScore) {
    const newCurrentScore = getNewCurrentScore(selectionWasCorrect, prevCurrentScore);
    const newHighScore = getNewHighScore(newCurrentScore, prevHighScore);
    return { currentScore: newCurrentScore, highScore: newHighScore };
  }

  function updateScoreObject(selectionWasCorrect) {
    setScoreObject(({currentScore, highScore}) => getUpdatedScoreObject(selectionWasCorrect, currentScore, highScore));
  }
  function reloadPage() {
    // NOTE: doing this so that server can fetch new data from Letterboxd Guessing Game API.
    // Not using routes to do this, since it is desired for access to the API to be 
    // completely limited to this app and routes are public in deployment.
    // TODO: replace with NextJS router
    window.location.reload();
  }
  function getNextFilmPair() {
    return filmPairs.current.pop();
  }

  function changeFilms() {
    const newFilmObjectArray = getNextFilmPair();
    setFilmObjectArray(newFilmObjectArray);
    if (filmPairs.current.length === 0) {
      reloadPage();
    }
  }
  function updateScore(selectedFilmObject, otherFilmObject) {
    const selectionWasCorrect = selectedFilmObject.averageRatingString > otherFilmObject.averageRatingString;
    updateScoreObject(selectionWasCorrect);
  }

  async function endRound(selectedFilmObject, otherFilmObject) {
    updateScore(selectedFilmObject, otherFilmObject);
    changeFilms();
  }
  function getOtherFilmObject(selectedFilmObject) {
    return (selectedFilmObject === filmObjectArray[0]) ? filmObjectArray[1] : filmObjectArray[0];
  }
  function getFromSessionStorage(key) {
    return JSON.parse(sessionStorage.getItem(key));
  }

  function selectFilm(selectedFilmObject) {
    const otherFilmObject = getOtherFilmObject(selectedFilmObject);
    endRound(selectedFilmObject, otherFilmObject);
  }
  function loadFilmObjectArray() {
    const sessionStoredFilmObjectArray = getFromSessionStorage("filmObjectArray");
    if (sessionStoredFilmObjectArray !== null) {
      setFilmObjectArray(sessionStoredFilmObjectArray);
    } else {
      changeFilms();
    }
  }
  function storeInSession(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
  function loadScoreObject() {
    const sessionStoredScoreObject = getFromSessionStorage("scoreObject");
    if (sessionStoredScoreObject !== null) {
      setScoreObject(sessionStoredScoreObject);
    }
  }

  return (
    <div className="Game">
      <header aria-label="Instruction and scores">
        <h1 id="instruction">
          Click the Film with the Higher Letterboxd Rating...
        </h1>
        <div aria-label="Scores">
          <CurrentScore score={scoreObject.currentScore} />
          <HighScore score={scoreObject.highScore} />
        </div>
      </header>
      {filmObjectArray.length === 2 && (
        <main aria-labelledby="instruction">
          <FilmDetails
            filmObject={filmObjectArray[0]}
            onFilmClick={selectFilm}
            showAverageRating={true}
          />
          <FilmDetails
            filmObject={filmObjectArray[1]}
            onFilmClick={selectFilm}
            showAverageRating={false}
          />
        </main>
      )}
    </div>
  );
}

export default Game;
