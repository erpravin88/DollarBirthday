import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  Image,ScrollView, ImageBackground,Linking,
  AsyncStorage,
  KeyboardAvoidingView,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import images from '../Constant/Images';
import styles from './Style/PaypalStyle';
import DatePicker from 'react-native-datepicker';
import { Dropdown } from 'react-native-material-dropdown';
import settings from '../Constant/UrlConstant';
import Comunication from '../Constant/ConstantFunction';
import {callApiWithAuth} from '../Service/WebServiceHandler';
import { USER_KEY, AUTH_TOKEN, USER_DETAILS, onSignIn, setUserDetails, afterSignIn } from '../Constant/Auth';
import MyActivityIndicator from '../Component/MyActivityIndicator';
import { NavigationActions } from 'react-navigation';
const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'CHARITY' })],
    });
export default class PayPal extends Component {


  constructor(props){

   super(props);

   this.onPaypalClick = this.onPaypalClick.bind(this);
   this.state = {
                 email: '',
                 errorMsg:{"emailMsg":''},
                 auth_token:'',
                 user_key:'',
                 user_details:'',
                 currency:'USD',
                 showProgress: false,
                };
               }


componentWillMount(){
                  //this.setState({name: this.props.navigation.state.params.name});
  AsyncStorage.getItem(USER_KEY).then((key)=>{
    this.setState({user_key: key});
  }).catch((err)=>{
  Toast.show(err);
  });
  AsyncStorage.getItem(AUTH_TOKEN).then((token)=>{
    this.setState({auth_token: token});
  }).catch((err)=>{
       Toast.show(err);
     });
  AsyncStorage.getItem(USER_DETAILS).then((details)=>{
       details = JSON.parse(details);
       this.setState({user_details: details});
     }).catch((err)=>{
       Toast.show(err);
     });
  }                      // to fetch task types
onPaypalClick()
{

  let error = this.state.errorMsg;
  error.emailMsg = '';
  let flag = '';
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  if(this.state.email == '')
  {
  flag = '0';
  error.emailMsg = 'Please enter email.';

  }
  else if(!re.test(this.state.email))
  {

  console.log('validdat')
    flag = '0';
    error.emailMsg = 'Please enter valid email.';

  }


if(flag != ''){
  this.setState({errorMsg: error});
}
else
{
  console.log(this.state.email);
  console.log(this.state.auth_token);
  this.setState({showProgress : true});
  callApiWithAuth('user/payment','PUT',this.state.auth_token, {"paypal":this.state.email,"currency":this.state.currency}).then((response) => {

    if(response.status === 201){
    response.json().then((responseobject) => {
      console.log(responseobject);
       this.props.navigation.dispatch(resetAction);
       this.setState({showProgress : false});
    });
    Toast.show('PayPal link Successfully');
  }else if (response.status === 404) {
    this.setState({showProgress : false});
    Toast.show('Page not Found');
  }else if (response.status === 406) {
    this.setState({showProgress : false});
    Toast.show('Email is Invalid');
  }else if (response.status === 500) {
    this.setState({showProgress : false});
    Toast.show('Unsuccessfull error:500');
    }
  }).catch((error) => {console.log(error); })
  //let userData = this.props.navigation.state.params.user_data;
  //userData.paypal = this.state.email;
//  this.props.navigation.navigate('CHARITY',{user_data: userData});
}

}
hideErrors(){
  let error = this.state.errorMsg;
  error.emailMsg = '';
  this.setState({errorMsg: error});
}
  render(){
  return(

    <ScrollView  keyboardShouldPersistTaps="always">
    <View style = {[styles.TextInputContainer,styles.marginFix1]}>
      <TextInput
      style = {styles.TextInputStyle}
      keyboardType = 'email-address'
      placeholderTextColor = "#b7b7b7"
      placeholder = 'PayPal Email Id'
      underlineColorAndroid = 'transparent'
      multiline = {false} maxLength = {100}
      returnKeyType="send"
      autoCapitalize="none"
      autoCorrect={false}
      onSubmitEditing={this.onPaypalClick}
      onChangeText = {(val) => {this.setState({email: val});this.hideErrors();}}
      />
      <Text style = {styles.TextInputLine} />
      <Image style = {styles.TextInputIcon} source = {images.emailIcon}/>
      <Text style = {styles.errorMsg}>{this.state.errorMsg['emailMsg']}</Text>
    </View>
    <View style = {styles.TextInputContainer}>
      <TouchableOpacity style = {[styles.facebookButtonContainer,{borderRadius:3}]}
      onPress = {this.onPaypalClick}>
        <Image style = {styles.facebookButton} source = {images.payPalBtn}/>
      </TouchableOpacity>
    </View>
    </ScrollView>
);

  }
}
