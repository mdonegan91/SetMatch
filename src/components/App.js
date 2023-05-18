import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Inventory from './Inventory';
import Asset from './Asset';
import sampleAssets from '../sample-assets';
import base from '../base';
import Footer from './Footer';
import Filter from './Filter';

class App extends React.Component {
  state = {
    assets: {},
    selectedTag: null,
    selectedStatus: null
  };

  static propTypes = {
    match: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(params.setId);
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

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addAsset = (asset) => {
    const assets = { ...this.state.assets };
    const key = `asset_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;
    assets[key] = asset;
    this.setState({ assets });
  };

  updateAsset = (key, updatedAsset) => {
    const assets = { ...this.state.assets };
    assets[key] = updatedAsset;
    this.setState({ assets });
  }

  deleteAsset = (key) => {
    const assets = { ...this.state.assets };
    assets[key] = null;
    this.setState({ assets });
  };

  loadSampleAssets = () => {
    this.setState({ assets: sampleAssets })
  };

  handleTagChange = (e) => {
    const selectedTag = e.target.value;
    this.setState({ selectedTag });
  };

  handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    this.setState({ selectedStatus });
  };

  render() {
    const { selectedTag, selectedStatus } = this.state;

    const filteredAssets = Object.values(this.state.assets).filter(asset => {
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
    });



    const reversedAssets = filteredAssets.slice().reverse();

    return (
      <div className="game-set-match">
        <div className="love-all">
          <Header className="tagline" tagline="All of your assets in one place" />
          <br></br>
          <Filter
            selectedTag={this.state.selectedTag}
            selectedStatus={this.state.selectedStatus}
            handleTagChange={this.handleTagChange}
            handleStatusChange={this.handleStatusChange}
          />
          <ul className="assets">
            {reversedAssets.map((asset, index) => (
              <Asset
                key={index}
                index={index}
                details={asset}
                selectedTag={asset.tag}
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