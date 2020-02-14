import React from "react";
import Decklist from "./components/Decklist";
import { Route, Switch } from "react-router-dom";
import Homepage from "./components/Homepage";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route path="/:code" component={Decklist} />
    </Switch>
  );
}

export default App;
