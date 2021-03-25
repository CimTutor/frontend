import React from "react";
import _ from "lodash";
import {
  Grid,
  withStyles,
  Box,
  Button,
  Paper,
  ButtonGroup,
  Typography,
  Card,
  CardContent,
} from "@material-ui/core/";

import Tree from "react-d3-tree";

const GRAPH_ATTRIBUTES = {
  ll: "horizontal",
  tree: "vertical",
  translateX: 350,
  translateY: 50,
};

const styles = {
  pageContainer: {
    padding: "4rem",
  },
  variable_names: {
    display: "inline",
    padding: "10px",
    align: "left",
  },
  variables_grid: {
    paddingTop: "10px",
  },
  variable_grid: {
    textAlign: "left",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
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

    // console.log("DATA:" + JSON.stringify(data));

    let render_object = "";
    if (_.get(data, "type") === "VARIABLES") {
      let variables = _.get(data, "data", []).map((variable, i) => {
        if (_.get(variable, "values", undefined)) {
          // console.log("Values: " + _.get(variable, "values", []));
          return (
            <Grid key={i} item xs={12} className={classes.variable_grid}>
              <Typography
                key={variable.name}
                variant="body1"
                className={classes.variable_names}
              >
                {variable.type} {variable.name}:
              </Typography>
              <ButtonGroup
                color="primary"
                aria-label="outlined primary button group"
              >
                {_.get(variable, "values", []).map((index, i) => (
                  <Button key={variable.name + "-" + i}>{index}</Button>
                ))}
              </ButtonGroup>
            </Grid>
          );
        } else {
          return (
            <Grid item xs={12} className={classes.variable_grid}>
              <Typography
                key={variable.name}
                variant="body1"
                className={classes.variable_names}
              >
                {variable.type} {variable.name}:
              </Typography>
              <Button variant="outlined" color="primary">
                {variable.value}
              </Button>
            </Grid>
          );
        }
      });

      render_object = (
        <div className={classes.root}>
          <Grid container spacing={3} className={classes.variables_grid}>
            {variables}
          </Grid>
        </div>
      );
    } else if (_.get(data, "type") == "STRUCT") {
      return (
        <Grid item xs={12} className={classes.variable_grid}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {_.get(data, "name", "")}
              </Typography>
              {_.map(_.get(data, "values"), (f) => {
                return (
                  <Typography className={classes.pos} color="textSecondary">
                    {_.get(f, "field") + " : " + _.get(f, "value")}
                  </Typography>
                );
              })}
            </CardContent>
          </Card>
        </Grid>
      );
    } else {
      render_object = (
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
          separation={{ siblings: 2, nonSiblings: 2 }}
          pathFunc={"straight"}
          initialDepth={2}
        />
      );
    }

    return (
      <div id="treeWrapper" style={{ width: "50em", height: "30em" }}>
        {render_object}
      </div>
    );
  }
}
export default withStyles(styles)(ComponentRender);
