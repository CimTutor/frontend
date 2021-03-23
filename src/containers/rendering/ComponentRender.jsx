import React from "react";
import _ from "lodash";
import { Grid, withStyles, Box, Button, Paper } from "@material-ui/core/";
import { connect } from "react-redux";

// import TreeRender, { RenderTree } from "./TreeRender";
import Tree from "react-d3-tree";
import * as codeActions from "../../redux/actions/code";
import * as renderActions from "../../redux/actions/render";
import * as utils from "../../util/util.js";

const RENDER_TYPES = {
  LinkedListNode: "LinkedListNode",
  TreeNode: "TreeNode",
};

const GRAPH_ATTRIBUTES = {
  orientation: "vertical",
  translateX: 100,
  translateY: 100,
};

const styles = {
  pageContainer: {
    padding: "4rem",
  },
};

class ComponentRender extends React.Component {
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

  render() {
    const { classes, response } = this.props;
    const states = _.get(
      this.props.response,
      `states[${this.props.render}][1]`,
      []
    );
    const variables = _.get(this.props.response, `var_address`, {});
    const { res } = this.parseStates(states, variables);

    return (
      <div id="treeWrapper" style={{ width: "50em", height: "25em" }}>
        <Tree
          data={res[0] || {}}
          translate={{
            x: GRAPH_ATTRIBUTES.translateX,
            y: GRAPH_ATTRIBUTES.translateY,
          }}
          orientation={GRAPH_ATTRIBUTES.orientation}
        />
      </div>
    );
  }
}

const StyledComponentRender = withStyles(styles)(ComponentRender);
const select = ($$state) => _.pick($$state, ["code", "response", "render"]);
export default connect(select, { ...codeActions, ...renderActions })(
  StyledComponentRender
);
