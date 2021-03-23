import _ from "lodash";
import actionTypes from "../actionTypes";

const renderReducer = ($$state = -1, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.render.NEW:
      return payload;
    case actionTypes.render.UPDATE:
      return payload;
    default:
      return $$state;
  }
};

export default renderReducer;
