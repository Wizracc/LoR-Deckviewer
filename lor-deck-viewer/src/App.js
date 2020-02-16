import React from "react";
import Decklist from "./components/Decklist";
import { Route, Switch } from "react-router-dom";
import Homepage from "./components/Homepage";
//import "./styles/App.css";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route path="/:code" component={Decklist} />
    </Switch>
  );
}

export default App;
