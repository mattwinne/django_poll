import { CssBaseline } from "@mui/material";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Create from "components/Create";
import CreateChoices from "components/CreateChoices";
import Detail from "components/Detail";
import Header from "components/Header";
import Index from "components/Index";
import Login from "components/Login";
import NotFound from "components/NotFound";
import Profile from "components/Profile";
import React from "react";
import Register from "components/Register";
import Results from "components/Results";
import { ProvideAuth } from "../use-auth";

import theme from "../styles";

function App() {
  return (
    <ProvideAuth>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=.75, user-scalable=0, maximum-scale=.75, minimum-scale=.75"
          />
          <div
            style={{
              position: "absolute",
              backgroundColor: theme.palette.bg.main,
              top: "0px",
              bottom: "0px",
              width: "100%",
            }}
          >
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
          </div>
        </Router>
      </ThemeProvider>
    </ProvideAuth>
  );
}

export default App;
