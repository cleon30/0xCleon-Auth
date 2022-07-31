import React from 'react';
import PropTypes from 'prop-types';
import Login from './login/Login';
import UserMenu from './userMenu/UserMenu';
import { operations } from '../../../modules/_common/auth/discord';

const UserControl = ({ auth }) => {
  const redirect = () => operations.redirect();

  return auth ? (
    <UserMenu data-test='userMenuComponent' />
  ) : (
    <Login data-test='loginComponent' redirect={redirect} />
  );
};

UserControl.propTypes = {
  auth: PropTypes.bool.isRequired
};

export default UserControl;
