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

const RENDER_TYPES = {
  LinkedListNode: "LinkedListNode",
  TreeNode: "TreeNode",
};

const styles = {
  root: {
    flexGrow: 1,
    display: "flex",
    backgroundColor: "#fff",
    height: "500px",
    width: "1000px",
  },
  tabs: {
    borderRight: `1px solid`,
    // margin: "0 -4rem 0 0",
  },
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function TabPanel(props) {
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
}

class RenderingConatainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      data: {},
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

  parseTree = (state, variables) => {
    const name = _.get(variables, `${state.address}`, null);
    const children = [];
    const value = _.get(state, "value", null);
    console.log("parse Tree", state, name, _.get(state, "children", []));

    _.get(state, "children", []).forEach((child) => {
      children.push(this.parseTree(child, variables));
    });

    return { name, attributes: { value }, children };
  };

  parseLL = (state, variables) => {
    console.log("parse ll", state);
  };

  parseStates = (states, variables) => {
    console.log("Parse States", states);
    let res = [];

    states.forEach((state) => {
      const varT = _.get(state, "variable_type");
      if (varT === RENDER_TYPES.LinkedListNode) {
        const s = this.parseLL(_.get(state, "states", {}), variables);
        res.push(s);
      } else if (varT === RENDER_TYPES.TreeNode) {
        const s = this.parseTree(_.get(state, "states"), variables);
        res.push(s);
      } else {
      }
    });

    return { res };
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, response } = this.props;
    const { value } = this.state;
    console.log(value);

    return (
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={this.handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
          <Tab label="Item Four" {...a11yProps(3)} />
          <Tab label="Item Five" {...a11yProps(4)} />
          <Tab label="Item Six" {...a11yProps(5)} />
          <Tab label="Item Seven" {...a11yProps(6)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <ComponentRender />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Five
        </TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
        <TabPanel value={value} index={6}>
          Item Seven
        </TabPanel>
      </div>
    );
  }
}

const StyledRenderingConatainer = withStyles(styles)(RenderingConatainer);
const select = ($$state) => _.pick($$state, ["code", "response", "render"]);
export default connect(select, { ...codeActions, ...renderActions })(
  StyledRenderingConatainer
);
