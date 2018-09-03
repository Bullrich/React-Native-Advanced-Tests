import {AsyncStorage} from 'react-native';

import {
  FACEBOOK_LOGIN_SUCCESS
} from "./types";

// How to use AsyncStorage
// AsyncStorage.setItem('fb_token', value);
// AsyncStorage.getItem('fb_token');

export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');
  if (token) {
    // Dispatch action
  } else {
    // Start up FB login process
  }
};