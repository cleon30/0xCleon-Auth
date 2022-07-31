import React from 'react';
import PropTypes from 'prop-types';
import theme from '../../theme';
import styled from 'styled-components';

import UserControl from './usercontrol/UserControl';


const Wrapper = styled.div`
  -webkit-user-drag: none;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */

  background-color: ${theme.backgroundColor};
  justify-content: space-between;
  align-items: center;
  min-height: 5rem;
  padding: 0 14rem;
  font-size: 2rem;
  display: flex;
  opacity: 0.9;
`;

const Navbar = ({ auth }) => {
  return (
    <Wrapper>

      <UserControl data-test='userControlComponent' auth={auth} />
    </Wrapper>
  );
};

Navbar.propTypes = {
  auth: PropTypes.bool.isRequired
};

export default Navbar;
