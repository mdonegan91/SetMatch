import React from "react";
import PropTypes from "prop-types";

class Asset extends React.Component {
  static propTypes = {
    details: PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired
    }),
    // shape function that accepts an object to we can specify all the properties
    checkOut: PropTypes.func,
  }
  // ^^ declaring proptypes for all assets
  render() {
    const { image, name, tag, desc, status } = this.props.details;
    const isAvailable = status === "available";
    return (
      <li className="love-all-asset">
        <img src={image} alt={name} />
        <h3 className="asset-name">
          {name}
          <span className="tag">
            {tag}
            </span>
        </h3>
        <p>{desc}</p>
        <button disabled={!isAvailable} onClick={() => this.props.checkOut(this.props.index)}>
          {/* not making a function, just doing this once, in line */}
          {isAvailable ? "Warehouse" : "On Set"}
          {/* ternary operator */}
        </button>
      </li>
    );
  }
}

export default Asset;