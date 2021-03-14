import "./App.css";
import React from "react";
import LandingPage from "./containers/LandingPage";
import Home from "./containers/Home";
import createStore from "./redux/store";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.store = createStore(props);
  }

  render() {
    return (
      <Provider store={this.store}>
        <div className="App">
          <Router>
              <Switch>
                <Route path="/LandingPage">
                  <LandingPage />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
          </Router>
        </div>
      </Provider>
    );
  }
}
