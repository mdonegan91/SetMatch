import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import OnSet from './OnSet';
import Inventory from './Inventory';
import Asset from './Asset';
import sampleAssets from '../sample-assets';
import base from '../base';

class App extends React.Component {
  state = {
    assets: {},
    onSet: {}
  };

  static propTypes = {
    match: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(params.setId);
    if (localStorageRef) {
      this.setState({ onSet: JSON.parse(localStorageRef) })
    }
    // reinstating local storage for componentDidUpdate ^^
    this.ref = base.syncState(`${params.setId}/assets`, {
      context: this,
      state: 'assets'
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.setId,
      JSON.stringify(this.state.onSet)
    );
  }

  // ^^ persisting onSet state in local storage !!


  // ^^ magic piece of code that syncs our state to firebase!
  // ref is reference to piece of data
  // componentDidMount = life cycle method like windowOnLoad
  // descrtuctured this

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  // ^^ stop listening for changes to avoid memory leak

  addAsset = (asset) => {
    const assets = { ...this.state.assets };
    const key = `asset_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;
    assets[key] = asset;
    this.setState({ assets });
  };

  // was not actually generating a unique key based on the current timestamp. Instead, it was setting the key to the string literal "assetfunction now() { [native code] }", which is not a valid Firebase Realtime Database path.

  updateAsset = (key, updatedAsset) => {
    // copy of the current state
    const assets = { ...this.state.assets };
    // update that state
    assets[key] = updatedAsset;
    // set that to state
    this.setState({ assets });
  }

  deleteAsset = (key) => {
    // take copy of state
    const assets = { ...this.state.assets }
    // update the state
    assets[key] = null;
    // ^^ so firebase can also delete it
    this.setState({ assets });
  }


  loadSampleAssets = () => {
    this.setState({ assets: sampleAssets })
  };

  checkOut = (key) => {
    const onSet = { ...this.state.onSet };
    onSet[key] = onSet[key] + 1 || 1;
    // if onSet.fish1 exists, increment 1, otherwise, return 1
    this.setState({ onSet });
  }

  removeFromCheckOut = (key) => {
    const onSet = { ...this.state.onSet };
    delete onSet[key];
    this.setState({ onSet });
  }

  render() {
    return (
      <div className="game-set-match">
        <div className="love-all">
          <Header className="tagline" tagline="All your assets in one place" />
          <br></br>
          <ul className="assets" >
            {Object.keys(this.state.assets).map(key => (
              <Asset
                key={key}
                index={key}
                // passing key a second time as own prop
                details={this.state.assets[key]}
                checkOut={this.checkOut} />
            ))}
          </ul>
        </div>
        {/* <OnSet
          assets={this.state.assets}
          onSet={this.state.onSet}
          removeFromCheckOut={this.removeFromCheckOut}
        /> */}
        <Inventory
          addAsset={this.addAsset}
          updateAsset={this.updateAsset}
          deleteAsset={this.deleteAsset}
          loadSampleAssets={this.loadSampleAssets}
          assets={this.state.assets}
          setId={this.props.match.params.setId}
        />
      </div>
    );
  }
}

export default App;