import { StayPrimaryLandscapeRounded } from "@material-ui/icons";
import _ from "lodash";

import actionTypes from "../actionTypes";

const nominatedReducer = ($$state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.nominated.UPDATE:
      return [...$$state, payload];
    case actionTypes.nominated.SHOW:
    default:
      return $$state;
  }
};

export default nominatedReducer;
