import React from "react";
import _ from "lodash";
import { Grid, withStyles, Box, Button, Paper } from "@material-ui/core/";
import { Graph } from "react-d3-graph";

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
    this.state = {
      graph: {
        nodes: [],
        edges: [],
      },
    };
  }

  // componentDidMount = (props) => {
  //   const { response, step } = this.props;

  //   let currentState = _.get(response, `states[${27}][1]`, null);

  //   const graph = this.populateGraph(currentState);

  //   this.setState({ graph });
  // };

  componentDidUpdate = (prevProps) => {
    const { response, step } = this.props;
    if (this.props.step !== prevProps.step) {
      let currentState = _.get(response, `states[${27}][1]`, null);

      const graph = this.populateGraph(currentState);
      console.log(graph);
      this.state = {
        graph: {
          nodes: [],
          edges: [],
        },
      };
      this.setState({ graph });
    }
  };

  populateGraph = (nodes) => {
    const graph = { nodes: [], edges: [] };
    // add nodes
    _.forEach(nodes, (node) => {
      let state = node.state;
      let addr = node.memory_address;
      let name = node.name;
      let type = node.var_type;
      graph.nodes.push({ id: addr, label: name, title: name });
    });
    // add edges
    // console.log(graph);
    return graph;
  };

  render() {
    const { classes, value, onChange, response, step } = this.props;
    // console.log(response, step);
    console.log(this.state.graph);

    const data = {
      nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }],
      links: [
        { source: "Harry", target: "Sally" },
        { source: "Harry", target: "Alice" },
      ],
    };

    const myConfig = {
      automaticRearrangeAfterDropNode: false,
      collapsible: false,
      directed: false,
      focusAnimationDuration: 0.75,
      focusZoom: 1,
      freezeAllDragEvents: false,
      height: 400,
      highlightDegree: 1,
      highlightOpacity: 0.2,
      linkHighlightBehavior: true,
      maxZoom: 8,
      minZoom: 0.1,
      nodeHighlightBehavior: true,
      panAndZoom: false,
      staticGraph: false,
      staticGraphWithDragAndDrop: false,
      width: 800,
      d3: {
        alphaTarget: 0.05,
        gravity: -100,
        linkLength: 100,
        linkStrength: 1,
        disableLinkForce: false,
      },
      node: {
        color: "#d3d3d3",
        fontColor: "black",
        fontSize: 12,
        fontWeight: "normal",
        highlightColor: "red",
        highlightFontSize: 12,
        highlightFontWeight: "bold",
        highlightStrokeColor: "SAME",
        highlightStrokeWidth: 1.5,
        labelProperty: "name",
        mouseCursor: "pointer",
        opacity: 1,
        renderLabel: true,
        size: {
          width: 700,
          height: 900,
        },
        strokeColor: "none",
        strokeWidth: 1.5,
        svg: "",
        symbolType: "circle",
      },
      link: {
        color: "#d3d3d3",
        fontColor: "black",
        fontSize: 8,
        fontWeight: "normal",
        highlightColor: "blue",
        highlightFontSize: 8,
        highlightFontWeight: "normal",
        labelProperty: "label",
        mouseCursor: "pointer",
        opacity: 1,
        renderLabel: false,
        semanticStrokeWidth: false,
        strokeWidth: 4,
        markerHeight: 6,
        markerWidth: 6,
        strokeDasharray: 0,
        strokeDashoffset: 0,
        strokeLinecap: "butt",
      },
    };

    const onClickNode = function (nodeId) {
      window.alert(`Clicked node ${nodeId}`);
    };

    const onClickLink = function (source, target) {
      window.alert(`Clicked link between ${source} and ${target}`);
    };

    const events = {
      select: function (event) {
        var { nodes, edges } = event;
      },
    };

    return (
      <Paper className={classes.pageContainer}>
        <Graph
          id="graph-id" // id is mandatory
          data={data}
          config={myConfig}
          onClickNode={onClickNode}
          onClickLink={onClickLink}
        />
      </Paper>
    );
  }
}

export default withStyles(styles)(RenderingConatainer);
