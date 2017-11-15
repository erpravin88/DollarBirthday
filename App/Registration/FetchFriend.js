import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,ScrollView,
} from 'react-native';

import images from '../Constant/Images';
import styles from './Style/FetchFriendStyle';
import Label from '../Constant/Languages/LangConfig';
import {onSignIn, setUserDetails, afterSignIn } from '../Constant/Auth';
import {callApiWithoutAuth} from '../Service/WebServiceHandler';
import MyActivityIndicator from '../Component/MyActivityIndicator';
import Toast from 'react-native-simple-toast';
import { NavigationActions } from 'react-navigation';
import SafariView from 'react-native-safari-view';
const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'DASHBOARD' })],
    });
const resetAction1 = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'IMPORTMANUALLY' })],
    });
import FBSDK  from 'react-native-fbsdk';
const {
      LoginManager,
      AccessToken
} = FBSDK;
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
    _fbAuth = () => {
       LoginManager.logInWithReadPermissions(['public_profile','user_birthday']).then((result) => {
           if(result.isCancelled){
               Toast.show('Log In cancelled');
           }
           else {
               /*AccessToken.getCurrentAccessToken().then(
                   (data) => {
                       console.log(data);
                       fetch('https://graph.facebook.com/v2.5/me?fields=email,name,birthday&access_token=' + data.accessToken)
                       .then((response) => response.json())
                       .then((json) => {console.log("Profile fb",json)})
                       .catch(() => {
                         console.log('ERROR GETTING DATA FROM FACEBOOK');
                       })

                   }
               );*/
               this.openURL("https://www.facebook.com/events/birthdays/");
           }
       }, function(error){
           console.log('An error occured: ' + error)
       })
    }
    // Open URL in a browser
     openURL = (url) => {
       // Use SafariView on iOS
       if (Platform.OS === 'ios') {
         SafariView.show({
           url: url,
           fromBottom: true,
         });
       }
       // Or Linking.openURL on Android
       else {
         Linking.openURL(url);
       }
     };
  render(){

  return(
    <Image style = {styles.backgroundImage} source = {images.loginbackground}>
      <View style={[styles.full]}>
        <MyActivityIndicator progress={this.state.showProgress} />
          <ScrollView  style={styles.scrollviewheight} keyboardShouldPersistTaps="never">
            <Image style = {[styles.top,styles.containerWidth]} source = {images.topbackground} >
              <View style = {styles.titleContainer}>
                <Text style = {styles.titleTextFirst}></Text>
                <Text style = {[styles.titleTextSecond,styles.marginTopFive]}>{Label.t('1')}</Text>
              </View>
            </Image>
            <View style={[styles.formgroup,styles.containerWidth]}>
              <View style = {[styles.TextInputContainer]}>
                <Text style = {styles.heading1}>{Label.t('86')}</Text>
              </View>
              <View style = {[styles.TextInputContainer,styles.marginFix2]}>
                <Text style = {styles.subhead1}>{Label.t('87')}</Text>
              </View>
                <View style = {styles.TextInputContainer}>
                  <TouchableOpacity style = {[styles.facebookButtonContainer,{borderRadius:3}]} onPress={() => {this._fbAuth()}}>
                    <Image style = {styles.facebookButton} source = {images.importfbbutton}/>
                  </TouchableOpacity>
                </View>
                <View style = {styles.TextInputContainer}>
                  <Text style = {styles.orDivider}>{Label.t('72')}</Text>
                </View>
                <View style = {[styles.TextInputContainer]}>
                  <TouchableOpacity onPress={()=>{this.props.navigation.dispatch(resetAction1);}}
                  style = {[styles.signInButtonContainer,{borderRadius:3}]}>
                    <Text style = {styles.signInButton}>{Label.t('88')}</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={()=>{this.props.navigation.dispatch(resetAction);}}>
                  <View style = {[styles.skipContainer]}>
                        <Text style = {styles.skip}>{Label.t('85')}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </Image>);
  }
}
//onPress={()=>{this.props.navigation.dispatch(resetAction1);}}
