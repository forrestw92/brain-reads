import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import NavBar from "../components/NavBar";
import BookApi from "../api/BookApi";
import Shelf from "../components/Shelf";
class FullShelf extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      count: 0,
      shelf: "",
      validShelfs: ["read", "reading", "wanttoread"]
    };
  }

  updatePage = async () => {
    try {
      if (this.props.books.length === 0) {
        await this.props.getBooks();
      }
      let shelf = this.props.match.params.shelf;
      let pageID = this.props.match.params.pageID;
      switch (shelf) {
        case "read":
          this.setState({ shelf: "Read", count: this.props.countRead.count });
          break;
        case "reading":
          this.setState({
            shelf: "Currently Reading",
            count: this.props.countReading.count
          });
          break;
        case "wanttoread":
          this.setState({
            shelf: "Want To Read",
            count: this.props.countWantToRead.count
          });
          break;
        default:
          this.setState({ error: true });
      }
      const shelfPage = await BookApi.shelf(shelf, parseInt(pageID));
      if (shelfPage.length === 0) {
        return;
      }
      this.setState({ books: shelfPage.books });
    } catch (error) {
      this.setState({ error });
    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.pageID !== this.props.match.params.pageID) {
      this.updatePage();
    }
  }
  async componentDidMount() {
    try {
      await this.updatePage();
    } catch (error) {
      this.setState({ error });
    }
  }
  render() {
    if (!this.state.books) {
      return <React.Fragment>Loading...</React.Fragment>;
    }
    return (
      <div className={"search"}>
        <NavBar />
        {this.state.error && <h1 data-grid="center">No Shelf Found</h1>}
        {!this.state.error && (
          <div className={"grid"} data-grid="center">
            <Shelf
              books={this.state.books}
              title={this.state.shelf}
              tabIndex={1}
              page={this.props.match.params.shelf}
              count={this.state.books.length}
              maxCount={10}
              pageNumber={parseInt(this.props.match.params.pageID)}
            />
          </div>
        )}
      </div>
    );
  }
}
export default withRouter(FullShelf);
