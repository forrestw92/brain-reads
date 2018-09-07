import React, { Component } from "react";
import PropTypes from "prop-types";
import BookApi from "../api/BookApi";
import NavBar from "../components/NavBar";
import ReactHtmlParser from "react-html-parser";
import { withRouter } from "react-router-dom";

class SingleBook extends Component {
  constructor() {
    super();
    this.state = {
      singleBook: { loading: true }
    };
  }
  navBack = () => {
    if (this.props.history) {
      this.props.history.goBack();
    }
  };
  async componentDidMount() {
    try {
      const singleBook = await BookApi.lookup(this.props.match.params.volumeID);
      if (singleBook.length === 0) {
        return;
      }
      this.setState({ singleBook: singleBook.book });
    } catch (error) {
      this.setState({ error });
    }
  }
  addOrMoveBook(shelf) {
    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.addBook
    ) {
      this.props.addBook(this.props.match.params.volumeID, shelf);
    } else {
      this.props.moveBook(this.props.match.params.volumeID, shelf);
    }
  }
  render() {
    return (
      <div className={"search"}>
        <NavBar
          goBack={this.navBack}
          shouldGoBack={
            this.props.history &&
            this.props.location.state &&
            this.props.location.state.cameFromHome
          }
        />
        {this.state.singleBook.loading && (
          <h1 style={{ textAlign: "center", margin: "auto" }}>Loading...</h1>
        )}
        {!this.state.singleBook.loading && (
          <div className={"grid"}>
            <section role="main">
              <div className="singleBook">
                <div className="title" tabIndex={-1}>
                  <h1>{this.state.singleBook.title}</h1>
                </div>
                <div className="singleBody">
                  <div className="bookImage">
                    <img
                      className={"border"}
                      src={this.state.singleBook.thumbnail}
                      alt="Book cover"
                    />
                  </div>

                  <div
                    className={"bookDetails"}
                    tabIndex={0}
                    aria-label={"Book Details"}
                  >
                    <p className={"detail"} tabIndex={0}>
                      <strong name="pageCount">Pages:</strong>
                      {this.state.singleBook.pageCount}
                    </p>
                    <p className={"detail"} tabIndex={0}>
                      <strong>Type:</strong>
                      {this.state.singleBook.printType}
                    </p>
                    <p className={"detail"} tabIndex={0}>
                      <strong>Published Date:</strong>
                      {this.state.singleBook.publishedDate}
                    </p>
                    {this.state.singleBook.industryIdentifiers &&
                      this.state.singleBook.industryIdentifiers.map(
                        (isbn, idx) => (
                          <p key={idx} className={"detail"} tabIndex={0}>
                            <strong>{isbn.type.replace("_", "#")}:</strong>
                            {isbn.identifier}
                          </p>
                        )
                      )}
                  </div>
                  <div
                    className={"bookAuthors"}
                    tabIndex={0}
                    aria-label={"Authors"}
                  >
                    {this.state.singleBook.authors &&
                      this.state.singleBook.authors.map((author, idx) => (
                        <p key={idx}>{author}</p>
                      ))}
                  </div>
                  <div
                    className="bookMove"
                    tabIndex={0}
                    aria-label={"Move Book To"}
                  >
                    <button
                      className="button"
                      onClick={() => this.addOrMoveBook("read")}
                    >
                      Read
                    </button>
                    <button
                      className="button"
                      onClick={() => this.addOrMoveBook("wantToRead")}
                    >
                      Wanting to read
                    </button>
                    <button
                      className="button"
                      onClick={() => this.addOrMoveBook("currentlyReading")}
                    >
                      Currently Reading
                    </button>
                  </div>
                  {this.state.singleBook &&
                    this.state.singleBook.description && (
                      <div
                        className="bookDescription"
                        tabIndex={0}
                        aria-label={"Book Description"}
                      >
                        <div tabIndex={0}>
                          {ReactHtmlParser(this.state.singleBook.description)}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    );
  }
}
SingleBook.propTypes = {
  cameFromHome: PropTypes.bool,
  location: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object,
  moveBook: PropTypes.func.isRequired,
  addBook: PropTypes.func.isRequired
};
export default withRouter(SingleBook);
