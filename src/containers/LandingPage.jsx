import React from "react";
import _ from "lodash";
import { Grid, withStyles, Box, Button } from "@material-ui/core/";
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
  onChange = (value) => {
    this.props.updateCodeValue(value);
  };

  onSubmit = () => {
    const { sendCodeToCompile, code } = this.props;
    sendCodeToCompile(code);
  };

  render() {
    const { classes, code } = this.props;
    return (
      <Grid>
        <AppBar title="Cim Tutor" onSearch={this.onSearch} />
        <Box className={classes.pageContainer}>
          <CodeEditor onChange={this.onChange} />
        </Box>

        <Box>
          <Button variant="outlined" onClick={this.onSubmit}>
            Submit
          </Button>
        </Box>
      </Grid>
    );
  }
}

const StyledLandingPage = withStyles(styles)(LandingPage);
const select = ($$state) => _.pick($$state, ["code"]);
export default connect(select, { ...codeActions })(StyledLandingPage);
