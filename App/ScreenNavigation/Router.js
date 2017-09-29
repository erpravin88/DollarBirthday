import React, { Component } from 'react';
import { TabNavigator ,StackNavigator ,NavigationActions} from 'react-navigation';


import Login from '../Login/Login';
import SignUp from '../Registration/SignUp';
import Charity from '../Registration/Charity';
import FetchFriend from '../Registration/FetchFriend';
import Dashboard from '../Dashboard/Dashboard';
import Paypal from '../Registration/Paypal';
import ForgetPassword from '../Registration/ForgetPassword';
import AddFriend from '../AddFriend/AddFriend';
import Upcomings from '../Upcomings/Upcomings';
const Routes =   {
  RECECNT: { screen : Upcomings,navigationOptions: {
      tabBarLabel: 'Recent Birthdays'
    }},
  UPNEXT : { screen : Upcomings,navigationOptions: {
      tabBarLabel: "Up Next"
    }},
  UPCOMING :{ screen : Upcomings,navigationOptions: {
      tabBarLabel: "Upcoming Birthays"
    }},
};
import Calendar from '../Calendar/Calendar';

const TabConfig = {
  stateName: 'MainNavigation',
  tabBarPosition: 'top',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#DC6361',
    inactiveTintColor: 'black',
    labelStyle: {
      fontSize: 10,
      width: '100%',
    },style: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: 'gray',
  }
  },
};
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
    UPCOMINGS : {screen :TabNavigator(Routes, TabConfig)},
    CALENDAR: {screen:Calendar}
    },{
    headerMode: 'none',
    mode:'modal',
    initialRouteName: SignIn ? 'DASHBOARD':'LOG_IN'
  });
};
