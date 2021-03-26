import React from "react";
import _ from "lodash";
import {
  Grid,
  withStyles,
  Typography,
  Card,
  CardContent,
  Box,
  Divider,
} from "@material-ui/core/";

const styles = {
  pos: {
    marginBottom: 12,
  },
  variable_grid: {
    textAlign: "left",
  },
  root: {
    minWidth: "10rem",
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
        <Box mt="3rem" ml="3rem">
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h4" color="textPrimary" gutterBottom>
                {_.get(data, "name", "")}
              </Typography>

              <Divider style={{ marginBottom: "1rem" }} />
              {_.map(_.get(data, "values"), (f) => {
                return (
                  <Typography className={classes.pos} color="textSecondary">
                    {_.get(f, "field") + " : " + _.get(f, "value")}
                  </Typography>
                );
              })}
            </CardContent>
          </Card>
        </Box>
      </Grid>
    );
  }
}

export default withStyles(styles)(MyFuckingStruct);
