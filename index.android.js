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
  NetInfo
} from 'react-native';

import Test from './App/Dummy/Test';
import SplashScreen from 'react-native-smart-splash-screen';
import { USER_KEY } from './App/Constant/Auth';
import {screenRoute} from './App/ScreenNavigation/Router';

export default class DollarBirthday extends Component {
    constructor(props){
     super(props);
     this.state = {
                SignIn: false,
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

  }

  render() {
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
