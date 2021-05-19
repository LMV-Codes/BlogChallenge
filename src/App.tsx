import * as React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { NotFound } from "./components/notfound/NotFound";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { PostDetail } from "./pages/PostDetail";

export const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/post/:id" component={PostDetail} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};
