import {AsyncStorage} from 'react-native'
import {FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL} from './types'
import {Alert} from 'react-native'
import * as Facebook from 'expo-facebook';

export const facebook_login = () => async dispatch => {
        let token = await AsyncStorage.getItem('fb_token')
        if (token) {
            dispatch({ type : FACEBOOK_LOGIN_SUCCESS, payload : token})
        }
        else {
            dofacebookLogin(dispatch)
        }
}
    
const dofacebookLogin = async (dispatch)=>{
    await Facebook.initializeAsync('698233257594923')
    let { type, token } = await Facebook.logInWithReadPermissionsAsync('698233257594923',{
        permissions :['public_profile']
    })
    if (type === 'cancel') {
        return dispatch({type: FACEBOOK_LOGIN_FAIL})
    }
    const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
      Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
    await AsyncStorage.setItem('fb_token', token)
    dispatch({type: FACEBOOK_LOGIN_SUCCESS, payload : token})
}