import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';


import Login from '../Login/Login';
import SignUp from '../Registration/SignUp';
import Charity from '../Registration/Charity';
import FetchFriend from '../Registration/FetchFriend';
import Dashboard from '../Dashboard/Dashboard';
import Paypal from '../Registration/Paypal';
import ForgetPassword from '../Registration/ForgetPassword';
import AddFriend from '../AddFriend/AddFriend';
import Calendars from '../Calendar/Calendar';

// register all screens of the app (including internal ones)
export const screenRoute = (SignIn) => {
  return StackNavigator({
    LOG_IN:{screen:Login},
    SIGN_UP:{screen:SignUp},
    CHARITY:{screen:Charity},
    FETCH_FRIEND:{screen:FetchFriend},
    DASHBOARD:{screen: Dashboard},
    PAYPAL:{screen: Paypal},
    FPASSWORD:{screen: ForgetPassword},
    ADDFRIEND:{screen: AddFriend},
    CALENDAR: {screen:Calendars}
    },{
    headerMode: 'none',
    mode:'modal',
    initialRouteName: SignIn ? 'DASHBOARD':'LOG_IN'
  });
};
