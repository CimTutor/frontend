import _ from "lodash";
import actionTypes from "../actionTypes";
import defaultResponse from "../../constants/sampleResponse"
const responseReducer = ($$state = defaultResponse, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.response.UPDATE:
      return payload;
    default:
      return $$state;
  }
};

export default responseReducer;
