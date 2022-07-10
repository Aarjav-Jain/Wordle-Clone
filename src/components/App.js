import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import WordleGrid from "./Grid/WordleGrid";
import useFetchAPI from "../hooks/useFetchAPI";
import useWordle from "../hooks/useWordle";

function App() {
  const { randomWord, allWords, error, loading } = useFetchAPI();
  const { word, isCorrect, isGameOver, board } = useWordle(
    randomWord,
    allWords
  );

  return (
    <div>
      <Heading />
      {loading && <div className="loader"></div>}
      {!loading && !error && (
        <div>
          {console.log(randomWord)}
          <WordleGrid board={board} />
        </div>
      )}
      {error && <h1>{error}</h1>}
    </div>
  );
}
export default App;
