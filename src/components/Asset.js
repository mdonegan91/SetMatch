import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";

class Asset extends React.Component {
  static propTypes = {
    details: PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    }),
    // shape function that accepts an object to we can specify all the properties
    checkOut: PropTypes.func,
  }
  // ^^ declaring proptypes for all assets
  render() {
    const { image, name, price, desc, status } = this.props.details;
    const isAvailable = status === "available";
    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button disabled={!isAvailable} onClick={() => this.props.checkOut(this.props.index)}>
          {/* not making a function, just doing this once, in line */}
          {isAvailable ? "Check Out" : "On Set!"}
          {/* ternary operator */}
        </button>
      </li>
    );
  }
}

export default Asset;