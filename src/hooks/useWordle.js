import { useState, useEffect } from "react";

// DO NOT DELETE THE COMMENTS AS THEY ARE FOR UNDERSTADING LOGIC

const useWordle = (randomWord, allWords) => {
  const [word, setWord] = useState("");
  const [guessNo, setGuessNo] = useState(0);
  const [noOfLetters, setNoOfLetters] = useState(0);
  const [isCorrect, setCorrect] = useState(false);
  const [isGameOver, setGameOver] = useState(false);
  const [board, setBoard] = useState([]);

  const check = () => {
    // Check if valid word exists
    let isExist = allWords.find(
      (data) => data.toUpperCase() === word.toUpperCase()
    );

    const newBoard = [...board];
    const row = newBoard[guessNo];
    const solution = [...randomWord];
    let correct = false;

    // if valid word does not exists
    if (!isExist) {
      console.log("word does not exists TRY AGAIN");
      return;
    }

    //======================LOGIC:=================================
    // if valid word exists then check for :-
    // case1: check if the guess and solution are equal if so then turn letters to green  /and return also set gameOver and isCorrect to true
    // case2: turn all letters which are correct positions to green
    // case3: turn all letter which are present but not in correct position to yellow
    // case4: turn all letters which are not present to grey
    // after that :-
    // 1) increase the guessNo by 1 to input element to the next row
    // 2) set word and noOfLetters to thier default values
    else {
      // case1:
      if (word.toUpperCase() === randomWord.toUpperCase()) {
        row.map((cell) => {
          cell.borderColor = "#6aaa64";
          cell.bgColor = "#6aaa64";
        });
        correct = true;
      } else {
        //case2: TURN GREEN
        // we simultaneouly set solution[index] to a random char so that it is not used multiple times for comparision

        row.map((cell, index) => {
          if (cell.text.toUpperCase() === solution[index].toUpperCase()) {
            solution[index] = "*";
            cell.borderColor = "#6aaa64";
            cell.bgColor = "#6aaa64";
          }
        });

        // now set all the stored indices in correctPositions array to green

        // case3: TURN YELLOW
        row.map((cell, index) => {
          if (cell.bgColor !== "#6aaa64") {
            const pos = solution.indexOf(cell.text);
            if (pos !== -1) {
              solution[pos] = "*";
              cell.borderColor = "#c9b458";
              cell.bgColor = "#c9b458";
            }
          }
        });

        // case 4: TURN GREY
        row.map((cell, index) => {
          if (cell.bgColor !== "#c9b458" && cell.bgColor !== "#6aaa64") {
            cell.borderColor = "#787c7e";
            cell.bgColor = "#787c7e";
          }
        });
      }
    }
    // NOTE:- a) we never set a value(useState hook) inside a loop
    // b) also always create a new array/object to modify and set the values
    // so here i have created a copy of board named as newBoard and after doing all changes I will setBoard as newBoard;
    setBoard(newBoard);
    //Increase guess count
    setGuessNo((prevNo) => prevNo + 1);
    // Reset to default
    setNoOfLetters(0);
    setWord("");
    if (correct) {
      setCorrect(true);
      setGameOver(true);
    }
  };

  const handleKey = ({ key }) => {
    const newBoard = [...board];
    const row = newBoard[guessNo];
    if (!isGameOver && !isCorrect) {
      const s = key;
      if (noOfLetters === 0 && guessNo === 6) {
        setGameOver(true);
        return;
      }
      if (noOfLetters < 5 && /^[A-Za-z]$/.test(s)) {
        setWord((prevState) => prevState + s);
        const cell = row[noOfLetters];
        cell.borderColor = "hsl(200, 1%, 34%)";
        cell.text = s;
        setNoOfLetters((prevState) => prevState + 1);
      } else if (noOfLetters !== 0 && s === "Backspace") {
        setWord((prevState) => prevState.substring(0, prevState.length - 1));
        const cell = row[noOfLetters - 1];
        cell.borderColor = "hsl(240, 2%, 23%)";
        cell.text = "";
        setNoOfLetters((prevState) => prevState - 1);
      } else if (noOfLetters === 5 && s === "Enter") {
        setCorrect(check);
        return;
      }
    }
    setBoard(newBoard);
  };

  // Initialize a new array for storing and formating guesses
  useEffect(() => {
    let board = [];
    for (let i = 0; i < 6; ++i) board.push([]);
    for (let i = 0; i < 6; ++i) {
      for (let j = 0; j < 5; ++j)
        board[i].push({
          id: j,
          text: "",
          bgColor: "black",
          borderColor: "hsl(240, 2%, 23%)",
        });
    }
    setBoard(board);
  }, []);

  useEffect(() => {
    window.addEventListener("keyup", handleKey);
    return () => window.removeEventListener("keyup", handleKey);
  }, [handleKey]);

  return { word, isCorrect, guessNo, isGameOver, board };
};

export default useWordle;
