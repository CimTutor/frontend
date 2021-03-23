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

class ComponentRender extends React.Component {
  render() {
    const { classes, data } = this.props;

    console.log(data);

    return (
      <div id="treeWrapper" style={{ width: "50em", height: "30em" }}>
        <Tree
          data={data}
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
export default withStyles(styles)(ComponentRender);
