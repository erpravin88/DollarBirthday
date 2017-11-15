import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  Image,ScrollView,
  ImageBackground,
  ActivityIndicator,
  KeyboardAvoidingView,
  AsyncStorage,
} from 'react-native';

import Toast from 'react-native-simple-toast';
import MyActivityIndicator from '../Component/MyActivityIndicator';
import Label from '../Constant/Languages/LangConfig';
import images from '../Constant/Images';
import styles from './Style/GeneralStyle';
import DatePicker from 'react-native-datepicker';
import settings from '../Constant/UrlConstant';
import {checkinternetconnectivity} from '../Constant/netinfo';
import { USER_KEY, AUTH_TOKEN, USER_DETAILS, onSignIn, setUserDetails, afterSignIn } from '../Constant/Auth';
import {callApiWithoutAuth,callApiWithAuth} from '../Service/WebServiceHandler';
import { NavigationActions } from 'react-navigation';
const date = new Date(Date.now());
const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'PAYPAL' })],
    });
export default class SignUp extends Component {


  constructor(props){

   super(props);

   this.onSignUpClick = this.onSignUpClick.bind(this);
   var month = (date.getMonth()+1).toString();
   month = month.length>1?month:'0'+month;
   this.state = {

     maxdob: date.getFullYear()+'-'+month+'-'+date.getDate(),
     initialdob: (date.getFullYear() - 15)+'-'+month+'-'+date.getDate(),
     email:'',
     password:'',
     fullName:'',
     device_id:settings.DEVICE_ID,
     device_type:settings.DEVICE_NAME,
     paypal:'abc@gmail.com',
     errorMsg:{"emailMsg":'', "passwordMsg":'', "fullName":'', "initialdob":''},
     showProgress: false,
     auth_token:'',
     user_key:'',
     user_details:'',

 };

 }
componentWillMount(){
  AsyncStorage.getItem(USER_KEY).then((key)=>{
    this.setState({user_key: key});
  }).catch((err)=>{
  Toast.show(err);
  });
  AsyncStorage.getItem(USER_DETAILS).then((details)=>{
       details = JSON.parse(details);
       console.log(details);
       this.setState({user_details:details,fullName: details.full_name,initialdob:details.birth_date,email:details.email,auth_token: details.authToken});
     }).catch((err)=>{
       Toast.show(err);
     });
}
 componentDidMount(){

 }


onSignUpClick(userData){

  let error = this.state.errorMsg;
  error.passwordMsg = '';
  error.emailMsg = '';
  error.initialdob = '';
  error.fullName = '';
  let flag = '';
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



  if(this.state.fullName == '')
  {
console.log(this.state.date);
  flag = '0';
  error.fullName = 'Please enter full name.';

  }
  else if(this.state.email == '')
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
  // else if(this.state.password == '')
  // {
  //   flag = '1';
  //   error.passwordMsg = 'Please enter password.';
  // }
  else if(this.state.password != '' && this.state.password.length < 8)
  {
    flag = '1';
    error.passwordMsg = 'Minimum 8 character required.';
  }


  if(flag != ''){
    this.setState({errorMsg: error});
  }
  else
  {

    let data = {"email":this.state.email,
      "password":this.state.password,
    //  "device_id":this.state.device_id,
    //  "device_type":this.state.device_type,
      "paypal":this.state.email,
      "full_name":this.state.fullName,
      "birth_date": this.state.initialdob };
      console.log(data);
      checkinternetconnectivity().then((response)=>{
        if(response.Internet == true){
      this.setState({showProgress : true});
      callApiWithAuth('user/profile','PUT',this.state.auth_token ,data ).then((response) => {

        if(response.status === 201){

          let ud = this.state.user_details;
          ud.email = this.state.email;
          ud.full_name = this.state.fullName;
          ud.birth_date = this.state.initialdob;
          //ud = JSON.stringify(ud);
          console.log(ud);
        response.json().then((responseobject) => {
          console.log(responseobject);
           setUserDetails(ud);
           Toast.show('Data Updated Successfully.');
           this.setState({showProgress : false});
        });

      }else if (response.status === 404) {
        this.setState({showProgress : false});
        Toast.show('Page not Found.');
      }else if (response.status === 406) {
        response.json().then((responseobject) => {
          this.setState({showProgress : false,email:this.state.user_details.email});
          Toast.show(responseobject.error_messages);
        });
      }else if (response.status === 500) {
        this.setState({showProgress : false});
        Toast.show('Unsuccessfull error:500');
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
//  error.passwordMsg = '';
  error.emailMsg = '';
  error.dob = '';
  error.fullName = '';
  this.setState({errorMsg: error});
}

  render(){

  return(
  <View style={[styles.settingdetailwrap]}>
      <View style = {[styles.SettingsTextInputContainer,styles.inputBorderBottom]}>
        <TextInput style = {[styles.TextInputStyle,styles.font3]}
          keyboardType = 'default'
          placeholderTextColor = "#b7b7b7"
          placeholder = {Label.t('42')}
          underlineColorAndroid = 'transparent'
          multiline = {false}
          maxLength = {100}
          returnKeyType="next"
          autoCorrect={false}
          value={this.state.fullName}
          onSubmitEditing={(event) => {this.refs.secondInput.focus();}}
          onChangeText = {(val) => {this.setState({fullName: val});this.hideErrors();}}
        />
        <Image style = {styles.TextInputIcon} source = {images.fullName}/>
      </View>
      <Text style = {[styles.errorMsg ,styles.SettingsTextInputContainer]}>{this.state.errorMsg['fullName']}</Text>
      <View style = {[styles.SettingsTextInputContainer,styles.inputBorderBottom]}>
        <TextInput
          style = {[styles.TextInputStyle,styles.font3]}
          ref='secondInput'
          keyboardType = 'email-address'
          placeholderTextColor = "#b7b7b7"
          placeholder = {Label.t('41')}
          underlineColorAndroid = 'transparent'
          multiline = {false}
          maxLength = {100}
          returnKeyType="next"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={this.state.email}
          onChangeText = {(val) => {this.setState({email: val});this.hideErrors();}}
        />
        <Image style = {styles.TextInputIcon} source = {images.emailIcon}/>
      </View>
      <Text style = {[styles.errorMsg ,styles.SettingsTextInputContainer]}>{this.state.errorMsg['emailMsg']}</Text>
      <View style = {styles.SettingsTextInputContainer}>
        <Text style = {[styles.dob_label,styles.font2]}>{Label.t('43')}</Text>
        <DatePicker
          style = {[styles.date_picker]}
          date = {this.state.initialdob}
          format = "YYYY-MM-DD"
          maxDate = {this.state.maxdob}
          confirmBtnText = {Label.t('6')}
          cancelBtnText = {Label.t('7')}
          iconSource = {images.dropdownArrow}
          onDateChange = {(date) => {this.setState({initialdob:date})}}
          customStyles={{dateInput: styles.dateInput,
                        dateIcon: styles.dateIcon,}}
        />
      </View>
      <Text style = {[styles.errorMsg ,styles.SettingsTextInputContainer]}>{this.state.errorMsg['initialdob']}</Text>
      <View style = {[styles.SettingsTextInputContainer,styles.inputBorderBottom]}>
        <TextInput
          style = {[styles.TextInputStyle,styles.font3]}
          keyboardType = 'default'
          placeholderTextColor = "#b7b7b7"
          placeholder = {Label.t('44')}
          underlineColorAndroid = 'transparent'
          secureTextEntry = {true}
          multiline = {false}
          maxLength = {100}
          returnKeyType="send"
          autoCorrect={false}
          onSubmitEditing={this.onSignUpClick}
          onChangeText = {(val) => {this.setState({password: val});this.hideErrors();}}
        />
        <Image style = {styles.TextInputIcon} source = {images.password}/>
      </View>
      <Text style = {[styles.errorMsg ,styles.SettingsTextInputContainer]}>{this.state.errorMsg['passwordMsg']}</Text>
      <View style = {[styles.SettingsTextInputContainer,{marginTop:15}]}>
        <TouchableOpacity style = {styles.signInButtonContainer}  onPress = {this.onSignUpClick}>
          <Text style = {styles.signInButton}>{Label.t('39')}</Text>
        </TouchableOpacity>
      </View>
<View style={{height:200,backgroundColor:'#FFFFFF'}}></View>
  </View>);
  }
}
