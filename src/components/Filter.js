import React, { Component } from "react";
import PropTypes from "prop-types";
// field(title,author,publisher,subject,isbn) orderBy relevance,newest resultType books,magazines,all

export default class Filter extends Component {
  constructor() {
    super();
    this.state = {
      field: "title",
      orderBy: "relevance",
      type: "all"
    };
  }
  handleSelectChange = e => {
    const value = e.target.value;
    const type = e.target.name;
    console.log(type, value);
    switch (type) {
      case "field":
        this.setState({ field: value });
        break;
      case "orderBy":
        this.setState({ orderBy: value });
        break;
      case "resultType":
        this.setState({ type: value });
        break;
      default:
        return;
    }
  };
  handleFilterButton = () => {
    const returnData = { options: this.state };
    this.props.changeFilterOptions(returnData);
  };
  render() {
    return (
      <div className="filterPanel grid">
        <label htmlFor="field">
          <h3>Search By</h3>
          <select
            name="field"
            className="customSelect"
            onChange={this.handleSelectChange}
          >
            <option value="title" defaultChecked>
              Title
            </option>
            <option value="author">Author</option>
            <option value="publisher">Publisher</option>
            <option value="subject">Subject</option>
            <option value="isbn">ISBN</option>
          </select>
        </label>
        <label htmlFor="orderBy">
          <h3>Order By</h3>
          <select
            name="orderBy"
            className="customSelect"
            onChange={this.handleSelectChange}
          >
            <option defaultValue="selected" value="relevance">
              Relevance
            </option>
            <option value="newest">Newest</option>
          </select>
        </label>
        <label htmlFor="resultType">
          <h3 id={"res"}>Result Type</h3>
          <select
            name="resultType"
            className="customSelect"
            onChange={this.handleSelectChange}
            aria-labelledby={"res"}
          >
            <option defaultValue="selected" value="all">
              All
            </option>
            <option value="books">Books</option>
            <option value="magazines">Magazines</option>
          </select>
        </label>
        <div className="buttonGroup">
          <button className="button reset">Reset</button>
          <button className="button submit" onClick={this.handleFilterButton}>
            Filter
          </button>
        </div>
      </div>
    );
  }
}
Filter.propTypes = {
  changeFilterOptions: PropTypes.func.isRequired
};
