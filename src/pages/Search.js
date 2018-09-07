import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import BookApi from "../api/BookApi";
import NavBar from "../components/NavBar";
import Filter from "../components/Filter";
import SearchIcon from "../images/search.svg";
import FilterIcon from "../images/filter.svg";
import AutoComplete from "../components/AutoComplete";
import MainBook from "../components/MainBook";
import { MyContext } from "../components/Provider";
class Search extends Component {
  constructor() {
    super();
    this.state = {
      isFocused: false,
      isFiltering: false
    };
    this.disableIsFiltering = this.disableIsFiltering.bind(this);
  }

  disableIsFiltering() {
    if (this.state.isFiltering === true) {
      this.setState({ isFiltering: false });
    }
  }

  handleKeyInput = e => {
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        if (this.props.selectedSuggestion <= 0) {
          this.props.updateSuperState({
            selectedSuggestion: this.props.bookTitles.length - 1
          });
        } else {
          this.props.updateSuperState({
            selectedSuggestion: this.props.selectedSuggestion - 1
          });
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        if (this.props.selectedSuggestion >= this.props.bookTitles.length - 1) {
          this.props.updateSuperState({ selectedSuggestion: 0 });
        } else {
          this.props.updateSuperState({
            selectedSuggestion: this.props.selectedSuggestion + 1
          });
        }
        break;
      default:
        return;
    }
  };
  handleChange = async e => {
    e.persist();

    try {
      await this.props.updateSuperState({ searchInput: e.target.value.trim() });
      if (this.props.searchInput.trim() === "") {
        this.props.updateSuperState({ bookTitles: [] });
        this.props.updateSuperState({ searchBooks: [] });
      } else {
        let results = await BookApi.search(
          this.props.searchInput.trim(),
          this.props.searchOptions
        );
        if (!results || results.error) {
          this.props.updateSuperState({ bookTitles: [] });
          this.props.updateSuperState({ searchBooks: [] });
        } else {
          let titles = results.books.map(result => {
            return {
              title: result.title,
              id: result.volumeID,
              authors: result.authors
            };
          });
          this.props.updateSuperState({ bookTitles: titles });
          this.props.updateSuperState({ searchBooks: results });
        }
      }
    } catch (error) {
      this.setState({ bookTitles: ["Error"] });
      this.props.updateSuperState({ bookTitles: [] });
      this.props.updateSuperState({ searchBooks: [] });
    }
  };
  render() {
    return (
      <div className="search">
        <NavBar
          shouldGoBack={this.state.isFiltering}
          goBack={this.disableIsFiltering}
        />
        {this.state.isFiltering && (
          <MyContext.Consumer>
            {context => <Filter {...context} />}
          </MyContext.Consumer>
        )}
        {!this.state.isFiltering && (
          <form
            className="autoComplete"
            onKeyDown={this.handleKeyInput}
            onSubmit={e => e.preventDefault()}
            role="search"
          >
            <div className="searchBar" aria-label={"Search and filter books"}>
              <div
                tabIndex={0}
                aria-label={"Filter Search"}
                onClick={() => this.setState({ isFiltering: true })}
              >
                <img
                  src={FilterIcon}
                  alt={"Filter results"}
                  className={"filterIcon"}
                />
              </div>
              <input
                type="text"
                placeholder="Search..."
                defaultValue={this.props.searchInput}
                onChange={this.handleChange}
                onFocus={() => this.setState({ isFocused: true })}
                onBlur={() => this.setState({ isFocused: false })}
              />
              <img
                src={SearchIcon}
                alt={"Search icon"}
                className={"searchIcon"}
              />
            </div>
            {this.props.bookTitles.length > 0 &&
              this.state.isFocused &&
              this.props.searchBooks &&
              !this.state.isFiltering && (
                <AutoComplete
                  suggestions={this.props.bookTitles}
                  selected={this.props.selectedSuggestion}
                  input={this.state.selected}
                  shouldRender={
                    this.props.bookTitles.length > 0 &&
                    this.state.isFocused &&
                    this.props.searchBooks
                  }
                />
              )}
          </form>
        )}
        <div className="grid">
          {this.props.searchBooks.books &&
            !this.state.isFiltering &&
            this.props.searchBooks.books.map((book, idx) => (
              <MainBook
                key={book.volumeID}
                bookDetails={book}
                selected={this.props.selectedSuggestion === idx}
                order={this.props.selectedSuggestion === idx ? 0 : idx + 1}
                addBook={true}
              />
            ))}
        </div>
      </div>
    );
  }
}
Search.propTypes = {
  searchBooks: PropTypes.object,
  bookTitles: PropTypes.array,
  updateSuperState: PropTypes.func,
  selectedSuggestion: PropTypes.number,
  searchInput: PropTypes.string,
  searchOptions: PropTypes.object,
  addBook: PropTypes.bool
};
export default withRouter(Search);
