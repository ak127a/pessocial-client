import React from "react";
import noImg from "../images/no-img.png";
import PropTypes from "prop-types";
// MUI
import Paper from "@material-ui/core/Paper";
// ICONS
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  ...theme.spread,
  handle: {
    height: "20px",
    backgroundColor: theme.palette.primary.main,
    width: "60px",
    margin: "0px auto 7px auto"
  },
  fullLine: {
    height: "15px",
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "100%",
    marginBottom: "10px"
  },
  halfLine: {
    height: "15px",
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "50%",
    marginBottom: "10px"
  }
});

const ProfileSkeleton = props => {
  const { classes } = props;
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={noImg} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <div className={classes.handle}></div>
          <hr />
          <div className={classes.fullLine} />
          <div className={classes.fullLine} />
          <hr />
          <LocationOn color="primary" /> <span>Location</span>
          <hr />
          <LinkIcon color="primary" /> <span>https://website.com</span>
          <hr />
          <CalendarToday color="primary" /> <span>Joined Date</span>
        </div>
      </div>
    </Paper>
  );
};

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileSkeleton);
