import { combineReducers } from "redux";
import movies from "./movies";
import nominated from "./nominated";

export default combineReducers({ movies, nominated });
