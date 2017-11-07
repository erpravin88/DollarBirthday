import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  Linking,
  Platform,
  Image,ScrollView,
  ImageBackground,
  ActivityIndicator,
  KeyboardAvoidingView,
  AsyncStorage,
  FlatList,
  Modal,
} from 'react-native';

import Toast from 'react-native-simple-toast';
import MyActivityIndicator from '../Component/MyActivityIndicator';
import images from '../Constant/Images';
import Label from '../Constant/Languages/LangConfig';
import styles from './Style/FriendStyle';
import DatePicker from 'react-native-datepicker';
import createReactClass from 'create-react-class';
import settings from '../Constant/UrlConstant';
import functions from '../Constant/Function';
import { USER_KEY, AUTH_TOKEN, USER_DETAILS, onSignIn, setUserDetails, afterSignIn } from '../Constant/Auth';
import {callApiWithAuth} from '../Service/WebServiceHandler';
import { NavigationActions } from 'react-navigation';
import SafariView from 'react-native-safari-view';
const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'DASHBOARD' })],
    });
const date = new Date(Date.now());

const monthsLong = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

import FBSDK  from 'react-native-fbsdk';
const {
  LoginManager,
  AccessToken
} = FBSDK;


export default class Friends extends Component {

  constructor(props){
    super(props);
    this.changedateformat = this.changedateformat.bind(this);
    this.deleteFriend = this.deleteFriend.bind(this);
    this._fbAuth = this._fbAuth.bind(this);
    this.openURL = this.openURL.bind(this);
    //this._responseInfoCallback = this._responseInfoCallback.bind(this);
    this.state = {
      Friends:[],
      auth_token:'',
      showProgress: false,
      friendlistvisible: true,
      friend_id:0,
      friend_id_edit:0,
      contactListModal:false,
    };


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

deleteFriend(item){
  let a = this.state.friend_id_del;
  let b = [this.state.Friends];
  console.log(a);
  console.log(b);
  console.log(b[0].indexOf(a));
  this.state.Friends.splice(b[0].indexOf(a),1);
  this.setState({Friends: this.state.Friends});

  //API Call
    callApiWithAuth('user/friend/'+item.id,'DELETE', this.state.auth_token).then((response) => {
        if(response.status === 200){
            Toast.show(Label.t('58'));
        //Toast.show('Task fetched');
        }else if (response.status === 401) {
        Toast.show(Label.t('59'));
        }else if (response.status === 500) {
        Toast.show(Label.t('59')+':500');
        }
    }).catch((error) => { this.setState({showProgress : false}); console.log(error); });
}
 changedateformat(item){
    let temp = new Date(item.birth_date);
    let tempday = temp.getDate();
    if(tempday < 10){
        tempday = "0"+tempday;
    }
    let tempmonth = temp.getMonth();
    tempmonth = monthsLong[tempmonth];
    let tempyear = temp.getFullYear();
    let birth_date = tempmonth+" "+tempday+", "+tempyear;
      return(<View style = {styles.listbox}>
        <View>
            <Text style={styles.fullnametext}>{item.first_name} {item.last_name}</Text>
        </View>
        <TouchableOpacity style={styles.crossiconposi} onPress={()=>{this.setState({friend_id_del: item}); Alert.alert( Label.t('60'), Label.t('61')+item.full_name+Label.t('62'), [ {text: Label.t('7'), onPress: () => console.log('Cancel Pressed'), style: 'cancel'}, {text: Label.t('63'), onPress: () => this.deleteFriend(item)}, ], { cancelable: false } )}}>
            <Image style={styles.crossicon} source={images.crossicon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.editiconposi} onPress={()=>{this.props.nav.navigation.navigate('ADDFRIEND',{editdata:item, callFrom:'setting'});}}>
            <Image style={styles.editicon} source={images.editicon} />
        </TouchableOpacity>
        <View style={styles.birthdatemailfield}>
            <Text style={styles.birthdatetext}>{birth_date} </Text>
            <Text style={styles.emailtext}>{item.email}</Text>
        </View>
       </View>)

 }

componentWillMount(){

    this.setState({showProgress : true});
    AsyncStorage.getItem(USER_KEY).then((key)=>{
      //this.setState({user_key: key});
    }).catch((err)=>{
      Toast.show(err);
    });
    AsyncStorage.getItem(AUTH_TOKEN).then((token)=>{
       this.setState({auth_token: token});
         callApiWithAuth('user/friends','GET', this.state.auth_token).then((response) => {
            if(response.status === 200){
              response.json().then((responseobject) => {
                this.setState({ Friends: responseobject.data });
              });
              this.setState({showProgress : false});
              //Toast.show('Task fetched');
            }else if (response.status === 401) {
               this.setState({showProgress : false});
               Toast.show(Label.t('64'));
            }else if (response.status === 500) {
               this.setState({showProgress : false});
               Toast.show(Label.t('64')+':500');
            }
         }).catch((error) => { this.setState({showProgress : false}); console.log(error); });
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

componentDidMount() {
    // Add event listener to handle OAuthLogin:// URLs
    Linking.addEventListener('url', this.handleOpenURL);
    // Launched from an external URL
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleOpenURL({ url });
      }
    });
  };

  componentWillUnmount() {
    // Remove event listener
    Linking.removeEventListener('url', this.handleOpenURL);
  };

  handleOpenURL = ({ url }) => {console.log(11);
    // Extract stringified user string out of the URL
    const [, user_string] = url.match(/user=([^#]+)/);
    this.setState({
      // Decode the user string and parse it into JSON
      user: JSON.parse(decodeURI(user_string))
    });
    if (Platform.OS === 'ios') {
      SafariView.dismiss();
    }
  };

 // Handle Login with Facebook button tap
 loginWithFacebook = () => this.openURL('https://login.live.com/oauth20_authorize.srf?client_id=56f9576b-ab7b-4c44-bc4d-9ab7aa8d8913&scope=User.ReadBasic.All%20Mail.Read%20offline_access&response_type=token&redirect_uri=https://login.microsoftonline.com/common/oauth2/nativeclient');
 //loginWithFacebook = () => this.openURL('https://login.live.com/oauth20_authorize.srf?client_id=000000004C1F2910&scope=wl.signin%20wl.basic%20wl.emails%20wl.contacts_emails&response_type=code&redirect_uri=https://www.dollarbirthdayclub.com/gcontacts');

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
 /**/


  render(){
  return(
    <View style = {[styles.TextInputContainer]}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.contactListModal}
            onRequestClose={() => {alert("Modal has been closed.")}}
        >
            <View style={styles.modalbox}>
                <View style={styles.modalinnerbox}>
                    <View style={styles.modalhead}>
                        <Text style={styles.headtext}>Import Friends</Text>
                        <TouchableOpacity onPress={() => {this.setState({contactListModal:false})}}>
                            <Text style={styles.cross}>         X</Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.modallist}>
                        <View style = {styles.listbox}>
                            <View>
                                <Text style={styles.fullnametext}>Full Name</Text>
                            </View>
                            <TouchableOpacity style={styles.crossiconposi}>
                                <Image style={styles.crossicon} source={images.crossicon} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.editiconposi}>
                                <Image style={styles.editicon} source={images.editicon} />
                            </TouchableOpacity>
                            <View style={styles.birthdatemailfield}>
                                <Text style={styles.birthdatetext}>email@email.com</Text>
                                <Text style={styles.emailtext}>hotmail</Text>
                            </View>
                            <View>
                                <DatePicker
                                    style = {styles.modalpicker}
                                    date = {this.state.initialdob}
                                    format = "YYYY-MM-DD"
                                    maxDate = {this.state.maxdob}
                                    confirmBtnText = {Label.t('6')}
                                    cancelBtnText = {Label.t('7')}
                                    iconSource = {images.dropdownArrow}
                                    onDateChange = {(date) => {this.setState({initialdob:date})}}
                                    customStyles={{dateInput: styles.dateInput,
                                                dateIcon: styles.dateIcon,}}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
        <View style = {styles.friendboxes}>
            <TouchableOpacity style = {styles.addfriendtouch} onPress={()=>{
              this.props.nav.navigation.navigate('ADDFRIEND',{callFrom:'setting'});
              this.setState({friendlistvisible: true});
            }}>
                <View style = {styles.addfriendbox}>
                    <Image style = {styles.addicon} source = {images.addBtn}></Image>
                    <Text style= {styles.boxtextsmall}>{Label.t('0')}</Text>
                </View>
            </TouchableOpacity>
            <View style = {[styles.googlesigninview]}>
                <TouchableOpacity onPress={() => {this.openURL("https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A%2F%2Fwww.google.com%2Fm8%2Ffeeds&include_granted_scopes=true&redirect_uri=com.googleusercontent.apps.963030470350-pb5sboa800vjrmbi9jq370d3er94foq0:/google&response_type=code&client_id=963030470350-pb5sboa800vjrmbi9jq370d3er94foq0.apps.googleusercontent.com");}}>
                    <View style = {styles.googlesigninbox}>
                        <Text style= {styles.boxtextsmall}>{Label.t('65')}</Text>
                    </View>
                 </TouchableOpacity>

                <Text style = {[styles.googlefbtext,styles.backgroundtrans]}>{Label.t('66')}</Text>
            </View>
            <View style = {styles.fbfriendsview}>
                <TouchableOpacity onPress={() => {this._fbAuth()}}>
                    <View style = {styles.fbfriendsbox}>
                        <Image style = {styles.fbicon} source = {images.fbicon}></Image>
                        <Text style= {styles.boxtextsmall}>{Label.t('38')}</Text>
                    </View>
                </TouchableOpacity>

                <Text style = {[styles.googlefbtext,styles.backgroundtrans]}>{Label.t('67')}</Text>
            </View>
        </View>
        <View style = {styles.friendboxes}>
            <View style = {[styles.yahoosigninview]}>
                <TouchableOpacity onPress={() => {this.setState({contactListModal:true})}}>
                    <View style = {styles.yahoosigninbox}>
                        <Text style= {styles.boxtextsmall}>{Label.t('117')}</Text>
                    </View>
                </TouchableOpacity>

                <Text style = {[styles.googlefbtext,styles.backgroundtrans]}>{Label.t('118')}</Text>
            </View>
            <View style = {[styles.googlesigninview]}>
                <TouchableOpacity onPress={() => {
                  console.log('test');//this.loginWithFacebook()
                }}>
                    <View style = {styles.hotmailsigninbox}>
                        <Text style= {styles.boxtextsmall}>{Label.t('116')}</Text>
                    </View>
                </TouchableOpacity>

                <Text style = {[styles.googlefbtext,styles.backgroundtrans]}>{Label.t('119')}</Text>
            </View>
        </View>
        <View style={[styles.scrolllist]}>
            <ScrollView keyboardShouldPersistTaps="always">
                {(this.state.friendlistvisible == true) ?
                (<View style={{width:'98%'}}><FlatList
                    data={this.state.Friends}
                    renderItem={({item}) => this.changedateformat(item)}
                    keyExtractor={item => item.id}
                    /></View>) : ''}
            </ScrollView>
        </View>
    </View>
  );
  }
}
