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
    display: "flex",
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
  }
});

const ScreamSkeleton = props => {
  const { classes } = props;

  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <CardMedia className={classes.cover} image={noImg} />
      <CardContent className={classes.cardContent}>
        <div className={classes.handle} />
        <div className={classes.date} />
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
