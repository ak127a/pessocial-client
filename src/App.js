import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

// REDUX Stuff
import { closeSignUpSuccess } from "./redux/actions/uiActions";
import { logOutUser } from "./redux/actions/userActions";
import { connect } from "react-redux";
import "./App.css";
import jwtDecode from "jwt-decode";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import AuthRoute from "./util/AuthRoute";
//Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";

const theme = createMuiTheme({
  palette: {
    common: { black: "#000", white: "#fff" },
    background: { paper: "#fff", default: "#fafafa" },
    primary: {
      light: "rgba(118, 197, 246, 1)",
      main: "rgba(42, 143, 255, 1)",
      dark: "#303f9f",
      contrastText: "#fff"
    },
    secondary: {
      light: "rgba(248, 219, 250, 1)",
      main: "rgba(255, 142, 221, 1)",
      dark: "rgba(230, 143, 255, 1)",
      contrastText: "#fff"
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff"
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)"
    }
  }
});

class App extends React.Component {
  Alert = props => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  handleSignUpSuccessClose = () => {
    this.props.closeSignUpSuccess();
  };

  render() {
    const token = localStorage.FBIdToken;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        window.location.href = "/login";
        this.props.logOutUser();
      }
    }

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Snackbar
          open={this.props.ui.showSignUpSuccess}
          autoHideDuration={6000}
          onClose={this.handleSignUpSuccessClose}
        >
          <this.Alert onClose={this.handleClose} severity="success">
            Succesfully signed up. You are now logged in!
          </this.Alert>
        </Snackbar>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <AuthRoute
                exact
                path="/login"
                component={login}
                authenticated={this.props.user.authenticated}
              />
              <AuthRoute
                exact
                path="/signup"
                component={signup}
                authenticated={this.props.user.authenticated}
              />
            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  ui: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  ui: state.ui,
  user: state.user
});

const mapActionsToProps = {
  closeSignUpSuccess,
  logOutUser
};

export default connect(mapStateToProps, mapActionsToProps)(App);
