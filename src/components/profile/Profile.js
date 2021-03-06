import React, { Component } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import EditDetails from "./EditDetails";
import ProfileSkeleton from "../../util/ProfileSkeleton";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import { Paper } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import Tooltip from "@material-ui/core/Tooltip";
// ICONS
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
// REDUX
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { uploadImage, logOutUser } from "../../redux/actions/userActions";

const styles = theme => ({
  ...theme.spread,
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px"
    }
  }
});

class Profile extends Component {
  handleImageChange = event => {
    event.preventDefault();
    const image = event.target.files[0];
    // send it to server
    const formData = new FormData();
    formData.append("image", image, image.name);
    console.log("uploading now");
    this.props.uploadImage(formData);
  };

  handlerEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  handleLogOut = () => {
    this.props.logOutUser();
  };

  render() {
    const {
      classes,
      user: {
        credentials: { handle, createdAt, imageUrl, bio, website, location },
        loading,
        authenticated
      }
    } = this.props;

    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img className="profile-image" src={imageUrl} alt="profile" />
              <input
                type="file"
                id="imageInput"
                hidden="hidden"
                onChange={this.handleImageChange}
              />
              <Tooltip title="Upload profile picture" placement="top">
                <IconButton
                  onClick={this.handlerEditPicture}
                  className="button"
                >
                  <EditIcon color="primary" />
                </IconButton>
              </Tooltip>
            </div>
            <hr />
            <div className="profile-details">
              <MuiLink
                component={Link}
                to={`/users/${handle}`}
                color="primary"
                variant="h5"
              >
                @{handle}
              </MuiLink>
              <hr />
              {bio && <Typography variant="body2">{bio}</Typography>}
              <hr />
              {location && (
                <React.Fragment>
                  <LocationOn color="primary" /> <span>{location}</span>
                  <hr />
                </React.Fragment>
              )}
              {website && (
                <React.Fragment>
                  <LinkIcon color="primary" />
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {` `}
                    {website}
                  </a>
                  <hr />
                </React.Fragment>
              )}
              <CalendarToday color="primary" />
              {` `}
              <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
            </div>
            <EditDetails />
            <Tooltip placement="right" title="Logout">
              <IconButton onClick={this.handleLogOut}>
                <KeyboardReturn color="primary" />
              </IconButton>
            </Tooltip>
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body1" align="center">
            Login or SignUp now!
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/login"
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/signup"
              >
                SignUp
              </Button>
            </div>
          </Typography>
        </Paper>
      )
    ) : (
      <ProfileSkeleton />
    );

    return profileMarkup;
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = { logOutUser, uploadImage };

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  logOutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));
