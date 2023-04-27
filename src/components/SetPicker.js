import React from 'react';

class SetPicker extends React.Component { 
  myInput = React.createRef();

  goToStore(event) {
    event.preventDefault();
  }
  render() {
    return (
      <form className="set-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Set</h2>
        <input type="text" ref={this.myInput} required placeholder="set-name" />
        <button type="submit">Visit Set</button>
      </form>
    )
  }
}

export default SetPicker;