import actionTypes from "../actionTypes";
import request from "../../util/request";

export const fetchMoviesByTitle = (title) => {
  return function (dispatch) {
    request
      .get(`?s=${title}`)
      .then((data) =>
        dispatch({
          type: actionTypes.movies.UPDATE,
          payload: data,
        })
      )
      .catch((error) =>
        dispatch({
          type: "",
          payload: error,
        })
      );
  };
};

export const fetchMoviesByTitleAndYear = (title, year) => {
  return function (dispatch) {
    request
      .get(`?s=${title}&y=${year}`)
      .then((data) =>
        dispatch({
          type: actionTypes.movies.UPDATE,
          payload: data,
        })
      )
      .catch((error) =>
        dispatch({
          type: "",
          payload: error,
        })
      );
  };
};
