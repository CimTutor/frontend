import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import thunkMiddleware from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = (props) => {
  const middlewares = [thunkMiddleware];

  const composedStore = composeEnhancers(applyMiddleware(...middlewares));

  const storeCreator = composedStore(createStore);

  const data = {};

  return storeCreator(rootReducer, data);
};

export default store;
