import React from 'react';
import PropTypes from 'prop-types';

class SetPicker extends React.Component {
  input = React.createRef();

  static propTypes = {
    history: PropTypes.object.isRequired
  };

  goToSet = (e) => {
    e.preventDefault();
    const setName = this.input.current.value;

    // push state changes the url without refreshing the page (react router)
    this.props.history.push(`/set/${setName}`);
  };

  render() {
    return (
      <form className="set-selector" onSubmit={this.goToSet}>
        <h2>Please Enter A Set</h2>
        <input type="text" ref={this.input} required placeholder="set-name" />
        <button type="submit">Visit Set</button>
      </form>
    );
  }
}

export default SetPicker;