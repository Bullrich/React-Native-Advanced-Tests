import {AsyncStorage} from 'react-native';
import {Facebook} from 'expo';

import {FACEBOOK_LOGIN_FAIL, FACEBOOK_LOGIN_SUCCESS} from "./types";

// How to use AsyncStorage
// AsyncStorage.setItem('fb_token', value);
// AsyncStorage.getItem('fb_token');

export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');
  if (token) {
    // Dispatch action
    dispatch({type: FACEBOOK_LOGIN_SUCCESS, payload: token});
    console.log('Has token: ' + token)
  } else {
    // Start up FB login process
    doFacebookLogin(dispatch);
  }
};

const doFacebookLogin = async (dispatch) => {
  let {type, token} = await Facebook.logInWithReadPermissionsAsync('1367040710097152', {
    permissions: ['public_profile']
  });

  if (type === 'cancel')
    return dispatch({type: FACEBOOK_LOGIN_FAIL});
  else {
    await AsyncStorage.setItem('fb_token', token);
    dispatch({type: FACEBOOK_LOGIN_SUCCESS, payload: token});
  }
};