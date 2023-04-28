import React from 'react';
import AddAssetForm from './AddAssetForm';

class Inventory extends React.Component {
  render() {
    return (
      <div className="inventory">
        <h2>Add Assets</h2>
        <AddAssetForm addAsset={this.props.addAsset}/>
        <button onClick={this.props.loadSampleAssets}>Load Sample Assets</button>
      </div>
    );
  }
}

export default Inventory;