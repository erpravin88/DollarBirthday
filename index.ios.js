/**
 * DollarBirthday App
 *
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  NetInfo,
} from 'react-native';

import SplashScreen from 'react-native-smart-splash-screen';
import { PERSISTENT_LOGIN, USER_KEY } from './App/Constant/Auth';
import {screenRoute} from './App/ScreenNavigation/Router';
const dispatchConnected = isConnected => console.log('Internet connected' + isConnected);

export default class DollarBirthday extends Component {
    constructor(props){
     super(props);
     this.state = {
                signedIn: false,
                checkedSignIn: false,
                };
    }
  componentWillMount () {
    SplashScreen.close({
       animationType: SplashScreen.animationType.scale,
       duration: 2000,
       delay: 500,
    });
    AsyncStorage.getItem(PERSISTENT_LOGIN).then(
     (resultpl) =>{console.log(resultpl);
       if(resultpl !== null && resultpl !== 'false'){
         AsyncStorage.getItem(USER_KEY).then(
         (res) => { console.log('test');console.log("signcheck"+res);
             if(res==null){
              this.setState({ signedIn: false,checkedSignIn: true});
            }else{
              this.setState({ signedIn: true ,checkedSignIn: true});
            }
          });
       }else{
         this.setState({ checkedSignIn: true});
       }
    });
    // conectivity eventlistener added here
    NetInfo.isConnected.fetch().then().done(() => {
      NetInfo.isConnected.addEventListener('change', dispatchConnected);
    });
  }
componentWillUnmount(){
  NetInfo.isConnected.removeEventListener('change', dispatchConnected);
}
  render() {
// console.log('sign in check'+this.state.SignIn);
  const { checkedSignIn, signedIn } = this.state;
  console.log(checkedSignIn+'---'+signedIn);
      if (!checkedSignIn) {
        // alert("here");
        return null;
      }
   const T = screenRoute(signedIn);

    return (
      <T/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('DollarBirthday', () => DollarBirthday);
