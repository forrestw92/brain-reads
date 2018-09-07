import React, { Component } from "react";
import BookApi from "../api/BookApi";

export const MyContext = React.createContext();

export default class Provider extends Component {
  state = {
    error: "",
    //Home page info
    books: [],
    allBooks: [],
    currentlyReading: [],
    read: [],
    wantsToRead: [],
    countCurrentlyReading: {},
    countRead: {},
    countWantToRead: {},
    //Search options
    searchOptions: {},
    searchQuery: {},
    searchInput: "",
    searchBooks: {},
    bookTitles: [],
    //Auto Complete options
    selectedSuggestion: 0,
    searchBookTitles: []
  };

  clearBooks = () => {
    this.setState({
      books: []
    });
  };
  updateSuperState = newState => {
    this.setState(newState);
  };
  moveBook = async (volumeID, shelf) => {
    try {
      const movedBook = await BookApi.move(volumeID, shelf);
      if (movedBook.success) {
        await this.getBooks(true);
      }
    } catch (error) {
      return error;
    }
  };
  addBook = async (volumeID, shelf) => {
    try {
      const addedBook = await BookApi.add(volumeID, shelf);
      if (addedBook.success) {
        await this.getBooks(true);
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  getBooks = async force => {
    try {
      const allBooks =
        !force && localStorage.allBooks
          ? JSON.parse(localStorage.allBooks)
          : await BookApi.getBooks();
      const currentlyReading = allBooks.books.filter(
        book => book.shelf === "currentlyReading"
      );
      const wantsToRead = allBooks.books.filter(
        book => book.shelf === "wantToRead"
      );
      const read = allBooks.books.filter(book => book.shelf === "read");
      const books = allBooks.books;
      const countCurrentlyReading = allBooks.count.filter(
        item => item.shelf === "currentlyReading"
      )[0];
      const countRead = allBooks.count.filter(item => item.shelf === "read")[0];
      const countWantToRead = allBooks.count.filter(
        item => item.shelf === "wantToRead"
      )[0];
      this.setState({
        currentlyReading,
        wantsToRead,
        read,
        books,
        countCurrentlyReading,
        countRead,
        countWantToRead
      });
      localStorage.countReading = JSON.stringify(countCurrentlyReading);
      localStorage.countRead = JSON.stringify(countRead);
      localStorage.countWantToRead = JSON.stringify(countWantToRead);
      localStorage.allBooks = JSON.stringify(allBooks);
    } catch (error) {
      this.setState({ error });
    }
  };
  render() {
    return (
      <MyContext.Provider
        value={{
          ...this.state,
          getBooks: this.getBooks,
          clearBooks: this.clearBooks,
          updateSuperState: this.updateSuperState,
          moveBook: this.moveBook,
          addBook: this.addBook
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}
