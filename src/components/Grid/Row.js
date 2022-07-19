import React from "react";
import Cell from "./Cell";

const Row = ({ value }) => {
  return (
    <div className="row">
      {value.map((cell, index) => (
        <Cell key={index} value={cell} />
      ))}
    </div>
  );
};

export default Row;
