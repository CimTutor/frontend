import actionTypes from "../actionTypes";
import request from "../../util/request";

export const fetchMoviesSharableLink = (imdbID) => {
  return function (dispatch) {
    request
      .get(`?i=${imdbID}`)
      .then((data) => {
        dispatch({
          type: actionTypes.nominated.UPDATE,
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
