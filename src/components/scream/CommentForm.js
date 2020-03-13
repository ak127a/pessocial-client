import React, { Component } from "react";
import PropTypes from "prop-types";

// MUI

import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

// Redux
import { connect } from "react-redux";
import { submitComment } from "../../redux/actions/dataActions";

const styles = theme => ({
  ...theme.spread,
  commentButtonContainer: {
    textAlign: "center"
  },
  commentButton: {}
});

export class CommentForm extends Component {
  state = {
    body: "",
    errors: {}
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.submitComment(this.props.screamId, { body: this.state.body });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.ui.errors) {
      this.setState({ errors: nextProps.ui.errors });
    }
    if (!nextProps.ui.errors && !nextProps.ui.loading) {
      this.setState({ body: "", errors: {} });
    }
  };

  render() {
    const { body, errors } = this.state;
    const { classes, authenticated } = this.props;
    const commentFormMarkup = authenticated ? (
      <Grid container style={{ marginBottom: "15px", marginLeft: "10px" }}>
        <Grid
          item
          sm={10}
          style={{ textAlign: "center", paddingRight: "15px" }}
        >
          <TextField
            name="body"
            multiline
            rows={3}
            type="text"
            variant="outlined"
            label="Comment on tweet"
            error={errors.comment ? true : false}
            helperText={errors.comment}
            value={body}
            onChange={this.handleChange}
            fullWidth
          />
        </Grid>
        <Grid item sm={2} className={classes.commentButtonContainer}>
          <Button
            onClick={this.handleSubmit}
            color="primary"
            className={classes.commentButton}
            variant="contained"
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    ) : null;

    return commentFormMarkup;
  }
}

CommentForm.propTypes = {
  ui: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  submitComment: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  ui: state.ui,
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps, { submitComment })(
  withStyles(styles)(CommentForm)
);
