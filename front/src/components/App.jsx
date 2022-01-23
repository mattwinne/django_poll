import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Detail from "components/Detail";
import Index from "components/Index";
import NotFound from "components/NotFound";
import React from "react";
import Results from "components/Results";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Index} />
      <Route path="/index" component={Index} />
      <Route path="/detail" component={Detail} />
      <Route path="/results" component={Results} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default App;
