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
  ActivityIndicator,
  AsyncStorage
} from 'react-native';
import Label from '../Constant/Languages/LangConfig';
import Toast from 'react-native-simple-toast';
import images from '../Constant/Images';
import {checkinternetconnectivity} from '../Constant/netinfo';
import styles from './Style/AddFriendStyle';
import DatePicker from 'react-native-datepicker';
import MyActivityIndicator from '../Component/MyActivityIndicator';
import { USER_KEY, AUTH_TOKEN, USER_DETAILS, onSignIn, setUserDetails, afterSignIn } from '../Constant/Auth';
import {callApiWithAuth} from '../Service/WebServiceHandler';
const date = new Date(Date.now());
import { NavigationActions } from 'react-navigation';
const resetAction = NavigationActions.reset({
     index: 0,
     actions: [NavigationActions.navigate({ routeName: 'SETTING',params: {tabName:'friends'} })],
   });
const resetAction1 = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'IMPORTMANUALLY',params: {tabName:'friends'} })],
  });

export default class AddFriend extends Component {

constructor(props){
    super(props);
    this.addfriend = this.addfriend.bind(this);
    this.updatefriend = this.updatefriend.bind(this);
    this.hideErrors = this.hideErrors.bind(this);
    var month = (date.getMonth()+1).toString();
    month = month.length>1?month:'0'+month;
    this.state = {
        maxdob: date.getFullYear()+'-'+month+'-'+date.getDate(),
        initialdob: (date.getFullYear() - 15)+'-'+month+'-'+date.getDate(),
        email:'',
        firstName:'',
        lastName:'',
        errorMsg:{"emailMsg":'', "firstName":'', "lastName":'', "initialdob":''},
        auth_token: '',
        showProgress: false,
        newfriend : true,
        formdata:{}
    };
}

componentWillMount(){

  if(this.props.navigation.state != undefined){
    if(this.props.navigation.state.params != undefined){
      if(this.props.navigation.state.params.editdata != undefined){
        this.setState({formdata: this.props.navigation.state.params.editdata, newfriend : false, firstName: this.props.navigation.state.params.editdata.first_name,lastName: this.props.navigation.state.params.editdata.last_name, email: this.props.navigation.state.params.editdata.email, initialdob: this.props.navigation.state.params.editdata.birth_date});
      }
    }
  }
    //this.setState({name: this.props.navigation.state.params.name});
        // AsyncStorage.getItem(USER_KEY).then((key)=>{
        //   this.setState({user_key: key});
        // }).catch((err)=>{
        //   Toast.show(err);
        // });
        AsyncStorage.getItem(AUTH_TOKEN).then((token)=>{
           this.setState({auth_token: token});
        }).catch((err)=>{
          onSignOut;
          Toast.show(err);
        });
        // AsyncStorage.getItem(USER_DETAILS).then((details)=>{
        //   details = JSON.parse(details);
        //   //this.setState({user_details: details});
        // }).catch((err)=>{
        //   Toast.show(err);
        // });
    }

    addfriend(userData){
          let error = this.state.errorMsg;
          error.emailMsg = '';
          error.firstName = '';
          error.lastName = '';
          error.initialdob = '';
          let flag = '';
          var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

          if(this.state.firstName == ''){
            flag = '0';
            error.firstName = Label.t('132');
          }
          if(this.state.lastName == ''){
            flag = '0';
            error.lastName = Label.t('133');
          }
          if(this.state.email == ''){
            flag = '0';
            error.emailMsg = Label.t('75');
          }
          if(!re.test(this.state.email)){
            flag = '0';
            error.emailMsg = Label.t('76');
          }
          if(flag != ''){
            this.setState({errorMsg: error});
          }else {
            //API Call
            checkinternetconnectivity().then((response)=>{
              if(response.Internet == true){
              this.setState({showProgress : true});
              callApiWithAuth('user/friend','POST',this.state.auth_token, {"email":this.state.email,
                "first_name":this.state.firstName,
                "last_name":this.state.lastName,
                "birth_date": this.state.initialdob }
              ).then((response) => {
                if(response.status === 201){
                  response.json().then((responseobject) => {
                    console.log(responseobject);
                    this.setState({showProgress : false});
                  });
                  Toast.show('Friend Added');
                  if(this.props.navigation.state != undefined){
                    if(this.props.navigation.state.params != undefined){
                      if(this.props.navigation.state.params.callFrom != undefined){
                        if(this.props.navigation.state.params.callFrom == 'setting'){
                          this.props.navigation.dispatch(resetAction);
                        }else if (this.props.navigation.state.params.callFrom == 'IMPORTMANUALLY') {
                          this.props.navigation.dispatch(resetAction1);
                        }
                      }
                    }
                  }

                  this.props.navigation.goBack();
                }else if (response.status === 401) {
                  this.setState({showProgress : false});
                  Toast.show('Unauthorized');
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
            }else{
              Toast.show("No Internet Connection");
            }
            });
      }

    }
    hideErrors(){
      let error = this.state.errorMsg;
      error.emailMsg = '';
      error.firstName = '';
      error.lastName = '';
      error.initialdob = '';
      this.setState({errorMsg: error});
    }

    updatefriend(){
      let error = this.state.errorMsg;
      error.emailMsg = '';
      error.firstName = '';
      error.lastName = '';
      error.initialdob = '';
      let flag = '';
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if(this.state.firstName == ''){
        flag = '0';
        error.firstName = Label.t('132');
      }
      if(this.state.lastName == ''){
        flag = '0';
        error.lastName = Label.t('133');
      }
      if(this.state.email == ''){
        flag = '0';
        error.emailMsg = Label.t('75');
      }
      if(!re.test(this.state.email)){
        flag = '0';
        error.emailMsg = Label.t('76');
      }
      if(flag != ''){
        this.setState({errorMsg: error});
      }
      else
      {
        //API Call
        checkinternetconnectivity().then((response)=>{
          if(response.Internet == true){
          this.setState({showProgress : true});
          callApiWithAuth('user/friend/'+this.state.formdata.id,'PUT',this.state.auth_token, {"email":this.state.email,
            "first_name":this.state.firstName,
            "last_name":this.state.lastName,
            "birth_date": this.state.initialdob }
          ).then((response) => {
            // response.json().then((responseobject) => {
            // console.log(responseobject);});
            if(response.status === 200){
              this.setState({showProgress : false});
              Toast.show('Friend Updated');
              if(this.props.navigation.state != undefined){
                if(this.props.navigation.state.params != undefined){
                  if(this.props.navigation.state.params.callFrom != undefined){
                    if(this.props.navigation.state.params.callFrom == 'setting'){
                      this.props.navigation.dispatch(resetAction);
                    }else if (this.props.navigation.state.params.callFrom == 'IMPORTMANUALLY') {
                      this.props.navigation.dispatch(resetAction1);
                    }
                  }
                }
              }

              this.props.navigation.goBack();
            }else if (response.status === 401) {
              this.setState({showProgress : false});
              Toast.show('Unauthorized');
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
        }else{
          Toast.show("No Internet Connection");
        }
        });
  }
    }

render(){

    return(
      <View style={[styles.full]}>
            <Image style = {styles.backgroundImage} source = {images.background} />
            <MyActivityIndicator progress={this.state.showProgress} />
            <TouchableOpacity style = {[styles.dashboardIconw]}  onPress={()=>{this.props.navigation.goBack()}}>
                <Image style={styles.img} source = {images.backIcon}></Image>
            </TouchableOpacity>
            <View style = {styles.titleContainer}>
                <Text style = {styles.titleTextFirst}>{Label.t('0')}</Text>
                <Text style = {styles.titleTextSecond}>{Label.t('1')}</Text>
            </View>
            <View style = {[styles.formgroup]}>
                <ScrollView keyboardShouldPersistTaps="always">
                    <View style = {[styles.SettingsTextInputContainer,styles.inputBorderBottom]}>
                        <TextInput style = {[styles.TextInputStyle,styles.font3]}
                            keyboardType = 'default'
                            placeholderTextColor = "#b7b7b7"
                            placeholder = {Label.t('2')}
                            underlineColorAndroid = 'transparent'
                            value = {this.state.firstName}
                            multiline = {false}
                            maxLength = {100}
                            returnKeyType={Label.t('3')}
                            autoCorrect={false}
                            onSubmitEditing={(event) => {this.refs.secondInput.focus();}}
                            onChangeText = {(val) => {this.setState({firstName: val});this.hideErrors();}}
                        />
                        <Image style = {styles.TextInputIcon} source = {images.fullName}/>
                    </View>
                    <Text style = {styles.errorMsg}>{this.state.errorMsg['firstName']}</Text>
                    <View style = {[styles.SettingsTextInputContainer,styles.inputBorderBottom]}>
                        <TextInput style = {[styles.TextInputStyle,styles.font3]}
                            ref='secondInput'
                            keyboardType = 'default'
                            placeholderTextColor = "#b7b7b7"
                            value = {this.state.lastName}
                            placeholder = {Label.t('4')}
                            underlineColorAndroid = 'transparent'
                            multiline = {false}
                            maxLength = {100}
                            returnKeyType={Label.t('3')}
                            autoCorrect={false}
                            onSubmitEditing={(event) => {this.refs.thirdInput.focus();}}
                            onChangeText = {(val) => {this.setState({lastName: val});this.hideErrors();}}
                        />
                        <Image style = {styles.TextInputIcon} source = {images.fullName}/>
                    </View>
                    <Text style = {styles.errorMsg}>{this.state.errorMsg['lastName']}</Text>
                    <View style = {[styles.SettingsTextInputContainer,styles.inputBorderBottom]}>
                        <TextInput
                            style = {[styles.TextInputStyle,styles.font3]}
                            ref='thirdInput'
                            placeholderTextColor = "#b7b7b7"
                            placeholder = {Label.t('5')}
                            value = {this.state.email}
                            underlineColorAndroid = 'transparent'
                            multiline = {false}
                            maxLength = {100}
                            returnKeyType= {Label.t('3')}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText = {(val) => {this.setState({email: val});this.hideErrors();}}
                        />
                        <Image style = {styles.TextInputIcon} source = {images.emailIcon}/>
                    </View>
                    <Text style = {styles.errorMsg}>{this.state.errorMsg['emailMsg']}</Text>
                    <View style = {[styles.SettingsTextInputContainer]}>
                        <Text style = {[styles.dob_label,styles.font3]}>Birthday</Text>
                        <DatePicker
                            style = {[styles.date_picker,styles.font3]}
                            date = {this.state.initialdob}
                            format = "YYYY-MM-DD"
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
                    <View style = {styles.SettingsTextInputContainer}>
                    <TouchableOpacity style = {[styles.signInButtonContainer,{backgroundColor:'#DC6966',borderRadius:3, marginTop:10}]}  onPress = {(this.state.newfriend == true) ? this.addfriend :this.updatefriend}>
                      <Text style = {styles.signInButton}>
                      {(this.state.newfriend == true) ? (<Image style = {styles.addBtn} source = {images.addBtn}/>):''}
                      {(this.state.newfriend == true) ? Label.t('0') :Label.t('8')}
                        </Text>
                          </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
        );
    }
}
