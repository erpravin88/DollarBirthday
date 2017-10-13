import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  Image,ScrollView, ImageBackground, ActivityIndicator
} from 'react-native';

import images from '../Constant/Images';
import styles from './Style/FetchFriendStyle';
import Label from '../Constant/Languages/LangConfig';
import {onSignIn, setUserDetails, afterSignIn } from '../Constant/Auth';
import {callApiWithoutAuth} from '../Service/WebServiceHandler';
import MyActivityIndicator from '../Component/MyActivityIndicator';
import Toast from 'react-native-simple-toast';
import { NavigationActions } from 'react-navigation';
const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'DASHBOARD' })],
    });
export default class FetchFriend extends Component {


  constructor(props){

   super(props);

   this.onGetStartedClick = this.onGetStartedClick.bind(this);
   this.state = {
                 date: new Date(Date.now()),
                  showProgress: false
                };
               }


    onGetStartedClick(){



 // let userData = this.props.navigation.state.params.user_data;
 //   console.log(userData);  // Add your logic for the transition
 //
 //    this.setState({showProgress : true});
 //    callApiWithoutAuth('register','POST', {"email":userData.email,
 //      "password":userData.password,
 //      "device_id":userData.device_id,
 //      "device_type":userData.device_type,
 //      "paypal":userData.paypal,
 //      "full_name":userData.fullName,
 //      "birth_date": userData.date }
 //    ).then((response) => {
 //      console.log(response);
 //      if(response.status === 201){
 //      response.json().then((responseobject) => {
 //        console.log(responseobject);
 //         onSignIn();
 //         afterSignIn(responseobject.data.authToken);
 //         setUserDetails(responseobject.data);
 //         this.props.navigation.navigate('DASHBOARD',{name: this.state.email});
 //         this.setState({showProgress : false});
 //      console.log(responseobject);
 //      });
 //
 //    }else if (response.status === 404) {
 //      this.setState({showProgress : false});
 //    }else if (response.status === 406) {
 //      console.log(responseobject);
 //      this.setState({showProgress : false});
 //      Toast.show('User email  already registered.');
 //    }else if (response.status === 500) {
 //      this.setState({showProgress : false});
 //      Toast.show('Unsuccessfull error:500');
 //      }
 //    }).catch((error) => {console.log(error); });



    }


  render(){

  return(
<Image style = {styles.backgroundImage} source = {images.loginbackground}>
<MyActivityIndicator progress={this.state.showProgress} />
<View style = {styles.titleContainer}>
  <Text style = {styles.titleTextFirst}></Text>
  <Text style = {[styles.titleTextSecond,styles.marginTopFive]}>{Label.t('1')}</Text>
</View>
<View style = {[styles.TextInputContainer]}>
  <Text style = {styles.heading1}>{Label.t('86')}</Text>
</View>
<View style = {[styles.TextInputContainer,styles.marginFix2]}>
  <Text style = {styles.subhead1}>{Label.t('87')}</Text>
</View>
<ScrollView keyboardShouldPersistTaps="always">

  <View style = {styles.TextInputContainer}>
    <TouchableOpacity style = {[styles.facebookButtonContainer,{borderRadius:3}]}>
      <Image style = {styles.facebookButton} source = {images.importfbbutton}/>
    </TouchableOpacity>
  </View>
  <View style = {styles.TextInputContainer}>
    <Text style = {styles.orDivider}>{Label.t('72')}</Text>
  </View>
  <View style = {[styles.TextInputContainer]}>
    <TouchableOpacity
    style = {[styles.signInButtonContainer,{borderRadius:3}]}
    onPress = {this.onLoginClick}>
      <Text style = {styles.signInButton}>{Label.t('88')}</Text>
    </TouchableOpacity>
  </View>
  <TouchableOpacity onPress={()=>{this.props.navigation.dispatch(resetAction);}}>
    <View style = {[styles.skipContainer]}>
          <Text style = {styles.skip}>{Label.t('85')}</Text>
    </View>
  </TouchableOpacity>
</ScrollView>
</Image>);

  }
}
