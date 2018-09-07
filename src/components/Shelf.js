import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import MainBook from "./MainBook";
import ArrowRight from "../images/arrow-right.svg";
export default class Shelf extends Component {
  generateNextPageLink = () => {
    let pageNumber = this.props.pageNumber ? this.props.pageNumber + 1 : 1;
    let shouldShowLink = this.props.count * pageNumber >= this.props.maxCount;
    if (shouldShowLink) {
      let link =
        process.env.PUBLIC_URL +
        "/shelf/" +
        this.props.page +
        "/" +
        (this.props.pageNumber > 0 && this.props.pageNumber
          ? parseInt(this.props.pageNumber) + 1
          : "1"
        ).toString();
      return (
        <div className={"nextPage top"}>
          <Link className="button next" to={link.toString()}>
            <img src={ArrowRight} alt={"Next Page"} />
          </Link>
        </div>
      );
    }
  };
  render() {
    if (this.props.books) {
      console.log(this.props);
      let books = this.props.books.map((item, idx) => (
        <MainBook
          bookDetails={item}
          key={item.volumeID}
          order={idx}
          tabIndex={this.props.tabIndex}
        />
      ));
      return (
        <div className={"shelf "} data-grid="center" tabIndex={0}>
          <div className={"shelfTitle col-12"}>
            <h3 name="shelfName">{this.props.title}</h3>
          </div>
          {books}
          {this.generateNextPageLink()}
        </div>
      );
    }
    return (
      <div className={"shelf"} data-grid="center">
        <div className={"shelfTitle"}>
          <h3>{this.props.title}</h3>
        </div>
      </div>
    );
  }
}
Shelf.propTypes = {
  books: PropTypes.array,
  title: PropTypes.string,
  tabIndex: PropTypes.number,
  page: PropTypes.string,
  pageNumber: PropTypes.number
};
