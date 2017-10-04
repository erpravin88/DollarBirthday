import React, { Component } from 'react';
import { TabNavigator ,StackNavigator ,NavigationActions} from 'react-navigation';
import Login from '../Login/Login';
import SignUp from '../Registration/SignUp';
import Charity from '../Registration/Charity';
import FetchFriend from '../Registration/FetchFriend';
import Dashboard from '../Dashboard/Dashboard';
import Paypal from '../Registration/Paypal';
import ForgotPassword from '../Registration/ForgotPassword';
import AddFriend from '../AddFriend/AddFriend';
// import Recent from '../Upcomings/Recent';
// import Upnext from '../Upcomings/Upnext';
import Upcoming from '../Upcomings/Upcomings';
import Calendars from '../Calendar/Calendar'
// const Routes =   {
//   RECECNT: { screen : Recent,navigationOptions: {
//       tabBarLabel: 'Recent Birthdays'
//     }},
//   UPNEXT : { screen : Upnext,navigationOptions: {
//       tabBarLabel: "Up Next"
//     }},
//   UPCOMING :{ screen : Upcoming,navigationOptions: {
//       tabBarLabel: "Upcoming Birthays"
//     }},
// };
import Calendar from '../Calendar/Calendar';
// const TabConfig = {
//   stateName: 'MainNavigation',
//   tabBarPosition: 'top',
//   animationEnabled: true,
//   tabBarOptions: {
//     activeTintColor: '#DC6361',
//     inactiveTintColor: 'black',
//     upperCaseLabel: false,
//     labelStyle: {
//       fontSize: 10,
//       width: '100%',
//     },style: {
//     backgroundColor: '#ffffff',
//     borderTopWidth: 1,
//     borderTopColor: 'gray',
//   }
//   },
// };
// register all screens of the app (including internal ones)
export const screenRoute = (SignIn) => {

  return StackNavigator({
    LOG_IN:{screen:Login},
    SIGN_UP:{screen:SignUp},
    CHARITY:{screen:Charity},
    FETCH_FRIEND:{screen:FetchFriend},
    DASHBOARD:{screen: Dashboard},
    PAYPAL:{screen: Paypal},
    FPASSWORD:{screen: ForgotPassword},
    ADDFRIEND:{screen: AddFriend},
    UPCOMINGS : {screen : Upcoming},
    CALENDAR: {screen:Calendars}
    },{
    headerMode: 'none',
    mode:'modal',
    initialRouteName: SignIn ? 'DASHBOARD':'LOG_IN'
  });
};
