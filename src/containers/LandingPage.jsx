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
  Typography,
} from "@material-ui/core/";
import Split from "react-split";
import { connect } from "react-redux";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";

import StyledTopAppBar from "../components/styled/AppBar";
import * as codeActions from "../redux/actions/code";
import * as renderActions from "../redux/actions/render";
import CodeEditor from "../components/styled/CodeEditor";
import SystemOutput from "../components/styled/SystemOutput";
import RenderingContainer from "./rendering";
import { STARTER_CODE } from "../constants/starterCode";

const styles = {
  pageContainer: {
    paddingTop: "1rem",
    padding: "2rem",
  },
  appBar: {
    top: "auto",
    bottom: 0,
  },
  flip: {
    "-webkit-transform": "scaleX(-1)",
    transform: "scaleX(-1)",
  },
  background: {
    backgroundColor: "#f5f5f5",
  },
  titles: {
    display: "flex",
    color: "#404040",
  },
};

class LandingPage extends React.Component {
  componentDidMount() {
    let key = window.location.href
      .split("http://localhost:3000/LandingPage/")
      .join("");
    if (key !== "") {
      const { getCodeToShare } = this.props;
      getCodeToShare(key);
    }
    this.props.updateCodeValue(STARTER_CODE);
  }

  onChange = (value) => {
    this.props.updateCodeValue(value);
  };

  onSubmit = () => {
    const { sendCodeToCompile, code } = this.props;
    sendCodeToCompile(code);
    this.props.updateRenderState(0);
  };

  onClick = () => {
    const { sendCodeToShare, code } = this.props;
    const r =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    alert("Here is you're link!" + " http://localhost:3000/LandingPage/" + r);
    sendCodeToShare(r, code);
  };

  onLeft = () => {
    this.props.updateRenderState(Math.max(this.props.render - 1, 0));
  };

  onRight = () => {
    const { updateRenderState, response, render } = this.props;
    let length = _.get(response, `states`, []).length;
    updateRenderState(Math.min(render + 1, length - 1));
  };

  onDoubleRight = () => {
    const { updateRenderState, response } = this.props;
    let length = _.get(response, `states`, []).length;
    updateRenderState(length - 1);
  };

  onDoubleLeft = () => {
    this.props.updateRenderState(0);
  };

  render() {
    const { classes, code, response, render } = this.props;

    let currentState = _.get(response, `states[${render}]`, null);
    let activeLine = null || (currentState && currentState[0]);

    return (
      <Grid className={classes.background}>
        <StyledTopAppBar title="Cim Tutor" onSearch={this.onSearch} />
        <Grid container className={classes.pageContainer} spacing={2}>
          <Box className="work-area">
            <Split
              className="wrapper-card"
              sizes={[35, 65]}
              minSize={100}
              expandToMin={false}
              gutterSize={10}
              gutterAlign="center"
              snapOffset={30}
              dragInterval={1}
              direction="horizontal"
              cursor="col-resize"
            >
              <Box
                style={{ width: "100%", height: "100%", paddingTop: "32px" }}
              >
                <CodeEditor
                  onChange={this.onChange}
                  value={code}
                  activeLine={activeLine}
                />
              </Box>

              <Box style={{ width: "100%", height: "100%" }}>
                <Typography
                  variant="h6"
                  component="h6"
                  className={classes.titles}
                >
                  Visualization of Code
                </Typography>
                <RenderingContainer />
                <SystemOutput
                  output={response.program_output}
                  error={response.error}
                />
              </Box>
            </Split>
          </Box>
        </Grid>

        <AppBar position="fixed" color="primary" className={classes.appBar}>
          <Box ml="4rem">
            <Toolbar>
              <IconButton
                edge="end"
                color="inherit"
                className={classes.flip}
                onClick={this.onDoubleLeft}
              >
                <DoubleArrowIcon />
              </IconButton>
              <IconButton onClick={this.onLeft} edge="end" color="inherit">
                <ChevronLeftIcon />
              </IconButton>
              <IconButton onClick={this.onRight} edge="end" color="inherit">
                <ChevronRightIcon />
              </IconButton>
              <IconButton
                edge="end"
                color="inherit"
                onClick={this.onDoubleRight}
              >
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
              <Box ml="4rem">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.onClick}
                >
                  Share Code
                </Button>
              </Box>
            </Toolbar>
          </Box>
        </AppBar>
      </Grid>
    );
  }
}

const StyledLandingPage = withStyles(styles)(LandingPage);
const select = ($$state) => _.pick($$state, ["code", "response", "render"]);
export default connect(select, { ...codeActions, ...renderActions })(
  StyledLandingPage
);
