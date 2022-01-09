import { Route, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "components/Dashboard";
import Detail from "components/Detail";
import Index from "components/Index";
import React from "react";
import Results from "components/Results";

const App = () => (
  <Router>
    <Route exact path="/" component={Index} />
    <Route path="/index" component={Index} />
    <Route path="/detail" component={Detail} />
    <Route path="/results" component={Results} />
  </Router>
);

export default App;
