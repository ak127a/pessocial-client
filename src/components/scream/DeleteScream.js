import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
import PropTypes from "prop-types";

// MUI
import Button from "@material-ui/core/Button";
import red from "@material-ui/core/colors/red";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import DeleteIcon from "@material-ui/icons/Delete";

// REDUX
import { connect } from "react-redux";
import { deleteScream } from "../../redux/actions/dataActions";

const styles = {
  deleteButton: {
    position: "absolute",
    right: "8px",
    top: "2%"
  }
};

class DeleteScream extends Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  deleteScream = () => {
    this.props.deleteScream(this.props.screamId);
    this.setState({ open: false });
  };

  render() {
    const deleteButtonColor = red[500];

    const { classes } = this.props;
    return (
      <React.Fragment>
        <MyButton
          tip="Delete Tweet"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline style={{ color: "#f00" }} />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Are you sure you want to delete this tweet?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose}>Cancel</Button>
            <Button
              color={deleteButtonColor}
              variant="contained"
              style={{ backgroundColor: "#f44336" }}
              onClick={this.deleteScream}
              startIcon={<DeleteIcon style={{ color: "#fff" }} />}
            >
              <span style={{ color: "#fff" }}>Delete</span>
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

DeleteScream.propTypes = {
  deleteScream: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired
};

export default connect(null, { deleteScream })(
  withStyles(styles)(DeleteScream)
);
