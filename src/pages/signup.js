import React, { Component } from "react";
import {
  TextField,
  Typography,
  Card,
  CardContent,
  Button
} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import logo from "../images/logo.png";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

// Redux
import { connect } from "react-redux";
import { signUpUser, logOutUser } from "../redux/actions/userActions";

// MUI
import Grid from "@material-ui/core/Grid";

const styles = {
  form: {
    padding: 20,
    textAlign: "center"
  },
  textfield: {
    marginTop: 20
  },
  button: {
    marginTop: 18,
    position: "relative"
  },
  logincard: {
    marginTop: 40,
    padding: 20
  },
  customerror: {
    marginTop: 20,
    color: "red"
  },
  clicktosignup: {
    marginTop: 40
  },
  progress: {
    position: "absolute"
  },
  loginHeading: {
    fontSize: 55,
    letterSpacing: 0,
    marginTop: 20
  }
};

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",
      loading: false,
      errors: {},
      snackBarOpen: false
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.ui.errors) {
      this.setState({ errors: newProps.ui.errors });
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    };
    this.props.signUpUser(newUserData, this.props.history);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const {
      classes,
      ui: { loading }
    } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <Card className={classes.logincard}>
            <CardContent>
              <Typography className={classes.loginHeading} variant="h1">
                Signup
              </Typography>
            </CardContent>
            <CardContent>
              <form noValidate onSubmit={this.handleSubmit}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  helperText={errors.email}
                  error={errors.email ? true : false}
                  variant="outlined"
                  className={classes.textfield}
                  fullWidth
                  onChange={this.handleChange}
                  value={this.state.email}
                />
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  helperText={errors.password}
                  error={errors.password ? true : false}
                  variant="outlined"
                  className={classes.textfield}
                  fullWidth
                  onChange={this.handleChange}
                  value={this.state.password}
                />
                <TextField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  helperText={errors.confirmPassword}
                  error={errors.confirmPassword ? true : false}
                  variant="outlined"
                  className={classes.textfield}
                  fullWidth
                  onChange={this.handleChange}
                  value={this.state.confirmPassword}
                />
                <TextField
                  label="Handle"
                  name="handle"
                  type="text"
                  helperText={errors.handle}
                  error={errors.handle ? true : false}
                  variant="outlined"
                  className={classes.textfield}
                  fullWidth
                  onChange={this.handleChange}
                  value={this.state.handle}
                />
                {errors.general && (
                  // <CardContent>
                  <Typography className={classes.customerror} variant="body1">
                    {errors.general}
                  </Typography>
                  // </CardContent>
                )}
                <Button
                  type="submit"
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  disable={`${loading}`}
                >
                  Signup
                  {loading && (
                    <CircularProgress className={classes.progress} size={25} />
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          <Typography className={classes.clicktosignup} variant="h6">
            Already have an account yet? Click{" "}
            <a href="/login">
              <span style={{ color: "#4271ff" }}>here</span>
            </a>{" "}
            to log in!
          </Typography>
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  signUpUser: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  ui: state.ui
});

const mapActionsToProps = {
  signUpUser,
  logOutUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(signup));
