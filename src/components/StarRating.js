import React, { Component } from "react";
import PropTypes from "prop-types";
import Star from "../images/star.svg";
import StarFilled from "../images/star-filled.svg";

export default class StarRating extends Component {
  genStars() {
    let dm = [
      <img src={Star} alt={"Star Empty"} key={1} />,
      <img src={Star} alt={"Star Empty"} key={2} />,
      <img src={Star} alt={"Star Empty"} key={3} />,
      <img src={Star} alt={"Star Empty"} key={4} />,
      <img src={Star} alt={"Star Empty"} key={5} />
    ];
    let rating = this.props.averageRating;
    if (this.props.userRating >= 0 && this.props.userRating !== rating) {
      rating = this.props.userRating;
    }
    for (let i = 0; i < rating; i++) {
      dm[i] = <img src={StarFilled} alt={"Star filled"} key={i + 1} />;
    }
    return dm;
  }
  render() {
    return this.genStars();
  }
}
StarRating.propTypes = {
  averageRating: PropTypes.number,
  userRating: PropTypes.number
};
