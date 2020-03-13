import React, { Component } from "react";
import PropTypes from "prop-types";
// MUI
import withStyles from "@material-ui/core/styles/withStyles";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";

import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

// REDUX
import { connect } from "react-redux";
import { postScream, clearErrors } from "../../redux/actions/dataActions";
import MyButton from "../../util/MyButton";
import { CircularProgress } from "@material-ui/core";

const styles = {
  submitButton: {
    position: "relative",
    marginTop: "15px",
    marginBottom: "15px",
    float: "right"
  },
  progressSpinner: {
    position: "absolute"
    // top: "50%",
    // left: "50%"
  },
  closeButton: {
    position: "absolute",
    left: "90%",
    top: "4%"
  }
};

class AddScream extends Component {
  state = {
    open: false,
    body: "",
    errors: {}
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };

  handleSubmit = () => {
    this.props.postScream({ body: this.state.body });
  };

  componentWillReceiveProps(newProps) {
    if (newProps.ui.errors) {
      this.setState({ errors: newProps.ui.errors });
    }
    if (!newProps.ui.errors && !newProps.ui.loading) {
      this.setState({ body: "", open: false, errors: {} });
    }
  }

  render() {
    const { errors } = this.state;
    const {
      classes,
      ui: { loading }
    } = this.props;
    return (
      <React.Fragment>
        <MyButton onClick={this.handleOpen} tip="Add a new tweet">
          <AddIcon style={{ color: "#fff" }} />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Add a new tweet</DialogTitle>
          <DialogContent className={classes.dialogContainer}>
            <TextField
              name="body"
              type="text"
              multiline
              rows="3"
              placeholder="Tweet here!"
              error={errors.body ? true : false}
              helperText={errors.body}
              onChange={this.handleChange}
              fullWidth
            ></TextField>
            <Button
              color="primary"
              variant="contained"
              onClick={this.handleSubmit}
              disable={`${loading}`}
              className={classes.submitButton}
            >
              Add Tweet
              {loading && (
                <CircularProgress
                  size={25}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui
});

AddScream.propTypes = {
  ui: PropTypes.object.isRequired,
  postScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { postScream, clearErrors })(
  withStyles(styles)(AddScream)
);
