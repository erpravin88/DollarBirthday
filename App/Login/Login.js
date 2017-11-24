import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  ImageBackground,
  AsyncStorage,
  ActivityIndicator,
  NetInfo,
  Keyboard
} from 'react-native';
import CheckBox from 'react-native-checkbox';
import Toast from 'react-native-simple-toast';
import { PERSISTENT_LOGIN, USER_KEY, AUTH_TOKEN, USER_DETAILS, onSignIn, onSignOutfromlogin, setUserDetails, afterSignIn } from '../Constant/Auth';
import Label from '../Constant/Languages/LangConfig';
import images from '../Constant/Images';
import MyActivityIndicator from '../Component/MyActivityIndicator';
import {checkinternetconnectivity} from '../Constant/netinfo';
import styles from './style/LoginStyle';
import {callApiWithoutAuth} from '../Service/WebServiceHandler';
import { NavigationActions } from 'react-navigation';
import  Fblogin  from '../Component/Fblogin';
import settings from '../Constant/UrlConstant';
const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'DASHBOARD' })],
    });



export default class Login extends Component {

  constructor(props){
   super(props);
   this.onLoginClick = this.onLoginClick.bind(this);
   this.state = {
                email:'',
                password:'',
                device_id:settings.DEVICE_ID,
                device_type:settings.DEVICE_NAME,
                errorMsg:{"emailMsg":'', "passwordMsg":''},
                showProgress: false,
                Connected: false,
                persistentlogin: false
              };
  }
  componentWillMount(){
        //
        //
        // AsyncStorage.getItem(USER_KEY).then((key) => {
        //   if(key == 'true'){ console.log('login'); console.log(key);
        //     this.props.navigation.navigate('DASHBOARD');
        //   }
        // });
      }
_fblogin = ()=> { //fbAuth;
 Fblogin().then((data)=> {console.log(data);
   console.log(this.state);
   if(data.data.isCancelled){
       Toast.show('Log In cancelled');
   }else{
     checkinternetconnectivity().then((response)=>{
       if(response.Internet == true){
         this.setState({showProgress : true});
       callApiWithoutAuth('login','POST', {
         "accessToken":data.data.accessToken,
         "login_type":settings.login_type.fb,
         "device_id":this.state.device_id,
         "device_type":this.state.device_type}
       ).then((response) => {
         console.log(response);
        //  response.json().then((responseobject) => {
        //    console.log(responseobject);
        //  });
         if(response.status === 201){
         response.json().then((responseobject) => {
           console.log(responseobject);
          
            onSignIn();
            AsyncStorage.setItem(PERSISTENT_LOGIN, this.state.persistentlogin.toString());
            afterSignIn(responseobject.data.authToken);
            setUserDetails(responseobject.data);
            this.props.navigation.dispatch(resetAction);
            this.setState({showProgress : false});
         });
         Toast.show(Label.t('73'));
       }else if (response.status === 404) {
         this.setState({showProgress : false});
       }else if (response.status === 406) {
         response.json().then((responseobject) => {
           console.log(responseobject);
         });
         this.setState({showProgress : false});
         Toast.show(Label.t('147'));
       }else if (response.status === 500) {
         this.setState({showProgress : false});
         Toast.show(Label.t('52'));
         }
       }).catch((error) => {console.log(error); });
     }else{
       Toast.show(Label.t('140'));
     }
    });
   }
  });
}
  onLoginClick(){
    Keyboard.dismiss();
    let error = this.state.errorMsg;
    error.passwordMsg = '';
    error.emailMsg = '';
    let flag = '';
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(this.state.email == ''){
    flag = '0';
    error.emailMsg = Label.t('75');
    }
    if(!re.test(this.state.email)){
      flag = '0';
      error.emailMsg = Label.t('76');
    }
    if(this.state.password == ''){
      flag = '1';
      error.passwordMsg = Label.t('77');
    }
    if(this.state.password == '')
    {
      flag = '1';
      error.passwordMsg = Label.t('77');
    }else if(this.state.password.length < 8)
    {
      flag = '1';
      error.passwordMsg = Label.t('78');
    }
    if(flag != ''){
      this.setState({errorMsg: error});
    }else{
      console.log(this.state);  // Add your logic for the transition
      checkinternetconnectivity().then((response)=>{
        if(response.Internet == true){
          this.setState({showProgress : true});
        callApiWithoutAuth('login','POST', {"email":this.state.email,
          "password":this.state.password,
          "login_type":settings.login_type.dbc,
          "device_id":this.state.device_id,
          "device_type":this.state.device_type}
        ).then((response) => { console.log(response);
          if(response.status === 200){
          response.json().then((responseobject) => {
            console.log(responseobject);
             onSignIn();
             AsyncStorage.setItem(PERSISTENT_LOGIN, this.state.persistentlogin.toString());
             afterSignIn(responseobject.data.authToken);
             setUserDetails(responseobject.data);
             this.props.navigation.dispatch(resetAction);
             this.setState({showProgress : false});
          });
          Toast.show(Label.t('73'));
        }else if (response.status === 404) {
          this.setState({showProgress : false});
        }else if (response.status === 406) {
          this.setState({showProgress : false});
          Toast.show(Label.t('74'));
        }else if (response.status === 500) {
          this.setState({showProgress : false});
          Toast.show(Label.t('52'));
          }
        }).catch((error) => {console.log(error); });
      }else{
        Toast.show(Label.t('140'));
      }
      });

    }
  }
  hideErrors(){
    let error = this.state.errorMsg;
    error.passwordMsg = '';
    error.emailMsg = '';
    this.setState({errorMsg: error});
  }
render(){
  console.log("render"+this.state.Connected);
return(<Image style = {styles.backgroundImage} source = {images.loginbackground}>
<View style={[styles.full]}>
<MyActivityIndicator progress={this.state.showProgress} />
<ScrollView  style={styles.scrollviewheight} keyboardShouldPersistTaps="always">
  <TouchableOpacity style={[{flex:1}]} activeOpacity = { 1 } onPress={ Keyboard.dismiss } >
    <Image style = {[styles.top,styles.containerWidth]} source = {images.topbackground} >
      <View style = {[styles.titleContainer]}>
        <Text style = {styles.titleTextFirst}>{Label.t('68')}</Text>
        <Text style = {styles.titleTextSecond}>{Label.t('1')}</Text>
      </View>
    </Image>
  <View style = {[styles.formgroup,styles.containerWidth]}>
        <View style = {[styles.tempTextInputContainer,styles.inputBorderBottom]}>
        <TextInput style = {[styles.TextInputStyle, styles.font3]}
          keyboardType = 'email-address'
          placeholderTextColor = "#b7b7b7"
          placeholder = {Label.t('41')}
          underlineColorAndroid = 'transparent'
          returnKeyType="next"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          onSubmitEditing={(event) => {this.refs.secondInput.focus();}}
          multiline = {false}
          maxLength = {100}
          onChangeText = {(val) => {this.setState({email: val});this.hideErrors();}}
        />
        <Image style = {styles.TextInputIcon} source = {images.emailIcon}/>
      </View><Text style = {[styles.errorMsg,styles.font3]}>{this.state.errorMsg['emailMsg']}</Text>
      <View style = {[styles.tempTextInputContainer,styles.inputBorderBottom]}>
        <TextInput style = {[styles.TextInputStyle, styles.font3]}
          ref='secondInput'
          keyboardType = 'default'
          placeholderTextColor = "#b7b7b7"
          placeholder = {Label.t('44')}
          underlineColorAndroid = 'transparent'
          secureTextEntry = {true}
          multiline = {false}
          maxLength = {100}
          returnKeyType="go"
          onSubmitEditing={()=>{this.onLoginClick();}}
          onChangeText = {(val) => {this.setState({password: val});this.hideErrors();}}
        />
        <Image style = {styles.TextInputIcon} source = {images.password}/>
      </View>
      <Text style = {[styles.errorMsg,styles.font3]}>{this.state.errorMsg['passwordMsg']}</Text>
      <View style = {styles.tempTextInputContainer}>
        <CheckBox
            labelStyle={[styles.checkboxlabel]}
            checkboxStyle={[styles.singlecheckbox]}
            label="Keep me Signed In"
            onChange={(val) => {this.setState({persistentlogin: !val})}}
          />
      </View>
      <View style = {styles.tempTextInputContainer}>
        <TouchableOpacity>
        <Text onPress={()=>{this.props.navigation.navigate('FPASSWORD')}} style = {styles.forgot}>{Label.t('69')}</Text>
        </TouchableOpacity>
      </View>
      <View style = {styles.tempoTextInputContainer}>
        <TouchableOpacity style = {styles.signInButtonContainer}  onPress = {this.onLoginClick}>
          <Text style = {styles.signInButton}>{Label.t('70')}</Text>
        </TouchableOpacity>
      </View>
      <View style = {styles.tempTextInputContainer}>
        <TouchableOpacity>
        <Text onPress={()=>{this.props.navigation.navigate('SIGN_UP')}} style = {styles.forgot}>{Label.t('71')}</Text>
        </TouchableOpacity>
      </View>
      <View style = {styles.tempTextInputContainer}>
        <Text style = {styles.orDivider}>{Label.t('72')}</Text>
      </View>
      <View style = {styles.tempTextInputContainer}>
        <TouchableOpacity style = {styles.facebookButtonContainer} onPress={this._fblogin}>
          <Image style = {styles.facebookButton} source = {images.facebookButton}/>
        </TouchableOpacity>
      </View>
  </View>
</TouchableOpacity>
  </ScrollView>
</View>
</Image>
 ); }
}

            //checkedImage={images.checkedcheckbox}
            //uncheckedImage={images.uncheckedcheckbox}
