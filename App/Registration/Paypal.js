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
  Keyboard,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import images from '../Constant/Images';
import styles from './Style/PaypalStyle';
import Label from '../Constant/Languages/LangConfig';
import DatePicker from 'react-native-datepicker';
import { Dropdown } from 'react-native-material-dropdown';
import settings from '../Constant/UrlConstant';
import Function from '../Constant/Function';
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
  Keyboard.dismiss();
  let error = this.state.errorMsg;
  error.emailMsg = '';
  let flag = '';
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  if(this.state.email == '')
  {
  flag = '0';
  error.emailMsg = Label.t('75');

  }
  else if(!re.test(this.state.email))
  {

  console.log('validdat')
    flag = '0';
    error.emailMsg = Label.t('76');

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
      let ud = this.state.user_details;
      ud.paypal = this.state.email;
      ud.currency = this.state.currency;
      ud = JSON.stringify(ud);
      console.log(ud);
      AsyncStorage.mergeItem(USER_DETAILS,ud);
       this.props.navigation.dispatch(resetAction);
       this.setState({showProgress : false});
    });
    Toast.show(Label.t('97'));
  }else if (response.status === 404) {
    this.setState({showProgress : false});
    Toast.show(Label.t('49'));
  }else if (response.status === 406) {
    this.setState({showProgress : false});
    Toast.show(Label.t('50'));
  }else if (response.status === 500) {
    this.setState({showProgress : false});
    Toast.show(Label.t('52'));
    }
  }).catch((error) => {
    this.setState({showProgress : false});
    Toast.show(Label.t('155'));
    console.log(error); 
    });
}

}
hideErrors(){
  let error = this.state.errorMsg;
  error.emailMsg = '';
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
      <Text style = {styles.titleTextSecond}>{Label.t('1')}</Text>
    </View></Image>
    <View style={[styles.formgroup,styles.containerWidth]}>
    <View style = {[styles.TextInputContainer]}>
      <Text style = {styles.heading1}>{Label.t('98')}</Text>
    </View>
    <View style = {[styles.TextInputContainer]}>
      <Text style = {styles.subhead1}>{Label.t('99')}</Text>
      <Text style = {styles.subhead1}>{Label.t('100')}</Text>
    </View>
    <View style={[styles.marginFix1,]}>
    <View style = {[styles.TextInputContainer,styles.inputBorderBottom]}>
      <TextInput
      style = {styles.TextInputStyle}
      keyboardType = 'email-address'
      placeholderTextColor = "#b7b7b7"
      placeholder = {Label.t('5')}
      underlineColorAndroid = 'transparent'
      multiline = {false} maxLength = {100}
      returnKeyType="send"
      autoCapitalize="none"
      autoCorrect={false}
      onSubmitEditing={this.onPaypalClick}
      onChangeText = {(val) => {this.setState({email: val});this.hideErrors();}}
      />
      <Image style = {styles.TextInputIcon} source = {images.emailIcon}/>
    </View><Text style = {[styles.errorMsg,styles.font3]}>{this.state.errorMsg['emailMsg']}</Text>
    </View>
    <View style = {styles.TextInputContainer}>
      <TouchableOpacity style = {[styles.facebookButtonContainer,{borderRadius:3}]}
      onPress = {this.onPaypalClick}>
        <Image style = {styles.facebookButton} source = {images.payPalBtn}/>
      </TouchableOpacity>

    </View>
    <TouchableOpacity>
    <View style = {[styles.TextInputContainer]}>
          <Text style = {styles.term_service}>{Label.t('101')}<Text onPress={()=>{Function.web(settings.PAYPAL_URL);console.log('yes'); }} style={{color:'#449FD8',fontWeight:'600'}}>{Label.t('102')}</Text></Text>
    </View></TouchableOpacity>

    <TouchableOpacity onPress={()=>{this.props.navigation.dispatch(resetAction);Keyboard.dismiss();}}>
      <View style = {[styles.skipContainer]}>
            <Text style = {styles.skip}>{Label.t('85')}</Text>
      </View>
    </TouchableOpacity>
    </View>
    </TouchableOpacity>
    </ScrollView>
    </View>
    </Image>
);

  }
}
