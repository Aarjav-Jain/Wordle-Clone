import React from "react";

const Cell = (props) => {
  const { value } = props;
  const { color, bgColor, borderColor, id, text } = value;

  const customStyle = {
    color: color,
    backgroundColor: bgColor,
    borderColor: borderColor,
  };

  return <div style={customStyle}>{text}</div>;
};

export default Cell;
