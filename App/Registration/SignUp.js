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
} from 'react-native';

import Toast from 'react-native-simple-toast';
import MyActivityIndicator from '../Component/MyActivityIndicator';
import images from '../Constant/Images';
import styles from './Style/RegistrationStyle';
import DatePicker from 'react-native-datepicker';
import settings from '../Constant/UrlConstant';
import { USER_KEY, AUTH_TOKEN, USER_DETAILS, onSignIn, setUserDetails, afterSignIn } from '../Constant/Auth';
import {callApiWithoutAuth} from '../Service/WebServiceHandler';
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

     date: date.getFullYear()+'-'+month+'-'+date.getDate(),
     email:'',
     password:'',
     fullName:'',
     device_id:settings.DEVICE_ID,
     device_type:settings.DEVICE_NAME,
     dob:'',
     paypal:'abc@gmail.com',
     errorMsg:{"emailMsg":'', "passwordMsg":'', "fullName":'', "dob":''},
     showProgress: false

 };

 }

 componentWillMount(){
 }


onSignUpClick(userData){

  let error = this.state.errorMsg;
  error.passwordMsg = '';
  error.emailMsg = '';
  error.dob = '';
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
  else if(this.state.password == '')
  {
    flag = '1';
    error.passwordMsg = 'Please enter password.';
  }
  else if(this.state.password.length < 8)
  {
    flag = '1';
    error.passwordMsg = 'Minimum 8 character required.';
  }


  if(flag != ''){
    this.setState({errorMsg: error});
  }
  else
  {
    this.setState({showProgress : true});
      callApiWithoutAuth('register','POST', {"email":this.state.email,
        "password":this.state.password,
        "device_id":this.state.device_id,
        "device_type":this.state.device_type,
        "paypal":this.state.email,
        "full_name":this.state.fullName,
        "birth_date": this.state.date }
      ).then((response) => {
        // response.json().then((responseobject) => {
        // console.log(responseobject);});
        if(response.status === 201){
        response.json().then((responseobject) => {
          console.log(responseobject);
           onSignIn();
           afterSignIn(responseobject.data.authToken);
           setUserDetails(responseobject.data);
           this.props.navigation.dispatch(resetAction);
           this.setState({showProgress : false});
        console.log(responseobject);
        });
        Toast.show('Registration Successfull');
      }else if (response.status === 404) {
        this.setState({showProgress : false});
        Toast.show('Page not Found.');
      }else if (response.status === 406) {
        response.json().then((responseobject) => {
          this.setState({showProgress : false});
          Toast.show(responseobject.error_messages);
        });
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
  error.dob = '';
  error.fullName = '';
  this.setState({errorMsg: error});
}

  render(){

  return(
<Image style = {styles.backgroundImage} source = {images.loginbackground}>
  <MyActivityIndicator progress={this.state.showProgress} />
  <View style = {styles.titleContainer}>
    <Text style = {styles.titleTextFirst}>Join the</Text>
    <Text style = {styles.titleTextSecond}>Dollar Birthday Club!</Text>
  </View>
  <View style = {[styles.formgroup]}>
    <ScrollView  keyboardShouldPersistTaps="always">
      <View style = {[styles.TextInputContainer,styles.inputBorderBottom]}>
        <TextInput style = {styles.TextInputStyle}
          keyboardType = 'default'
          placeholderTextColor = "#b7b7b7"
          placeholder = 'Full Name'
          underlineColorAndroid = 'transparent'
          multiline = {false}
          maxLength = {100}
          returnKeyType="next"
          autoCorrect={false}
          onSubmitEditing={(event) => {this.refs.secondInput.focus();}}
          onChangeText = {(val) => {this.setState({fullName: val});this.hideErrors();}}
        />
        <Image style = {styles.TextInputIcon} source = {images.fullName}/>
      </View>
      <Text style = {styles.errorMsg}>{this.state.errorMsg['fullName']}</Text>
      <View style = {[styles.TextInputContainer,styles.inputBorderBottom]}>
        <TextInput
          style = {styles.TextInputStyle}
          ref='secondInput'
          keyboardType = 'email-address'
          placeholderTextColor = "#b7b7b7"
          placeholder = 'Email Id'
          underlineColorAndroid = 'transparent'
          multiline = {false}
          maxLength = {100}
          returnKeyType="next"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText = {(val) => {this.setState({email: val});this.hideErrors();}}
        />
        <Image style = {styles.TextInputIcon} source = {images.emailIcon}/>
      </View>
      <Text style = {styles.errorMsg}>{this.state.errorMsg['emailMsg']}</Text>
      <View style = {styles.TextInputContainer}>
        <Text style = {styles.dob_label}>Birthday</Text>
        <DatePicker
          style = {styles.date_picker}
          date = {this.state.date}
          format = "YYYY-MM-DD"
          maxDate = {this.state.date}
          confirmBtnText = "Confirm"
          cancelBtnText = "Cancel"
          iconSource = {images.dropdownArrow}
          onDateChange = {(date) => {this.setState({date:date})}}
          customStyles={{dateInput: styles.dateInput,
                        dateIcon: styles.dateIcon,}}
        />
      </View>
      <View style = {[styles.TextInputContainer,styles.inputBorderBottom]}>
        <TextInput
          style = {styles.TextInputStyle}
          keyboardType = 'default'
          placeholderTextColor = "#b7b7b7"
          placeholder = 'Password'
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
      <Text style = {styles.errorMsg}>{this.state.errorMsg['passwordMsg']}</Text>
      <View style = {styles.TextInputContainer}>
        <TouchableOpacity style = {styles.signInButtonContainer}  onPress = {this.onSignUpClick}>
          <Text style = {styles.signInButton}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity >
          <Text style = {styles.button_below}>By signing up, you agree to the <Text style={styles.linkColor}>Terms of Services</Text> and <Text style={styles.linkColor}>Privacy Policy</Text></Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{this.props.navigation.goBack(null)}}>
          <Text style = {styles.login_button}>Already have account?<Text style={styles.linkColor}> Sign In</Text></Text>
        </TouchableOpacity>
      </View>
      <View style = {styles.TextInputContainer}>
        <Text style = {styles.orDivider}>- or -</Text>
      </View>
      <View style = {styles.TextInputContainer}>
        <TouchableOpacity style = {styles.facebookButtonContainer}>
          <Image style = {styles.facebookButton} source = {images.facebookButton}/>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </View>
  </Image>);
  }
}
