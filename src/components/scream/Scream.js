import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import DeleteScream from "./DeleteScream";
import ScreamDialog from "./ScreamDialog";
import LikeButton from "./LikeButton";

//REDUX
import { connect } from "react-redux";
import PropTypes from "prop-types";

// MUI Stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ChatIcon from "@material-ui/icons/Chat";
import MyButton from "../../util/MyButton";

const styles = (theme) => ({
  ...theme.spread,
  card: {
    position: "relative",
    marginBottom: 20
  },
  image: {
    width: "70px",
    height: "70px",
    objectFit: "cover",
    borderRadius: "50%",
    "@media only screen and (max-width: 600px)": {
      maxWidth: "100px"
    }
  },
  screamHeader: {
    display: "flex",
    margin: "12px 0 0 25px"
  },
  handleTime: {
    margin: "5px 0 0 15px"
  },
  content: {
    padding: 25,
    objectFit: "cover"
  }
});

class Scream extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      scream: {
        body,
        createdAt,
        userImage,
        userHandle,
        screamId,
        likeCount,
        commentCount
      },
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteScream screamId={screamId} />
      ) : null;

    return (
      <Card className={classes.card}>
        <div className={classes.screamHeader}>
          <CardMedia
            className={classes.image}
            image={userImage}
            title="Profile image"
          />
          <div className={classes.handleTime}>
            <Typography
              color="primary"
              variant="h5"
              component={Link}
              to={`/users/${userHandle}`}
            >
              {userHandle}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {dayjs(createdAt).fromNow()}
            </Typography>
          </div>
        </div>

        <CardContent className={classes.content}>
          {deleteButton}

          <Typography style={{wordBreak: "break-all"}} variant="body1">{body}</Typography>
          <LikeButton screamId={screamId} />
          <span>{likeCount} Likes</span>
          <MyButton tip="Comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} Comments</span>
          <ScreamDialog
            screamId={screamId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
        </CardContent>
      </Card>
    );
  }
}

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, null)(withStyles(styles)(Scream));
