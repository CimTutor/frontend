import React from "react";
import _ from "lodash";
import {
  Grid,
  withStyles,
  Typography,
  Card,
  CardContent,
} from "@material-ui/core/";

const styles = {
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  variable_grid: {
    textAlign: "left",
  },
};

class MyFuckingStruct extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, data } = this.props;

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
  }
}

export default withStyles(styles)(MyFuckingStruct);
