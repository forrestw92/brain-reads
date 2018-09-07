import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import NavBar from "../components/NavBar";
import Shelf from "../components/Shelf";
import SearchIcon from "../images/search.svg";
class Home extends Component {
  async componentDidMount() {
    await this.props.getBooks();
  }
  shouldRenderShelfs() {
    if (this.state.books.length > 0) {
    }
  }
  render() {
    return (
      <React.Fragment>
        <NavBar />
        {this.props.books.length === 0 && (
          <h1 style={{ textAlign: "center", margin: "auto" }}>Loading...</h1>
        )}
        <div className={"searchFAB"}>
          <Link to={process.env.PUBLIC_URL + "/search"}>
            <img src={SearchIcon} alt={"Search ICON"} />
          </Link>
        </div>
        <div className={"grid"} data-grid="center">
          <div className={this.props.books.length === 0 ? "hide" : "slideIn"}>
            <Shelf
              books={this.props.currentlyReading}
              title={"Currently Reading"}
              tabIndex={0}
              page={"reading"}
              maxCount={6}
              pageNumber={0}
              count={this.props.countCurrentlyReading.count}
            />
            <Shelf
              books={this.props.wantsToRead}
              title={"Wanting to Read"}
              page={"wanttoread"}
              tabIndex={1}
              count={this.props.countWantToRead.count}
              maxCount={6}
              pageNumber={0}
            />
            <Shelf
              books={this.props.read}
              title={"Read"}
              tabIndex={2}
              maxCount={6}
              page={"read"}
              pageNumber={0}
              count={this.props.countRead.count}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
Home.propTypes = {
  state: PropTypes.object,
  books: PropTypes.array,
  currentlyReading: PropTypes.array,
  read: PropTypes.array,
  wantsToRead: PropTypes.array,
  getBooks: PropTypes.func.isRequired
};
export default withRouter(Home);
