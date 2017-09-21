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
  View
} from 'react-native';

import Test from './App/Dummy/Test';
import SplashScreen from 'react-native-smart-splash-screen';

import {screenRoute} from './App/ScreenNavigation/Router';

export default class DollarBirthday extends Component {

  componentDidMount () {
       SplashScreen.close({
          animationType: SplashScreen.animationType.scale,
          duration: 2000,
          delay: 500,
       });
  }

  render() {

   const T = screenRoute();

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
