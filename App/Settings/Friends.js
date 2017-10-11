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
import styles from './Style/FriendStyle';
import DatePicker from 'react-native-datepicker';
import settings from '../Constant/UrlConstant';
import { USER_KEY, AUTH_TOKEN, USER_DETAILS, onSignIn, setUserDetails, afterSignIn } from '../Constant/Auth';
import {callApiWithAuth} from '../Service/WebServiceHandler';
import { NavigationActions } from 'react-navigation';
const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'DASHBOARD' })],
    });
const date = new Date(Date.now());

const monthsLong = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default class Friends extends Component {

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
            Toast.show('Friend Deleted Successfully');
        //Toast.show('Task fetched');
        }else if (response.status === 401) {
        Toast.show('Error deleting friends');
        }else if (response.status === 500) {
        Toast.show('Error deleting friend:500');
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
        <TouchableOpacity style={styles.crossiconposi} onPress={()=>{this.setState({friend_id_del: item}); Alert.alert( 'Delete Friend', 'Are you sure you want to delete '+item.full_name+'\'s Birthday?', [ {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}, {text: 'Yes', onPress: () => this.deleteFriend(item)}, ], { cancelable: false } )}}>
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
               Toast.show('Error fetching friends');
            }else if (response.status === 500) {
               this.setState({showProgress : false});
               Toast.show('Error fetching friends:500');
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
    let friendlistview = (this.state.friendlistvisible == true) ?
    (<View><FlatList
        data={this.state.Friends}
        renderItem={({item}) => this.changedateformat(item)}
        keyExtractor={item => item.id}
        /></View>) : (<View ></View>);
  return(
    <View style = {styles.formgroup}>
        <View style = {styles.friendboxes}>
            <TouchableOpacity style = {styles.addfriendtouch} onPress={()=>{
              this.props.nav.navigation.navigate('ADDFRIEND',{callFrom:'setting'});
              this.setState({friendlistvisible: true});
            }}>
                <View style = {styles.addfriendbox}>
                    <Image style = {styles.addicon} source = {images.addBtn}></Image>
                    <Text style= {styles.boxtext}>Add Friend</Text>
                </View>
            </TouchableOpacity>
            <View style = {styles.googlesigninview}>
                <TouchableOpacity>
                    <View style = {styles.googlesigninbox}>
                        <Text style= {styles.boxtext}>Verify Google Sign In</Text>
                    </View>
                </TouchableOpacity>
                <Text style = {styles.googlefbtext}>Click here to import Contacts from Google</Text>
            </View>
            <View style = {styles.fbfriendsview}>
                <TouchableOpacity>
                    <View style = {styles.fbfriendsbox}>
                        <Image style = {styles.fbicon} source = {images.fbicon}></Image>
                        <Text style= {styles.boxtext}>Friends</Text>
                    </View>
                </TouchableOpacity>
                <Text style = {styles.googlefbtext}>Find your Friend's Birthdays on Facebook!</Text>
            </View>
        </View>
        <View style={styles.scrolllist}>
            <ScrollView keyboardShouldPersistTaps="always">
                {friendlistview}
            </ScrollView>
        </View>
    </View>
  );
  }
}
