import React from "react";
import {
  IconButton,
  OutlinedInput,
  InputAdornment,
  FormControl,
  makeStyles,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: "#008060",
  },
  searchInput: {
    backgroundColor: "white",
  },
}));

export default function SearchBar(props) {
  const { onClick, label } = props;
  const classes = useStyles();
  const [searchValue, setSearchValue] = React.useState("");

  const handleClick = () => {
    onClick && onClick(searchValue);
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      handleClick();
    }
  };

  return (
    <FormControl variant="outlined">
      <OutlinedInput
        onKeyDown={keyPress}
        className={classes.searchInput}
        id={label}
        type="text"
        value={searchValue}
        onChange={handleChange}
        placeholder={label}
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="search" onClick={handleClick} edge="end">
              <SearchIcon className={classes.icon} />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
