import React from 'react';
import PropTypes from 'prop-types';

class AddAssetForm extends React.Component {
  nameRef = React.createRef();
  tagRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();

  static propTypes = {
    addAsset: PropTypes.func.isRequired
  };

  createAsset = (e) => {
    e.preventDefault();
    const asset = {
      name: this.nameRef.current.value,
      tag: this.tagRef.current.value,
      status: this.statusRef.current.value,
      desc: this.descRef.current.value,
      image: this.imageRef.current.value
    };
    this.props.addAsset(asset);
    e.currentTarget.reset();
    // reset method to clear form
  };

  render() {
    return (
      <form className="asset-edit" onSubmit={this.createAsset}>
        <input name="name" ref={this.nameRef} type="text" placeholder="Name" />
        <select name="tag" ref={this.tagRef} >
          <option value="bigs">Bigs</option>
          <option value="smalls">Smalls</option>
          <option value="artwork">Artwork</option>
          <option value="fixtures">Fixtures</option>
          <option value="softgoods">Soft Goods</option>
        </select>
        <select name="status" ref={this.statusRef} >
          <option value="warehouse">Warehouse</option>
          <option value="shop">Shop</option>
          <option value="goldroom">Gold Room</option>
          <option value="onset">On Set</option>
        </select>
        <textarea name="desc" ref={this.descRef} type="text" placeholder="Description" />
        <input name="image" ref={this.imageRef} placeholder="Image" />
        <button type="submit">+ Add Asset</button>
      </form>
    );
  }
}

export default AddAssetForm;