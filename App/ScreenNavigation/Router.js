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
import Upcoming from '../Upcomings/Upcomings';
import Calendars from '../Calendar/Calendar';
import SendGift from '../SendGift/SendGift';
import Setting from '../Settings/Settings';
import Donate from '../Donate/Donate';
import Inbox from '../Inbox/Inbox';
import GiftHistory from '../GiftHistory/GiftHistory';

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
    CALENDAR: {screen:Calendars},
    SEND_GIFT: {screen:SendGift},
    SETTING: {screen:Setting},
    DONATE: {screen:Donate},
    INBOX: {screen:Inbox},
    GIFTHISTORY: {screen:GiftHistory},
    },{
    headerMode: 'none',
    mode:'modal',
    initialRouteName: SignIn ? 'DASHBOARD':'LOG_IN'
  });
};
