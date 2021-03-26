import React from "react";
import _ from "lodash";
import {
  Grid,
  withStyles,
  Box,
  Button,
  AppBar,
  Toolbar,
  Card,
  CardContent,
  Typography,
  IconButton
} from "@material-ui/core/";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CodeEditor from "../components/styled/CodeEditor";
import RenderingContainer from "./rendering";
import Split from "react-split";
import StyledTopAppBar from "../components/styled/AppBar";
import * as codeActions from "../redux/actions/code";
import * as renderActions from "../redux/actions/render";
import { STARTER_CODE } from "../constants/starterCode";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";

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
    this.props.updateRenderState(0);
  }

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

  onSubmit = () => {};

  render() {
    const { classes, code, response, render } = this.props;
    let currentState = _.get(response, `states[${render}]`, null);
    let activeLine = null || (currentState && currentState[0]);
    return (
      <Grid>
        <StyledTopAppBar title="CimTutor" onSearch={this.onSearch} />
        <Grid container justify="center" spacing={2}>
          <Grid item>
            <>
              <Box className={classes.pageContainer}
              display="flex" 
              justifyContent="center"
              >
                <Box
                padding="10px"
                width= "60%"
                fontSize = "20px"
                lineHeight = "1.6"
                >
                  <Card variant="outlined">
                    <CardContent>
                      <Typography>
                        As the world becomes more digitized, software development has
                        become increasingly popular. More individuals are starting to
                        learn how to program, however they face a steep learning curve
                        at the early stage of their learning process. The goal of
                        CimTutor is to provide these individuals with a basic
                        understanding of computer science concepts through code
                        visualization. CimTutor is a web application that analyzes C++
                        code snippets and presents the associated machine level
                        processes graphically to the user. The program visualizes key
                        data structures used in the code segment and performs time
                        complexity breakdowns. CimTutor will be built and scaled out
                        using distributed systems. Input code segments will be
                        analyzed on the backend using syntax trees, pattern
                        recognition algorithms, and compiler knowledge. The analysis
                        results will then be sent to the frontend of the application
                        for visualization. The main advantage of CimTutor is that it
                        is able to correlate algorithms and their corresponding data
                        structures visually and present them more intuitively
                      </Typography>
                    </CardContent>
                  </Card>
                  
                </Box>
              </Box>
            </>
          </Grid>
          <Grid item>
              <Card variant="outlined">
                <CardContent>
                  <Box className="sample-area">
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
                          readOnly= {true}
                        />
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
                        </Toolbar>
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
                      </Box>
                    </Split>
                  </Box>
                </CardContent>
              </Card>
            
          </Grid>
        </Grid>
        <AppBar
          position="fixed"
          color="primary"
          className={classes.appBar}
        >
          <Box display="flex" justifyContent="center">
            <Toolbar>
                <Link to="/LandingPage" style={{ textDecoration: 'none' }}>
                  <Button variant="contained" color="secondary"> Let's Start!</Button> 
                </Link>
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
