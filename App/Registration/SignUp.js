import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  Image,ScrollView, ImageBackground
} from 'react-native';

import images from '../Constant/Images';
import styles from './Style/RegistrationStyle';
import DatePicker from 'react-native-datepicker';

export default class SignUp extends Component {


  constructor(props){

   super(props);

   this.state = {'date': new Date(Date.now())};
 }


  render(){

  return(


<Image style = {styles.backgroundImage} source = {images.loginbackground}>

<View style = {styles.titleContainer}>
<Text style = {styles.titleTextFirst}>Join the</Text>
<Text style = {styles.titleTextSecond}>Dollar Birthday Club!</Text>
<Image style = {styles.logo} source = {images.baseLogo}/>

</View>

<ScrollView>

<View style = {styles.EmailTextInputContainer}>
<TextInput style = {styles.TextInputStyle} keyboardType = 'email-address'
placeholderTextColor = "#b7b7b7" placeholder = 'Full Name' underlineColorAndroid = 'transparent'
multiline = {false} maxLength = {100}

/>
<Text style = {styles.TextInputLine}/>
<Image style = {styles.TextInputIcon} source = {images.fullName}/>

</View>

<View style = {styles.TextInputContainer}>
<TextInput style = {styles.TextInputStyle} keyboardType = 'default'
placeholderTextColor = "#b7b7b7" placeholder = 'Email Id' underlineColorAndroid = 'transparent'
secureTextEntry = {true} multiline = {false} maxLength = {100}

/>
<Text style = {styles.TextInputLine} />
<Image style = {styles.TextInputPasswordIcon} source = {images.emailIcon}/>

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
onDateChange = {(date) => {this.setState({date:date})}}
/>
</View>


<View style = {styles.TextInputContainer}>
<TextInput style = {styles.TextInputStyle} keyboardType = 'default'
placeholderTextColor = "#b7b7b7" placeholder = 'Password' underlineColorAndroid = 'transparent'
secureTextEntry = {true} multiline = {false} maxLength = {100}

/>
<Text style = {styles.TextInputLine} />
<Image style = {styles.TextInputPasswordIcon} source = {images.password}/>

</View>

<View style = {styles.TextInputContainer}>
<TouchableOpacity style = {styles.signInButtonContainer}  onPress = {this.onLoginClick}>
<Text style = {styles.signInButton}>Sign Up</Text>
</TouchableOpacity>
<Text style = {styles.term_service}>By signing up, you agree to   ; Terms of Service and Privacy Policy.</Text>

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
}
