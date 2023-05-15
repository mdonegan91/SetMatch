import React from 'react';
import PropTypes from 'prop-types';
import AddAssetForm from './AddAssetForm';
import Asset from './Asset';

class Inventory extends React.Component {
  static propTypes = {
    addAsset: PropTypes.func.isRequired,
    updateAsset: PropTypes.func.isRequired,
    deleteAsset: PropTypes.func.isRequired,
    loadSampleAssets: PropTypes.func.isRequired,
    assets: PropTypes.object.isRequired,
    setId: PropTypes.string.isRequired
  };

  state = {
    selectedStatus: '' // Initially no status is selected
  };

  handleStatusChange = (event) => {
    const selectedStatus = event.target.value;
    this.setState({ selectedStatus });
  };

  render() {
    const { assets, addAsset, updateAsset, deleteAsset, loadSampleAssets } = this.props;
    const { selectedStatus } = this.state;

    // Filter assets based on the selected status
    const filteredAssets = selectedStatus ? 
      Object.values(assets).filter(asset => asset.status === selectedStatus) : 
      Object.values(assets);

    return (
      <div className="inventory">
        <h2>Inventory</h2>
        <div className="status-filter">
          <select value={selectedStatus} onChange={this.handleStatusChange}>
            <option value="">All</option>
            <option value="warehouse">Warehouse</option>
            <option value="shop">Shop</option>
            <option value="goldroom">Gold Room</option>
            <option value="onset">On Set</option>
          </select>
        </div>
        <ul className="assets">
          {filteredAssets.map(asset => (
            <Asset
              key={asset.id}
              details={asset}
              checkOut={this.props.checkOut}
            />
          ))}
        </ul>
        <AddAssetForm addAsset={addAsset} />
        <button onClick={loadSampleAssets}>Load Sample Assets</button>
      </div>
    );
  }
}

export default Inventory;
