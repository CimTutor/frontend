import { combineReducers } from "redux";
import code from "./code";
import response from "./response";
import render from "./render";
import loading from "./loading";

export default combineReducers({ code, response, render, loading });
