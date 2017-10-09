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
    Toast.show('Notification update Successfully');
  }else if (response.status === 404) {
    Toast.show('Page not Found');
  }else if (response.status === 406) {
    Toast.show('Invalid data');
  }else if (response.status === 401) {
    Toast.show('Unauthroize');
  }else if (response.status === 500) {
    Toast.show('Unsuccessfull error:500');
    }
  }).catch((error) => {console.log(error); })
}
render(){

  return(<ScrollView  keyboardShouldPersistTaps="always">
  <View style = {[styles.TextInputContainer,{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}]}>
  <Text style={{flex:5,backgroundColor:'transparent'}}>Email Notifications</Text>
  <Switch style={{flex:1,width:100}}
    onValueChange={()=>{
          if(this.state.email_notify){
          this.setState({email_notify: 0})
        }else{
          this.setState({email_notify: 1})
        }
      }}
      onTintColor='#84ce6f'
    value={this.state.email_notify}
    />
  </View>
  <View style = {styles.TextInputContainer}>
  <Dropdown
        label='Alert Period'
        style = {styles.TextInputStyle}
        containerStyle ={{marginTop:-10}}
        baseColor = '#B3B3B3'
        value = {this.state.alert.value}
        data={alertData}
        onChangeText = {(value,index,data)=>{this.setState({alert:data[index]});}}
      />
  </View>
  <View style = {[styles.TextInputContainer]}>
    <TouchableOpacity
    style = {[styles.signInButtonContainer]}
    onPress = {this.onCharityClick}>
      <Text style = {styles.signInButton}>Update</Text>
    </TouchableOpacity>
  </View>
  </ScrollView>);
  }
}
