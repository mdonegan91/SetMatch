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
    const updatedAsset = {
      ...this.props.asset,
      [event.currentTarget.name]: event.currentTarget.value
    };
    this.props.updateAsset(this.props.index, updatedAsset);
  };

  render() {
    return (
      <div className="asset-edit">
        <input
          type="text"
          name="name"
          onChange={this.handleChange}
          value={this.props.asset.name}
        />
        <select
          type="text"
          name="tag"
          onChange={this.handleChange}
          value={this.props.asset.tag}
          >
          <option value="bigs">Bigs</option>
          <option value="smalls">Smalls</option>
          <option value="artwork">Artwork</option>
          <option value="fixtures">Fixtures</option>
          <option value="softgoods">Soft Goods</option>
        </select>
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