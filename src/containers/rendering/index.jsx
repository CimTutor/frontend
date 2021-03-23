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

  parseTree = (state, variables) => {
    // TODO: make sure we show right and left, handle null children
    if (state === null) {
      return {};
    }
    const name = _.get(variables, `${_.get(state, "address")}`, null);
    const children = [];
    const value = _.get(state, "value", null);
    console.log("parse Tree", state, name, _.get(state, "children", []));

    _.get(state, "children", []).forEach((child) => {
      children.push(this.parseTree(child, variables));
    });

    return { name, attributes: { value }, children };
  };

  parseLL = (state, variables) => {
    const name = _.get(variables, `${_.get(state, "address")}`, null);
    const children = [];
    const value = _.get(state, "value", null);
    console.log("parse LL", state, name, _.get(state, "children", []));

    _.get(state, "children", []).forEach((child) => {
      children.push(this.parseLL(child, variables));
    });

    return { name, attributes: { value }, children };
  };

  parseStates = (states, variables) => {
    console.log("PARSE STATES", states);
    let res = [];
    let var_nodes = [];
    states.forEach((value) => {
      const context_states = _.get(value, "states", {});
      context_states.forEach((state) => {
        const varT = _.get(state, "variable_type");
        // const state = _.get(c_state, "states", {});

        if (varT === RENDER_TYPES.LinkedListNode) {
          const s = this.parseLL(_.get(state, "states", {}), variables);
          res.push(s);
        } else if (varT === RENDER_TYPES.TreeNode) {
          const s = this.parseTree(_.get(state, "states", {}), variables);
          res.push(s);
        } else {
          if (_.get(state, "name") !== undefined) {
            var_nodes.push({
              name: _.get(state, "name"),
              type: _.get(state, "variable_type"),
              value: _.get(state, "value"),
            });
          }
        }
      });
    });

    if (var_nodes.length !== 0) {
      res.push({ type: "VARIABLES", data: var_nodes });
    }

    return { res };
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
    console.log(states);
    const variables = _.get(this.props.response, `var_address`, {});
    const { res } = this.parseStates(states, variables);
    console.log("RES", res);

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
            return <Tab key={i} label={v.name || v.type} {...a11yProps(i)} />;
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
