import React from 'react';
import PropTypes from 'prop-types';

//stateless functional component: 
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