
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
}
export const afterSignIn = (token) => {
    AsyncStorage.setItem(AUTH_TOKEN, token);
  }

export const onSignOut = (that) => {
    AsyncStorage.removeItem(USER_KEY);
    AsyncStorage.removeItem(AUTH_TOKEN);
    AsyncStorage.removeItem(USER_DETAILS).then(()=>{
      that.props.navigation.dispatch(resetAction);
    }).catch((err)=>{
      //Toast.show(err);
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
};