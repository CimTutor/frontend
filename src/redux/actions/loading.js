import actionTypes from "../actionTypes";

export const updateLoadingState = (state) => {
  return {
    type: actionTypes.loading.UPDATE,
    payload: state,
  };
};
