import React, { Fragment } from "react";
import noImg from "../images/no-img.png";
import PropTypes from "prop-types";
// MUI
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  ...theme.spread,
  card: {
    marginBottom: "20px"
  },
  cardContent: {
    width: "100%",
    flexDirection: "column",
    padding: "25px"
  },
  cover: {
    minWidth: "200px",
    objectFit: "cover"
  },
  handle: {
    width: "60px",
    height: "18px",
    backgroundColor: theme.palette.primary.main,
    marginBottom: "7px"
  },
  date: {
    width: "100px",
    height: "15px",
    backgroundColor: "rgba(0,0,0,0.3)",
    marginBottom: "10px"
  },
  fullLine: {
    height: "15px",
    width: "90%",
    backgroundColor: "rgba(0,0,0,0.6)",
    marginBottom: "10px"
  },
  halfLine: {
    height: "15px",
    width: "50%",
    backgroundColor: "rgba(0,0,0,0.6)",
    marginBottom: "10px"
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
  }
});

const ScreamSkeleton = props => {
  const { classes } = props;

  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <div className={classes.screamHeader}>
        <CardMedia
          className={classes.image}
          image={noImg}
          title="Profile image"
        />
        <div className={classes.handleTime}>
          <div className={classes.handle} />
          <div className={classes.date} />
        </div>
      </div>
      <CardContent className={classes.cardContent}>
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.halfLine} />
      </CardContent>
    </Card>
  ));

  return <Fragment>{content}</Fragment>;
};

ScreamSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ScreamSkeleton);
