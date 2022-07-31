import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const Login = ({ redirect }) => (
  <Button className="cta-button connect-wallet-button"  data-test='loginButton' variant='contained' onClick={redirect}>
    LogIn
  </Button>
);

Login.propTypes = {
  redirect: PropTypes.func.isRequired
};

export default Login;
