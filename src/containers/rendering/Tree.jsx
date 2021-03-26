import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Tree from "react-d3-tree";
import _ from "lodash";

const styles = {
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,
    minWidth: 200,
  },
};

const renderForeignObjectNode = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
}) => {
  return (
    <g>
      <circle fill={"#1976d2"} r={15}></circle>
      <foreignObject {...foreignObjectProps}>
        <div style={{ border: "1px solid black", backgroundColor: "#dedede" }}>
          <h3 style={{ textAlign: "center" }}>{nodeDatum.name || "null"}</h3>
          {nodeDatum.name && (
            <div style={{ marginBottom: "0.5rem" }}>
              {"value: " + _.get(nodeDatum, "attributes.value", "null")}
            </div>
          )}
          {nodeDatum.children && (
            <button style={{ width: "100%" }} onClick={toggleNode}>
              {nodeDatum.__rd3t.collapsed ? "Expand" : "Collapse"}
            </button>
          )}
        </div>
      </foreignObject>
    </g>
  );
};

const GRAPH_ATTRIBUTES = {
  ll: "horizontal",
  tree: "vertical",
  translateX: 350,
  translateY: 50,
};

class MyFuckingTree extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, data } = this.props;
    const nodeSize = { x: 150, y: 400 };
    const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: 20 };

    return (
      <Tree
        data={data}
        translate={{
          x: GRAPH_ATTRIBUTES.translateX,
          y: GRAPH_ATTRIBUTES.translateY,
        }}
        orientation={GRAPH_ATTRIBUTES.tree}
        renderCustomNodeElement={(rd3tProps) =>
          renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })
        }
        separation={{ siblings: 3, nonSiblings: 2 }}
        pathFunc={"straight"}
        initialDepth={2}
        enableLegacyTransition={true}
        transitionDuration={500}
        scaleExtent={{ min: 0.1, max: 1 }}
      />
    );
  }
}

export default withStyles(styles)(MyFuckingTree);
