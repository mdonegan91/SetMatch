import React from "react";
import PropTypes from "prop-types";

class EditAssetForm extends React.Component {
  static propTypes = {
    asset: PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired
    }),
    index: PropTypes.string.isRequired,
    updateAsset: PropTypes.func.isRequired
  };
  handleChange = event => {
    // update the asset
    // take a copy of the current asset >>
    const updatedAsset = {
      ...this.props.asset,
      [event.currentTarget.name]: event.currentTarget.value
    };
    this.props.updateAsset(this.props.index, updatedAsset);
    // sending these upstream to the updateAsset function
  };
  // computed property names. the value being updated will also be dynamic

  render() {
    return (
      <div className="asset-edit">
        <input
          type="text"
          name="name"
          onChange={this.handleChange}
          value={this.props.asset.name}
        />
        <input
          type="text"
          name="tag"
          onChange={this.handleChange}
          value={this.props.asset.tag}
        />
        <select
          type="text"
          name="status"
          onChange={this.handleChange}
          value={this.props.asset.status}
        >
          <option value="warehouse">Warehouse</option>
          <option value="shop">Shop</option>
          <option value="goldroom">Gold Room</option>
          <option value="onset">On Set</option>
        </select>
        <textarea
          name="desc"
          onChange={this.handleChange}
          value={this.props.asset.desc}
        />
        <input
          type="text"
          name="image"
          onChange={this.handleChange}
          value={this.props.asset.image}
        />
        <button onClick={() => this.props.deleteAsset(this.props.index)}>Remove Asset</button>
      </div>
    );
  }
}

export default EditAssetForm;