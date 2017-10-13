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
import Toast from 'react-native-simple-toast';
import styles from './Style/ForgotPasswordStyle';
import settings from '../Constant/UrlConstant';
import Label from '../Constant/Languages/LangConfig';
import {callApiWithoutAuth} from '../Service/WebServiceHandler';
import MyActivityIndicator from '../Component/MyActivityIndicator';
import {checkinternetconnectivity} from '../Constant/netinfo';

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
      checkinternetconnectivity().then((response)=>{
        if(response.Internet == true){
        this.setState({showProgress : true});
        callApiWithoutAuth('forgotPassword','POST', {"email":this.state.email}).then((response) => {
          if(response.status === 201){
          response.json().then((responseobject) => {
            console.log(responseobject);
              this.props.navigation.goBack(null);
              this.setState({showProgress : false});
          });
          Toast.show(Label.t('89'));
        }else if (response.status === 404) {
          this.setState({showProgress : false});
          Toast.show(Label.t('90'));
        }else if (response.status === 406) {
          this.setState({showProgress : false});
          Toast.show(Label.t('91'));
        }else if (response.status === 500) {
          this.setState({showProgress : false});
          Toast.show(Label.t('52'));
          }
        }).catch((error) => {console.log(error); });
      }else{
        Toast.show("No Internet Connection");
      }

    });
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
  <Text style = {styles.titleTextSecond}>{Label.t('1')}</Text>
</View>
<View style={{height:'56%',overflow:'hidden'}}>
<ScrollView  keyboardShouldPersistTaps="always">
<View style = {[styles.TextInputContainer]}>
  <Text style = {styles.heading1}>{Label.t('69')}</Text>
</View>
<View style = {[styles.TextInputContainer]}>
  <Text style = {styles.subhead1}>{Label.t('92')}</Text>
  <Text style = {styles.subhead1}>{Label.t('93')}</Text>
</View>
  <View style={[styles.marginFix1,]}>
  <View style = {[styles.TextInputContainer,styles.inputBorderBottom]}>
    <TextInput
    style = {styles.TextInputStyle}
    keyboardType = 'default'
    placeholderTextColor = "#b7b7b7"
    placeholder = {Label.t('41')}
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
    <Image style = {styles.TextInputIcon} source = {images.emailIcon}/>
  </View>
  <Text style = {styles.errorMsg}>{this.state.errorMsg['emailMsg']}</Text>
  </View>
  <View style = {styles.TextInputContainer}>
  <TouchableOpacity
  style = {[styles.signInButtonContainer,{backgroundColor:'#6A4A9A'}]}
  onPress = {this.onSubmitClick}>
    <Text style = {styles.signInButton}>{Label.t('94')}</Text>
  </TouchableOpacity>
  </View>
  <TouchableOpacity>
  <View style = {[styles.TextInputContainer,{marginBottom:'30%'}]}>
        <Text style = {styles.term_service}>{Label.t('95')}<Text onPress={()=>{this.props.navigation.goBack(null); }} style={{color:'#6A4A9A',fontWeight:'600'}}>{Label.t('96')}</Text></Text>
  </View></TouchableOpacity>
  </ScrollView>
  </View>
</Image>);

  }
}
