import React from "react";

const Button = (props) => {
  const { classes, text, onClickAction = null } = props;

  return (
    <button 
      type="button" 
      className={classes}
      onClick={onClickAction}>
      {text}
    </button>
  );
};
export default Button;
