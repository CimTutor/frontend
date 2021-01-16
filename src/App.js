import "./App.css";
import React from "react";
import LandingPage from "./containers/LandingPage";
import createStore from "./redux/store";
import { Provider } from "react-redux";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.store = createStore(props);
  }

  render() {
    return (
      <Provider store={this.store}>
        <div className="App">
          <LandingPage />
        </div>
      </Provider>
    );
  }
}
