import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  Keyboard,
  AsyncStorage,
} from 'react-native';

import Toast from 'react-native-simple-toast';
import MyActivityIndicator from '../Component/MyActivityIndicator';
import images from '../Constant/Images';
import Label from '../Constant/Languages/LangConfig';
import styles from './Style/SignUpStyle';
import DatePicker from 'react-native-datepicker';
import { USER_KEY, AUTH_TOKEN, USER_DETAILS, onSignIn, setUserDetails, afterSignIn } from '../Constant/Auth';
import {callApiWithoutAuth} from '../Service/WebServiceHandler';
import {checkinternetconnectivity} from '../Constant/netinfo';
import { NavigationActions } from 'react-navigation';
import  Fblogin  from '../Component/Fblogin';
import settings from '../Constant/UrlConstant';
import Function from '../Constant/Function';
const date = new Date(Date.now());
const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'PAYPAL' })],
    });
const resetActionD = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'DASHBOARD' })],
    });
export default class SignUp extends Component {


  constructor(props){

   super(props);

   this.onSignUpClick = this.onSignUpClick.bind(this);
   var month = (date.getMonth()+1).toString();
   month = month.length>1?month:'0'+month;
   this.state = {

     maxdob: Function.Birthdayformat({datetime: date,slash: true}),
     initialdob: month+'/'+date.getDate()+'/'+(date.getFullYear() - 15),
     email:'',
     password:'',
     fullName:'',
     device_id:settings.DEVICE_ID,
     device_type:settings.DEVICE_NAME,
     Connected: false,
     persistentlogin: false,
     errorMsg:{"emailMsg":'', "passwordMsg":'', "fullName":'', "dob":''},
     showProgress: false,

 };

 }

 componentWillMount(){
 }

 _fblogin = ()=> { //fbAuth;
  Fblogin().then((data)=> {console.log(data);
    if(data.data.isCancelled){
        Toast.show('Log In cancelled');
    }else{
      checkinternetconnectivity().then((response)=>{
        if(response.Internet == true){
          this.setState({showProgress : true});
        callApiWithoutAuth('login','POST', {
          "accessToken":data.data.accessToken,
          "login_type":settings.login_type.fb,
          "device_id":this.state.device_id,
          "device_type":this.state.device_type}
        ).then((response) => {
          console.log(response);
         //  response.json().then((responseobject) => {
         //    console.log(responseobject);
         //  });
          if(response.status === 201){
          response.json().then((responseobject) => {
            console.log(responseobject);
            if(responseobject.status_message ==='Login Success' && responseobject.error_messages !== undefined){
              responseobject.data = responseobject.error_messages;
            }
             onSignIn();
             AsyncStorage.setItem(PERSISTENT_LOGIN, this.state.persistentlogin.toString());
             afterSignIn(responseobject.data.authToken);
             setUserDetails(responseobject.data);
             this.props.navigation.dispatch(resetActionD);
             this.setState({showProgress : false});
          });
          Toast.show(Label.t('73'));
        }else if (response.status === 404) {
          this.setState({showProgress : false});
        }else if (response.status === 406) {
          response.json().then((responseobject) => {
            console.log(responseobject);
          });
          this.setState({showProgress : false});
          Toast.show(Label.t('147'));
        }else if (response.status === 500) {
          this.setState({showProgress : false});
          Toast.show(Label.t('52'));
          }
        }).catch((error) => {console.log(error); });
      }else{
        Toast.show(Label.t('140'));
      }
     });
    }
   });
 }
onSignUpClick(){
  Keyboard.dismiss();
  let error = this.state.errorMsg;
  error.passwordMsg = '';
  error.emailMsg = '';
  error.initialdob = '';
  error.fullName = '';
  let flag = '';
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



  if(this.state.fullName == '')
  {
  flag = '0';
  error.fullName = Label.t('103');

  }
  if(this.state.email == '')
  {
  flag = '0';
  error.emailMsg = Label.t('75');

  }
  else if(!re.test(this.state.email))
  {

    flag = '0';
    error.emailMsg = Label.t('76');

  }
  if(this.state.password == '')
  {
    flag = '1';
    error.passwordMsg = Label.t('77');
  }else if(this.state.password.length < 8)
  {
    flag = '1';
    error.passwordMsg = Label.t('78');
  }


  if(flag != ''){
    this.setState({errorMsg: error});
  }
  else
  {
    checkinternetconnectivity().then((response)=>{
      if(response.Internet == true){
      this.setState({showProgress : true});
        callApiWithoutAuth('register','POST', {email:this.state.email,
          password:this.state.password,
          device_id:this.state.device_id,
          device_type:this.state.device_type,
          full_name:this.state.fullName,
          birth_date: Function.Birthdayformat({datetime: this.state.initialdob,slash: false}),
          paypal:'' }
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
          Toast.show(Label.t('104'));
        }else if (response.status === 404) {
          this.setState({showProgress : false});
          Toast.show(Label.t('49'));
        }else if (response.status === 406) {
          response.json().then((responseobject) => {
            this.setState({showProgress : false});
            Toast.show(responseobject.error_messages);
          });
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
  error.initialdob = '';
  error.fullName = '';
  this.setState({errorMsg: error});
}

  render(){

  return(
  <Image style = {styles.backgroundImage} source = {images.loginbackground}>
  <View style={[styles.full]}>
  <MyActivityIndicator progress={this.state.showProgress} />
  <ScrollView  style={styles.scrollviewheight} keyboardShouldPersistTaps="always">
  <TouchableOpacity style={[{flex:1}]} activeOpacity = { 1 } onPress={ Keyboard.dismiss } >
  <Image style = {[styles.top,styles.containerWidth]} source = {images.topbackground} >
  <View style = {styles.titleContainer}>
    <Text style = {styles.titleTextFirst}>{Label.t('68')}</Text>
    <Text style = {styles.titleTextSecond}>{Label.t('1')}</Text>
  </View>
  </Image>
  <View style = {[styles.formgroup,styles.containerWidth]}>
      <View style = {[styles.tempTextInputContainer,styles.inputBorderBottom]}>
        <TextInput style = {[styles.TextInputStyle, styles.font3]}
          keyboardType = 'default'
          placeholderTextColor = "#b7b7b7"
          placeholder = {Label.t('42')}
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
      <View style = {[styles.tempTextInputContainer,styles.inputBorderBottom]}>
        <TextInput
          style = {[styles.TextInputStyle, styles.font3]}
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
          onChangeText = {(val) => {this.setState({email: val});this.hideErrors();}}
        />
        <Image style = {styles.TextInputIcon} source = {images.emailIcon}/>
      </View>
      <Text style = {styles.errorMsg}>{this.state.errorMsg['emailMsg']}</Text>
      <View style = {styles.tempoTextInputContainer}>
        <Text style = {[styles.dob_label, styles.font1]}>{Label.t('43')}</Text>
        <DatePicker
          style = {[styles.date_picker]}
          date = {this.state.initialdob}
          format = "MM/DD/YYYY"
          maxDate = {this.state.maxdob}
          confirmBtnText = {Label.t('6')}
          cancelBtnText = {Label.t('7')}
          iconSource = {images.dropdownArrow}
          onDateChange = {(date) => {this.setState({initialdob:date})}}
          customStyles={{dateInput: styles.dateInput,
                        dateIcon: styles.dateIcon,}}
        />
      </View>
      <Text style = {styles.errorMsg}>{this.state.errorMsg['initialdob']}</Text>
      <View style = {[styles.tempTextInputContainer,styles.inputBorderBottom]}>
        <TextInput
          style = {[styles.TextInputStyle, styles.font3]}
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
      <Text style = {styles.errorMsg}>{this.state.errorMsg['passwordMsg']}</Text>
      <View style = {styles.signupbuttonContainer}>
        <TouchableOpacity style = {styles.signInButtonContainer}  onPress = {this.onSignUpClick}>
          <Text style = {styles.signInButton}>{Label.t('105')}</Text>
        </TouchableOpacity>
        <TouchableOpacity >
          <Text style = {styles.button_below}>{Label.t('106')}<Text style={styles.linkColor}>{Label.t('107')}</Text>{Label.t('108')}<Text style={styles.linkColor}>{Label.t('109')}</Text></Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text  onPress={()=>{this.props.navigation.navigate('LOG_IN')}} style = {[styles.login_button, styles.font2]}>{Label.t('110')}<Text style={styles.linkColor}>{Label.t('111')}</Text></Text>
        </TouchableOpacity>
      </View>
      <View style = {styles.tempTextInputContainer}>
        <Text style = {[styles.orDivider, styles.font2]}>{Label.t('72')}</Text>
      </View>
      <View style = {styles.tempTextInputContainer}>
        <TouchableOpacity style = {styles.facebookButtonContainer} onPress={this._fblogin}>
          <Image style = {styles.facebookButton} source = {images.facebookButton}/>
        </TouchableOpacity>
      </View>
  </View>
  </TouchableOpacity>
  </ScrollView>
  </View>
  </Image>);
  }
}
