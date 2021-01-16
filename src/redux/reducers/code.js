import _ from "lodash";

import actionTypes from "../actionTypes";

const codeReducer = ($$state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.code.NEW:
      return payload;
    case actionTypes.code.SHOW:
    default:
      return $$state;
  }
};

export default codeReducer;
