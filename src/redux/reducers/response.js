import _ from "lodash";
import actionTypes from "../actionTypes";

const responseReducer = ($$state = "", action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.response.UPDATE:
      return payload.creation;
    default:
      return $$state;
  }
};

export default responseReducer;
