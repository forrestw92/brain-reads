import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Search from "./pages/Search";
import Home from "./pages/Home";
import "./App.css";
import Footer from "./components/Footer";
import SingleBook from "./pages/SingleBook";
import FullShelf from "./pages/FullShelf";
import flexibility from "flexibility";
import "babel-polyfill";
import Provider, { MyContext } from "./components/Provider";

class App extends Component {
  update() {
    flexibility(document.body);
  }
  render() {
    return (
      <div className="App">
        <Provider>
          <Switch>
            <Route
              path={`${process.env.PUBLIC_URL}/`}
              exact
              render={() => (
                <MyContext.Consumer>
                  {context => <Home {...context} />}
                </MyContext.Consumer>
              )}
              onUpdate={this.update}
            />
            <Route
              path={`${process.env.PUBLIC_URL}/search`}
              exact
              render={() => (
                <MyContext.Consumer>
                  {context => <Search {...context} />}
                </MyContext.Consumer>
              )}
              onUpdate={this.update}
            />
            <Route
              path={`${process.env.PUBLIC_URL}/book/:volumeID`}
              render={() => (
                <MyContext.Consumer>
                  {context => <SingleBook {...context} />}
                </MyContext.Consumer>
              )}
              onUpdate={this.update}
            />
            <Route
              path={`${process.env.PUBLIC_URL}/shelf/:shelf/:pageID`}
              render={() => (
                <MyContext.Consumer>
                  {context => <FullShelf {...context} />}
                </MyContext.Consumer>
              )}
              onUpdate={this.update}
            />
          </Switch>
          <Footer />
        </Provider>
      </div>
    );
  }
}
export default App;
