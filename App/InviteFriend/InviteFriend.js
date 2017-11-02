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
import styles from './Style/InviteFriendStyle';
import MyActivityIndicator from '../Component/MyActivityIndicator';
import ModalAlert from '../Component/ModalAlert';
import { USER_KEY, AUTH_TOKEN, USER_DETAILS, onSignIn, setUserDetails, afterSignIn } from '../Constant/Auth';
import {callApiWithAuth} from '../Service/WebServiceHandler';
import { NavigationActions } from 'react-navigation';
const resetAction = NavigationActions.reset({
     index: 0,
     actions: [NavigationActions.navigate({ routeName: 'DASHBOARD',params: {actionFrom:'InviteFriend'} })],
   });

export default class InviteFriend extends Component {

constructor(props){
    super(props);
    this.invitefriend = this.invitefriend.bind(this);
    this.hideErrors = this.hideErrors.bind(this);
    this.state = {
        email:'',
        firstName:'',
        lastName:'',
        errorMsg:{"emailMsg":'', "firstName":'', "lastName":''},
        auth_token: '',
        showProgress: false,
        modelstatus: false,
        statusmsg:'',
    };
}

componentWillMount(){


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

    invitefriend(userData){
          let error = this.state.errorMsg;
          error.emailMsg = '';
          error.firstName = '';
          error.lastName = '';
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
              let param = {};
              param['fname'] = this.state.firstName;
              param['lname'] = this.state.lastName;
              param['cmail'] = this.state.email;
                console.log(param);
                this.setState({ modelstatusmsg: true });
              // callApiWithAuth('user/friend','POST',this.state.auth_token, {"email":this.state.email,
              //   "first_name":this.state.firstName,
              //   "last_name":this.state.lastName,}
              // ).then((response) => {
              //   // response.json().then((responseobject) => {
              //   // console.log(responseobject);});
              //   if(response.status === 201){
              //     response.json().then((responseobject) => {
              //       console.log(responseobject);
              //       this.setState({showProgress : false});
              //     });
              //     Toast.show('Friend Added');
              //     this.props.navigation.dispatch(resetAction);
              //   }else if (response.status === 401) {
              //     this.setState({showProgress : false});
              //     Toast.show('Unauthorized');
              //   }else if (response.status === 406) {
              //     response.json().then((responseobject) => {
              //       this.setState({showProgress : false});
              //       Toast.show(responseobject.error_messages);
              //     });
              //   }else if (response.status === 500) {
              //     this.setState({showProgress : false});
              //     Toast.show('Unsuccessfull error:500');
              //     }
              // }).catch((error) => {console.log(error); });
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
      this.setState({errorMsg: error});
    }

    hidestatusmsg(){
      this.setState({ modelstatusmsg: false });
      if(this.state.statusmsg === 'success'){
          this.props.navigation.dispatch(resetAction);
        }else {
          this.props.navigation.dispatch(resetAction);
        }

      }

render(){

    return(
      <View style={[styles.full]}>
      <ModalAlert visible={this.state.modelstatus} onRequestClose={this.hidestatusmsg} head={this.state.statusmsg ==='success' ? Label.t('134') : this.state.statusmsg ==='failure' ? Label.t('135') : ''} message={ this.state.statusmsg ==='success' ? Label.t('136') : this.state.statusmsg ==='failure' ? Label.t('137') : ''}/>
            <Image style = {styles.backgroundImage} source = {images.background} />
            <MyActivityIndicator progress={this.state.showProgress} />
            <TouchableOpacity style = {[styles.dashboardIconw]}  onPress={()=>{this.props.navigation.goBack()}}>
                <Image style={styles.img} source = {images.backIcon}></Image>
            </TouchableOpacity>
            <View style = {styles.titleContainer}>
                <Text style = {styles.titleTextFirst}>{Label.t('130')}</Text>
                <Text style = {styles.titleTextSecond}>{Label.t('1')}</Text>
            </View>
            <View style = {[styles.formgroup]}>
                <ScrollView keyboardShouldPersistTaps="always">
                    <View style = {[styles.TextInputContainer,styles.inputBorderBottom]}>
                        <TextInput style = {styles.TextInputStyle}
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
                    <Text style = {[styles.errorMsg,styles.TextInputContainer]}>{this.state.errorMsg['firstName']}</Text>
                    <View style = {[styles.TextInputContainer,styles.inputBorderBottom]}>
                        <TextInput style = {styles.TextInputStyle}
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
                    <Text style = {[styles.errorMsg,styles.TextInputContainer]}>{this.state.errorMsg['lastName']}</Text>
                    <View style = {[styles.TextInputContainer,styles.inputBorderBottom]}>
                        <TextInput
                            style = {[styles.TextInputStyle]}
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
                    <Text style = {[styles.errorMsg,styles.TextInputContainer]}>{this.state.errorMsg['emailMsg']}</Text>
                    <View style = {styles.TextInputContainer}>
                    <TouchableOpacity style = {[styles.signInButtonContainer,{backgroundColor:'#DC6966',borderRadius:3,}]}  onPress = {this.invitefriend}>
                      <Text style = {styles.signInButton}>
                      { Label.t('131')}
                      </Text>
                    </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
        );
    }
}
