import React, { Component } from "react";
import PropTypes from "prop-types";

export default class AutoComplete extends Component {
  getAuthors = item => {
    if (!item.authors) {
      return "No Author";
    }
    return <strong>{item.authors[0]}</strong>;
  };
  matchWords = items => {
    if (!items.title) {
      return;
    }
    return items.title.split(" ").map((part, idx) => {
      if (this.props.input && this.props.input.includes(part)) {
        return (
          <span key={idx} className="in">
            {" "}
            {part}
          </span>
        );
      }
      return <span key={idx}> {part}</span>;
    });
  };
  render() {
    return (
      <div className="autoSuggestions">
        {this.props.suggestions &&
          this.props.suggestions.map((items, index) => (
            <div
              className={
                index === this.props.selected
                  ? "suggestion selected"
                  : "suggestion"
              }
              key={index}
            >
              {this.matchWords(items)}, by {this.getAuthors(items)}
            </div>
          ))}
      </div>
    );
  }
}
AutoComplete.propTypes = {
  suggestions: PropTypes.array,
  selected: PropTypes.number,
  input: PropTypes.string
};
