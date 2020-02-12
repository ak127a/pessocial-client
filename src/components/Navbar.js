import React, { Component } from "react";
import logoonly from "../images/logoonly.png";
import textonly from "../images/textonly.png";

// MUI stuff
import AppBar from "@material-ui/core/AppBar";
import withStyles from "@material-ui/core/styles/withStyles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const styles = {
  navbarbuttons: { margin: 0, width: "100vw", textAlign: "right" }
};

class Navbar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <AppBar>
        <Toolbar>
          <img src={logoonly} alt="logo" id="navbar-logo" />
          <img src={textonly} alt="logo" id="navbar-logo-text" />
          <div className={classes.navbarbuttons}>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              SignUp
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Navbar);
