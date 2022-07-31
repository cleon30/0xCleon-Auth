const baseURL = 'https://discordapp.com/api';

const head = access_token => ({
  headers: {
    Authorization: 'Bearer ' + access_token
  }
});

export const user_GET = access_token => {
  const url = baseURL + '/users/@me';
  const headers = head(access_token);

  return {
    url,
    headers
  };
};
