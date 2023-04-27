import React from 'react';
import AddAssetForm from './AddAssetForm';

class Inventory extends React.Component {
  render() {
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        <AddAssetForm/>
      </div>
    );
  }
}

export default Inventory;