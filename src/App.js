import React, { useState } from "react";
import "./App.css";
import GronotForm from "./components/GronotForm";
import ResultPage from "./components/ResultPage";
import Layout from "./components/Layout";

function App() {
  const [showForm, setShowForm] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [totalTime, setTotalTime] = useState("");
  const [timeForEach, setTimeForEach] = useState("");
  const formSubmitionHandler = (total, each) => {
    setShowForm(false);
    setTotalTime(total);
    setTimeForEach(each);
    setShowResult(true);
  };

  const calcHandler = () => {
    setShowResult(false);
    setShowForm(true);
  };

  return (
    <Layout>
      <p>Seems like it’s your time to guard the ship...</p>
      {showForm && <GronotForm onFormSubmition={formSubmitionHandler} />}
      {showResult && (
        <ResultPage total={totalTime} each={timeForEach} onClac={calcHandler} />
      )}
    </Layout>
  );
}

export default App;
