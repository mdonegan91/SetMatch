import React from 'react';
import PropTypes from 'prop-types';

class SetPicker extends React.Component {
  input = React.createRef();
  //create empty ref for the ref in the render (get the text from the input)

  static propTypes = {
    history: PropTypes.object.isRequired
  };

    // instead of using a constructor, instead of declaring method on the component, declared a property set to arrow function. allows us to bind the value of this to setpicker component:

  goToSet = (e) => {
    e.preventDefault();
    const setName = this.input.current.value;

    // push state changes the url without refreshing the page (react router) to re-render which component is showing
    this.props.history.push(`/set/${setName}`);
  };

  render() {
    return (
      <form className="set-selector" onSubmit={this.goToSet}>
        <h2>Please Enter A Set</h2>
        <input type="text" ref={this.input} required placeholder="set-name" />
        {/* ref to allow us to reference a dom node on the page */}
        <button type="submit">Visit Set</button>
      </form>
    );
  }
}

export default SetPicker;