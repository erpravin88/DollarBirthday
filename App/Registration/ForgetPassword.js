import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  Image,ScrollView, ImageBackground
} from 'react-native';

import images from '../Constant/Images';
import styles from './Style/ForgetPasswordStyle';
import settings from '../Constant/UrlConstant';
import Comunication from '../Constant/ConstantFunction';

export default class ForgetPassword extends Component {


  constructor(props){

   super(props);

     this.state = {'date': new Date(Date.now())};
   }


  render(){
  return(
<Image style = {styles.backgroundImage} source = {images.loginbackground}>
<View style = {styles.titleContainer}>
  <Text style = {styles.titleTextSecond}>Dollar Birthday Club!</Text>
  <Image style = {styles.logo} source = {images.baseLogo}/>
</View>
<View style = {[styles.TextInputContainer]}>
  <Text style = {styles.heading1}>Forget Password</Text>
</View>
<View style = {[styles.TextInputContainer]}>
  <Text style = {styles.subhead1}>Please enter your email id below to</Text>
  <Text style = {styles.subhead1}>generate a new password</Text>
</View>
<ScrollView keyboardShouldPersistTaps="always">
  <View style = {[styles.TextInputContainer,styles.marginFix1]}>
    <TextInput
    style = {styles.TextInputStyle}
    keyboardType = 'default'
    placeholderTextColor = "#b7b7b7"
    placeholder = 'Email Id'
    underlineColorAndroid = 'transparent'
    multiline = {false} maxLength = {100}
    />
    <Text style = {styles.TextInputLine} />
    <Image style = {styles.TextInputIcon} source = {images.emailIcon}/>
  </View>
  <View style = {styles.TextInputContainer}>
  <TouchableOpacity
  style = {[styles.signInButtonContainer,{backgroundColor:'#6A4A9A'}]}
  onPress = {this.onLoginClick}>
    <Text style = {styles.signInButton}>Send</Text>
  </TouchableOpacity>
  </View>
  <TouchableOpacity>
  <View style = {[styles.TextInputContainer]}>
        <Text style = {styles.term_service}>Remember password? <Text onPress={()=>{this.props.navigation.goBack(null); }} style={{color:'#6A4A9A',fontWeight:'600'}}>Sign in now</Text></Text>
  </View></TouchableOpacity>
</ScrollView>
</Image>);

  }
}
