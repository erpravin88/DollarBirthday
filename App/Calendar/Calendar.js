import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  Image,ScrollView, ImageBackground,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';

import Toast from 'react-native-simple-toast';
import images from '../Constant/Images';
import styles from './Style/CalendarStyle';
import DatePicker from 'react-native-datepicker';
import MyActivityIndicator from '../Component/MyActivityIndicator';
import { USER_KEY, AUTH_TOKEN, USER_DETAILS, onSignIn, setUserDetails, afterSignIn } from '../Constant/Auth';
import {callApiWithAuth} from '../Service/WebServiceHandler';
const date = new Date(Date.now());
export default class Calendar extends Component {

constructor(props){
    super(props);
    this.state = {
        Friends:[],
        auth_token: '',
        showProgress: false
    };
}

componentWillMount(){
    //this.setState({name: this.props.navigation.state.params.name});
        AsyncStorage.getItem(USER_KEY).then((key)=>{
          //this.setState({user_key: key});
        }).catch((err)=>{
          Toast.show(err);
        });
        AsyncStorage.getItem(AUTH_TOKEN).then((token)=>{
           this.setState({auth_token: token});
             callApiWithAuth('user/friends','GET', this.state.auth_token).then((response) => {
                if(response.status === 200){
                  response.json().then((responseobject) => {
                    this.setState({ Friends: responseobject.data });
                    console.log(responseobject);
                  });
                  this.setState({showProgress : false});
                  //Toast.show('Task fetched');
                }else if (response.status === 401) {
                   this.setState({showProgress : false});
                   Toast.show('Error fetching friends');
                }else if (response.status === 500) {
                   this.setState({showProgress : false});
                   Toast.show('Error fetching friends:500');
                }
             }).catch((error) => { this.setState({showProgress : false}); console.log(error); });
        }).catch((err)=>{
          onSignOut;
          Toast.show(err);
        });
        AsyncStorage.getItem(USER_DETAILS).then((details)=>{
          details = JSON.parse(details);
          //this.setState({user_details: details});
        }).catch((err)=>{
          Toast.show(err);
        });
    }

render(){
    return(
        <ScrollView keyboardShouldPersistTaps="always">
            <Image style = {styles.backgroundImage} source = {images.background}>
                <MyActivityIndicator progress={this.state.showProgress} />
                <Image style = {styles.dashlogo} source = {images.dashboardIcon}></Image>
                <View style = {styles.titleContainer}>
                    <Text style = {styles.titleTextFirst}>Birthday Calendar</Text>
                    <Text style = {styles.titleTextSecond}>Dollar Birthday Club!</Text>
                </View>
                
            </Image>
        </ScrollView>);
    }
}
