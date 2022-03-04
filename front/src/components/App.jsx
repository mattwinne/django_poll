import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Detail from "components/Detail";
import Index from "components/Index";
import Login from "components/Login";
import Logout from "components/Logout";
import NotFound from "components/NotFound";
import React from "react";
import Register from "components/Register";
import Results from "components/Results";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Index} />
      <Route path="/index" component={Index} />
      <Route path="/detail" component={Detail} />
      <Route path="/results" component={Results} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default App;
