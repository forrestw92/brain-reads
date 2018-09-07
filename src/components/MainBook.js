import React, { Component } from "react";
import LazyLoad from "react-lazyload";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import StarRating from "../components/StarRating";
export default class MainBook extends Component {
  constructor() {
    super();
    this.state = {
      shouldRenderModal: false
    };
  }
  render() {
    return (
      <div
        className={
          this.props.selected ? "bookCard selected col-3" : "bookCard col-3"
        }
        style={{ order: this.props.order }}
        tabIndex={0}
      >
        <div className="bookHeader">
          <div className="bookImage">
            <LazyLoad height={333}>
              <img
                className="fixed1234"
                src={
                  this.props.bookDetails.images.small ||
                  this.props.bookDetails.thumbnail
                }
                alt={this.props.bookDetails.title}
              />
            </LazyLoad>
          </div>
        </div>
        <div className="bookBody">
          <div
            className="bookRating"
            aria-label={
              this.props.bookDetails.userRating > -1
                ? this.props.bookDetails.userRating + " stars."
                : this.props.bookDetails.averageRating || 0 + " stars."
            }
          >
            <StarRating
              averageRating={this.props.bookDetails.averageRating}
              userRating={this.props.bookDetails.userRating}
            />
          </div>
          <div className="bookTitle">
            <strong>
              {this.props.bookDetails.title.length > 160
                ? this.props.bookDetails.title.substr(0, 160) + "..."
                : this.props.bookDetails.title}
            </strong>
          </div>
          <div
            className="bookAuthor"
            aria-label={
              !this.props.bookDetails.authors
                ? "No author."
                : "Author " + this.props.bookDetails.authors
            }
          >
            {!this.props.bookDetails.authors && <i>No Author Found.</i>}
            {this.props.bookDetails.authors && (
              <span>
                By <i>{this.props.bookDetails.authors[0]}</i>
              </span>
            )}
          </div>
        </div>
        <Link
          to={{
            pathname:
              process.env.PUBLIC_URL +
              "/book/" +
              this.props.bookDetails.volumeID,
            state: { cameFromHome: true, addBook: this.props.addBook }
          }}
          aria-label={"View Book"}
          className="cornerFold"
        >
          <div className="fold" />
        </Link>
      </div>
    );
  }
}
MainBook.defaultProps = {
  selected: false
};
MainBook.propTypes = {
  bookDetails: PropTypes.object,
  order: PropTypes.number,
  selected: PropTypes.bool,
  tabIndex: PropTypes.number,
  addBook: PropTypes.bool
};
