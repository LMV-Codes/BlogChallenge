import * as React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { NotFound } from "./components/notfound/NotFound";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { PostDetail } from "./pages/PostDetail";

export const App = () => {
  const [userData, setUserData] = React.useState<string | null>("");
  React.useEffect(() => {
    setUserData(localStorage.getItem("token"));
  }, []);
  return (
    <Router>
      <Navbar userData={userData} setUserData={setUserData} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/login"
          render={(props) => <Login setUserData={setUserData} />}
        />
        <Route exact path="/post/:id" component={PostDetail} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};
