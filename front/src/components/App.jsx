import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Dashboard from "components/Dashboard";
import Index from "components/Index";
import Detail from "components/Detail";
import Results from "components/Results";
import React from "react";

const App = () => (
  <Router>
    <Route exact path="/" component={Dashboard} />
      <Route path="/index" component={Index} />
      <Route path="/detail" component={Detail} />
      <Route path="/results" component={Results} />
  </Router>
);

export default App;
