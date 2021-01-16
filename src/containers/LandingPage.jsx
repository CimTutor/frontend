import React from "react";
import _ from "lodash";
import { Grid, withStyles, Box } from "@material-ui/core/";
import { connect } from "react-redux";

import AppBar from "../components/styled/AppBar";
import * as codeActions from "../redux/actions/code";
import CodeEditor from "../components/styled/CodeEditor";

const styles = {
  pageContainer: {
    padding: "4rem",
  },
};

class LandingPage extends React.Component {
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
          <CodeEditor />
        </Box>
      </Grid>
    );
  }
}

const StyledLandingPage = withStyles(styles)(LandingPage);
const select = ($$state) => _.pick($$state, ["code"]);
export default connect(select, { ...codeActions })(StyledLandingPage);
