
import { AsyncStorage } from "react-native";
import { NavigationActions } from 'react-navigation';
import Toast from 'react-native-simple-toast';
import CookieManager from 'react-native-cookies';
import {settings} from './UrlConstant';
const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'LOG_IN' })],
    });

export const USER_KEY = "auth-key";
export const AUTH_TOKEN = "auth-token";
export const USER_DETAILS = "user-data";
export const PERSISTENT_LOGIN = "persistent-login";


export const onSignIn = () => {

     AsyncStorage.setItem(USER_KEY, "true");
     console.log('onSignIn');
      //AsyncStorage.getItem(USER_KEY).then((res)=>{console.log(res+"set and fetch");});
}
export const afterSignIn = (token) => {
    AsyncStorage.setItem(AUTH_TOKEN, token);
  }
export const onSignOut = (that) => { //console.log('signout');console.log(that);console.log('wrap');
    let keys = [USER_KEY,AUTH_TOKEN,USER_DETAILS,PERSISTENT_LOGIN];
    AsyncStorage.multiRemove(keys).then(()=>{
     if(settings.LOGOUT_FB){ CookieManager.clearAll();}
      that.props.navigation.dispatch(resetAction);
    }).catch((err)=>{
      Toast.show(JSON.stringify(err));
    });
}

export const onSignOutfromlogin = (that) => {
  let keys = [USER_KEY,AUTH_TOKEN,USER_DETAILS,PERSISTENT_LOGIN];
  AsyncStorage.multiRemove(keys).then(()=>{
    //that.props.navigation.dispatch(resetAction);
  }).catch((err)=>{
    Toast.show(JSON.stringify(err));
  });
}

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {

          resolve(true);
        } else {

          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};

export const setUserDetails = (data) =>{
  AsyncStorage.setItem(USER_DETAILS, JSON.stringify(data));
  console.log(data);
};
