import React from "react";
import Row from "./Row";

const WordleGrid = ({ board }) => {
  return (
    <div>
      {board.map((row, index) => (
        <Row key={index} value={row} />
      ))}
    </div>
  );
};

export default WordleGrid;
