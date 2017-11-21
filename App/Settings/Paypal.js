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
} from 'react-native';

import Toast from 'react-native-simple-toast';
import images from '../Constant/Images';
import Label from '../Constant/Languages/LangConfig';
import styles from './Style/PaypalStyle';
import DatePicker from 'react-native-datepicker';
import { Dropdown } from 'react-native-material-dropdown';
import settings from '../Constant/UrlConstant';
import {callApiWithAuth,callApiWithoutAuth} from '../Service/WebServiceHandler';
import { USER_KEY, AUTH_TOKEN, USER_DETAILS, onSignIn, setUserDetails, afterSignIn ,onSignOut} from '../Constant/Auth';
import MyActivityIndicator from '../Component/MyActivityIndicator';
import { NavigationActions } from 'react-navigation';
const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'CHARITY' })],
    });
let currencyobj = [];
export default class PayPal extends Component {


  constructor(props){

   super(props);

   this.onPaypalClick = this.onPaypalClick.bind(this);
   this.state = {
                 email: '',
                 errorMsg:{"emailMsg":''},
                 auth_token:'',
                 user_key:'',
                 user_details:[],
                 currency:'',
                 showProgress: false,
                 currency_list:[],
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
       this.setState({user_details: details,email:details.paypal,currency:details.currency});
       console.log(this.state);
     }).catch((err)=>{
       Toast.show(err);
     });
     // to fetch charity list
     callApiWithoutAuth('currencyList','GET' ).then((response) => {
        if(response.status === 200){
          response.json().then((responseobject) => {
            console.log(responseobject);
            currencyobj = responseobject.data;
            let currencyList = Object.keys(responseobject.data).map(function(key,index) {
              return { value: responseobject.data[key], index:key};

             });
             this.setState({
               showProgress : false,
               currency_list : currencyList,
             });
          });
        }else if (response.status === 500) {
           this.setState({showProgress : false});
        }
     }).catch((error) => {console.log(error); });
  }                      // to fetch task types
onPaypalClick()
{

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
    error.emailMsg =  Label.t('76');

  }


if(flag != ''){
  this.setState({errorMsg: error});
}
else
{
  console.log(this.state);
  this.setState({showProgress : true});
  callApiWithAuth('user/payment','PUT',this.state.auth_token, {"paypal":this.state.email,"currency":this.state.currency}).then((response) => {

  if(response.status === 201){
    let ud = this.state.user_details;
    ud.paypal = this.state.email;
    ud.currency = this.state.currency;
    ud = JSON.stringify(ud);
    console.log(ud);
    AsyncStorage.mergeItem(USER_DETAILS,ud);
    response.json().then((responseobject) => {
      console.log(responseobject);
      // this.props.navigation.dispatch(resetAction);
       this.setState({showProgress : false});
    });
    Toast.show(Label.t('139'));
  }else if (response.status === 401) {
    onSignOut(this);
    this.setState({showProgress : false});
    Toast.show(Label.t('51'));
  }else if (response.status === 404) {
    this.setState({showProgress : false});
    Toast.show(Label.t('49'));
  }else if (response.status === 406) {
    this.setState({showProgress : false});
    Toast.show(Label.t('91'));
  }else if (response.status === 500) {
    this.setState({showProgress : false});
    Toast.show(Label.t('52'));
    }
  }).catch((error) => {console.log(error); })
  //let userData = this.props.navigation.state.params.user_data;
  //userData.paypal = this.state.email;
//  this.props.navigation.navigate('CHARITY',{user_data: userData});
}

}
hideErrors(){
  let error = this.state.errorMsg;
  error.emailMsg = '';
  this.setState({errorMsg: error});
}
  render(){
    console.log(currencyobj);
  return(

    <ScrollView  keyboardShouldPersistTaps="always">
    <View style = {[styles.SettingsTextInputContainer,styles.inputBorderBottom]}>
      <TextInput
      style = {styles.TextInputStyle}
      keyboardType = 'email-address'
      placeholderTextColor = "#b7b7b7"
      placeholder = {Label.t('5')}
      underlineColorAndroid = 'transparent'
      multiline = {false} maxLength = {100}
      returnKeyType={Label.t('3')}
      autoCapitalize="none"
      autoCorrect={false}
      onSubmitEditing={()=>{this.refs.secondInput.focus();}}
      value={this.state.email}
      onChangeText = {(val) => {this.setState({email: val});this.hideErrors();}}
      />
      <Image style = {styles.TextInputIcon} source = {images.emailIcon}/>
    </View>
    <Text style = {[styles.errorMsg ,styles.SettingsTextInputContainer]}>{this.state.errorMsg['emailMsg']}</Text>
    <View style = {styles.SettingsTextInputContainer}>
      <Dropdown
            ref= 'secondInput'
            label={Label.t('40')}
            style = {styles.TextInputStyle}
            containerStyle ={{marginTop:-10}}
            baseColor = '#B3B3B3'
            data={this.state.currency_list}
            value={currencyobj[this.state.currency]}
            onChangeText = {(value,index,data)=>{this.setState({currency: data[index].index});this.hideErrors();}}
          />
          <Text style = {[styles.errorMsg ,styles.SettingsTextInputContainer]}>{this.state.errorMsg['currencyMsg']}</Text>
    </View>
    <View style = {styles.SettingsTextInputContainer}>
      <TouchableOpacity style = {styles.signInButtonContainer}  onPress = {this.onPaypalClick}>
        <Text style = {styles.signInButton}>{Label.t('39')}</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
);

  }
}
