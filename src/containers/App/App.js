import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import StartPage from "../routes/StartPage/StartPage";
import GamePage from "../routes/GamePage/GamePage";
import Emoji from "../../components/Emoji";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <h1>
        <Emoji type="collision" />
      </h1>

      <Switch>
        <Redirect from="/" to="/start" exact />
        <Route path="/start" component={StartPage} />
        <Route path="/game" component={GamePage} />
        <Route path="*" render={() => <h1>Not Found Page</h1>} />
      </Switch>
    </div>
  );
};

export default App;
