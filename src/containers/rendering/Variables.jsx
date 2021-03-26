import React from "react";
import _ from "lodash";
import {
  Grid,
  withStyles,
  Typography,
  Button,
  ButtonGroup,
  Tooltip
} from "@material-ui/core/";

const styles = {
  variable_names: {
    display: "inline",
    padding: "10px",
    align: "left",
  },
  variables_grid: {
    paddingTop: "20px",
  },
  variable_grid: {
    textAlign: "left",
  },
  arrays: {
    paddingTop: '10px'
  }
};

class MyFuckingVariables extends React.Component {
  constructor(props) {
    super(props);
  }

  getRenderComponent = (data, classes) => {
    console.log("GET RENDER", data);
    let res = _.get(data, "data", []).map((variable, i) => {
      if (_.get(variable, "values", undefined)) {
        let pointers = _.get(variable, "pointers", [])
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
              classNames={classes.arrays}
            >
              {_.get(variable, "values", []).map((index, i) => {
                if (_.get(variable, "values", []).length === pointers.length && (pointers[i].length > 0)) {
                  let pointer_names = "";
                  pointers[i].forEach(pointer_name => {
                    pointer_names += pointer_name + " "
                  });

                  return (
                    <Tooltip style={{'paddingBottom':"-10px"}}open="true" title={'* ' + pointer_names} placement="top" arrow={true}>
                      <Button key={variable.name + "-" + i}>{index}</Button>
                    </Tooltip>
                  )
                }
                return (<Button key={variable.name + "-" + i}>{index}</Button>)
              })}
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
        <Grid container spacing={5} className={classes.variables_grid}>
          {variables}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(MyFuckingVariables);
