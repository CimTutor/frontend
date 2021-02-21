import actionTypes from "../actionTypes";

export const updateRenderState = (state) => {
  return {
    type: actionTypes.render.UPDATE,
    payload: state,
  };
};
