import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  Image,ScrollView, ImageBackground,
  AsyncStorage
} from 'react-native';
import Toast from 'react-native-simple-toast';
import images from '../Constant/Images';
import styles from './Style/CharityStyle';
import DatePicker from 'react-native-datepicker';
import { Dropdown } from 'react-native-material-dropdown';
import {callApiWithAuth,callApiWithoutAuth} from '../Service/WebServiceHandler';
import { USER_KEY, AUTH_TOKEN, USER_DETAILS, onSignIn, setUserDetails, afterSignIn } from '../Constant/Auth';
import { NavigationActions } from 'react-navigation';
const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'FETCH_FRIEND' })],
    });
let list1=[];
let list2=[];
export default class Charity extends Component {


  constructor(props){

   super(props);

   this.onCharityClick = this.onCharityClick.bind(this);
   this.state={
     charity_list:[],
     donation_list:[],
     showProgress : false,
     auth_token:'',
     pre_amount:'',
     other_amount:'',
     charity_type:'',
     errorMsg:{charity_type:'',pre_amount:'',other_amount:''},
   }

 }
 componentDidMount(){

    AsyncStorage.getItem(AUTH_TOKEN).then((token)=>{
      this.setState({auth_token: token});
    }).catch((err)=>{
      Toast.show(err);
    });

    // to fetch charity list
    callApiWithoutAuth('charityList','GET' ).then((response) => {
       if(response.status === 200){
         response.json().then((responseobject) => {
           console.log(responseobject);
           let charityList = Object.keys(responseobject.data).map(function(key,data) {
             return { value: responseobject.data[key].organization, index:responseobject.data[key].id};

            });
            this.setState({
              showProgress : false,
              charity_list : charityList,
            });
         });
       }else if (response.status === 401) {
          this.setState({showProgress : false});
       }else if (response.status === 500) {
          this.setState({showProgress : false});
       }
    }).catch((error) => {console.log(error); });
    //--fetch donation list
    callApiWithoutAuth('donationList','GET' ).then((response) => {
       if(response.status === 200){
         response.json().then((responseobject) => {
          console.log(responseobject);
          let donationList = Object.keys(responseobject.data).map(function(key,data) {
            return { value: responseobject.data[key], index:key};

           });
           this.setState({
             showProgress : false,
             donation_list : donationList,
           });
            });

       }else if (response.status === 401) {
          this.setState({showProgress : false});
       }else if (response.status === 500) {
          this.setState({showProgress : false});
       }
    }).catch((error) => {console.log(error); });
 }

onCharityClick(){
console.log(this.state);
let error = this.state.errorMsg;
    error.charity_type = '';
    error.pre_amount = '';
    error.other_amount = '';
let flag = true;

if(this.state.charity_type == ''){
flag = false;
error.charity_type = 'Please select Charity.';
}
if(this.state.pre_amount == ''){
flag = false;
error.pre_amount = 'Please select Donation Value.';
}
if(this.state.pre_amount.index == 'specify'){

  if(this.state.other_amount == ''){
  flag = false;
  error.other_amount = 'Please fill Donation Value.';
  }
}
if(flag){
  let charity_id  =this.state.charity_type.index;
  let gift_amount = this.state.pre_amount.index == 'specify' ? this.state.other_amount: this.state.pre_amount.index;
  this.setState({showProgress : true});
  callApiWithAuth('user/charity','PUT',this.state.auth_token, {"charity_id":charity_id,"gift_amount":gift_amount}).then((response) => {
    response.json().then((responseobject) => {
      console.log(responseobject);
       //this.props.navigation.dispatch(resetAction);
       this.setState({showProgress : false});
    });
    if(response.status === 201){
    // response.json().then((responseobject) => {
    //   console.log(responseobject);
       this.props.navigation.dispatch(resetAction);
       this.setState({showProgress : false});
    // });
    Toast.show('Charity add Successfully');
  }else if (response.status === 404) {
    this.setState({showProgress : false});
    Toast.show('Page not Found');
  }else if (response.status === 406) {
    this.setState({showProgress : false});
    Toast.show('Invalid data');
  }else if (response.status === 401) {
    this.setState({showProgress : false});
    Toast.show('Unauthroize');
  }else if (response.status === 500) {
    this.setState({showProgress : false});
    Toast.show('Unsuccessfull error:500');
    }
  }).catch((error) => {console.log(error); })
  }else {
    this.setState({errorMsg: error});
  }
  //let userData = this.props.navigation.state.params.user_data;
  //this.props.navigation.navigate('FETCH_FRIEND');

}
hideErrors(){
  let error = this.state.errorMsg;
  error.charity_type = '';
  error.pre_amount = '';
  error.other_amount = '';
  this.setState({errorMsg: error});
}

  render(){
  return(
<ScrollView  keyboardShouldPersistTaps="always">
  <View style = {styles.TextInputContainer}>
    <Dropdown
          label='Choose a Charity'
          style = {styles.TextInputStyle}
          containerStyle ={{marginTop:-10}}
          baseColor = '#B3B3B3'
          data={this.state.charity_list}
          onChangeText = {(value,index,data)=>{this.setState({charity_type:data[index]});this.hideErrors();}}
        />
        <Text style = {styles.errorMsg}>{this.state.errorMsg['charity_type']}</Text>
  </View>
  <View style = {styles.TextInputContainer}>
  <Dropdown
        label='Donation Value'
        style = {styles.TextInputStyle}
        containerStyle ={{marginTop:-30}}
        baseColor = '#B3B3B3'
        data={this.state.donation_list}
        onChangeText = {(value,index,data)=>{this.setState({pre_amount:data[index]});this.hideErrors();}}
      />
      <Text style = {styles.errorMsg}>{this.state.errorMsg['pre_amount']}</Text>
  </View>
  {(this.state.pre_amount.index == 'specify') ?
          (<View><View style = {[styles.TextInputContainer,styles.inputBorderBottom]}>
            <TextInput
            style = {styles.TextInputStyle}
            keyboardType = 'numeric'
            placeholderTextColor = "#b7b7b7"
            placeholder = 'Donation Value'
            underlineColorAndroid = 'transparent'
            multiline = {false} maxLength = {3}
            returnKeyType="send"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText = {(val) => {this.setState({other_amount: val});this.hideErrors();}}
            />
            <Image style = {styles.TextInputIcon} source = {images.dollarIcon}/>
          </View>
          <Text style = {styles.errorMsg}>{this.state.errorMsg['other_amount']}</Text></View>) : (<Text style={{height:0}}></Text>)}
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
