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
  ActivityIndicator
} from 'react-native';

import Toast from 'react-native-simple-toast';
import images from '../Constant/Images';
import styles from './Style/RegistrationStyle';
import DatePicker from 'react-native-datepicker';
import settings from '../Constant/UrlConstant';
import {callPostApi, callApiWithoutAuth} from '../Service/WebServiceHandler';
const date = new Date(Date.now());

export default class SignUp extends Component {


  constructor(props){

   super(props);

   this.onSignUpClick = this.onSignUpClick.bind(this);
   var month = (date.getMonth()+1).toString();
   month = month.length>1?month:'0'+month;
   this.state = {

     date: date.getFullYear()+'-'+month+'-'+date.getDate(),
     email:'',
     password:'',
     fullName:'',
     device_id:'',
     device_type:'',
     dob:'',
     paypal:'abc@gmail.com',
     errorMsg:{"emailMsg":'', "passwordMsg":'', "fullName":'', "dob":''},
     showProgress: false

 };

 }

 componentWillMount(){
   let that = this;
   this.setState({device_id : settings.DEVICE_ID , device_type : settings.DEVICE_NAME});
 }


onSignUpClick(userData){

  let error = this.state.errorMsg;
  error.passwordMsg = '';
  error.emailMsg = '';
  error.dob = '';
  error.fullName = '';
  let flag = '';
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



  if(this.state.fullName == '')
  {
console.log(this.state.date);
  flag = '0';
  error.fullName = 'Please enter fullname.';

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
  else if(this.state.password == '')
  {
    flag = '1';
    error.passwordMsg = 'Please enter password.';
  }
  else if(this.state.password.length < 8)
  {
    flag = '1';
    error.passwordMsg = 'Minimum 8 character required.';
  }


  if(flag != ''){
    this.setState({errorMsg: error});
  }
  else
  {
  //  this.setState({showProgress : true});

  this.props.navigation.navigate('FETCH_FRIEND',{user_data: this.state});

  /*  console.log(this.state);  // Add your logic for the transition
      callApiWithoutAuth('register','POST', {"email":this.state.email,
        "password":this.state.password,
        "device_id":this.state.device_id,
        "device_type":this.state.device_type,
        "paypal":this.state.paypal,
        "full_name":this.state.fullName,
        "birth_date": this.state.date }
      ).then((response) => {
        console.log(response);
        if(response.status === 201){
        response.json().then((responseobject) => {
          console.log(responseobject);
           onSignIn();
           afterSignIn(responseobject.data.authToken);
           setUserDetails(responseobject.data);
           this.props.navigation.navigate('DASHBOARD',{name: this.state.email});
           this.setState({showProgress : false});
        console.log(responseobject);
        });
        Toast.show('Login Successfull');
      }else if (response.status === 404) {
        this.setState({showProgress : false});
      }else if (response.status === 406) {
        console.log(responseobject);
        this.setState({showProgress : false});
        Toast.show('User email  already registered.');
      }else if (response.status === 500) {
        this.setState({showProgress : false});
        Toast.show('Unsuccessfull error:500');
        }
      }).catch((error) => {console.log(error); });*/

  }

}


  render(){

    let activityind =(this.state.showProgress) ? (
    <View style={styles.activityloder}>
      <View><ActivityIndicator animating={true} size="large" /></View>
    </View>): (<View></View>);

  return(


<Image style = {styles.backgroundImage} source = {images.loginbackground}>
{activityind}
<View style = {styles.titleContainer}>
<Text style = {styles.titleTextFirst}>Join the</Text>
<Text style = {styles.titleTextSecond}>Dollar Birthday Club!</Text>
<Image style = {styles.logo} source = {images.baseLogo}/>

</View>

<ScrollView style = {{paddingBottom :20}}>

<View style = {styles.EmailTextInputContainer}>
<TextInput style = {styles.TextInputStyle} keyboardType = 'default'
placeholderTextColor = "#b7b7b7" placeholder = 'Full Name' underlineColorAndroid = 'transparent'
multiline = {false} maxLength = {100}
onChangeText = {(val) => {this.setState({fullName: val});}}
/>
<Text style = {styles.TextInputLine}/>
<Image style = {styles.TextInputIcon} source = {images.fullName}/>
<Text style = {styles.errorMsg}>{this.state.errorMsg['fullName']}</Text>
</View>

<View style = {styles.TextInputContainer}>
<TextInput style = {styles.TextInputStyle} keyboardType = 'email-address'
placeholderTextColor = "#b7b7b7" placeholder = 'Email Id' underlineColorAndroid = 'transparent'
multiline = {false} maxLength = {100}
onChangeText = {(val) => {this.setState({email: val});}}
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

customStyles={{
                 dateInput: styles.dateInput,
                 dateIcon: styles.dateIcon,

               }}
/>
</View>


<View style = {styles.TextInputContainer}>
<TextInput style = {styles.TextInputStyle} keyboardType = 'default'
placeholderTextColor = "#b7b7b7" placeholder = 'Password' underlineColorAndroid = 'transparent'
secureTextEntry = {true} multiline = {false} maxLength = {100}
onChangeText = {(val) => {this.setState({password: val});}}
/>
<Text style = {styles.TextInputLine} />
<Image style = {styles.TextInputPasswordIcon} source = {images.password}/>
<Text style = {styles.errorMsg}>{this.state.errorMsg['passwordMsg']}</Text>
</View>

<View style = {styles.TextInputContainer}>
<TouchableOpacity style = {styles.signInButtonContainer}  onPress = {this.onSignUpClick}>
<Text style = {styles.signInButton}>Sign Up</Text>
</TouchableOpacity>

<TouchableOpacity onPress={()=>{this.props.navigation.goBack(null)}}>
<Text style = {styles.login_button}>Already have account? Sign In</Text>
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
}
