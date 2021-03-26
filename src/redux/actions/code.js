import actionTypes from "../actionTypes";
import request from "../../util/request";
import * as loadingActions from "./loading";
import sha256 from 'crypto-js/sha256';

export const sendCodeToCompile = (code) => {
  const salt = "63479AD69A090B258277EC8FBA6F99419A2FFB248981510657C944CCD1148E97";
  const pword = "3C469E9D6C5875D37A43F353D4F88E61FCF812C66EEE3457465A40B0DA4153E0";
  const token = sha256(salt + pword).toString();

  return function (dispatch) {
    request
      .post("processCode", { 
        data: { 
          code: code,
          token: token 
        },
      })
      .then((data) => {
        console.log(data);
        dispatch({
          type: actionTypes.loading.UPDATE,
          payload: false,
        });
        dispatch({
          type: actionTypes.response.UPDATE,
          payload: data,
        });
      })
      .catch((error) =>
        dispatch({
          type: "",
          payload: error,
        })
      );
  };
};

export const sendCodeToShare = (key, code) => {
  return function (dispatch) {
    request
      .post("write", { data: { key: key, code: code } })
      .then((data) => {
        dispatch({
          type: actionTypes.response.UPDATE,
          payload: data,
        });
      })
      .catch((error) =>
        dispatch({
          type: "",
          payload: error,
        })
      );
  };
};

export const getCodeToShare = (key) => {
  return function (dispatch) {
    request
      .get("read", { data: { key: key } })
      .then((data) => {
        dispatch({
          type: actionTypes.code.NEW,
          payload: Object.values(data).join(""),
        });
      })
      .catch((error) =>
        dispatch({
          type: "",
          payload: error,
        })
      );
  };
};

export const updateCodeValue = (code) => {
  return {
    type: actionTypes.code.NEW,
    payload: code,
  };
};
