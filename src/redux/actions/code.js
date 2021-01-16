import actionTypes from "../actionTypes";
import request from "../../util/request";

export const sendCodeToCompile = (code) => {
  console.log("Sending Code: ", code);
  return function (dispatch) {
    request
      .post("processCode", { data: { code: code } })
      .then((data) => {
        dispatch({
          type: actionTypes.code.UPDATE,
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

export const updateCodeValue = (code) => {
  return {
    type: actionTypes.code.NEW,
    payload: code,
  };
};
