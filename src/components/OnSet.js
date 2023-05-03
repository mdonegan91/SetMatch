import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';

class OnSet extends React.Component {
  static propTypes = {
    assets: PropTypes.object.isRequired,
    onSet: PropTypes.object.isRequired,
    removeFromCheckOut: PropTypes.func.isRequired
  };
  renderOnSet = (key) => {
    const asset = this.props.assets[key];
    const count = this.props.onSet[key];
    const isAvailable = asset && asset.status === "available";
    // make sure asset is loaded for local storage
    if (!asset) return null;
    if (!isAvailable) {
      return (
        <li key={key}>
          Sorry {asset ? asset.name : 'asset'} is already checked out
        </li>
        // error handling
      );
    };

    return (
      <li key={key}>
        {count} {asset.name}
        {formatPrice(count * asset.price)}
        <button onClick={() => this.props.removeFromCheckOut(key)}>&times;</button>
      </li>
    );
  };
  // each child in an array or iterator should have a unique key prop

  render() {
    const onSetIds = Object.keys(this.props.onSet);
    const total = onSetIds.reduce((prevTotal, key) => {
      const asset = this.props.assets[key];
      const count = this.props.onSet[key];
      const isAvailable = asset && asset.status === 'available';
      if (isAvailable) {
        return prevTotal + (count * asset.price);
      }
      return prevTotal;
    }, 0);
    // reduce = tally
    // start at 0 !

    return <div className="on-set-wrap">
      <h2>On Set</h2>
      <ul className="on-set">
        {onSetIds.map(this.renderOnSet)}
      </ul>
      <div className="total">
        Total:
        <strong>{formatPrice(total)}</strong>
      </div>
    </div>
  }
}

export default OnSet;