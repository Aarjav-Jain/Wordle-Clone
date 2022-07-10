import React from "react";

const Cell = (props) => {
  const { value } = props;
  const { bgColor, borderColor, text } = value;

  const customStyle = {
    backgroundColor: bgColor,
    borderColor: borderColor,
  };

  return <div style={customStyle}>{text}</div>;
};

export default Cell;
