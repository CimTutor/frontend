import React from "react";
import _ from "lodash";
import {
  Grid,
  withStyles,
  Typography,
  Button,
  ButtonGroup,
} from "@material-ui/core/";

const styles = {
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
};

class MyFuckingVariables extends React.Component {
  constructor(props) {
    super(props);
  }

  getRenderComponent = (data, classes) => {
    console.log("GET RENDER", data);
    let res = _.get(data, "data", []).map((variable, i) => {
      if (_.get(variable, "values", undefined)) {
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

    return res;
  };

  render() {
    const { classes, data } = this.props;
    const variables = this.getRenderComponent(data, classes);

    console.log(variables);

    return (
      <div className={classes.root}>
        <Grid container spacing={3} className={classes.variables_grid}>
          {variables}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(MyFuckingVariables);
