import React from "react";
import _ from "lodash";
import {
  Grid,
  withStyles,
  Box,
  Button,
  AppBar,
  Toolbar,
  IconButton,
} from "@material-ui/core/";
import { connect } from "react-redux";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";

import StyledTopAppBar from "../components/styled/AppBar";
import * as codeActions from "../redux/actions/code";
import * as renderActions from "../redux/actions/render";
import CodeEditor from "../components/styled/CodeEditor";
import RenderingContainer from "../components/RenderingContainer";
import { STARTER_CODE } from "../constants/starterCode";

const styles = {
  pageContainer: {
    padding: "4rem",
  },
  appBar: {
    top: "auto",
    bottom: 0,
  },
  flip: {
    "-webkit-transform": "scaleX(-1)",
    transform: "scaleX(-1)",
  },
};

class LandingPage extends React.Component {
  componentDidMount() {
    this.props.updateCodeValue(STARTER_CODE);
  }

  onChange = (value) => {
    this.props.updateCodeValue(value);
  };

  onSubmit = () => {
    const { sendCodeToCompile, code } = this.props;
    sendCodeToCompile(code);
  };

  onLeft = () => {
    this.props.updateRenderState(Math.max(this.props.render - 1, 0));
  };

  onRight = () => {
    this.props.updateRenderState(
      Math.min(this.props.render + 1, this.props.response.length - 1)
    );
  };

  render() {
    const { classes, code, response, render } = this.props;

    let currentState = (response && response[render]) || null;
    let activeLine = null || (currentState && currentState[0]);

    return (
      <Grid>
        <StyledTopAppBar title="Cim Tutor" onSearch={this.onSearch} />
        <Grid container justify="center" spacing={2}>
          <Grid item>
            <>
              <Box className={classes.pageContainer}>
                <CodeEditor
                  onChange={this.onChange}
                  value={code}
                  activeLine={activeLine}
                />
              </Box>
              <AppBar
                position="fixed"
                color="primary"
                className={classes.appBar}
              >
                <Box ml="4rem">
                  <Toolbar>
                    <IconButton
                      edge="end"
                      color="inherit"
                      className={classes.flip}
                    >
                      <DoubleArrowIcon />
                    </IconButton>
                    <IconButton
                      onClick={this.onLeft}
                      edge="end"
                      color="inherit"
                    >
                      <ChevronLeftIcon />
                    </IconButton>
                    <IconButton
                      onClick={this.onRight}
                      edge="end"
                      color="inherit"
                    >
                      <ChevronRightIcon />
                    </IconButton>
                    <IconButton edge="end" color="inherit">
                      <DoubleArrowIcon />
                    </IconButton>
                    <Box ml="4rem">
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={this.onSubmit}
                      >
                        Submit Code
                      </Button>
                    </Box>
                  </Toolbar>
                </Box>
              </AppBar>
            </>
          </Grid>

          <Grid item>
            <Box className={classes.pageContainer}>
              <RenderingContainer />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const StyledLandingPage = withStyles(styles)(LandingPage);
const select = ($$state) => _.pick($$state, ["code", "response", "render"]);
export default connect(select, { ...codeActions, ...renderActions })(
  StyledLandingPage
);
