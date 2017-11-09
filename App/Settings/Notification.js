import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,ScrollView, ImageBackground,
  AsyncStorage,
  Switch
} from 'react-native';
import Toast from 'react-native-simple-toast';
import images from '../Constant/Images';
import styles from './Style/NotificationStyle';
import Label from '../Constant/Languages/LangConfig';
import { Dropdown } from 'react-native-material-dropdown';
import {callApiWithAuth} from '../Service/WebServiceHandler';
import { USER_KEY, AUTH_TOKEN, USER_DETAILS,setUserDetails } from '../Constant/Auth';

import {alertData} from '../Constant/UrlConstant';

export default class Notification extends Component {


  constructor(props){

   super(props);

   this.onCharityClick = this.onCharityClick.bind(this);
   this.state={
     showProgress : false,
     auth_token:'',
     errorMsg:{},
     email_notify:0,
     alert:{value:'No alert',index:0},
   }

 }
 componentDidMount(){

    AsyncStorage.getItem(AUTH_TOKEN).then((token)=>{
      this.setState({auth_token: token});
    }).catch((err)=>{
      Toast.show(err);
    });
    AsyncStorage.getItem(USER_DETAILS).then((details)=>{
      details = JSON.parse(details);
      this.setState({user_details: details});

      let alert_period_label='';
      Object.keys(alertData).map((key) => {
         if(alertData[key].index == this.state.user_details.alert){
           alert_period_label = alertData[key];
           return false;
         }
       });
       this.setState({
         email_notify : this.state.user_details.notification,
         alert : alert_period_label,
       });
     });
 }

onCharityClick(){

  callApiWithAuth('user/notification','PUT',this.state.auth_token, {"notification":this.state.email_notify,"alert":this.state.alert.index}).then((response) => {

    if(response.status === 201){
    response.json().then((responseobject) => {
      console.log(responseobject);
      //  this.props.navigation.dispatch(resetAction);
    });
    this.state.user_details.alert = this.state.alert.index;
    this.state.user_details.notification = this.state.email_notify;
    setUserDetails(this.state.user_details);
    Toast.show(Label.t('55'));
  }else if (response.status === 404) {
    Toast.show(Label.t('49'));
  }else if (response.status === 406) {
    Toast.show(Label.t('50'));
  }else if (response.status === 401) {
    Toast.show(Label.t('51'));
  }else if (response.status === 500) {
    Toast.show(Label.t('52'));
    }
  }).catch((error) => {console.log(error); })
}
render(){

  return(<ScrollView  keyboardShouldPersistTaps="always">
  <View style = {[styles.SettingsTextInputContainer,{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center', marginTop:15}]}>
  <Text style={[{flex:5,backgroundColor:'transparent'},styles.font3]}>{Label.t('56')}</Text>
  <Switch style={{flex:1,width:100}}
    onValueChange={()=>{
          if(this.state.email_notify){
          this.setState({email_notify: 0})
        }else{
          this.setState({email_notify: 1})
        }
      }}
      onTintColor='#84ce6f'
    value={this.state.email_notify ? true : false}
    />
  </View>
  <View style = {[styles.SettingsTextInputContainer,{marginTop:5}]}>
  <Dropdown
        label= {Label.t('57')}
        style = {[styles.TextInputStyle,styles.font3]}
        containerStyle ={{marginTop:-10}}
        baseColor = '#B3B3B3'
        value = {this.state.alert.value}
        data={alertData}
        onChangeText = {(value,index,data)=>{this.setState({alert:data[index]});}}
      />
  </View>
  <View style = {[styles.SettingsTextInputContainer,{marginTop:20}]}>
    <TouchableOpacity
    style = {[styles.signInButtonContainer]}
    onPress = {this.onCharityClick}>
      <Text style = {styles.signInButton}>{Label.t('39')}</Text>
    </TouchableOpacity>
  </View>
  </ScrollView>);
  }
}
