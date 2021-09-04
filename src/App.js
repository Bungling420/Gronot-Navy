import React, { useState } from "react";
import "./App.css";
import GronotForm from "./components/GronotForm";
import ResultPage from "./components/ResultPage";
import Layout from "./components/Layout";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

function App() {
  const [showCopyText, setShowCopyText] = useState(false);
  const history = useHistory();
  const formSubmitionHandler = (total, each, copyText) => {
    if (copyText !== "") {
      setShowCopyText(true);
    }

    history.push(
      `/result-page?total=${total}&each=${each}${
        copyText !== "" ? "&copyText=" + copyText : ""
      }`
    );
  };

  return (
    <Layout>
      <p>Seems like it’s your time to guard the ship...</p>
      <Switch>
        <Route path="/calculate">
          <GronotForm onFormSubmition={formSubmitionHandler} />
        </Route>
        <Route path={`/result-page`}>
          <ResultPage showCopyText={showCopyText} />
        </Route>
        <Route path="*">
          <Redirect to="/calculate" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
