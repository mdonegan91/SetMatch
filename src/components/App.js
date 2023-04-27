import React from 'react';
import Header from './Header';
import OnSet from './OnSet';
import Inventory from './Inventory';

class App extends React.Component {
  state = {
    assets: {},
    onSet: {}
  };

  addAsset = (asset) => {
    // copy existing state
    const assets = {...this.state.assets};
    // using milliseconds instead of IDs to add new asset to assets variable
    assets[`asset${Date.now}`] = asset;
    // set new assets object to state
    this.setState({assets});
    // passing piece of state we want to update. updating to assets taking our copied old assets to overwrite the existing state which will trigger a change in React and wherever they're displayed on the page. old and new are both called assets
  };

  render() {
    return (
      <div className="game-set-match">
        <div className="love-all">
          <Header tagline="All your assets in one place"/>
          </div>
          <OnSet />
          <Inventory addAsset={this.addAsset}/>
        </div>
    );
  }
}

export default App;