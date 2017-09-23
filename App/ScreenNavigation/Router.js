import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import Test from '../Dummy/Test';
import Test2 from '../Dummy/Test2';
import Login from '../Login/Login';
import SignUp from '../Registration/SignUp';
import Charity from '../Registration/Charity';
import FetchFriend from '../Registration/FetchFriend';
import Dashboard from '../Dashboard/Dashboard';
import Paypal from '../Registration/Paypal';

// register all screens of the app (including internal ones)
export const screenRoute = (SignIn = false) => {

  return StackNavigator({

A:{screen:Test},
B:{screen:Test2},
LOG_IN:{screen:Login},
SIGN_UP:{screen:SignUp},
CHARITY:{screen:Charity},
FETCH_FRIEND:{screen:FetchFriend},
DASHBOARD:{screen: Dashboard},
PAYPAL:{screen: Paypal}
},{
headerMode: 'none',
 mode:'modal',
initialRouteName: SignIn ? 'DASHBOARD':'SIGN_UP'


  });
};
