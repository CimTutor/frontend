import React from "react";
import _ from "lodash";
import {
  Grid,
  withStyles,
  Box,
  Button,
  AppBar,
  Toolbar,
} from "@material-ui/core/";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import StyledTopAppBar from "../components/styled/AppBar";
import * as codeActions from "../redux/actions/code";
import * as renderActions from "../redux/actions/render";
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

  onSubmit = () => {};

  render() {
    const { classes, code, response, render } = this.props;

    let currentState = (response && response[render]) || null;
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
                border={1}
                padding="10px"
                width= "60%"
                fontSize = "20px"
                lineHeight = "1.6"
                >
                  <p>As the world becomes more digitized, software development has
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
                  structures visually and present them more intuitively</p>
                </Box>
              </Box>
              <AppBar
                position="fixed"
                color="primary"
                className={classes.appBar}
              >
                <Box 
                  display="flex" 
                  justifyContent="center"
                >
                  <Toolbar>
                    <Box>
                      <Link
                        to="/LandingPage"
                        style={{ textDecoration: "none" }}
                      >
                        <Button variant="contained" color="secondary">
                          {" "}
                          Let's Start!
                        </Button>
                      </Link>
                    </Box>
                  </Toolbar>
                </Box>
              </AppBar>
            </>
          </Grid>
        </Grid>
        <AppBar
          position="fixed"
          color="primary"
          className={classes.appBar}
        >
          <Box justifyContent="center">
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
