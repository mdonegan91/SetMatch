import React from 'react';

class AddAssetForm extends React.Component {
  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();


  createAsset = (e) => {
    e.preventDevault();
    const asset = {
      name: this.nameRef.current.value,
      price: parseFloat(this.priceRef.current.value),
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
      <form class="asset-edit" onSubmit={this.createAsset}>
        <input name="name" ref={this.nameRef} type="text" placeholder="Name" />
        <input name="price" ref={this.priceRef} type="text" placeholder="Price" />
        <select name="status" ref={this.statusRef} >
          <option value="unavailable">Warehouse</option>
          <option value="unavailable">Shop</option>
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