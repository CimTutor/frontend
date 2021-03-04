import React from "react";
import { Grid, withStyles, Box, Button, Paper } from "@material-ui/core/";
import Graph from "react-graph-vis";

const styles = {
  pageContainer: {
    padding: "16rem",
  },
};

class RenderingConatainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, value, onChange } = this.props;
    return (
      <Paper className={classes.pageContainer}>
        <Button variant="contained">RENDER HERE</Button>
      </Paper>
    );
  }
}

export default withStyles(styles)(RenderingConatainer);
