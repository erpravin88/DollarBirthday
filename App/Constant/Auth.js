
import { AsyncStorage } from "react-native";
import { NavigationActions } from 'react-navigation';
const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'LOG_IN' })],
    });

export const USER_KEY = "auth-key";
export const AUTH_TOKEN = "auth-token";
export const USER_DETAILS = "user-data"


export const onSignIn = () => {

     AsyncStorage.setItem(USER_KEY, "true");
      //AsyncStorage.getItem(USER_KEY).then((res)=>{console.log(res+"set and fetch");});
}
export const afterSignIn = (token) => {
    AsyncStorage.setItem(AUTH_TOKEN, token);
  }
export const onSignOut = (that) => {
    let keys = [USER_KEY,AUTH_TOKEN,USER_DETAILS,"persistentlogin"];
    AsyncStorage.multiRemove(keys).then(()=>{
      that.props.navigation.dispatch(resetAction);
    }).catch((err)=>{
      Toast.show(JSON.stringify(err));
    });
}

export const onSignOutfromlogin = (that) => {
  let keys = [USER_KEY,AUTH_TOKEN,USER_DETAILS,"persistentlogin"];
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
