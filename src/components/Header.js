import React from 'react';
import PropTypes from 'prop-types';

//stateless functional component: 
const Header = props => (
  <header className="top">
    <h1>
      Set
      <span className="ofThe">
        <span className="of"></span>
        <span className="the"></span>
      </span>
      Match
    </h1>
    <h3 className="tagline">
      <span>{props.tagline}</span>
    </h3>
  </header>
);

Header.propTypes = {
  tagline: PropTypes.string.isRequired
}

export default Header;