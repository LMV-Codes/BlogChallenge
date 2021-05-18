import * as React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NotFound } from "./components/notfound/NotFound";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};
