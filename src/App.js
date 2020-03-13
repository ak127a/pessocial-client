import React from "react";
import PropTypes from "prop-types";
import "./App.css";
import user from "./pages/user";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import themeObject from "./util/theme";

// REDUX Stuff
import {
  closeSignUpSuccess,
  closeLogInSuccess
} from "./redux/actions/uiActions";
import { logOutUser, getUserData } from "./redux/actions/userActions";
import { connect } from "react-redux";
import { SET_AUTHENTICATED } from "./redux/types";
import jwtDecode from "jwt-decode";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import Navbar from "./components/layout/Navbar";
import AuthRoute from "./util/AuthRoute";
//Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import store from "./redux/store";
import Axios from "axios";

const theme = createMuiTheme(themeObject);

Axios.defaults.baseURL =
  "https://asia-east2-pessocial-a007f.cloudfunctions.net/api";

const token = window.localStorage.getItem("FBIdToken");
console.log(token);

// IMP !!!!!!!!! the window.location.href sometimes causes the page to refresh infinitely

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logOutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    Axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

class App extends React.Component {
  Alert = props => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  handleSignUpSuccessClose = () => {
    this.props.closeSignUpSuccess();
  };

  handleLogInSuccessClose = () => {
    this.props.closeLogInSuccess();
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Snackbar
          open={this.props.ui.showSignUpSuccess}
          autoHideDuration={3000}
          onClose={this.handleSignUpSuccessClose}
        >
          <this.Alert
            onClose={this.handleSignUpSuccessClose}
            severity="success"
          >
            Succesfully signed up. You are now logged in!
          </this.Alert>
        </Snackbar>
        <Snackbar
          open={this.props.ui.showLogInSuccess}
          autoHideDuration={3000}
          onClose={this.handleLogInSuccessClose}
        >
          <this.Alert onClose={this.handleLogInSuccessClose} severity="success">
            Login Succesful
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
              <Route exact path="/users/:handle" component={user} />
              <Route
                exact
                path="/users/:handle/scream/:screamId"
                component={user}
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
  user: PropTypes.object.isRequired,
  closeSignUpSuccess: PropTypes.func.isRequired,
  closeLogInSuccess: PropTypes.func.isRequired,
  logOutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  ui: state.ui,
  user: state.user
});

const mapActionsToProps = {
  closeSignUpSuccess,
  closeLogInSuccess,
  logOutUser
};

export default connect(mapStateToProps, mapActionsToProps)(App);
