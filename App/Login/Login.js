import React, { Component } from 'react';
import {callPostApi} from '../Service/WebServiceHandler';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  Image,ScrollView, ImageBackground
} from 'react-native';

import images from '../Constant/Images';
import MyActivityIndicator from '../ActivityIndicator/MyActivityIndicator';

import styles from './style/LoginStyle';

export default class Login extends Component {

  constructor(props){

   super(props);

   this.onLoginClick = this.onLoginClick.bind(this);
   this.state = {
                email:'',
                password:'',
                errorMsg:{"emailMsg":'', "passwordMsg":''},
                showProgress: true
              };

  }

render(){

return(


<Image style = {styles.backgroundImage} source = {images.loginbackground} >






<View style = {styles.titleContainer}>
<Text style = {styles.titleTextFirst}>Join the</Text>
<Text style = {styles.titleTextSecond}>Dollar Birthday Club!</Text>
<Image style = {styles.logo} source = {images.baseLogo}/>
</View>

<ScrollView>

<View style = {styles.EmailTextInputContainer}>
<TextInput style = {styles.TextInputStyle} keyboardType = 'email-address'
placeholderTextColor = "#b7b7b7" placeholder = 'Email Id' underlineColorAndroid = 'transparent'
multiline = {false} maxLength = {100}
onChangeText = {
  (val) => this.setState({email: val})

}
/>
<Text style = {styles.TextInputLine}/>
<Image style = {styles.TextInputIcon} source = {images.emailIcon}/>
<Text style = {styles.errorMsg}>{this.state.errorMsg['emailMsg']}</Text>
</View>

<View style = {styles.TextInputContainer}>
<TextInput style = {styles.TextInputStyle} keyboardType = 'default'
placeholderTextColor = "#b7b7b7" placeholder = 'Password' underlineColorAndroid = 'transparent'
secureTextEntry = {true} multiline = {false} maxLength = {100}
onChangeText = {
  (val) => this.setState({password: val})

}
/>
<Text style = {styles.TextInputLine} />
<Image style = {styles.TextInputPasswordIcon} source = {images.password}/>
<Text style = {styles.errorMsg}>{this.state.errorMsg['passwordMsg']}</Text>
</View>



<View style = {styles.TextInputContainer}>
<TouchableOpacity>
<Text style = {styles.forgot}>Forgot Password?</Text>
</TouchableOpacity>
</View>

<View style = {styles.TextInputContainer}>
<TouchableOpacity style = {styles.signInButtonContainer}  onPress = {this.onLoginClick}>
<Text style = {styles.signInButton}>Sign In</Text>
</TouchableOpacity>
</View>

<View style = {styles.TextInputContainer}>
<TouchableOpacity>
<Text style = {styles.forgot}>Don't have account? Sign Up</Text>
</TouchableOpacity>
</View>

<View style = {styles.TextInputContainer}>
<Text style = {styles.orDivider}>- or -</Text>
</View>

<View style = {styles.TextInputContainer}>
<TouchableOpacity style = {styles.facebookButtonContainer}>


<Image style = {styles.facebookButton} source = {images.facebookButton}/>
</TouchableOpacity>
</View>



</ScrollView>



</Image>

);

}

onLoginClick(){

let error = this.state.errorMsg;
error.passwordMsg = '';
error.emailMsg = '';
let flag = '';
var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

if(this.state.email == ''){
flag = '0';
error.emailMsg = 'Please enter email.';

}
else if(!re.test(this.state.email))
{

console.log('validdat')
  flag = '0';
  error.emailMsg = 'Please enter valid email.';

}
else if(this.state.password == '')
{
  flag = '1';
  error.passwordMsg = 'Please enter password.';
}



if(flag != '')
{

  this.setState({errorMsg: error});

}
else{

  let userData = {

     email:'cipliphone@classicinformatics.com',
     password:'12345678',
     device_id:'0987654321',
     device_type:'ios',
     login_type:'dbc'
  }

this.makeCallToLogin(userData);

}


}

makeCallToLogin(data){

callPostApi('login', {

   'email':'cipliphone@classicinformatics.com',
   'password':'12345678',
   'device_id':'0987654321',
   'device_type':'ios',
   'login_type':'dbc'
}).then((responseObject) => {

console.log("ghot"+responseObject);

})
.catch((error) => {

  console.log(error);
});

}

}
