"use client";

import "../../globals.css";
import { ReactElement } from "react";
import { useState, useEffect, useRef } from "react";
import { FilmObject } from "../../types";
import HighScore from "../HighScore/HighScore";
import CurrentScore from "../CurrentScore/CurrentScore";
import Film from "../Film/Film";
import FilmLoadingScreen from "../FilmLoadingScreen/FilmLoadingScreen";

type ScoreObject = {
  currentScore: number,
  highScore: number,
}

async function getFilmPairArray(numberOfPairs: number) {
  const filmPairArray = await fetch(`/api/filmPairs?numberOfPairs=${numberOfPairs}`);
  return await filmPairArray.json();
} 

function Game(): ReactElement {
  const [scoreObject, setScoreObject] = useState<ScoreObject>({ currentScore: 0, highScore: 0 });
  const [currentFilmPair, setCurrentFilmPair] = useState<FilmObject[]>([]);
  // NOTE: giving animations ability to be disabled helps satisfy WCAG Level A
  const [areLoadingAnimationsEnabled, setAreLoadingAnimationsEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // NOTE: popping new film pair of this each time instead of saving all loaded film pairs 
  // in state, so that high-complexity copying of many film pairs needs not be done each 
  // time state is updated
  const filmPairArray = useRef([]);

  useEffect(loadScoreObject, []);

  useEffect(() => {
    storeInSession("scoreObject", scoreObject);
  }, [scoreObject]);

  useEffect(() => {
    initialiseFilmPairs();
  }, []);
  
  useEffect(() => {
    if (currentFilmPair.length === 2) {
      storeInSession("currentFilmPair", currentFilmPair);
    }
  }, [currentFilmPair]);

  function getNewHighScore(newCurrentScore: number, prevHighScore: number): number {
    return Math.max(newCurrentScore, prevHighScore);
  }
  function getNewCurrentScore(selectionWasCorrect: boolean, prevCurrentScore: number): number {
    return (selectionWasCorrect) ? prevCurrentScore + 1 : 0;
  }

  function getUpdatedScoreObject(
    selectionWasCorrect: boolean,
    prevCurrentScore: number,
    prevHighScore: number,
  ): ScoreObject {
    const newCurrentScore = getNewCurrentScore(selectionWasCorrect, prevCurrentScore);
    const newHighScore = getNewHighScore(newCurrentScore, prevHighScore);
    return { currentScore: newCurrentScore, highScore: newHighScore };
  }

  function updateScoreObject(selectionWasCorrect: boolean): void {
    setScoreObject(
      ({currentScore, highScore}) =>
        getUpdatedScoreObject(selectionWasCorrect, currentScore, highScore)
    );
  }
  async function loadFilmPairArray(): Promise<void> {
    const newFilmPairArray = await getFilmPairArray(100);
    filmPairArray.current = newFilmPairArray;
  }
  function getNextFilmPair(): FilmObject[] {
    return filmPairArray.current.pop();
  }

  async function changeFilms(): Promise<void> {
    const newCurrentFilmPair = getNextFilmPair();
    setCurrentFilmPair(newCurrentFilmPair);
    if (filmPairArray.current.length !== 0) {
      return;
    }
    setIsLoading(true);
    await loadFilmPairArray();
    setIsLoading(false);
  }
  function updateScore(selectedFilmObject: FilmObject, otherFilmObject: FilmObject): void {
    const selectionWasCorrect = (
      selectedFilmObject.averageRatingString > otherFilmObject.averageRatingString
    );
    updateScoreObject(selectionWasCorrect);
  }

  async function endRound(
    selectedFilmObject: FilmObject, otherFilmObject: FilmObject
  ): Promise<void> {
    updateScore(selectedFilmObject, otherFilmObject);
    changeFilms();
  }
  function getOtherFilmObject(selectedFilmObject: FilmObject): FilmObject {
    return (selectedFilmObject === currentFilmPair[0]) ?
      currentFilmPair[1] : currentFilmPair[0];
  }
  function getFromSessionStorage(key: string): ScoreObject | FilmObject[] {
    return JSON.parse(sessionStorage.getItem(key));
  }

  function selectFilm(selectedFilmObject: FilmObject): void {
    const otherFilmObject = getOtherFilmObject(selectedFilmObject);
    endRound(selectedFilmObject, otherFilmObject);
  }
  async function loadInitialCurrentFilmPair(): Promise<void> {
    const sessionCurrentFilmPair = getFromSessionStorage("currentFilmPair");
    (sessionCurrentFilmPair !== null) ?
      setCurrentFilmPair(sessionCurrentFilmPair as FilmObject[]) : await changeFilms();
  }
  async function initialiseFilmPairs(): Promise<void> {
    await loadFilmPairArray();
    await loadInitialCurrentFilmPair();
    setIsLoading(false);
  }
  function storeInSession(key: string, value): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
  function loadScoreObject(): void {
    const sessionScoreObject = getFromSessionStorage("scoreObject");
    sessionScoreObject !== null && setScoreObject(sessionScoreObject as ScoreObject);
  }

  return (
    <div className="Game">

      <header aria-label="Instruction and scores">

        {/* NOTE: ID used to create accessible label */}
        <h1 id="instruction">
          Guess the Film with the Higher Letterboxd Rating...
        </h1>

        <div aria-label="Scores">
          <CurrentScore score={scoreObject.currentScore} />
          <HighScore score={scoreObject.highScore} />
        </div>

      </header>

      <main
        aria-labelledby="instruction"
        aria-busy={isLoading}
      >

        {!isLoading
        ?
          (<div className="FilmGrid">

            <Film
              filmObject={currentFilmPair[0]}
              onFilmClick={selectFilm}
              showAverageRating={true}
            />

            <Film
              filmObject={currentFilmPair[1]}
              onFilmClick={selectFilm}
              showAverageRating={false}
            />

          </div>)
        :
          <FilmLoadingScreen
            areLoadingAnimationsEnabled={areLoadingAnimationsEnabled}
            setAreLoadingAnimationsEnabled={setAreLoadingAnimationsEnabled}
          />
        }
        
      </main>

    </div>
  );
}

export default Game;
