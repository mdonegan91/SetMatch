import React from "react";
import { formatPrice } from "../helpers";

class Asset extends React.Component {
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
        <button disabled={!isAvailable} onClick={() => this.props.addToOnSet(this.props.index)}>
          {/* not making a function, just doing this once, in line */}
          {isAvailable ? "Check Out" : "On Set!"}
          {/* ternary operator */}
        </button>
      </li>
    );
  }
}

export default Asset;