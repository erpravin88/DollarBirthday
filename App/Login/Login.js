import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  Image,ScrollView,
  ImageBackground,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import Toast from 'react-native-simple-toast';
import settings from '../Constant/UrlConstant';
import { USER_KEY, AUTH_TOKEN, USER_DETAILS, onSignIn, setUserDetails, afterSignIn } from '../Constant/Auth';
import images from '../Constant/Images';
import MyActivityIndicator from '../ActivityIndicator/MyActivityIndicator';
import styles from './style/LoginStyle';
import {callPostApi, callApiWithoutAuth} from '../Service/WebServiceHandler';

export default class Login extends Component {

  constructor(props){
   super(props);
   this.onLoginClick = this.onLoginClick.bind(this);
   this.state = {
                email:'',
                password:'',
                device_id:'',
                device_type:'',
                login_type:'dbc',
                errorMsg:{"emailMsg":'', "passwordMsg":''},
                showProgress: false,
              };
  }
  componentWillMount(){
    let that = this;
      //this.props.navigation.navigate('DASHBOARD',{name: this.state.email});
    this.setState({device_id : settings.DEVICE_ID , device_type : settings.DEVICE_NAME});
    AsyncStorage.getItem(USER_KEY).then((key) => {
      console.log(key);
console.log(this.state);
      if(key){
        console.log('in');
        this.props.navigation.navigate('DASHBOARD',{name: this.state.email});
      }
    })
  }
  onLoginClick(){

    let error = this.state.errorMsg;
    error.passwordMsg = '';
    error.emailMsg = '';
    let flag = '';
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(this.state.email == ''){
    flag = '0';
    error.emailMsg = 'Please enter email.';
    }else if(!re.test(this.state.email)){
      flag = '0';
      error.emailMsg = 'Please enter valid email.';
    }else if(this.state.password == ''){
      flag = '1';
      error.passwordMsg = 'Please enter password.';
    }
    if(flag != ''){
      this.setState({errorMsg: error});
    }else{
      this.setState({showProgress : true});
      console.log(this.state);  // Add your logic for the transition
        callApiWithoutAuth('login','POST', {"email":this.state.email,
          "password":this.state.password,
          "login_type":this.state.login_type,
          "device_id":this.state.device_id,
          "device_type":this.state.device_type}
        ).then((response) => {
          if(response.status === 200){
          response.json().then((responseobject) => {
            console.log(responseobject);
             onSignIn();
             afterSignIn(responseobject.data.authToken);
             setUserDetails(responseobject.data);
             this.props.navigation.navigate('DASHBOARD',{name: this.state.email});
             this.setState({showProgress : false});
          console.log(responseobject);
          });
          Toast.show('Login Successfull');
        }else if (response.status === 404) {
          this.setState({showProgress : false});
        }else if (response.status === 406) {
          this.setState({showProgress : false});
          Toast.show('Email/Password is incorrect');
        }else if (response.status === 500) {
          this.setState({showProgress : false});
          Toast.show('Unsuccessfull error:500');
          }
        }).catch((error) => {console.log(error); });

    }
  }
render(){
  let activityind =(this.state.showProgress) ? (
  <View style={styles.activityloder}>
    <View><ActivityIndicator animating={true} size="large" /></View>
  </View>): (<View></View>);
return(
<Image style = {styles.backgroundImage} source = {images.loginbackground} >
{activityind}
  <View style = {styles.titleContainer}>
    <Text style = {styles.titleTextFirst}>Join the</Text>
    <Text style = {styles.titleTextSecond}>Dollar Birthday Club!</Text>
    <Image style = {styles.logo} source = {images.baseLogo}/>
  </View>

  <ScrollView>
    <View style = {styles.EmailTextInputContainer}>
      <TextInput style = {styles.TextInputStyle}
        keyboardType = 'email-address'
        placeholderTextColor = "#b7b7b7"
        placeholder = 'Email Id'
        underlineColorAndroid = 'transparent'
        returnKeyType="next"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        onSubmitEditing={(event) => {this.refs.secondInput.focus();}}
        multiline = {false}
        maxLength = {100}
        onChangeText = {(val) => {this.setState({email: val});}}
      />
      <Text style = {styles.TextInputLine}/>
      <Image style = {styles.TextInputIcon} source = {images.emailIcon}/>
      <Text style = {styles.errorMsg}>{this.state.errorMsg['emailMsg']}</Text>
    </View>
    <View style = {styles.TextInputContainer}>
      <TextInput style = {styles.TextInputStyle}
        ref='secondInput'
        keyboardType = 'default'
        placeholderTextColor = "#b7b7b7"
        placeholder = 'Password'
        underlineColorAndroid = 'transparent'
        secureTextEntry = {true}
        multiline = {false}
        maxLength = {100}
        returnKeyType="go"
        onSubmitEditing={()=>{this.onLoginClick();}}
        onChangeText = {(val) => {this.setState({password: val});}}
      />
      <Text style = {styles.TextInputLine} />
      <Image style = {styles.TextInputPasswordIcon} source = {images.password}/>
      <Text style = {styles.errorMsg}>{this.state.errorMsg['passwordMsg']}</Text>
    </View>
    <View style = {styles.TextInputContainer}>
      <TouchableOpacity>
      <Text style = {styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
    <View style = {styles.TextInputContainer}>
      <TouchableOpacity style = {styles.signInButtonContainer}  onPress = {this.onLoginClick}>
        <Text style = {styles.signInButton}>Sign In</Text>
      </TouchableOpacity>
    </View>
    <View style = {styles.TextInputContainer}>
      <TouchableOpacity>
      <Text style = {styles.forgot}>Don't have account? Sign Up</Text>
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
</Image> ); }
}
