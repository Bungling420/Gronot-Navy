import React, { useRef, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import Button from "./Button";
import { isTime, isString } from "../util/validationFunctions";

const ResultPage = ({ showCopyText }) => {
  const textareaRef = useRef();
  const location = useLocation();
  const history = useHistory();

  const [total, setTotal] = useState("");
  const [each, setEach] = useState("");
  const [copyText, setCopyText] = useState("");

  const [totalExists, setTotalExists] = useState(true);
  const [eachExists, setEachExists] = useState(true);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    if (urlSearchParams.has("total")) {
      const totalParam = urlSearchParams.get("total");
      console.log(!isTime(totalParam));
      isTime(totalParam) ? history.replace("/calculate") : setTotal(totalParam);
    } else {
      setTotalExists(false);
    }
    if (urlSearchParams.has("each")) {
      const eachParam = urlSearchParams.get("each");
      isTime(eachParam) ? history.replace("/calculate") : setEach(eachParam);
    } else {
      setEachExists(false);
    }
    if (urlSearchParams.has("copyText")) {
      const copyTextParam = urlSearchParams.get("copyText");
      !isString(copyTextParam)
        ? history.replace("/calculate")
        : setCopyText(copyTextParam);
    }
  }, [location, history]);

  useEffect(() => {
    if (!totalExists || !eachExists) {
      history.replace("/calculate");
    }
  }, [totalExists, eachExists, history]);
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
        <Link to={"/calculate"}>Calculate again</Link>
      </div>
    </React.Fragment>
  );
};

export default ResultPage;
