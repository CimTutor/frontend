import React from "react";
import _ from "lodash";
import { Grid, withStyles, Box, Button, Paper, ButtonGroup, Typography } from "@material-ui/core/";
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
  variable_names: {
    display: 'inline', 
    padding: '10px',
    align:"left" 
  },
  variables_grid: {
    paddingTop: '10px'
  },
  variable_grid: {
    textAlign: 'left'
  }
};

class ComponentRender extends React.Component {
  render() {
    const { classes, data } = this.props;

    console.log(data);

    console.log("DATA:" + JSON.stringify(data));

    let render_object = ""
    if (data.type == "VARIABLES") {

      let variables = _.get(data, 'data', [])
        .map(variable => {
          if (_.get(variable, 'values', undefined)) {
            console.log("Values: " + _.get(variable, 'values', []))
            return (<Grid item xs={12} className={classes.variable_grid}>
              <Typography key={variable.name} variant="body1" className={classes.variable_names}>
                {variable.type} {variable.name}:
              </Typography>
              <ButtonGroup color="primary" aria-label="outlined primary button group">
                {_.get(variable, 'values', []).map((index, i) => (<Button key={variable.name + "-" + i}>{index}</Button>))}
              </ButtonGroup>
            </Grid>)
          } else {
            return (<Grid item xs={12} className={classes.variable_grid}>
              <Typography key={variable.name} variant="body1" className={classes.variable_names}>
                {variable.type} {variable.name}:
              </Typography>
              <Button variant="outlined" color="primary">
                {variable.value}
              </Button>
            </Grid>)
          }
        });

      render_object = (<div className={classes.root}>
        <Grid container spacing={3} className={classes.variables_grid}>
          {variables}
        </Grid>
        </div>)
    } else {
      render_object = (<Tree
        data={data}
        translate={{
          x: GRAPH_ATTRIBUTES.translateX,
          y: GRAPH_ATTRIBUTES.translateY,
        }}
        orientation={GRAPH_ATTRIBUTES.orientation}
      />)
    }

    return (
      <div id="treeWrapper" style={{ width: "50em", height: "30em" }}>
        {render_object}
      </div>
    );
  }
}
export default withStyles(styles)(ComponentRender);
