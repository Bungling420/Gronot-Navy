import React, { useRef } from "react";
import Button from "./Button";

const ResultPage = ({ total, each, onClac, copyText, showCopyText }) => {
  const textareaRef = useRef();
  const copyTextHandler = () => {
    textareaRef.current.select();
    document.execCommand("copy");
  };
  return (
    <React.Fragment>
      <div className="result_page">
        <h1>Result</h1>
        <p>Total Time: {total}</p>
        <p>Time for each: {each}</p>
        {showCopyText && (
          <React.Fragment>
            <textarea readOnly ref={textareaRef} value={copyText}></textarea>
            <Button onClick={copyTextHandler}>Copy The text</Button>
          </React.Fragment>
        )}
        <Button onClick={onClac}>Calculate again</Button>
      </div>
    </React.Fragment>
  );
};

export default ResultPage;
