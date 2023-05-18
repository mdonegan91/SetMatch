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
    // save it as our own
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
  //dynamic auth provider to maybe incorporate multiple auths

  logout = async () => {
    console.log('logging out');
    await firebase.auth().signOut();
    this.setState({ uid: null })
  }
  // async method so they can actually sign out of firebase
  // and clear state

  render() {
    const { assets, selectedTag, selectedStatus } = this.props;
    const { uid, owner } = this.state;
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
  
    // Filter the inventory items based on selectedTag and selectedStatus
    const filteredInventory = Object.keys(assets)
      .filter(key => {
        const asset = assets[key];
        if (!selectedTag && !selectedStatus) {
          return true; // Show all inventory items if no tag or status is selected
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
        {filteredInventory}
        <button onClick={this.props.loadSampleAssets}>Load Sample Assets</button>
      </div>
    );
  }
  
}

export default Inventory;