import React from "react";
import _ from "lodash";
import { Grid, withStyles, Box, Button, Paper } from "@material-ui/core/";
import Graph from "react-graph-vis";

const RENDER_TYPES = {
  LinkedList: "LINKED_LIST",
  TreeNode: "TREE_NODE",
  String: "STRING",
  Integer: "INT",
};

const styles = {
  pageContainer: {
    padding: "4rem",
  },
};

class RenderingConatainer extends React.Component {
  constructor(props) {
    super(props);
  }

  populateGraph = (nodes) => {
    const graph = { nodes: [], edges: [] };
    // add nodes
    _.forEach(nodes, (node) => {
      // console.log(node);
      let state = node.state.split("\n");
      console.log(state);
      let n = state.map((s) => {
        s = s.split(",");
        // _.forEach(s, (v) => {
        //   v = v.split(":");
        //   console.log(v);
        // });
        s = _.map(s, (v) => {
          return v.split(":");
        });
        console.log(s);
      });
    });
    // add edges

    return graph;
  };

  render() {
    const { classes, value, onChange, response, step } = this.props;
    // console.log(response, step);

    let currentState = _.get(response, `states[${27}][1]`, null);

    // console.log(currentState, step);

    const graph = this.populateGraph(currentState);

    const options = {
      layout: {
        hierarchical: true,
      },
      edges: {
        color: "#000000",
      },
      height: "600px",
      width: "600px",
      nodes: {
        shape: "box",
      },
    };

    const events = {
      select: function (event) {
        var { nodes, edges } = event;
      },
    };

    return (
      <Paper className={classes.pageContainer}>
        <Graph graph={graph} options={options} events={events} />
      </Paper>
    );
  }
}

export default withStyles(styles)(RenderingConatainer);
