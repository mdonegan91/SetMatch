import React from 'react';

class AddAssetForm extends React.Component {
  createAsset = (e) => {
    e.preventDevault();
  }
  render() {
    return (
      <form class = "asset-edit" onSubmit={this.createAsset}>
        <input name="name" type="text" placeholder="Name" />
        <input name="price" type="text" placeholder="Price" />
        <select name="status">
          <option value="unavailable">Warehouse</option>
          <option value="unavailable">Shop</option>
          <option value="unavailable">Gold Room</option>
        </select>
        <textarea name="desc" type="text" placeholder="Desc" />
        <input name="image" placeholder="Image" />
        <button type="submit">+ Add Asset</button>
      </form>
    );
  }
}

export default AddAssetForm;