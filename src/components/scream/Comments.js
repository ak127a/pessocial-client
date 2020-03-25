import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";

const styles = theme => ({
  ...theme.spread,
  outerGrid: {
    paddingLeft: "10px",
    paddingRight: "10px"
  },
  //   visibleSeparator: {
  //     width: "100%",
  //     borderBottom: "1px solid rgba(0,0,0,0.1)",
  //     marginBottom: "20px"
  //   },
  //   invisibleSeparator: {
  //     border: "none",
  //     margin: "4px"
  //   },
  commentImage: {
    maxWidth: "100%",
    minWidth: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "50%"
  },
  commentData: {
    marginLeft: "20px"
  }
});

class Comments extends Component {
  render() {
    const { comments, classes } = this.props;
    return (
      <Grid container>
        {comments.map((comment, index) => {
          const { body, createdAt, userImage, userHandle } = comment;
          return (
            <React.Fragment key={createdAt}>
              <Grid item sm={12}>
                <Grid className={classes.outerGrid} container>
                  <Grid item sm={2}>
                    <img
                      src={userImage}
                      alt="comment"
                      className={classes.commentImage}
                    />
                  </Grid>
                  <Grid item sm={10}>
                    <div className={classes.commentData}>
                      <Typography
                        variant="h5"
                        component={Link}
                        to={`/users/${userHandle}`}
                        color="primary"
                      >
                        {userHandle}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                      </Typography>
                      <hr className={classes.invisibleSeparator} />
                      <Typography variant="body1">{body}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {index !== comments.length - 1 && (
                <hr className={classes.visibleSeparator} />
              )}
            </React.Fragment>
          );
        })}
      </Grid>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired
};

export default withStyles(styles)(Comments);
