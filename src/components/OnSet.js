import React from 'react';
import { formatPrice } from '../helpers';

class OnSet extends React.Component {
  renderOnSet = (key) => {
    const asset = this.props.assets[key];
    const count = this.props.onSet[key];
    const isAvailable = asset.status;

    if (!isAvailable) {
      return (
        <li>
          Sorry {asset ? asset.name : 'asset'} is already checked out
        </li>
        // error handling
      );
    };

    return (
      <li>
        {count} {asset.name}
        {formatPrice(count * asset.price)}
      </li>
    );
  };

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