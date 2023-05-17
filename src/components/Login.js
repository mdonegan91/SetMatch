import React from "react";
import PropTypes from "prop-types";
import { signInWithGoogle } from "../base";

const Login = props => (
  <nav className="login">
    <h2>Login</h2>
    <p>Sign in to manage your set's inventory.</p>
    <button className="github" onClick={() => props.authenticate('Github')}>Log In With GitHub</button>
    <button className="gmail" onClick={signInWithGoogle}>Log In With GMail</button>
  </nav>
);

// stateless functional component ^ there is no this.props its just props
// had to set up authentication in github.com/settings -- applications -- new, grab callback url, register app, grab client id and client secret for firebase 

Login.propTypes = {
  authenticate: PropTypes.func.isRequired
};

export default Login;