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
import styles from './Style/ImportManuallyStyle';
import DatePicker from 'react-native-datepicker';
import settings from '../Constant/UrlConstant';
import { USER_KEY, AUTH_TOKEN, USER_DETAILS, onSignIn, setUserDetails, afterSignIn } from '../Constant/Auth';
import {callApiWithAuth} from '../Service/WebServiceHandler';
import { NavigationActions } from 'react-navigation';
const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'DASHBOARD' })],
    });
const resetAction1 = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'FETCH_FRIEND' })],
    });
const date = new Date(Date.now());

const monthsLong = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default class ImportManually extends Component {

  constructor(props){
    super(props);
    this.changedateformat = this.changedateformat.bind(this);
    this.deleteFriend = this.deleteFriend.bind(this);
    this.state = {
      Friends:[],
      auth_token:'',
      showProgress: false,
      friendlistvisible: true,
      friend_id:0,
      friend_id_edit:0,
    };

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
   if(item.friend !== 0){
    let temp = item.birth_date.split("-");// YYYY-MM-DD
    let tempday = temp[2];
    
    let tempmonth = temp[1] -1;
    tempmonth = monthsLong[tempmonth];
    let tempyear = temp[0];
    let birth_date = tempmonth+" "+tempday+", "+tempyear;
      return(
          <View style = {styles.listbox}>
            <View>
                <Text style={styles.fullnametext}>{item.first_name} {item.last_name}</Text>
            </View>
            <TouchableOpacity style={styles.crossiconposi} onPress={()=>{this.setState({friend_id_del: item}); Alert.alert( Label.t('60'), Label.t('61')+item.full_name+Label.t('62'), [ {text: Label.t('7'), onPress: () => console.log('Cancel Pressed'), style: 'cancel'}, {text: Label.t('63'), onPress: () => this.deleteFriend(item)}, ], { cancelable: false } )}}>
                <Image style={styles.crossicon} source={images.crossicon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.editiconposi} onPress={()=>{this.props.navigation.navigate('ADDFRIEND',{editdata:item, callFrom:'IMPORTMANUALLY'});}}>
                <Image style={styles.editicon} source={images.editicon} />
            </TouchableOpacity>
            <View style={styles.birthdatemailfield}>
                <Text style={styles.birthdatetext}>{birth_date} </Text>
                <Text style={styles.emailtext}>{item.email}</Text>
            </View>
          </View>)
        }else{
          return(<View style = {styles.listbox}>
            <View style={[styles.nodatabox]}>
                { this.state.showProgress ? (<MyActivityIndicator progress={this.state.showProgress} />):(<Text style={[styles.fullnametext,styles.bothcenter]}>{Label.t('146')}</Text>)}
            </View>
           </View>)
        }

 }

componentWillMount(){

    AsyncStorage.getItem(USER_KEY).then((key)=>{
      //this.setState({user_key: key});
    }).catch((err)=>{
      Toast.show(err);
    });
    AsyncStorage.getItem(AUTH_TOKEN).then((token)=>{
       this.setState({auth_token: token,showProgress : true});
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
            }else if (response.status === 404) {
               this.setState({showProgress : false});
               Toast.show('No friends found');
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
    <Image style = {styles.backgroundImage} source = {images.loginbackground}>
      <View style={[styles.full]}>
        <MyActivityIndicator progress={this.state.showProgress} />
            <Image style = {[styles.top,styles.containerWidth]} source = {images.topbackground} >
            <TouchableOpacity style = {[styles.dashboardIconw]}  onPress={()=>{this.props.navigation.dispatch(resetAction1)}}>
                <Image style={styles.img} source = {images.backIcon}></Image>
            </TouchableOpacity>
              <View style = {[styles.titleContainer]}>
                <Text style = {styles.titleTextFirst}>Add Manually Friends</Text>
                <Text style = {[styles.titleTextSecond]}>{Label.t('1')}</Text>
              </View>
            </Image>
            <View style = {[styles.formgroup,styles.containerWidth]}>
              <View style = {[styles.TextInputContainer]}>
                <Text style = {styles.heading1}>{Label.t('86')}</Text>
              </View>
              <View style = {[styles.TextInputContainer]}>
                <TouchableOpacity style = {styles.addfriendtouch} onPress={()=>{
                  this.props.navigation.navigate('ADDFRIEND',{callFrom:'IMPORTMANUALLY'});
                  this.setState({friendlistvisible: true});
                }}>
                  <View style = {styles.addfriendbox}>
                      <Image style = {styles.addicon} source = {images.addBtn}></Image>
                      <Text style= {styles.boxtext}>{Label.t('0')}</Text>
                  </View>
              </TouchableOpacity>
              <View style={[styles.scrolllist]}>
                  <ScrollView keyboardShouldPersistTaps="never">
                      {(this.state.friendlistvisible == true) ?
                      (<View style={{width:'98%'}}><FlatList
                          data={this.state.Friends.length > 0 ? this.state.Friends :[{friend:0}]}
                          renderItem={({item}) => this.changedateformat(item)}
                          keyExtractor={item => item.id}
                          /></View>) : ''}
                  </ScrollView>
              </View>
            </View>
          </View>
      </View>
    </Image>);
  }
}
