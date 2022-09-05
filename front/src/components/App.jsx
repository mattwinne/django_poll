import { CssBaseline } from "@mui/material";
import { CustomThemeProvider } from "../ThemeContext";
import { ProvideAuth } from "../use-auth";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Create from "components/Create";
import CreateChoices from "components/CreateChoices";
import Detail from "components/Detail";
import Header from "components/Header";
import Layout from "../layout";
import Login from "components/Login";
import NotFound from "components/NotFound";
import Polls from "components/Polls";
import Profile from "components/Profile";
import React from "react";
import Register from "components/Register";
import Results from "components/Results";

function App() {
  return (
    <ProvideAuth>
      <CustomThemeProvider>
        <CssBaseline />
        <Layout />
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Polls} />
            <Route exact path="/polls" component={Polls} />
            <Route path="/polls" component={Polls} />
            <Route path="/create" component={Create} />
            <Route path="/createchoices" component={CreateChoices} />
            <Route path="/detail" component={Detail} />
            <Route path="/results" component={Results} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/profile" component={Profile} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </CustomThemeProvider>
    </ProvideAuth>
  );
}

export default App;
