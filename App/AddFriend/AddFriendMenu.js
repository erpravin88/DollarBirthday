import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  AsyncStorage,
  FlatList,
  Platform,
  Modal,
  WebView,
} from 'react-native';

import Toast from 'react-native-simple-toast';
import MyActivityIndicator from '../Component/MyActivityIndicator';
import {checkinternetconnectivity} from '../Constant/netinfo';
import images from '../Constant/Images';
import Label from '../Constant/Languages/LangConfig';
import styles from './Style/AddFriendMenuStyle';
import DatePicker from 'react-native-datepicker';
import { USER_KEY, AUTH_TOKEN, USER_DETAILS, onSignIn, setUserDetails, afterSignIn, onSignOut } from '../Constant/Auth';
import {callApiWithAuth} from '../Service/WebServiceHandler';
import { NavigationActions } from 'react-navigation';
import SafariView from 'react-native-safari-view';
import settings from '../Constant/UrlConstant';
const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'DASHBOARD' })],
    });

const date = new Date(Date.now());

const monthsLong = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default class ImportManually extends Component {

  constructor(props){
    super(props);
    this.rowRander = this.rowRander.bind(this);
    this.deleteFriend = this.deleteFriend.bind(this);
    this._onNavigationStateChange=this._onNavigationStateChange.bind(this);
    this.state = {
      Friends:[],
      auth_token:'',
      showProgress: false,
      friendlistvisible: true,
      friend_id:0,
      friend_id_edit:0,
      modalVisible: false,
      url: '',
      webViewState:{},
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
 rowRander(item){
   if(item.friend !== 0){
    let temp = new Date(item.birth_date);
    let tempday = temp.getDate();
    if(tempday < 10){
        tempday = "0"+tempday;
    }
    let tempmonth = temp.getMonth();
    tempmonth = monthsLong[tempmonth];
    let tempyear = temp.getFullYear();
    let birth_date = tempmonth+" "+tempday+", "+tempyear;
      return(
          <View key={`${item.id}`}  style = {styles.listbox}>
            <View>
                <Text style={styles.fullnametext}>{item.first_name} {item.last_name}</Text>
            </View>
            <TouchableOpacity style={styles.crossiconposi} onPress={()=>{this.setState({friend_id_del: item}); Alert.alert( Label.t('60'), Label.t('61')+item.full_name+Label.t('62'), [ {text: Label.t('7'), onPress: () => console.log('Cancel Pressed'), style: 'cancel'}, {text: Label.t('63'), onPress: () => this.deleteFriend(item)}, ], { cancelable: false } )}}>
                <Image style={styles.crossicon} source={images.crossicon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.editiconposi} onPress={()=>{this.props.navigation.navigate('ADDFRIEND',{editdata:item, callFrom:'ADDFRIEND_MENU'});}}>
                <Image style={styles.editicon} source={images.editicon} />
            </TouchableOpacity>
            <View style={styles.birthdatemailfield}>
                <Text style={styles.birthdatetext}>{birth_date} </Text>
                <Text style={styles.emailtext}>{item.email}</Text>
            </View>
          </View>)
        }else{
          return(<View key={`${item.id}`} style = {styles.listbox}>
            <View style={[styles.nodatabox]}>
                { this.state.showProgress ? (<MyActivityIndicator progress={this.state.showProgress} />):(<Text style={[styles.fullnametext,styles.bothcenter]}>{Label.t('146')}</Text>)}
            </View>
           </View>)
        }

 }
 friendsListApi =() => {
   checkinternetconnectivity().then((response)=>{
     if(response.Internet == true){
     callApiWithAuth('user/friends','GET', this.state.auth_token).then((response) => {

        if(response.status === 200){
          response.json().then((responseobject) => {
            console.log(responseobject.data );
            this.setState({ Friends: responseobject.data });
          });
          this.setState({showProgress : false});
          //Toast.show('Task fetched');
        }else if (response.status === 401) {
           this.setState({showProgress : false});
           onSignOut(this);
           Toast.show(Label.t('51'));
        }else if (response.status === 404) {
           this.setState({showProgress : false});
           Toast.show(Label.t('146'));
        }else if (response.status === 500) {
           this.setState({showProgress : false});
           Toast.show(Label.t('64')+':500');
        }
     }).catch((error) => { this.setState({showProgress : false}); console.log(error); });
   }else{
     Toast.show(Label.t('140'));
   }
 });
 }
componentWillMount(){

    AsyncStorage.getItem(USER_KEY).then((key)=>{
      //this.setState({user_key: key});
    }).catch((err)=>{
      Toast.show(err);
    });

    AsyncStorage.getItem(AUTH_TOKEN).then((token)=>{
       this.setState({auth_token: token,showProgress : true});
       this.friendsListApi();
    }).catch((err)=>{
       onSignOut(this);
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
 hide = () => {
  this.setState({ modalVisible: false });
  this._onNavigationStateChange(this.state.webViewState);
 }
 _onNavigationStateChange (webViewState) { console.log(webViewState);
   let jsCode = `
        document.querySelector('#myContent').style.backgroundColor = 'red';
    `;
   console.log("hello");
   this.setState({webViewState:webViewState});
console.log(this.state.webViewState);
if(webViewState.url != undefined){
  substring = "add-birthday";
if(webViewState.url.includes(substring)){
  if(webViewState.title === "Google/Hotmail/Outlook/Yahoo Contacts Listing | Dollar Birthday Club" ){

    this.friendsListApi();}
}
}
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
 _fbAuth = () => {
    this.openURL(settings.FBEVENT_URL);
}
 /**/


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
                onError={(webViewState)=>{this._onNavigationStateChange(webViewState);}}
                javaScriptEnabledAndroid={true}
                domStorageEnabled={true}
                thirdPartyCookiesEnabled= {true}
                startInLoadingState={true}
                userAgent={settings.USERAGENT}
              />
          </View>
          <View style={[{backgroundColor:'#FFFFFF',borderTopWidth:1,borderColor:'#b7b7b7'}]}>
          <TouchableOpacity style={[{width:'30%',backgroundColor:'#e34c4b',padding:6,margin:5,borderWidth:1,borderColor:'#aa5c5c',borderRadius:4,borderBottomWidth:null,justifyContent:'center',alignSelf:'center'}]} onPress={this.hide} >
            <Text style={[{fontWeight:'bold',color:'#FFFFFF',justifyContent:'center',alignSelf:'center'}]}>close</Text>
          </TouchableOpacity>
          </View>
        </Modal >
        <MyActivityIndicator progress={this.state.showProgress} />
            <Image style = {[styles.top,styles.containerWidth]} source = {images.topbackground} >
            <TouchableOpacity style = {[styles.dashboardIconw]}  onPress={()=>{this.props.navigation.dispatch(resetAction)}}>
                <Image style={styles.img} source = {images.backIcon}></Image>
            </TouchableOpacity>
              <View style = {[styles.titleContainer]}>
                <Text style = {styles.titleTextFirst}>{Label.t('151')}</Text>
                <Text style = {[styles.titleTextSecond]}>{Label.t('1')}</Text>
              </View>
              <View style = {[styles.TextInputContainer,{position:'absolute',bottom:0}]}>
                <Text style = {styles.heading1}>{Label.t('86')}</Text>
              </View>
            </Image>
            <View style = {[styles.formgroup,styles.containerWidth]}>
              
              <View style = {[styles.TextInputContainer]}>
              <View style = {styles.friendboxes}>
                  <TouchableOpacity style = {styles.addfriendtouch} onPress={()=>{
                    this.props.navigation.navigate('ADDFRIEND',{callFrom:'ADDFRIEND_MENU'});
                    this.setState({friendlistvisible: true});
                  }}>
                      <View style = {styles.addfriendbox}>
                          <Image style = {styles.addicon} source = {images.addBtn}></Image>
                          <Text style= {styles.boxtextsmall}>{Label.t('0')}</Text>
                      </View>
                  </TouchableOpacity>
                  <View style = {[styles.googlesigninview]}>
                      <TouchableOpacity onPress={() => {this._contactslisting(settings.GOOGLE);}}>
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
                      <TouchableOpacity onPress={() => {this._contactslisting(settings.YAHOO);}}>
                          <View style = {styles.yahoosigninbox}>
                              <Text style= {styles.boxtextsmall}>{Label.t('117')}</Text>
                          </View>
                      </TouchableOpacity>

                      <Text style = {[styles.googlefbtext,styles.backgroundtrans]}>{Label.t('118')}</Text>
                  </View>
                  <View style = {[styles.googlesigninview]}>
                      <TouchableOpacity onPress={() => {this._contactslisting(settings.HOTMAIL);}}>
                          <View style = {styles.hotmailsigninbox}>
                              <Text style= {styles.boxtextsmall}>{Label.t('116')}</Text>
                          </View>
                      </TouchableOpacity>

                      <Text style = {[styles.googlefbtext,styles.backgroundtrans]}>{Label.t('119')}</Text>
                  </View>
              </View>

              <View style={[styles.scrolllist]}>
                      {(this.state.friendlistvisible == true) ?
                      (<View ><FlatList
                          data={this.state.Friends.length > 0 ? this.state.Friends :[{id:0,friend:0}]}
                          renderItem={({item}) => this.rowRander(item)}
                          keyExtractor={item => item.id}
                          style={[{height:'55%',paddingRight:'1.5%'}]}
                          /></View>) : ''}
                          
              </View>
            </View>
          </View>
      </View>
    </Image>);
  }
}
