import React from "react";

class EditAssetForm extends React.Component {
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
          name="price"
          onChange={this.handleChange}
          value={this.props.asset.price}
        />
        <select
          type="text"
          name="status"
          onChange={this.handleChange}
          value={this.props.asset.status}
        >
          <option value="available">Warehouse</option>
          <option value="unavailable">Shop</option>
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