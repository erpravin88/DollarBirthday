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
  AsyncStorage,
  Keyboard,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import images from '../Constant/Images';
import styles from './Style/CharityStyle';
import settings from '../Constant/UrlConstant';
import Label from '../Constant/Languages/LangConfig';
import { Dropdown } from 'react-native-material-dropdown';
import {callApiWithAuth,callApiWithoutAuth} from '../Service/WebServiceHandler';
import { USER_KEY, AUTH_TOKEN, USER_DETAILS, onSignIn, setUserDetails, afterSignIn } from '../Constant/Auth';
import { NavigationActions } from 'react-navigation';
import MyActivityIndicator from '../Component/MyActivityIndicator';
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
      this.setState({ user_details: details,});
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
       }else if (response.status === 500) {
          this.setState({showProgress : false});
       }
    }).catch((error) => {
      this.setState({showProgress : false});
      Toast.show(Label.t('155'));
      console.log(error); 
      });
      if(this.state.showProgress){
        this.setState({showProgress : false});
      }
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

       }else if (response.status === 500) {
          this.setState({showProgress : false});
       }
    }).catch((error) => {
      this.setState({showProgress : false});
      Toast.show(Label.t('155'));
      console.log(error); 
      });
  }).catch((err)=>{
    Toast.show(err);
  });
 }

onCharityClick(){
  Keyboard.dismiss();
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
if(this.state.charity_type.index !== settings.DONOT_CHARITY_ID){
  if(this.state.pre_amount == ''){
  flag = false;
  error.pre_amount = Label.t('46');
  }
  if(this.state.pre_amount.index == Label.t('142')){

    if(this.state.other_amount == ''){
    flag = false;
    error.other_amount = Label.t('47');
    }
  }
}
if(flag){
  let charity_id  =this.state.charity_type.index;
  let gift_amount = this.state.pre_amount.index == Label.t('142') ? this.state.other_amount: this.state.charity_type.index=== settings.DONOT_CHARITY_ID ? 0.00 : this.state.pre_amount.index;
  this.setState({showProgress : true});
  callApiWithAuth('user/charity','PUT',this.state.auth_token, {"charity_id":charity_id,"gift_amount":gift_amount}).then((response) => {
    response.json().then((responseobject) => {
      console.log(this.state.user_details);
      this.state.user_details.charity = [{charity_id:charity_id,gift_amount:gift_amount}];
      setUserDetails(this.state.user_details);
       this.props.navigation.dispatch(resetAction);
       this.setState({showProgress : false});
    });
    if(response.status === 201){
    // response.json().then((responseobject) => {
    //   console.log(responseobject);
       this.props.navigation.dispatch(resetAction);
       this.setState({showProgress : false});
    // });
    Toast.show(Label.t('79'));
  }else if (response.status === 401) {
    this.setState({showProgress : false});
    Toast.show(Label.t('51'));
  }else if (response.status === 404) {
    this.setState({showProgress : false});
    Toast.show(Label.t('49'));
  }else if (response.status === 406) {
    this.setState({showProgress : false});
    response.json().then((responseobject) => {
      if(responseobject.error_messages !== 'invalid data'){
        Toast.show(Label.t('50'));
      }
    });
  }else if (response.status === 500) {
    this.setState({showProgress : false});
    Toast.show(Label.t('52'));
    }
  }).catch((error) => {
    this.setState({showProgress : false});
    Toast.show(Label.t('155'));
    console.log(error); 
    });
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
    let hide;
    if(this.state.charity_type.index === settings.DONOT_CHARITY_ID){
      this.state.pre_amount = { value: '',index:''};
      this.state.other_amount = '0.00';
      hide = true;
    }else{
       hide = false;
    }
  return(
<Image style = {styles.backgroundImage} source = {images.loginbackground}>
  <View style={[styles.full]}>
    <MyActivityIndicator progress={this.state.showProgress} />
      <ScrollView  style={styles.scrollviewheight} keyboardShouldPersistTaps="always">
      <TouchableOpacity style={[{flex:1}]} activeOpacity = { 1 } onPress={ Keyboard.dismiss } >
        <Image style = {[styles.top,styles.containerWidth]} source = {images.topbackground} >
          <View style = {styles.titleContainer}>
            <Text style = {styles.titleTextSecond}>{Label.t('1')}</Text>
          </View>
        </Image>
  <View style={[styles.formgroup,styles.containerWidth]}>
  <View style = {[styles.TextInputContainer]}>
    <Text style = {styles.heading1}>{Label.t('80')}</Text>
  </View>
  <View style = {[styles.SettingsTextInputContainer,styles.marginBottomFive]}>
    <Text style = {styles.subhead1}>{Label.t('81')}</Text>
    <Text style = {styles.subhead1}>{Label.t('82')}</Text>
  </View>
    <View style = {[styles.SettingsTextInputContainer,styles.marginTopFive]}>
      <Dropdown
            label = {Label.t('10')}
            style = {[styles.TextInputStyle,styles.font3]}
            containerStyle ={{marginTop:-40}}
            baseColor = '#B3B3B3'
            data={this.state.charity_list}
            onChangeText = {(value,index,data)=>{this.setState({charity_type:data[index]});this.hideErrors();}}
          />
          <Text style = {styles.errorMsg}>{this.state.errorMsg['charity_type']}</Text>
    </View>
    <View style = {[ hide ? styles.hide : styles.show, styles.SettingsTextInputContainer]}>
    <Dropdown
          label={Label.t('11')}
          style = {styles.TextInputStyle}
          containerStyle ={{marginTop:-30}}
          baseColor = '#B3B3B3'
          data={this.state.donation_list}
          onChangeText = {(value,index,data)=>{if(data[index].index === Label.t('142')){this.setState({ pre_amount:data[index],other_amount:''});}else{this.setState({ pre_amount:data[index]});} this.hideErrors();}}
        />
        <Text style = {[styles.errorMsg ,styles.SettingsTextInputContainer]}>{this.state.errorMsg['pre_amount']}</Text>
    </View>
    <View style={[hide ? styles.hide : styles.show,]}>
    {(this.state.pre_amount.index == Label.t('142')) ?
            (<View><View style = {[styles.SettingsTextInputContainer,styles.inputBorderBottom]}>
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
            <Text style = {[styles.errorMsg ,styles.SettingsTextInputContainer]}>{this.state.errorMsg['other_amount']}</Text></View>) : (<Text style={{height:0}}></Text>)}
      </View>

    <View style = {[styles.SettingsTextInputContainer]}>
      <TouchableOpacity
      style = {[styles.signInButtonContainer,{backgroundColor:'#DC6966'}]}
      onPress = {this.onCharityClick}>
        <Text style = {styles.signInButton}>{Label.t('83')}</Text>
      </TouchableOpacity>
      <Text style = {[styles.term_service,styles.font1]}>{Label.t('84')}</Text>
    </View>
    <TouchableOpacity onPress={()=>{this.props.navigation.dispatch(resetAction);Keyboard.dismiss();}}>
      <View style = {[styles.skipContainer]}>
            <Text style = {styles.skip}>{Label.t('85')}</Text>
      </View>
    </TouchableOpacity>
  </View>
  </TouchableOpacity>
  </ScrollView>
  </View>
  </Image>);

  }
}
