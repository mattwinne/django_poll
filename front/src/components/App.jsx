import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Create from "components/Create";
import CreateChoices from "components/CreateChoices";
import Detail from "components/Detail";
import Footer from "components/Footer";
import Header from "components/Header";
import Index from "components/Index";
import Login from "components/Login";
import Logout from "components/Logout";
import NotFound from "components/NotFound";
import Profile from "components/Profile";
import React from "react";
import Register from "components/Register";
import Results from "components/Results";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <hr />
        <Switch>
          <Route exact path="/" component={Index} />
          <Route path="/index" component={Index} />
          <Route path="/create" component={Create} />
          <Route path="/createchoices" component={CreateChoices} />
          <Route path="/detail" component={Detail} />
          <Route path="/results" component={Results} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/profile" component={Profile} />
          <Route component={NotFound} />
        </Switch>
        <br />
        <hr />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
