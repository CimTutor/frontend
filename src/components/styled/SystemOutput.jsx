import React from "react";

import { Paper, Box, Typography, makeStyles } from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";

const useStyles = makeStyles((theme) => ({
  titleStyles: {
    borderTop: `2px solid #E2E2E2`,
    borderBottom: `2px solid #E2E2E2`,
    backgroundColor: grey[100],
    overflow: "auto",
  },
  titleBoxBorder: {
    // border: `2px solid #E2E2E2`
  },
  outputTerminal: {
    height: theme.spacing(24),
    backgroundColor: "#FFFFFF",
    overflow: "auto",
  },
}));

export default function SystemOutput(props) {
  const classes = useStyles();
  const { output, error } = props;

  let output_lines_array = output ? output.split("\n") : [];
  let error_msg = error ? (
    <Typography variant="body1" align="left" color="error">
      {error}
    </Typography>
  ) : (
    <div />
  );

  const output_lines = output_lines_array.map((line, index) => (
    <Typography key={index} variant="body1" align="left">
      {line}
    </Typography>
  ));

  return (
    <div style={{ maxWidth: "100%", marginTop: "2%", overflow: "scroll" }}>
      <Paper className={classes.titleStyles} square>
        <Box className={classes.titleBoxBorder} p={1}>
          <Typography color="textPrimary" variant="subtitle1" align="left">
            System Output:
          </Typography>
        </Box>
      </Paper>

      <Paper className={classes.outputTerminal} square>
        <Box p={1}>
          {error_msg}
          {output_lines}
        </Box>
      </Paper>
    </div>
  );
}
