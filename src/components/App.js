import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Inventory from './Inventory';
import Asset from './Asset';
import sampleAssets from '../sample-assets';
import base from '../base';
import Footer from './Footer';

class App extends React.Component {
  state = {
    assets: {},
    onSet: {},
    selectedTag: null
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

  handleTagChange = (e) => {
    const selectedTag = e.target.value;
    this.setState({ selectedTag });
  };

  render() {
    const { selectedTag } = this.state;
    const filteredAssets = Object.values(this.state.assets).filter(asset => {
      if (!selectedTag) {
        return true; // Show all assets if no tag is selected
      }
      return asset.tag === selectedTag; // Show assets with selected tag
    });
    return (
      <div className="game-set-match">
        <div className="love-all">
          <Header className="tagline" tagline="All your assets in one place" />
          <br></br>
          <select name="tag" className="asset-filter" ref={this.tagRef} onChange={this.handleTagChange}>
            <option value="">Show All</option> {/* Add an option to show all assets */}
            <option value="bigs">Bigs</option>
            <option value="smalls">Smalls</option>
            <option value="artwork">Artwork</option>
            <option value="fixtures">Fixtures</option>
            <option value="softgoods">Soft Goods</option>
          </select>
          <br></br><br></br><br></br>
          <ul className="assets">
            {filteredAssets.map((asset, index) => (
              <Asset
                key={index}
                index={index}
                details={asset}
                checkOut={this.checkOut}
              />
            ))}
          </ul>
        </div>
        <Inventory
          addAsset={this.addAsset}
          updateAsset={this.updateAsset}
          deleteAsset={this.deleteAsset}
          loadSampleAssets={this.loadSampleAssets}
          assets={this.state.assets}
          setId={this.props.match.params.setId}
          className="inventory"
        />
        <Footer />
      </div>
    );
  }
}

export default App;