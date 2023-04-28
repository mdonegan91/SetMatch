import React from 'react';
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

  componentDidMount() {
    const { params } = this.props.match;
    this.ref = base.syncState(`${params.setId}/assets`, {
      context: this,
      state: "assets"
    });
  }
  // ref is reference to piece of data
  // componentDidMount = life cycle method like windowOnLoad
  // descrtuctured this

  addAsset = (asset) => {
    // copy existing state
    const assets = {...this.state.assets};
    // using milliseconds instead of IDs to add new asset to assets variable
    assets[`asset${Date.now}`] = asset;
    // set new assets object to state
    this.setState({assets});
    // passing piece of state we want to update. updating to assets taking our copied old assets to overwrite the existing state which will trigger a change in React and wherever they're displayed on the page. old and new are both called assets
  };

  loadSampleAssets = () => {
    this.setState({ assets: sampleAssets })
  };

  checkOut = (key) => {
    const onSet = {...this.state.onSet};
    onSet[key] = onSet[key] + 1 || 1;
    // if onSet.fish1 exists, increment 1, otherwise, return 1
    this.setState({ onSet });
  }

  render() {
    return (
      <div className="game-set-match">
        <div className="love-all">
          <Header tagline="All your assets in one place"/>
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
          <OnSet assets={this.state.assets} onSet={this.state.onSet}/>
          <Inventory addAsset={this.addAsset} loadSampleAssets={this.loadSampleAssets}/>
        </div>
    );
  }
}

export default App;