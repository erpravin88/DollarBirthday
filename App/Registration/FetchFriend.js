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
import styles from './Style/FetchFriendStyle';
import DatePicker from 'react-native-datepicker';
import { Dropdown } from 'react-native-material-dropdown';

export default class SignUp extends Component {


  constructor(props){

   super(props);

   this.state = {'date': new Date(Date.now())};
 }


  render(){

  return(
<Image style = {styles.backgroundImage} source = {images.loginbackground}>
<View style = {styles.titleContainer}>
  <Text style = {styles.titleTextFirst}></Text>
  <Text style = {[styles.titleTextSecond,styles.marginFix1]}>Dollar Birthday Club!</Text>
  <Image style = {styles.logo} source = {images.baseLogo}/>
</View>
<View style = {[styles.TextInputContainer]}>
  <Text style = {styles.heading1}>Life's better with friends.</Text>
</View>
<View style = {[styles.TextInputContainer,styles.marginFix2]}>
  <Text style = {styles.subhead1}>Import contacts and birthdays</Text>
</View>
<ScrollView keyboardShouldPersistTaps="always">

  <View style = {styles.TextInputContainer}>
    <TouchableOpacity style = {[styles.facebookButtonContainer,{borderRadius:3}]}>
      <Image style = {styles.facebookButton} source = {images.importfbbutton}/>
    </TouchableOpacity>
  </View>
  <View style = {styles.TextInputContainer}>
    <Text style = {styles.orDivider}>- or -</Text>
  </View>
  <View style = {[styles.TextInputContainer]}>
    <TouchableOpacity
    style = {[styles.signInButtonContainer,{backgroundColor:'#DC6966',borderRadius:3,}]}
    onPress = {this.onLoginClick}>
      <Text style = {styles.signInButton}>Import Manually</Text>
    </TouchableOpacity>
  </View>
</ScrollView>
</Image>);

  }
}
