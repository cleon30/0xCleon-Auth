const redirect_uri = () => {
  const { protocol, hostname, port } = window.location;
  const url = protocol + '//' + hostname + (port ? ':' + port : '');
  const redirect_uri = url + '/api/discordCallback';
  return redirect_uri;
};

const baseURL = 'https://discordapp.com/api/oauth2';

export const authorize_GET = (state) => {
  const qParams = [
    `client_id=${process.env.REACT_APP_CLIENT_ID}`,
    `redirect_uri=${encodeURIComponent(redirect_uri())}`,
    `response_type=code`,
    `scope=identify guilds email`,
    `state=${state}`,
  ].join('&');

  const url = baseURL + '/authorize?' + qParams;

  return url;
};

export const token_POST = (code) => {
  const url = baseURL + '/token';

  const body = new FormData();
  body.set('client_id', process.env.REACT_APP_CLIENT_ID);
  body.set('client_secret', process.env.REACT_APP_CLIENT_SECRET);
  body.set('grant_type', 'authorization_code');
  body.set('code', code);
  body.set('redirect_uri', redirect_uri());
  body.set('scope', 'identify guilds email');

  const headers = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  return {
    url,
    body,
    headers,
  };
};
