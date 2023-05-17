import React from 'react';
import PropTypes from 'prop-types';

//stateless functional component because it only has a render method/implicit return: 
// if you only have one argument you don't need the parens around props
const Header = props => (
  <header className="top">
    <h1>Set Match</h1>
    <h3 className="tagline">
      <span>{props.tagline}</span>
    </h3>
  </header>
);

Header.propTypes = {
  tagline: PropTypes.string.isRequired
}

export default Header;