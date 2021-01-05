import React from "react";
import _ from "lodash";
import { Grid, withStyles, Box } from "@material-ui/core/";
import { connect } from "react-redux";

import TransferList from "../components/styled/TransferList";
import AppBar from "../components/styled/AppBar";
import * as movieActions from "../redux/actions/movies";
import * as nominatedActions from "../redux/actions/nominated";

const styles = {
  pageContainer: {
    padding: "4rem",
  },
};

class NominationsPage extends React.Component {
  onSearch = async (name) => {
    this.props.fetchMoviesByTitle(name);
  };

  componentDidMount() {
    const url = new URL(window.location.href);
    const params = url.searchParams.get("movieIds");

    if (params) {
      const movieIds = _.split(params, ",");
      for (let i = 0; i < movieIds.length; i++) {
        this.props.fetchMoviesSharableLink(movieIds[i]);
      }
    }
  }

  render() {
    const { classes, movies, nominated } = this.props;
    console.log(nominated);
    return (
      <Grid>
        <AppBar title="Shoppies" onSearch={this.onSearch} />
        <Box className={classes.pageContainer}>
          <TransferList
            rightTitle="Nominations"
            leftTitle="Searches for..."
            left={movies}
            right={nominated}
          />
        </Box>

        {/* <SearchBar label="Search for Movies..." onClick={this.onSearch} /> */}
      </Grid>
    );
  }
}

const StyledNominationsPage = withStyles(styles)(NominationsPage);
const select = ($$state) => _.pick($$state, ["movies", "nominated"]);
export default connect(select, { ...movieActions, ...nominatedActions })(
  StyledNominationsPage
);
