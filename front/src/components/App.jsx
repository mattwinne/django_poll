import { CssBaseline } from "@mui/material";
import { ProvideAuth } from "../use-auth";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Create from "components/Create";
import CreateChoices from "components/CreateChoices";
import Detail from "components/Detail";
import Header from "components/Header";
import Index from "components/Index";
import Layout from "../layout";
import Login from "components/Login";
import NotFound from "components/NotFound";
import Profile from "components/Profile";
import React from "react";
import Register from "components/Register";
import Results from "components/Results";
import { CustomThemeProvider } from "../ThemeContext";

function App() {
  return (
    <ProvideAuth>
      <CustomThemeProvider>
        <CssBaseline />
        <Router>
          <Layout />
          <Header />

          <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/index" component={Index} />
            <Route path="/index" component={Index} />
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
