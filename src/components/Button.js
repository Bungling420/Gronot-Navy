import React from "react";

const Button = (props) => {
  const { children } = props;
  return (
    <button {...props} className="btn__main">
      {children}
    </button>
  );
};

export default Button;
