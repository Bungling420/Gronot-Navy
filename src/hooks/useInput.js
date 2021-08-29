import { useState } from "react";

const useInput = (validationFunction) => {
  const [isTouched, setIsTouched] = useState(false);
  const [value, setValue] = useState("");

  const isValid = validationFunction(value);
  const showError = !isValid && isTouched;

  const changeHandler = (event) => {
    setValue(event.target.value);
  };

  const blurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setValue("");
    setIsTouched(false);
  };

  return {
    value,
    showError,
    isValid,
    isTouched,
    onChange: changeHandler,
    onBlur: blurHandler,
    reset,
  };
};

export default useInput;
