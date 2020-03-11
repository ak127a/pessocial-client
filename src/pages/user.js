import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Scream from "../components/scream/Scream";
import Grid from "@material-ui/core/Grid";
import StaticProfile from "../components/profile/StaticProfile";

import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

class user extends Component {
  state = {
    profile: {}
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then(res => {
        this.setState({ profile: res.data.user });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    const { screams, loading } = this.props.data;

    const screamsMarkup = loading ? (
      <p>Loading Data..</p>
    ) : screams === null ? (
      <p>No Screams found</p>
    ) : (
      screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
    );

    return (
      <Grid container spacing={3}>
        <Grid item sm={8} xs={12}>
          {screamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <StaticProfile profile={this.state.profile} />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data
});

user.propTypes = {
  data: PropTypes.func.isRequired,
  getUserData: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { getUserData })(user);
