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
    match: PropTypes.object
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
    // copy existing state
    const assets = { ...this.state.assets };
    // using milliseconds instead of IDs to add new asset to assets variable
    assets[`asset${Date.now}`] = asset;
    // set new assets object to state
    this.setState({ assets });
    // passing piece of state we want to update. updating to assets taking our copied old assets to overwrite the existing state which will trigger a change in React and wherever they're displayed on the page. old and new are both called assets
  };

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
          <Header tagline="All your assets in one place" />
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
        <OnSet
          assets={this.state.assets}
          onSet={this.state.onSet}
          removeFromCheckOut={this.removeFromCheckOut}
        />
        <Inventory
          addAsset={this.addAsset}
          updateAsset={this.updateAsset}
          deleteAsset={this.deleteAsset}
          loadSampleAssets={this.loadSampleAssets}
          assets={this.state.assets}
        />
      </div>
    );
  }
}

export default App;