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
import {callApiWithoutAuth} from '../Service/WebServiceHandler';
import MyActivityIndicator from '../Component/MyActivityIndicator';

export default class ForgetPassword extends Component {
  constructor(props){
     super(props);
     this.onSubmitClick = this.onSubmitClick.bind(this);
     this.state = {
                   email: '',
                   errorMsg:{"emailMsg":''},
                   showProgress: false,
                  };
  }
  onSubmitClick(){
     let error = this.state.errorMsg;
     error.emailMsg = '';
     let flag = '';
     var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     if(this.state.email == ''){
     flag = '0';
     error.emailMsg = 'Please enter email.';
     }else if(!re.test(this.state.email)){
       flag = '0';
       error.emailMsg = 'Please enter valid email.';
     }
     if(flag != ''){
       this.setState({errorMsg: error});
     }else{
       this.setState({showProgress : true});
       callApiWithoutAuth('forgotPassword','POST', {"email":this.state.email}).then((response) => {
         if(response.status === 201){
         response.json().then((responseobject) => {
           console.log(responseobject);
            this.props.navigation.goBack(null);
            this.setState({showProgress : false});
         });
         Toast.show('Password Send Successfully');
       }else if (response.status === 404) {
         this.setState({showProgress : false});
         Toast.show('Email is not registered');
       }else if (response.status === 406) {
         this.setState({showProgress : false});
         Toast.show('Email is Invalid');
       }else if (response.status === 500) {
         this.setState({showProgress : false});
         Toast.show('Unsuccessfull error:500');
         }
       }).catch((error) => {console.log(error); });

    }
  }
  hideErrors(){
    let error = this.state.errorMsg;
    error.passwordMsg = '';
    error.emailMsg = '';
    this.setState({errorMsg: error});
  }
  render(){
  return(
<Image style = {styles.backgroundImage} source = {images.loginbackground}>
<MyActivityIndicator progress={this.state.showProgress} />
<View style = {styles.titleContainer}>
  <Text style = {styles.titleTextSecond}>Dollar Birthday Club!</Text>
</View>
<ScrollView keyboardShouldPersistTaps="always">
<View style = {[styles.TextInputContainer]}>
  <Text style = {styles.heading1}>Forgot Password</Text>
</View>
<View style = {[styles.TextInputContainer]}>
  <Text style = {styles.subhead1}>Please enter your email id below to</Text>
  <Text style = {styles.subhead1}>generate a new password</Text>
</View>

  <View style = {[styles.TextInputContainer,styles.marginFix1]}>
    <TextInput
    style = {styles.TextInputStyle}
    keyboardType = 'default'
    placeholderTextColor = "#b7b7b7"
    placeholder = 'Email Id'
    keyboardType = 'email-address'
    underlineColorAndroid = 'transparent'
    multiline = {false} maxLength = {100}
    returnKeyType="send"
    keyboardType="email-address"
    autoCapitalize="none"
    autoCorrect={false}
    onSubmitEditing={this.onSubmitClick}
    onChangeText = {(val) => {this.setState({email: val});this.hideErrors();}}
    />
    <Text style = {styles.TextInputLine} />
    <Image style = {styles.TextInputIcon} source = {images.emailIcon}/>
    <Text style = {styles.errorMsg}>{this.state.errorMsg['emailMsg']}</Text>
  </View>
  <View style = {styles.TextInputContainer}>
  <TouchableOpacity
  style = {[styles.signInButtonContainer,{backgroundColor:'#6A4A9A'}]}
  onPress = {this.onSubmitClick}>
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
