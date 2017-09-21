import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import Test from '../Dummy/Test';
import Test2 from '../Dummy/Test2';
import Login from '../Login/Login';
import SignUp from '../Registration/SignUp';


// register all screens of the app (including internal ones)
export const screenRoute = () => {

  return StackNavigator({

A:{screen:Test},
B:{screen:Test2},
LOG_IN:{screen:Login},
SIGN_UP:{screen:SignUp}

},{
headerMode: 'none',
 mode:'modal',
  initialRouteName:'SIGN_UP'

  });
};
