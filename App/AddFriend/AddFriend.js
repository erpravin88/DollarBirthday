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

import Toast from 'react-native-simple-toast';
import images from '../Constant/Images';
import styles from './Style/AddFriendStyle';
import DatePicker from 'react-native-datepicker';
import MyActivityIndicator from '../Component/MyActivityIndicator';
import { USER_KEY, AUTH_TOKEN, USER_DETAILS, onSignIn, setUserDetails, afterSignIn } from '../Constant/Auth';
import {callApiWithAuth} from '../Service/WebServiceHandler';
const date = new Date(Date.now());
export default class AddFriend extends Component {

constructor(props){
    super(props);
    this.addfriend = this.addfriend.bind(this);
    this.hideErrors = this.hideErrors.bind(this);
    var month = (date.getMonth()+1).toString();
    month = month.length>1?month:'0'+month;
    this.state = {
        date: date.getFullYear()+'-'+month+'-'+date.getDate(),
        email:'',
        firstName:'',
        lastName:'',
        errorMsg:{"emailMsg":'', "firstName":'', "lastName":'', "dob":''},
        auth_token: '',
        showProgress: false
    };
}

componentWillMount(){
    //this.setState({name: this.props.navigation.state.params.name});
        AsyncStorage.getItem(USER_KEY).then((key)=>{
          //this.setState({user_key: key});
        }).catch((err)=>{
          Toast.show(err);
        });
        AsyncStorage.getItem(AUTH_TOKEN).then((token)=>{
           this.setState({auth_token: token});
          //   callApiWithAuth('api/task/show','GET', this.state.auth_token).then((response) => {
          //      if(response.status === 200){
          //        response.json().then((responseobject) => {
          //          this.setState({ taskList: responseobject.data });
          //          console.log(responseobject);
          //        });
          //        this.setState({showProgress : false});
          //        Toast.show('Task fetched');
          //      }else if (response.status === 401) {
          //         this.setState({showProgress : false});
          //         Toast.show('Task not fetched');
          //      }else if (response.status === 500) {
          //         this.setState({showProgress : false});
          //         Toast.show('Task not fetched:500');
          //      }
          //   }).catch((error) => { this.setState({showProgress : false}); console.log(error); });
        }).catch((err)=>{
          onSignOut;
          Toast.show(err);
        });
        AsyncStorage.getItem(USER_DETAILS).then((details)=>{
          details = JSON.parse(details);
          //this.setState({user_details: details});
        }).catch((err)=>{
          Toast.show(err);
        });
    }

    addfriend(userData){
          let error = this.state.errorMsg;
          error.emailMsg = '';
          error.firstName = '';
          error.lastName = '';
          let flag = '';
          var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        
        
          if(this.state.firstName == '')
          {
        console.log(this.state.date);
          flag = '0';
          error.firstName = 'Please enter firstName.';
        
          }else if(this.state.lastName == '')
          {
          flag = '0';
          error.lastName = 'Please enter lastName.';
        
          }
          else if(this.state.email == '')
          {
          flag = '0';
          error.emailMsg = 'Please enter email.';
        
          }
          else if(!re.test(this.state.email))
          {
        
          console.log('validdat')
            flag = '0';
            error.emailMsg = 'Please enter valid email.';
        
          }
        
        
          if(flag != ''){
            this.setState({errorMsg: error});
          }
          else
          { 
            //API Call
            this.setState({showProgress : true});
            callApiWithAuth('user/friend','POST',this.state.auth_token, {"email":this.state.email,
              "first_name":this.state.firstName,
              "last_name":this.state.lastName,
              "birth_date": this.state.date }
            ).then((response) => {
              // response.json().then((responseobject) => {
              // console.log(responseobject);});
              if(response.status === 201){
                response.json().then((responseobject) => {
                  console.log(responseobject);
                   this.setState({showProgress : false});
                });
                Toast.show('Friend Added');
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
          }
        
        }
        hideErrors(){
          let error = this.state.errorMsg;
          error.emailMsg = '';
          error.firstName = '';
          error.lastName = '';
          this.setState({errorMsg: error});
        }

render(){
    return(
        <ScrollView keyboardShouldPersistTaps="always">
            <Image style = {styles.backgroundImage} source = {images.background}>
                <MyActivityIndicator progress={this.state.showProgress} />
                <Image style = {styles.backlogo} source = {images.backIcon} onPress={()=>{this.props.navigation.goBack('DASHBOARD')}}></Image>
                <View style = {styles.titleContainer}>
                    <Text style = {styles.titleTextFirst}>Add Friend</Text>
                    <Text style = {styles.titleTextSecond}>Dollar Birthday Club!</Text>
                </View>
                <View style = {styles.EmailTextInputContainer}>
                    <TextInput style = {styles.TextInputStyle}
                        keyboardType = 'default'
                        placeholderTextColor = "#b7b7b7"
                        placeholder = 'First Name'
                        underlineColorAndroid = 'transparent'
                        multiline = {false}
                        maxLength = {100}
                        returnKeyType="next"
                        autoCorrect={false}
                        onSubmitEditing={(event) => {this.refs.secondInput.focus();}}
                        onChangeText = {(val) => {this.setState({firstName: val});this.hideErrors();}}
                    />
                    <Text style = {styles.TextInputLine}/>
                    <Image style = {styles.TextInputIcon} source = {images.fullName}/>
                    <Text style = {styles.errorMsg}>{this.state.errorMsg['firstName']}</Text>
                </View>
                <View style = {styles.TextInputContainer}>
                    <TextInput style = {styles.TextInputStyle}
                        keyboardType = 'default'
                        placeholderTextColor = "#b7b7b7"
                        placeholder = 'Last Name'
                        underlineColorAndroid = 'transparent'
                        multiline = {false}
                        maxLength = {100}
                        returnKeyType="next"
                        autoCorrect={false}
                        onSubmitEditing={(event) => {this.refs.secondInput.focus();}}
                        onChangeText = {(val) => {this.setState({lastName: val});this.hideErrors();}}
                    />
                    <Text style = {styles.TextInputLine}/>
                    <Image style = {styles.TextInputPasswordIcon} source = {images.fullName}/>
                    <Text style = {styles.errorMsg}>{this.state.errorMsg['lastName']}</Text>
                </View>
                <View style = {styles.TextInputContainer}>
                    <TextInput
                        style = {styles.TextInputStyle}
                        ref='secondInput'
                        keyboardType = 'email-address'
                        placeholderTextColor = "#b7b7b7"
                        placeholder = 'PayPal Email Id'
                        underlineColorAndroid = 'transparent'
                        multiline = {false}
                        maxLength = {100}
                        returnKeyType="next"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText = {(val) => {this.setState({email: val});this.hideErrors();}}
                    />
                    <Text style = {styles.TextInputLine} />
                    <Image style = {styles.TextInputPasswordIcon} source = {images.emailIcon}/>
                    <Text style = {styles.errorMsg}>{this.state.errorMsg['emailMsg']}</Text>
                </View>
                <View style = {styles.TextInputContainer}>
                    <Text style = {styles.dob_label}>Birthday</Text>
                    <DatePicker
                        style = {styles.date_picker}
                        date = {this.state.date}
                        format = "YYYY-MM-DD"
                        maxDate = {this.state.date}
                        confirmBtnText = "Confirm"
                        cancelBtnText = "Cancel"
                        iconSource = {images.dropdownArrow}
                        onDateChange = {(date) => {this.setState({date:date})}}
                        customStyles={{dateInput: styles.dateInput,
                                    dateIcon: styles.dateIcon,}}
                    />
                </View>
                <View style = {styles.TextInputContainer}>
                    <TouchableOpacity style = {[styles.signInButtonContainer,{backgroundColor:'#DC6966',borderRadius:3,}]}  onPress = {this.addfriend}>
                        
                        <Text style = {styles.signInButton}>
                            <Image style = {styles.addBtn} source = {images.addBtn}/>
                            Add Friend
                        </Text>
                    </TouchableOpacity>
                </View>
            </Image>
        </ScrollView>);
    }
}
