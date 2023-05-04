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
        <input name="tag" ref={this.tagRef} type="text" placeholder="tag" />
        <select name="status" ref={this.statusRef} >
          <option value="available">Warehouse</option>
          <option value="unavailable">On Set</option>
          <option value="unavailable">Gold Room</option>
        </select>
        <textarea name="desc" ref={this.descRef} type="text" placeholder="Desc" />
        <input name="image" ref={this.imageRef} placeholder="Image" />
        <button type="submit">+ Add Asset</button>
      </form>
    );
  }
}

export default AddAssetForm;