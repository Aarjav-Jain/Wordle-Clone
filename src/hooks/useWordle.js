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
        setBoard((prevState) => {
          const newBoard = prevState;
          const row = newBoard[guessNo];
          row.map((cell) => {
            cell.color = "white";
            cell.borderColor = "#6aaa64";
            cell.bgColor = "#6aaa64";
          });
          return newBoard;
        });
        setCorrect(true);
        setGameOver(true);
        return;
      } else {
        let solution = [...randomWord];
        const row = board[guessNo];

        // to collect all indices of correct positions
        let correctPositions = [];

        //case2:
        // we simultaneouly set solution[index] to a random char so that it is not used multiple times for comparision
        row.map((cell, index) => {
          if (
            cell.text.toUpperCase() === solution[index].toUpperCase() &&
            !cell.isChecked
          ) {
            solution[index] = "*";
            correctPositions.push(index);
            cell.isChecked = true;
          }
        });

        // now set all the stored indices in correctPositions array to green
        // NOTE:- a) we never set a value(useState hook) inside a loop
        // b) also always create a new array/object to modify and set the values
        setBoard((prevState) => {
          // new array created to set the values
          const newBoard = prevState;
          const row = newBoard[guessNo];

          correctPositions.map((value) => {
            const cell = row[value];
            cell.color = "white";
            cell.borderColor = "#6aaa64";
            cell.bgColor = "#6aaa64";
            cell.isChecked = true;
          });
          return newBoard;
        });

        // case3:
        let yellowPositions = [];
        row.map((cell, index) => {
          if (cell.bgColor !== "#6aaa64" && !cell.isChecked) {
            const pos = solution.indexOf(cell.text);

            if (pos !== -1) {
              solution[pos] = "*";
              yellowPositions.push(index);
              cell.isChecked = true;
            }
          }
        });

        setBoard((prevState) => {
          const newBoard = prevState;
          const row = newBoard[guessNo];

          yellowPositions.map((val) => {
            const cell = row[val];
            cell.color = "white";
            cell.borderColor = "#c9b458";
            cell.bgColor = "#c9b458";
            cell.isChecked = true;
          });
          return newBoard;
        });

        // case 4:
        setBoard((prevState) => {
          const newBoard = prevState;
          const row = newBoard[guessNo];
          row.map((cell, index) => {
            if (
              cell.bgColor !== "#c9b458" &&
              cell.bgColor !== "#6aaa64" &&
              !cell.isChecked
            ) {
              cell.color = "white";
              cell.borderColor = "#878a8c";
              cell.bgColor = "#787c7e";
            }
          });

          return newBoard;
        });
      }

      //Increase guess count
      setGuessNo((prevNo) => prevNo + 1);

      // Reset to default
      setNoOfLetters(0);
      setWord("");
    }
  };

  const handleKey = ({ key }) => {
    if (!isGameOver && !isCorrect) {
      const s = key;
      if (noOfLetters === 0 && guessNo === 6) {
        setGameOver(true);
        return;
      }
      if (noOfLetters < 5 && /^[A-Za-z]$/.test(s)) {
        setWord((prevState) => prevState + s);
        setBoard((prevState) => {
          const newBoard = prevState;
          const row = newBoard[guessNo];
          const [cell] = row.filter((data) => data.id === noOfLetters);
          cell.color = "black";
          cell.borderColor = "black";
          cell.text = s;
          return board;
        });
        setNoOfLetters((prevState) => prevState + 1);
        return;
      } else if (noOfLetters !== 0 && s === "Backspace") {
        setWord((prevState) => prevState.substring(0, prevState.length - 1));
        setBoard((prevState) => {
          const newBoard = prevState;
          const row = newBoard[guessNo];
          const [cell] = row.filter((data) => data.id === noOfLetters - 1);
          cell.color = "black";
          cell.borderColor = "#bbb";
          cell.text = "";
          return board;
        });
        setNoOfLetters((prevState) => prevState - 1);
        return;
      } else if (noOfLetters === 5 && s === "Enter") {
        setCorrect(check);
        return;
      }
    }
  };

  // Initialize a new array for storing and formating guesses
  useEffect(() => {
    let board = [];
    for (let i = 0; i < 6; ++i) board.push([]);
    for (let i = 0; i < 6; ++i) {
      for (let j = 0; j < 5; ++j)
        board[i].push({
          id: j,
          color: "black",
          text: "",
          bgColor: "white",
          borderColor: "#bbb",
          // isChecked is used to handle corner cases in which there are one than one same letter by marking if it state has been decide or not to avoid overwritting

          //e.g. randomWord : CODEC
          //           guess: CACHE
          // Now here if do not use an extra variable like isChecked to not allow comparision to cells which are already set.
          //PROBLEM:

          isChecked: false,
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
