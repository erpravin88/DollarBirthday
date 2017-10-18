import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  Image,ScrollView,
  ImageBackground,
  ActivityIndicator,
  KeyboardAvoidingView,
  AsyncStorage,
  FlatList,
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
const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'DASHBOARD' })],
    });
const date = new Date(Date.now());

const monthsLong = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

import FBSDK  from 'react-native-fbsdk';
const {
  LoginManager,
} = FBSDK;

export default class Friends extends Component {

  constructor(props){
    super(props);
    this.changedateformat = this.changedateformat.bind(this);
    this.deleteFriend = this.deleteFriend.bind(this);
    this._fbAuth = this._fbAuth.bind(this);
    //this._responseInfoCallback = this._responseInfoCallback.bind(this);
    this.state = {
      Friends:[],
      auth_token:'',
      showProgress: false,
      friendlistvisible: true,
      friend_id:0,
      friend_id_edit:0,
    };

 }

 _fbAuth = () => {
    LoginManager.logInWithReadPermissions(['public_profile']).then(function(result){
        if(result.isCancelled){
            Toast.show('Log In cancelled');
        }
        else { 
            functions.web("https://www.facebook.com/events/birthdays/");
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
 componentDidMount(){

 }

 /**/


  render(){
  return(
    <View style = {[styles.TextInputContainer]}>
        <View style = {styles.friendboxes}>
            <TouchableOpacity style = {styles.addfriendtouch} onPress={()=>{
              this.props.nav.navigation.navigate('ADDFRIEND',{callFrom:'setting'});
              this.setState({friendlistvisible: true});
            }}>
                <View style = {styles.addfriendbox}>
                    <Image style = {styles.addicon} source = {images.addBtn}></Image>
                    <Text style= {styles.boxtext}>{Label.t('0')}</Text>
                </View>
            </TouchableOpacity>
            <View style = {[styles.googlesigninview]}>
                <TouchableOpacity>
                    <View style = {styles.googlesigninbox}>
                        <Text style= {styles.boxtext}>{Label.t('65')}</Text>
                    </View>
                </TouchableOpacity>

                <Text style = {[styles.googlefbtext,styles.backgroundtrans]}>{Label.t('66')}</Text>
            </View>
            <View style = {styles.fbfriendsview}>
                <TouchableOpacity onPress={() => {this._fbAuth()}}>
                    <View style = {styles.fbfriendsbox}>
                        <Image style = {styles.fbicon} source = {images.fbicon}></Image>
                        <Text style= {styles.boxtext}>{Label.t('38')}</Text>
                    </View>
                </TouchableOpacity>

                <Text style = {[styles.googlefbtext,styles.backgroundtrans]}>{Label.t('67')}</Text>
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
