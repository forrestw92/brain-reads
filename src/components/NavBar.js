import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import HomeIcon from "../images/home.svg";
import BackIcon from "../images/arrow-left.svg";
import Logo from "../images/logo.png";
export default class NavBar extends Component {
  render() {
    return (
      <header className={"logo"}>
        <nav>
          <Link className={"homeLink"} to={process.env.PUBLIC_URL + "/"}>
            <img src={HomeIcon} alt={"Go home"} />
          </Link>
          {this.props.shouldGoBack && (
            <Link to={this.props.goBack} className={"backLink"}>
              <img src={BackIcon} alt={"Go back"} onClick={this.props.goBack} />
            </Link>
          )}
        </nav>
        <h1>
          <img src={Logo} alt={"Brain reads logo"} />
          Reads
        </h1>
      </header>
    );
  }
}
NavBar.propTypes = {
  isFiltering: PropTypes.bool,
  goBack: PropTypes.func,
  shouldGoBack: PropTypes.bool
};
