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
import {callApiWithAuth} from '../Service/WebServiceHandler';
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
     charity_list:'',
     donation_list:'',
     showProgress : false,
   }

 }
 componentDidMount(){
    //this.setState({name: this.props.navigation.state.params.name});
    AsyncStorage.getItem(USER_KEY).then((key)=>{
      this.setState({user_key: key});
    }).catch((err)=>{
      Toast.show(err);
    });
    AsyncStorage.getItem(AUTH_TOKEN).then((token)=>{
      this.setState({auth_token: token});

    }).catch((err)=>{
      Toast.show(err);
    });
    AsyncStorage.getItem(USER_DETAILS).then((details)=>{
      details = JSON.parse(details);
      this.setState({user_details: details});
    }).catch((err)=>{
      Toast.show(err);
    });

    // to fetch charity list
    callApiWithAuth('charityList','GET' ).then((response) => {
       if(response.status === 200){
         response.json().then((responseobject) => {
           console.log(responseobject);
           let charityList = Object.keys(responseobject.data).map(function(key,data) {
             return { value: responseobject.data[key].organization, index:responseobject.data[key].id};

            });
            console.log(charityList);
            list1 = charityList;
            // this.setState({
            //   showProgress : false,
            //   charity_list : charityList,
            // });
            console.log(list1);
         });
       }else if (response.status === 401) {
          this.setState({showProgress : false});
       }else if (response.status === 500) {
          this.setState({showProgress : false});
       }
    }).catch((error) => {console.log(error); });
    //--fetch donation list
    callApiWithAuth('donationList','GET' ).then((response) => {
       if(response.status === 200){
         response.json().then((responseobject) => {
          console.log(responseobject);
          let donationList = Object.keys(responseobject.data).map(function(key,data) {
            return { value: responseobject.data[key], index:key};

           });
           console.log(donationList);
          //  this.setState({
          //    showProgress : false,
          //    donation_list : donationList,
          //  });
          list2 = donationList;
           console.log(list2);
            });

       }else if (response.status === 401) {
          this.setState({showProgress : false});
       }else if (response.status === 500) {
          this.setState({showProgress : false});
       }
    }).catch((error) => {console.log(error); });
 }

onCharityClick(){

  //let userData = this.props.navigation.state.params.user_data;
  this.props.navigation.navigate('FETCH_FRIEND');

}


  render(){
    let data = [{
      value: 'Epilepsy Association of Central Florida',index:'1'
    }, {
      value: 'Feeding America',index:'2'
    }, {
      value: 'I Do Not Wish To Donate at This Time',index:'3'
    }];
  return(
<Image style = {styles.backgroundImage} source = {images.loginbackground}>
<View style = {styles.titleContainer}>
  <Text style = {styles.titleTextFirst}>Join the</Text>
  <Text style = {styles.titleTextSecond}>Dollar Birthday Club!</Text>
  <Image style = {styles.logo} source = {images.baseLogo}/>
</View>
<View style = {[styles.TextInputContainer]}>
  <Text style = {styles.heading1}>Giving is Living</Text>
</View>
<View style = {[styles.TextInputContainer]}>
  <Text style = {styles.subhead1}>Setup a default charity to send a donation</Text>
  <Text style = {styles.subhead1}>to everytime you send a gift to a friend.</Text>
</View>
<ScrollView keyboardShouldPersistTaps="always">
  <View style = {styles.EmailTextInputContainer}>
    <Dropdown
          label='Choose a Charity'
          style = {styles.TextInputStyle}
          containerStyle ={{marginTop:-30}}
          baseColor = '#B3B3B3'
          data={data}
          onChangeText = {(value,index,data)=>{console.log(data[index]);}}
        />
  </View>
  <View style = {styles.TextInputContainer}>
    <TextInput
    style = {styles.TextInputStyle}
    keyboardType = 'default'
    placeholderTextColor = "#b7b7b7"
    placeholder = 'Donation Value'
    underlineColorAndroid = 'transparent'
    multiline = {false} maxLength = {100}
    />
    <Text style = {styles.TextInputLine} />
    <Image style = {styles.TextInputIcon} source = {images.dollarIcon}/>
  </View>
  <View style = {[styles.TextInputContainer]}>
    <TouchableOpacity
    style = {[styles.signInButtonContainer,{backgroundColor:'#DC6966'}]}
    onPress = {this.onCharityClick}>
      <Text style = {styles.signInButton}>Save Charity</Text>
    </TouchableOpacity>
    <Text style = {styles.term_service}>Edit this charity default at anytime in the setting panel</Text>
  </View>
  <TouchableOpacity onPress={()=>{this.props.navigation.dispatch(resetAction);}}>
    <View style = {[styles.skipContainer]}>
          <Text style = {styles.skip}>Skip >></Text>
    </View>
  </TouchableOpacity>
</ScrollView>
</Image>);

  }
}
