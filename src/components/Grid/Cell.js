import React from "react";

const Cell = ({ value }) => {
  const { text, class_name } = value;
  return <div className={class_name}>{text}</div>;
};

export default Cell;
