import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { operations } from '../../modules/_common/auth/discord';

const DiscordCallback = ({ location }) => {
  useEffect(() => {
    operations.callback(location.search);
    // eslint-disable-next-line
  }, []);

  return <Redirect to={'/'} />;
};

export default DiscordCallback;
