import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  Image,ScrollView, ImageBackground,Linking
} from 'react-native';

import images from '../Constant/Images';
import styles from './Style/PaypalStyle';
import DatePicker from 'react-native-datepicker';
import { Dropdown } from 'react-native-material-dropdown';
import settings from '../Constant/UrlConstant';
import Comunication from '../Constant/ConstantFunction';

export default class PayPal extends Component {


  constructor(props){

   super(props);

   this.onPaypalClick = this.onPaypalClick.bind(this);
   this.state = {
                 'email': '',
                 errorMsg:{"emailMsg":''}
                };
               }



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
  let userData = this.props.navigation.state.params.user_data;
  userData.paypal = this.state.email;
  this.props.navigation.navigate('CHARITY',{user_data: userData});
}

}

  render(){
  return(
<Image style = {styles.backgroundImage} source = {images.loginbackground}>
<View style = {styles.titleContainer}>
  <Text style = {styles.titleTextSecond}>Dollar Birthday Club!</Text>
  <Image style = {styles.logo} source = {images.baseLogo}/>
</View>
<View style = {[styles.TextInputContainer]}>
  <Text style = {styles.heading1}>Thanks for joining!</Text>
</View>
<View style = {[styles.TextInputContainer]}>
  <Text style = {styles.subhead1}>You are required to link your PayPal account</Text>
  <Text style = {styles.subhead1}>to use Dollar Birthday Club to send gifts.</Text>
</View>
<ScrollView keyboardShouldPersistTaps="always">
  <View style = {[styles.TextInputContainer,styles.marginFix1]}>
    <TextInput
    style = {styles.TextInputStyle}
    keyboardType = 'email-address'
    placeholderTextColor = "#b7b7b7"
    placeholder = 'PayPal Email Id'
    underlineColorAndroid = 'transparent'
    multiline = {false} maxLength = {100}
    onChangeText = {(val) => {this.setState({email: val});}}
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
  <TouchableOpacity>
  <View style = {[styles.TextInputContainer]}>
        <Text style = {styles.term_service}>Don,t have a Paypal account? <Text onPress={()=>{Comunication.web(settings.PAYPAL_URL);console.log('yes'); }} style={{color:'#449FD8',fontWeight:'600'}}>Sign up now</Text></Text>
  </View></TouchableOpacity>
</ScrollView>
</Image>);

  }
}
