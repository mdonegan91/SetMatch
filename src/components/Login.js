import React from "react";
import PropTypes from "prop-types";

const Login = props => (
  <nav className="login">
    <h2>Login</h2>
    <p>Sign in to manage your set's inventory.</p>
    <button className="github" onClick={() => props.authenticate('Github')}>Log In With GitHub</button>
  </nav>
);

//stateless functional component ^ there is no this.props its just props

Login.propTypes = {
  authenticate: PropTypes.func.isRequired
};

export default Login;