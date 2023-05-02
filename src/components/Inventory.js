import React from 'react';
import PropTypes from 'prop-types';
import AddAssetForm from './AddAssetForm';
import EditAssetForm from './EditAssetForm';

class Inventory extends React.Component {
  static propTypes = {
    assets: PropTypes.object,
    updateAsset: PropTypes.func,
    deleteAsset: PropTypes.func,
    loadSampleAssets: PropTypes.func
  };
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