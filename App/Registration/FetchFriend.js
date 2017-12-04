import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
  ScrollView,
  AsyncStorage,
  Modal,
  WebView,
} from 'react-native';

import images from '../Constant/Images';
import settings from '../Constant/UrlConstant';
import styles from './Style/FetchFriendStyle';
import Label from '../Constant/Languages/LangConfig';
import { USER_KEY, AUTH_TOKEN, USER_DETAILS, onSignIn, setUserDetails, afterSignIn } from '../Constant/Auth';
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
                  showProgress: false,
                  auth_token:'',
                  modalVisible: false,
                  url: '',
                  webViewState:{},
                };
               }
  componentDidMount(){

        AsyncStorage.getItem(AUTH_TOKEN).then((token)=>{
          this.setState({auth_token: token});
        }).catch((err)=>{
          Toast.show(err);
        });
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
       this.openURL(settings.FBEVENT_URL);
   }
    hide = () => {
     this.setState({ modalVisible: false });
     this._onNavigationStateChange(this.state.webViewState);
    }
    _onNavigationStateChange (webViewState) { console.log(webViewState);
console.log(this.state.webViewState);
    }
    openURL = (url) => {
     //  if (Platform.OS === 'ios') {
     //       SafariView.show({
     //         url: url,
     //         fromBottom: true,
     //       });
     //     }
     //     else {
           this.setState({url:url,modalVisible: true});
     //  }
    };


       _contactslisting = (mode) => {
         switch(mode){
           case settings.GOOGLE :
           console.log(settings.CONTACT_LIST_URL+this.state.auth_token+'&'+settings.GOOGLE);
                   this.openURL(settings.CONTACT_LIST_URL+this.state.auth_token+'&'+settings.GOOGLE);
                   break;
           case settings.YAHOO :
                   this.openURL(settings.CONTACT_LIST_URL+this.state.auth_token+'&'+settings.YAHOO);
                   break;
           case settings.HOTMAIL :
                   this.openURL(settings.CONTACT_LIST_URL+this.state.auth_token+'&'+settings.HOTMAIL);
                   break;
         }

        //this.openURL('https://accounts.google.com/o/oauth2/auth?response_type=code&redirect_uri=http%3A%2F%2Fdbc.demos.classicinformatics.com%2Fgcontacts&client_id=167305329007-1gl7jbvgg23vevkdhqhsomi4nnm243rs.apps.googleusercontent.com&scope=https%3A%2F%2Fwww.google.com%2Fm8%2Ffeeds&access_type=online&approval_prompt=auto');
       }
  render(){

  return(
    <Image style = {styles.backgroundImage} source = {images.loginbackground}>
      <View style={[styles.full]}>
      <Modal
          animationType={'slide'}
          visible={this.state.modalVisible}
          onRequestClose={this.hide}
          transparent
        >
          <View style={[styles.fulls,{flex:1,backgroundColor:"rgba(112, 79, 108, 0.5)"}]}>
              <WebView
                source={{ uri: this.state.url }}
                scalesPageToFit={true}
                startInLoadingState={true}
                onNavigationStateChange={(webViewState)=>{this._onNavigationStateChange(webViewState);}}
                onError={(webViewState)=>{this._onNavigationStateChange(webViewState);this.setState({webViewState:webViewState})}}
                javaScriptEnabledAndroid={true}
                domStorageEnabled={true}
                thirdPartyCookiesEnabled= {true}
                startInLoadingState={true}
                userAgent={settings.USERAGENT}
              />
          </View>
          <View style={[{backgroundColor:'#ffffff'}]}>
          <TouchableOpacity style={[{width:'30%',backgroundColor:'#e34c4b',padding:6,margin:5,borderWidth:1,borderColor:'#aa5c5c',borderRadius:4,borderBottomWidth:null,justifyContent:'center',alignSelf:'center'}]} onPress={this.hide} >
            <Text style={[{justifyContent:'center',alignSelf:'center'}]}>close</Text>
          </TouchableOpacity>
          </View>
        </Modal >
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

                <View style = {[styles.TextInputContainer]}>
                  <TouchableOpacity onPress={()=>{this.props.navigation.dispatch(resetAction1);}}
                  style = {[styles.signInButtonContainer,{borderRadius:3}]}>
                    <Text style = {styles.signInButton}>{Label.t('88')}</Text>
                  </TouchableOpacity>
                </View>

                <View style = {styles.TextInputContainer}>
                    <Text style = {styles.orDivider}>{Label.t('72')}</Text>
                  </View>
                <View style = {styles.TextInputContainer}>
                  <TouchableOpacity style = {[styles.facebookButtonContainer,{borderRadius:3}]} onPress={() => {this._fbAuth()}}>
                    <Image style = {styles.facebookButton} source = {images.importfbbutton}/>
                  </TouchableOpacity>
                  <Text style = {[styles.googlefbtext,styles.backgroundtrans,styles.font1,styles.paddingTopDownTwo]}>{Label.t('67')}</Text>
                </View>
                <View style = {[styles.TextInputContainer,styles.friendboxes]}>
                  <View style = {[styles.signinview]}>
                      <TouchableOpacity onPress={() => {this._contactslisting(settings.GOOGLE);}}>
                          <View style = {styles.googlesigninbox}>
                              <Text style= {styles.boxtextsmall}>{Label.t('65')}</Text>
                          </View>
                       </TouchableOpacity>

                      <Text style = {[styles.googlefbtext,styles.backgroundtrans]}>{Label.t('66')}</Text>
                  </View>
                  <View style = {[styles.signinview,styles.marginLeftFive,styles.marginRightFive]}>
                      <TouchableOpacity onPress={() => {this._contactslisting(settings.YAHOO);}}>
                          <View style = {styles.yahoosigninbox}>
                              <Text style= {styles.boxtextsmall}>{Label.t('117')}</Text>
                          </View>
                      </TouchableOpacity>

                      <Text style = {[styles.googlefbtext,styles.backgroundtrans]}>{Label.t('118')}</Text>
                  </View>
                  <View style = {[styles.signinview]}>
                      <TouchableOpacity onPress={() => {this._contactslisting(settings.HOTMAIL);}}>
                          <View style = {styles.hotmailsigninbox}>
                              <Text style= {styles.boxtextsmall}>{Label.t('116')}</Text>
                          </View>
                      </TouchableOpacity>
                      <Text style = {[styles.googlefbtext,styles.backgroundtrans]}>{Label.t('119')}</Text>
                  </View>
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
