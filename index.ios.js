/**
 * Sample React Native App
 * https://github.com/facebook/react-native
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
  AppState,
} from 'react-native';

import SplashScreen from 'react-native-smart-splash-screen';
import { USER_KEY } from './App/Constant/Auth';
import {screenRoute} from './App/ScreenNavigation/Router';

export default class DollarBirthday extends Component {
    constructor(props){
     super(props);
     this.state = {
                SignIn: false,
                appState: AppState.currentState
                };
    }
  componentDidMount () {
       SplashScreen.close({
          animationType: SplashScreen.animationType.scale,
          duration: 2000,
          delay: 500,
       });
       AsyncStorage.getItem(USER_KEY).then(
       (res) => {
           if(res==null){
            this.setState({ SignIn: false});
          }else{
            this.setState({ SignIn: true });
          }
        });
// conectivity eventlistener added here
const dispatchConnected = isConnected => console.log('Internet connected' + isConnected);

NetInfo.isConnected.fetch().then().done(() => {
  NetInfo.isConnected.addEventListener('change', dispatchConnected);
});
AppState.addEventListener('change', this._handleAppStateChange);
  }
componentWillUnmount(){
  NetInfo.isConnected.removeEventListener('change', dispatchConnected);
  AppState.removeEventListener('change', this._handleAppStateChange);
}
_handleAppStateChange = (nextAppState) => { //console.log(nextAppState);
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
    }
    if (this.state.appState === 'active' && nextAppState.match(/inactive|background/)) {
      console.log('App has come to the Background of close!')
    }
    this.setState({appState: nextAppState});
  }
  render() {
//console.log('sign in check'+this.state.SignIn);
   const T = screenRoute(this.state.SignIn);

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
