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
import React from "react"
import Register from "components/Register";
import Results from "components/Results";
import { ProvideAuth, useAuth } from "../use-auth";
import { ProvidePalette, usePalette } from "../use-palette";
import theme, {resDarkTheme} from "../styles";
import darkMode from "../darkMode"
export const appTheme = localStorage.getItem("dark_mode") ? theme.dark : theme.light
function App() {

  return (
    <ProvideAuth>

      <ProvidePalette>

      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Router>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=.75, user-scalable=0, maximum-scale=.75, minimum-scale=.75"
          />
          <div
            style={{
              position: "absolute",
              backgroundColor: appTheme.palette.bg.main,
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
      </ProvidePalette>
    </ProvideAuth>
  );
}

export default App;
