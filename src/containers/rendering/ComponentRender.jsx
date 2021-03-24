import React from "react";
import _ from "lodash";
import { Grid, withStyles, Box, Button, Paper } from "@material-ui/core/";
import { connect } from "react-redux";

import Tree from "react-d3-tree";

const GRAPH_ATTRIBUTES = {
  orientation: "vertical",
  translateX: 350,
  translateY: 50,
};

const styles = {
  pageContainer: {
    padding: "4rem",
  },
};

const renderForeignObjectNode = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
}) => (
  <g>
    <circle r={15}></circle>
    <foreignObject {...foreignObjectProps}>
      <div style={{ border: "1px solid black", backgroundColor: "#dedede" }}>
        <h3 style={{ textAlign: "center" }}>{nodeDatum.name || "null"}</h3>
        {nodeDatum.children && (
          <button style={{ width: "100%" }} onClick={toggleNode}>
            {nodeDatum.__rd3t.collapsed ? "Expand" : "Collapse"}
          </button>
        )}
      </div>
    </foreignObject>
  </g>
);

class ComponentRender extends React.Component {
  render() {
    const { classes, data } = this.props;
    const nodeSize = { x: 150, y: 200 };
    const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: 20 };

    return (
      <div id="treeWrapper" style={{ width: "50em", height: "50em" }}>
        <Tree
          data={data}
          translate={{
            x: GRAPH_ATTRIBUTES.translateX,
            y: GRAPH_ATTRIBUTES.translateY,
          }}
          orientation={GRAPH_ATTRIBUTES.orientation}
          renderCustomNodeElement={(rd3tProps) =>
            renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })
          }
          separation={{ siblings: 2, nonSiblings: 2 }}
          pathFunc={"straight"}
          initialDepth={2}
        />
      </div>
    );
  }
}
export default withStyles(styles)(ComponentRender);
