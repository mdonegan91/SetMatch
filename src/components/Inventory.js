import React from 'react';
import AddAssetForm from './AddAssetForm';
import EditAssetForm from './EditAssetForm';

class Inventory extends React.Component {
  render() {
    return (
      <div className="inventory">
        <h2>Add Assets</h2>
        {Object.keys(this.props.assets).map(key => (
          <EditAssetForm
            key={key}
            index={key}
            // passing index down here to use in EditAssetForm
            asset={this.props.assets[key]}
            updateAsset={this.props.updateAsset}
            deleteAsset={this.props.deleteAsset}
            // passing props down
          />
        ))}
        <AddAssetForm addAsset={this.props.addAsset} />
        <button onClick={this.props.loadSampleAssets}>Load Sample Assets</button>
      </div>
    );
  }
}

export default Inventory;