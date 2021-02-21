import { combineReducers } from "redux";
import code from "./code";
import response from "./response";
import render from "./render";

export default combineReducers({ code, response, render });
