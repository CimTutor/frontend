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
      <Box mt="1rem" mb="1rem" ml="2rem">
        <Toolbar>
          <Typography variant="h4" noWrap>
            {title}
          </Typography>
          <Box ml="2rem">
            <SearchBar onClick={onSearch} label="Search for Movies..." />
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
}
