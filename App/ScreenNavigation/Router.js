import React, { Component } from 'react';
import { TabNavigator ,StackNavigator ,NavigationActions} from 'react-navigation';
import Login from '../Login/Login';
import SignUp from '../Registration/SignUp';
import Charity from '../Registration/Charity';
import FetchFriend from '../Registration/FetchFriend';
import Paypal from '../Registration/Paypal';
import ImportManually from '../Registration/ImportManually';
import Dashboard from '../Dashboard/Dashboard';
import ForgotPassword from '../Registration/ForgotPassword';
import AddFriend from '../AddFriend/AddFriend';
import Upcoming from '../Upcomings/Upcomings';
import Calendars from '../Calendar/Calendar';
import SendGift from '../SendGift/SendGift';
import Setting from '../Settings/Settings';
import Donate from '../Donate/Donate';
import Inbox from '../Inbox/Inbox';
import GiftHistory from '../GiftHistory/GiftHistory';
import InviteFriend from '../InviteFriend/InviteFriend';

export const screenRoute = (SignIn) => {
  // console.log('route');
  // console.log(SignIn);
  return StackNavigator({
    LOG_IN:{screen:Login},
    SIGN_UP:{screen:SignUp},
    CHARITY:{screen:Charity},
    FETCH_FRIEND:{screen:FetchFriend},
    PAYPAL:{screen: Paypal},
    IMPORTMANUALLY: {screen:ImportManually},
    DASHBOARD:{screen: Dashboard},
    FPASSWORD:{screen: ForgotPassword},
    ADDFRIEND:{screen: AddFriend},
    UPCOMINGS : {screen : Upcoming},
    CALENDAR: {screen:Calendars},
    SEND_GIFT: {screen:SendGift},
    SETTING: {screen:Setting},
    DONATE: {screen:Donate},
    INBOX: {screen:Inbox},
    GIFTHISTORY: {screen:GiftHistory},
    INVITE_FRIEND: {screen:InviteFriend},
    },{
    headerMode: 'none',
    mode:'card',
    initialRouteName: (SignIn === true) ? 'DONATE':'LOG_IN'
  });
};
