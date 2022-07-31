import React from 'react';
import { Redirect } from 'react-router-dom';

export const Home = ({ auth, route }) => {
  return auth && <Redirect to={route !== null ? route : '/dashboard'} />;
};

export default Home;
