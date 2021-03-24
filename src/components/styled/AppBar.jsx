import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Box,
} from "@material-ui/core";

import SearchBar from "./SearchBar";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.primary,

  },
}));

export default function AppBarWithSearch(props) {
  const classes = useStyles();
  const { title, onSearch = () => {} } = props;
  return (
    <AppBar position="static" className={classes.appBar}>
      <Box mt="0rem" mb="0rem" ml="1rem">
        <Toolbar>
          <Typography variant="h5" noWrap>
            {title}
          </Typography>
        </Toolbar>
      </Box>
    </AppBar>
  );
}
