import React, { Component } from "react";
import logoonly from "../../images/logoonly.png";
import textonly from "../../images/textonly.png";
import PropTypes from "prop-types";
import AddScream from "../scream/AddScream";

// MUI stuff
import AppBar from "@material-ui/core/AppBar";
import Tooltip from "@material-ui/core/Tooltip";
import withStyles from "@material-ui/core/styles/withStyles";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import NotificationsIcon from "@material-ui/icons/Notifications";

import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

// REDUX
import { connect } from "react-redux";

const styles = {
  navbarbuttons: { position: "absolute", right: "30px" },
  centredButtons: {
    width: "150px",
    position: "absolute",
    marginLeft: "-75px",
    left: "50%"
  }
};

class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    const { classes } = this.props;
    return (
      <AppBar>
        <Toolbar>
          <img src={logoonly} alt="logo" id="navbar-logo" />
          <img src={textonly} alt="logo" id="navbar-logo-text" />
          {authenticated && (
            <React.Fragment>
              <div className={classes.centredButtons}>
                <AddScream />
                <Tooltip placement="bottom" title="Home">
                  <IconButton component={Link} to="/">
                    <HomeIcon style={{ color: "#fff" }} />
                  </IconButton>
                </Tooltip>
                <Tooltip placement="bottom" title="Notifications">
                  <IconButton>
                    <NotificationsIcon style={{ color: "#fff" }} />
                  </IconButton>
                </Tooltip>
              </div>
              <div className={classes.navbarbuttons}>
                <Button startIcon={<ExitToAppIcon />} color="inherit">
                  Logout
                </Button>
              </div>
            </React.Fragment>
          )}
          <div className={classes.navbarbuttons}>
            {!authenticated && (
              <React.Fragment>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/">
                  Home
                </Button>
                <Button color="inherit" component={Link} to="/signup">
                  SignUp
                </Button>
              </React.Fragment>
            )}
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps, null)(withStyles(styles)(Navbar));
