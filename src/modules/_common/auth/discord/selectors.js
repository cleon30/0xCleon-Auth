const authenticated = store => store._common.auth.discord.authenticated;

const accessToken = store => store._common.auth.discord.accessToken;

export default {
  authenticated,
  accessToken
};
