import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import AddAssetForm from './AddAssetForm';
import EditAssetForm from './EditAssetForm';
import Login from './Login';
import base, { firebaseApp } from "../base";

class Inventory extends React.Component {
  static propTypes = {
    assets: PropTypes.object.isRequired,
    updateAsset: PropTypes.func.isRequired,
    deleteAsset: PropTypes.func.isRequired,
    loadSampleAssets: PropTypes.func.isRequired
  };

  state = {
    uid: null,
    owner: null,
    searchQuery: ''
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authHandler = async authData => {
    const set = await base.fetch(this.props.setId, { context: this });
    if (!set.owner) {
      await base.post(`${this.props.setId}/owner`, {
        data: authData.user.uid
      })
    }
    this.setState({
      uid: authData.user.uid,
      owner: set.owner || authData.user.uid
    });
  };

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logout = async () => {
    console.log('logging out');
    await firebase.auth().signOut();
    this.setState({ uid: null })
  }

  handleSearchChange = event => {
    const { value } = event.target;
    this.setState({ searchQuery: value });
  };

  render() {
    const { assets, selectedTag, selectedStatus } = this.props;
    const { uid, owner, searchQuery } = this.state;
    const logout = <button onClick={this.logout}>Log Out</button>;

    if (!uid) {
      return <Login authenticate={this.authenticate} />;
    }

    if (uid !== owner) {
      return (
        <div>
          <p>Sorry, you are not the owner!</p>
          {logout}
        </div>
      );
    }

    const filteredInventory = Object.keys(assets)
      .filter(key => {
        const asset = assets[key];
        if (!selectedTag && !selectedStatus) {
          return true;
        }
        if (selectedTag && selectedStatus) {
          return (
            asset.tag.toLowerCase() === selectedTag.toLowerCase() &&
            asset.status.toLowerCase() === selectedStatus.toLowerCase()
          );
        }
        if (selectedTag) {
          return asset.tag.toLowerCase() === selectedTag.toLowerCase();
        }
        if (selectedStatus) {
          return asset.status.toLowerCase() === selectedStatus.toLowerCase();
        }
        return false;
      })
      .filter(key => {
        const asset = assets[key];
        const assetName = asset.name.toLowerCase();
        return assetName.includes(searchQuery.toLowerCase());
      })
      .map(key => (
        <EditAssetForm
          key={key}
          index={key}
          asset={assets[key]}
          updateAsset={this.props.updateAsset}
          deleteAsset={this.props.deleteAsset}
        />
      ));

      return (
        <div className="inventory">
          {logout}
          <AddAssetForm addAsset={this.props.addAsset} />
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={this.handleSearchChange}
            className="asset-filter"
          />
          {filteredInventory.length > 0 ? (
            filteredInventory
          ) : (
            <p className="no-assets">No assets found.</p>
          )}
          <button
            onClick={this.props.loadSampleAssets}
            className="load-button"
          >
            Load Sample Assets
          </button>
        </div>
      );
  }
}

export default Inventory;

