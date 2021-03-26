import _ from "lodash";
import actionTypes from "../actionTypes";

const loadingReducer = ($$state = false, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.loading.UPDATE:
      return payload;
    default:
      return $$state;
  }
};

export default loadingReducer;
