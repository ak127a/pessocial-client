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
import CircularProgress from "@material-ui/core/CircularProgress";

//Redux
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

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

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.ui.errors) {
      this.setState({ errors: newProps.ui.errors });
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
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
                Login
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
                  Login
                  {loading && (
                    <CircularProgress className={classes.progress} size={25} />
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          <Typography className={classes.clicktosignup} variant="h6">
            Don't have an account? Click{" "}
            <a href="/signup">
              <span style={{ color: "#4271ff" }}>here</span>
            </a>{" "}
            to sign up!
          </Typography>
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  ui: state.ui
});

const mapActionsToProps = {
  loginUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(login));
