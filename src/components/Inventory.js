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
    owner: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }
  // this keeps our URL from heading to undefined
  //loading is true would prevent that flash but leaving it out for now... 

  authHandler = async authData => {
    // look up current set in firebase database:
    const set = await base.fetch(this.props.setId, { context: this });
    // claim it if there is no owner:
    if (!set.owner) {
      // save it as our own, if you created it its yours
      await base.post(`${this.props.setId}/owner`, {
        data: authData.user.uid
      })
    }
    // set the state of the inventory component to reflect current user:
    this.setState({
      uid: authData.user.uid,
      owner: set.owner || authData.user.uid
    });
  };
  // figuring out who is currently logged in and who is the owner of the set. if they're the same people they can manage the set
  // fetch returns promise, add await to return set instead of promise

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };
  //dynamic auth provider to maybe incorporate more auth providers

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({ uid: null })
  }
  // async method so they can actually sign out of firebase (with await)
  // and clear state

  render() {
    const { selectedTag, selectedStatus } = this.state;
    const filteredAssets = Object.values(this.props.assets).filter((asset) => {
      if (!selectedTag && !selectedStatus) {
        return true; // Show all assets if no tag or status is selected
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
    });
  
    return (
      <div className="inventory">
        {/* ... */}
        {filteredAssets
          .reverse() // Reverse the order of the filtered assets
          .map((asset, index) => (
            <EditAssetForm
              key={index}
              index={index}
              asset={asset}
              updateAsset={this.props.updateAsset}
              deleteAsset={this.props.deleteAsset}
            />
          ))}
        {/* ... */}
      </div>
    );
  }
  
}

export default Inventory;