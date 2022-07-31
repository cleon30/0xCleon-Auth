import { combineReducers } from 'redux';
import discord from './discord/reducers';
//import twitch from './twitch/reducers';

const auth = combineReducers({
  //twitch,
  discord
});

export default auth;
