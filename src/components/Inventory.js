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
    await firebase.auth().signOut();
    this.setState({ uid: null })
  }
  // async method so they can actually sign out of firebase
  // and clear state

  render() {
    // return <Login authenticate={this.authenticate}/>;
    const logout = <button onClick={this.logout}>Log Out</button>;
    // 1. Check if they are logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }

    // 2. check if they are not the owner of the store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you are not the owner!</p>
          {logout}
        </div>
      );
    }
    return (
      <div className="inventory">
        {logout}
        <AddAssetForm addAsset={this.props.addAsset} />
        {Object.keys(this.props.assets)
          .sort((a, b) => b - a) // Sort the keys in descending order
          .reverse() // Reverse the order of the keys
          .map((key) => (
            <EditAssetForm
              key={key}
              index={key}
              asset={this.props.assets[key]}
              updateAsset={this.props.updateAsset}
              deleteAsset={this.props.deleteAsset}
            />
          ))}
        <button onClick={this.props.loadSampleAssets}>Load Sample Assets</button>
      </div>
    );
  }
}

export default Inventory;