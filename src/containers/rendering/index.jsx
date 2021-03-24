import React from "react";
import _ from "lodash";
import {
  Grid,
  withStyles,
  Box,
  Button,
  Paper,
  Tabs,
  Tab,
  Typography,
} from "@material-ui/core/";
import { connect } from "react-redux";

// import TreeRender, { RenderTree } from "./TreeRender";
import Tree from "react-d3-tree";
import * as codeActions from "../../redux/actions/code";
import * as renderActions from "../../redux/actions/render";
import ComponentRender from "./ComponentRender";
import * as utils from "../../util/util";

export const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const styles = {
  root: {
    flexGrow: 1,
    display: "flex",
    backgroundColor: "#fff",
    height: "50rem",
    width: "1000px",
  },
  tabs: {
    borderRight: `1px solid`,
    // margin: "0 -4rem 0 0",
  },
};

class RenderingConatainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      data: {},
      tab: 0,
    };
  }

  componentDidMount = (props) => {
    this.setState({ step: _.get(props, "render", 0) });
  };

  componentDidUpdate = () => {
    const { render } = this.props;
    if (this.props.render !== this.state.step) {
      this.setState({ step: render });
    }
  };

  handleChange = (event, value) => {
    this.setState({ tab: value });
  };

  render() {
    const { classes, response } = this.props;
    const { tab } = this.state;
    const states = _.get(
      this.props.response,
      `states[${this.props.render}][1]`,
      []
    );
    // console.log(states);
    const variables = _.get(this.props.response, `var_address`, {});
    const { res } = utils.parseStates(states, variables);
    // console.log("RES", res);

    return (
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={tab}
          onChange={this.handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          {_.map(res, (v, i) => {
            return (
              <Tab key={i} label={v.name || v.type} {...utils.a11yProps(i)} />
            );
          })}
        </Tabs>
        {_.map(res, (v, i) => {
          return (
            <TabPanel key={i} value={tab} index={i}>
              <ComponentRender data={v} />
            </TabPanel>
          );
        })}
      </div>
    );
  }
}

const StyledRenderingConatainer = withStyles(styles)(RenderingConatainer);
const select = ($$state) => _.pick($$state, ["code", "response", "render"]);
export default connect(select, { ...codeActions, ...renderActions })(
  StyledRenderingConatainer
);
