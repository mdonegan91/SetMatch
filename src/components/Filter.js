import React from 'react';
import PropTypes from 'prop-types';

class Filter extends React.Component {
  static propTypes = {
    selectedTag: PropTypes.string,
    selectedStatus: PropTypes.string,
    handleTagChange: PropTypes.func.isRequired,
    handleStatusChange: PropTypes.func.isRequired,
  };

  render() {
    const { selectedTag, selectedStatus, handleTagChange, handleStatusChange } = this.props;

    return (
      <div style={{ textAlign: 'right' }}>
        <select
          name="tag"
          className="asset-filter"
          value={this.props.selectedTag}
          onChange={this.props.handleTagChange}
        >
          <option value="">Tags: Show All</option>
          <option value="bigs">Bigs</option>
          <option value="smalls">Smalls</option>
          <option value="artwork">Artwork</option>
          <option value="fixtures">Fixtures</option>
          <option value="softgoods">Soft Goods</option>
        </select>
        &nbsp;&nbsp;
        <select
          name="status"
          className="asset-filter"
          value={this.props.selectedStatus}
          onChange={this.props.handleStatusChange}
        >
          <option value="">Status: Show All</option>
          <option value="warehouse">Warehouse</option>
          <option value="shop">Shop</option>
          <option value="goldroom">Gold Room</option>
          <option value="onset">On Set</option>
        </select>
      </div>

    );
  }
}

export default Filter;