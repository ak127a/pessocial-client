import React, { Component } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getScream } from "../../redux/actions/dataActions";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
// MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import MyButton from "../../util/MyButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import ChatIcon from "@material-ui/icons/Chat";

const styles = theme => ({
  ...theme.spread,
  expandButton: {
    position: "abosolute",
    left: "100%"
  },
  profileImage: {
    maxWidth: "200px",
    height: "200px",
    borderRadius: "50%",
    objectFit: "cover"
  },
  dialogContent: {
    padding: "20px",
    marginTop: "30px"
  },
  spinnerDiv: {
    textAlign: "center",
    margin: "30px 0 30px 0"
  },
  closeButton: {
    position: "absolute",
    left: "90%",
    top: "4%"
  }
});

class ScreamDialog extends Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
    this.props.getScream(this.props.screamId);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      classes,
      scream: {
        screamId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
        comments
      },
      ui: { loading }
    } = this.props;

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress
          thickness={2}
          className={classes.contentLoading}
          size={180}
        />
      </div>
    ) : (
      <Grid container spacing={3}>
        <Grid item sm={5}>
          <img
            src={userImage}
            alt="Profile Image"
            className={classes.profileImage}
          />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1">{body}</Typography>
          <LikeButton screamId={screamId} />
          <span>{likeCount} likes</span>
          <MyButton tip="Comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} Comments</span>
        </Grid>
        <hr className={classes.visibleSeparator} />
        <Comments comments={comments} />
      </Grid>
    );

    return (
      <React.Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip="Expand Tweet"
          tipClassName={classes.expandButton}
        >
          <UnfoldMoreIcon color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          className={classes.screamDialog}
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  }
}

ScreamDialog.propTypes = {
  getScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  ui: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  scream: state.data.scream,
  ui: state.ui
});

const mapActionsToProps = {
  getScream
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ScreamDialog));
