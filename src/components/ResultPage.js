import React from "react";
import Button from "./Button";

const ResultPage = ({ total, each, onClac }) => {
  return (
    <React.Fragment>
      <div className="result_page">
        <h1>Result</h1>
        <p>Total Time: {total}</p>
        <p>Time for each: {each}</p>
        <Button onClick={onClac}>Calculate again</Button>
      </div>
    </React.Fragment>
  );
};

export default ResultPage;
