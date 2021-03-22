import actionTypes from "../actionTypes";
import request from "../../util/request";

export const sendCodeToCompile = (code) => {
  return function (dispatch) {
    request
      .post("processCode", { data: { code: code } })
      .then((data) => {
        console.log(data);
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
      .post("write", { data: { key: key,code: code } })
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
