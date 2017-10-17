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
import Label from '../Constant/Languages/LangConfig';
import DatePicker from 'react-native-datepicker';
import { Dropdown } from 'react-native-material-dropdown';
import {callApiWithAuth,callApiWithoutAuth} from '../Service/WebServiceHandler';
import { USER_KEY, AUTH_TOKEN, USER_DETAILS, onSignIn, setUserDetails, afterSignIn } from '../Constant/Auth';
import ConstantFunction from '../Constant/Function';
//import { NavigationActions } from 'react-navigation';
//const resetAction = NavigationActions.reset({
//      index: 0,
//      actions: [NavigationActions.navigate({ routeName: 'FETCH_FRIEND' })],
//    });

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
     charity_type:{value:'',index:''},
     errorMsg:{charity_type:'',pre_amount:'',other_amount:''},
     user_details:'',
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
      this.setState({
        user_details: details,
        });
         // to fetch charity list
        callApiWithoutAuth('charityList','GET' ).then((response) => {
           if(response.status === 200){
             response.json().then((responseobject) => {
               console.log(responseobject);
               let charityList = Object.keys(responseobject.data).map((key,data) => {
                 return { value: responseobject.data[key].organization, index:responseobject.data[key].id};

                });
               let charity_type_label='';
               Object.keys(responseobject.data).map((key,data) => {
                  if(responseobject.data[key].id == this.state.user_details.charity[0].charity_id){
                    charity_type_label = responseobject.data[key].organization;
                    return false;
                  }
                });
                this.setState({
                  showProgress : false,
                  charity_list : charityList,
                  charity_type:{
              value:charity_type_label,
              index:this.state.user_details.charity[0].charity_id}
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
               let donation_label ='';
               let donation_value = '';
               let donation_value1 = '';
               Object.keys(responseobject.data).map((key,data) => {
                  if(key == this.state.user_details.charity[0].gift_amount){
                    donation_value = key;
                    donation_label = responseobject.data[key];
                    return false;
                  }
                });
               if(donation_label == ''){
                  donation_value = 'specify';
                  donation_label = 'Speicify Amount';
                  donation_value1= this.state.user_details.charity[0].gift_amount;
               }
               this.setState({
                 showProgress : false,
                 donation_list : donationList,
                 pre_amount : { value: donation_label,index:donation_value},
                 other_amount : donation_value1,
               });
                });

           }else if (response.status === 401) {
              this.setState({showProgress : false});
           }else if (response.status === 500) {
              this.setState({showProgress : false});
           }
        }).catch((error) => {console.log(error); });

    }).catch((err)=>{
      Toast.show(err);
    });


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
error.charity_type = Label.t('45');
}
if(this.state.pre_amount == ''){
flag = false;
error.pre_amount = Label.t('46');
}
if(this.state.pre_amount.index == 'specify'){

  if(this.state.other_amount == ''){
  flag = false;
  error.other_amount = Label.t('47');
  }
}
if(flag){
  let charity_id  =this.state.charity_type.index;
  let gift_amount = this.state.pre_amount.index == 'specify' ? this.state.other_amount: this.state.pre_amount.index;
  this.setState({showProgress : true});
  callApiWithAuth('user/charity','PUT',this.state.auth_token, {"charity_id":charity_id,"gift_amount":gift_amount}).then((response) => {
    //this.state.user_details.charity = [0:{charity_id:'',gift_amount:''}];
    this.state.user_details.charity[0].charity_id = charity_id;
    this.state.user_details.charity[0].gift_amount = gift_amount;
    setUserDetails(this.state.user_details);
    if(response.status === 201){
    // response.json().then((responseobject) => {
    //   console.log(responseobject);
       //this.props.navigation.dispatch(resetAction);
       this.setState({showProgress : false});
    // });
    Toast.show(Label.t('48'));
  }else if (response.status === 404) {
    this.setState({showProgress : false});
    Toast.show(Label.t('49'));
  }else if (response.status === 406) {
    this.setState({showProgress : false});
    Toast.show(Label.t('50'));
  }else if (response.status === 401) {
    this.setState({showProgress : false});
    Toast.show(Label.t('51'));
  }else if (response.status === 500) {
    this.setState({showProgress : false});
    Toast.show(Label.t('52'));
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
    //alert(JSON.stringify(this.state));
    console.log(this.state.other_amount);
  return(
<ScrollView  keyboardShouldPersistTaps="always">
  <View style = {styles.TextInputContainer}>
    <Dropdown
          label={Label.t('10')}
          style = {styles.TextInputStyle}
          containerStyle ={{marginTop:-10}}
          baseColor = '#B3B3B3'
          value = {this.state.charity_type.value}
          data = {this.state.charity_list}
          onChangeText = {(value,index,data)=>{this.setState({charity_type:data[index]});this.hideErrors();}}
        />
        <Text style = {styles.errorMsg}>{this.state.errorMsg['charity_type']}</Text>
  </View>
  <View style = {styles.TextInputContainer}>
  <Dropdown
        label={Label.t('11')}
        style = {styles.TextInputStyle}
        containerStyle ={{marginTop:-30}}
        baseColor = '#B3B3B3'
        value = {this.state.pre_amount.value}
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
            placeholder = {Label.t('11')}
            underlineColorAndroid = 'transparent'
            multiline = {false} maxLength = {6}
            returnKeyType="send"
            autoCapitalize="none"
            autoCorrect={false}
            value= {this.state.other_amount}
            onChangeText = {(val) => {this.setState({other_amount: val});this.hideErrors();}}
            />
            <Image style = {styles.TextInputIcon} source = {images.dollarIcon}/>
          </View>
          <Text style = {styles.errorMsg}>{this.state.errorMsg['other_amount']}</Text></View>) : (<Text style={{height:0}}></Text>)}
  <View style = {[styles.TextInputContainer]}>
    <TouchableOpacity
    style = {[styles.signInButtonContainer]}
    onPress = {this.onCharityClick}>
      <Text style = {styles.signInButton}>{Label.t('39')}</Text>
    </TouchableOpacity>
  </View>
  <View style = {[styles.TextInputContainer,{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:'5%'}]}>
    <Text style={[styles.linkColor,{backgroundColor:'transparent'}]}>{Label.t('53')}</Text>
    <TouchableOpacity style={styles.btn1} onPress={()=>{ConstantFunction.email(['ronnage@cfl.rr.com'],'','','Add%20My%20Charity%20to%20Dollar%20Birthday%20Club','')}}>
      <Text style={styles.text1}>{Label.t('54')}</Text>
    </TouchableOpacity>
  </View>
</ScrollView>);

  }
}
