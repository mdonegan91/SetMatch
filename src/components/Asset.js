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
  }
  // shape function that accepts an object so we can specify all the properties
  // checks that the object you are sending it will have all the properties with those types

  render() {
    const { image, name, tag, desc, status } = this.props.details;
    // const isAvailable = status === "available";

    let buttonText = "";
    switch (status) {
      case "warehouse":
        buttonText = "Warehouse";
        break;
      case "shop":
        buttonText = "Shop";
        break;
      case "goldroom":
        buttonText = "Gold Room";
        break;
      case "onset":
        buttonText = "On Set";
        break;
      default:
        break;
    }

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
        <button style={{ cursor: 'default' }}>
          {buttonText}
        </button>
      </li>
    );
  }
}

export default Asset;