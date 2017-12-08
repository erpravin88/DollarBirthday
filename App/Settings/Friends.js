import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Linking,
  Platform,
  Image,
  ScrollView,
  AsyncStorage,
  FlatList,
  Modal,
  WebView,
} from 'react-native';

import Toast from 'react-native-simple-toast';
import MyActivityIndicator from '../Component/MyActivityIndicator';
import {checkinternetconnectivity} from '../Constant/netinfo';
import images from '../Constant/Images';
import Label from '../Constant/Languages/LangConfig';
import styles from './Style/FriendStyle';
import DatePicker from 'react-native-datepicker';
import createReactClass from 'create-react-class';
import functions from '../Constant/Function';
import { USER_KEY, AUTH_TOKEN, USER_DETAILS, onSignIn, setUserDetails, afterSignIn,onSignOut} from '../Constant/Auth';
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

import FBSDK  from 'react-native-fbsdk';
const {
  LoginManager,
  AccessToken
} = FBSDK;


export default class Friends extends Component {

  constructor(props){
    super(props);
    this.rowRander = this.rowRander.bind(this);
    this.deleteFriend = this.deleteFriend.bind(this);
    this._fbAuth = this._fbAuth.bind(this);
    this.openURL = this.openURL.bind(this);
    this._onNavigationStateChange=this._onNavigationStateChange.bind(this);
    //this._responseInfoCallback = this._responseInfoCallback.bind(this);
    this.state = {
      Friends:[],
      auth_token:'',
      showProgress: false,
      friendlistvisible: true,
      friend_id:0,
      friend_id_edit:0,
      contactListModal:false,
      modalVisible: false,
      url: '',
      user_details:'',
    };


 }
 componentWillMount(){
 AsyncStorage.getItem(USER_DETAILS).then((details)=>{
   details = JSON.parse(details);
   this.setState({user_details: details});
   console.log(this.state.user_details.currency);
 }).catch((err)=>{
   Toast.show(err);
 });
}
 _fbAuth = () => {
    this.openURL(settings.FBEVENT_URL);
}

deleteFriend(item){
  let a = this.state.friend_id_del;
  let b = [this.state.Friends];
  console.log(a);
  console.log(b[0]);
  console.log(b[0].indexOf(a));
  this.state.Friends.splice(b[0].indexOf(a),1);
  console.log(this.state.Friends);
  this.setState({Friends: this.state.Friends});

  //API Call
  checkinternetconnectivity().then((response)=>{
    if(response.Internet == true){
    callApiWithAuth('user/friend/'+item.id,'DELETE', this.state.auth_token).then((response) => {
        if(response.status === 200){
            Toast.show(Label.t('58'));
        //Toast.show('Task fetched');
        }else if (response.status === 401) {
          onSignOut(this);
          this.setState({showProgress : false});
          Toast.show(Label.t('51'));
        }else if (response.status === 500) {
        Toast.show(Label.t('52'));
        }
    }).catch((error) => { this.setState({showProgress : false}); console.log(error); });
  }else{
    Toast.show(Label.t('140'));
  }
});
}
rowRander(item){
   if(item.friend !== 0){
    let temp = item.birth_date.split("-");// YYYY-MM-DD
    let tempday = temp[2];
    
    let tempmonth = temp[1] -1;
    tempmonth = monthsLong[tempmonth];
    let tempyear = temp[0];
    let birth_date = tempmonth+" "+tempday+", "+tempyear;
      return(<View key={`${item.id}`} style = {styles.listbox}>
        <View>
            <Text style={styles.fullnametext}>{item.first_name} {item.last_name}</Text>
        </View>
        <TouchableOpacity style={styles.crossiconposi} onPress={()=>{this.setState({friend_id_del: item}); Alert.alert( Label.t('60'), Label.t('61')+item.full_name+Label.t('62'), [ {text: Label.t('7'), onPress: () => console.log('Cancel Pressed'), style: 'cancel'}, {text: Label.t('63'), onPress: () => this.deleteFriend(item)}, ], { cancelable: false } )}}>
            <Image style={styles.crossicon} source={images.crossicon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.editiconposi} onPress={()=>{this.props.navigation.navigate('ADDFRIEND',{editdata:item, callFrom:'setting'});}}>
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

componentWillMount(){

    this.setState({showProgress : true});
    AsyncStorage.getItem(USER_KEY).then((key)=>{
      //this.setState({user_key: key});
    }).catch((err)=>{
      console.log(err);
      //Toast.show(err);
    });
    AsyncStorage.getItem(AUTH_TOKEN).then((token)=>{
       this.setState({auth_token: token,showProgress: true});
       checkinternetconnectivity().then((response)=>{
         if(response.Internet == true){
         callApiWithAuth('user/friends','GET', this.state.auth_token).then((response) => {
          //  response.json().then((responseobject) => {
          //    console.log(responseobject);
          //    //this.setState({ Friends: responseobject.data });
          //  });

            if(response.status === 200){
              response.json().then((responseobject) => {
                this.setState({ Friends: responseobject.data });
              });
              console.log(this.state.friends);
              this.setState({showProgress : false});
              //Toast.show('Task fetched');
            }else if (response.status === 404) {// no friend in list
               this.setState({showProgress : false});
              //  Toast.show(Label.t('146'));
            }else if (response.status === 401) {
               this.setState({showProgress : false});
               onSignOut(this);
               Toast.show(Label.t('51'));
            }else if (response.status === 500) {
               this.setState({showProgress : false});
               Toast.show(Label.t('52'));
            }
            this.setState({showProgress : false});
         }).catch((error) => { this.setState({showProgress : false}); console.log(error); });
       }else{
         Toast.show(Label.t('140'));
       }
     });
    }).catch((err)=>{
      console.log(err);//Toast.show(err);
    });
    AsyncStorage.getItem(USER_DETAILS).then((details)=>{
      details = JSON.parse(details);
      //this.setState({user_details: details});
    }).catch((err)=>{
      console.log(err);// Toast.show(err);
    });
}

// componentDidMount() {
//     // Add event listener to handle OAuthLogin:// URLs
//     Linking.addEventListener('url', this.handleOpenURL);
//     // Launched from an external URL
//     Linking.getInitialURL().then((url) => {
//       if (url) {
//         this.handleOpenURL({ url });
//       }
//     });
//   };

  // componentWillUnmount() {
  //   // Remove event listener
  //   Linking.removeEventListener('url', this.handleOpenURL);
  // };
  //
  // handleOpenURL = ({ url }) => {console.log(url);
  //   // Extract stringified user string out of the URL
  //   const [ user_string] = url.match(/user=([^#]+)/);
  //   this.setState({
  //     // Decode the user string and parse it into JSON
  //     user: JSON.parse(decodeURI(user_string))
  //   });
  //   if (Platform.OS === 'ios') {
  //     SafariView.dismiss();
  //   }
  // };

  _onNavigationStateChange (webViewState) { console.log(webViewState);

  }
 // Open URL in a browser
  openURL = (url) => {
    // if (Platform.OS === 'ios') {
    //      SafariView.show({
    //        url: url,
    //        fromBottom: true,
    //      });
    //    }
    //    else {
         this.setState({url:url,modalVisible: true});
    // }
  };
  hide = () => {
   this.setState({ modalVisible: false });
  }
  renderImage() {
      var imgSource = this.state.checkboximg? images.uncheckedcheckbox : images.checkedcheckbox;
      return (
          <Image style={styles.checkboxicon} source = {imgSource}/>
      );
  }

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
    <View>
    <View style = {[styles.SettingsTextInputContainer]}>
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
                onNavigationStateChange={this._onNavigationStateChange}
                onError={this._onNavigationStateChange}
                javaScriptEnabledAndroid={true}
                domStorageEnabled={true}
                thirdPartyCookiesEnabled= {true}
                startInLoadingState={true}
                userAgent={ settings.USERAGENT}
              />
          </View>
          <View style={[{backgroundColor:'#FFFFFF',borderTopWidth:1,borderColor:'#b7b7b7'}]}>
          <TouchableOpacity style={[{width:'30%',backgroundColor:'#e34c4b',padding:6,margin:5,borderWidth:1,borderColor:'#aa5c5c',borderRadius:4,borderBottomWidth:null,justifyContent:'center',alignSelf:'center'}]} onPress={this.hide} >
            <Text style={[{fontWeight:'bold',color:'#FFFFFF',justifyContent:'center',alignSelf:'center'}]}>close</Text>
          </TouchableOpacity>
          </View>
        </Modal >
        <View style = {styles.friendboxes}>
            <TouchableOpacity style = {styles.addfriendtouch} onPress={()=>{
              this.props.navigation.navigate('ADDFRIEND',{callFrom:'setting'});
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
                    style={[{paddingRight:'1.5%'}]}
                    /></View>) : ''}

        </View>
    </View>
    </View>
  );
  }
}

//show = () => {
//   this.setState({ modalVisible: true });
//}
//_onNavigationStateChange =  (webViewState) => { console.log(webViewState);
//console.log(this.state)
//};
//<Modal
//            animationType={'slide'}
//            visible={this.state.modalVisible}
//            onRequestClose={this.hide.bind(this)}
//            transparent
//          >
//            <View style={[styles.fulls]}>
//                <WebView
//                  source={{ uri: settings.FBEVENT_URL}}
//                  scalesPageToFit
//                  startInLoadingState
//                  onNavigationStateChange={this._onNavigationStateChange.bind(this)}
//                  onError={this._onNavigationStateChange.bind(this)}
//                  javaScriptEnabledAndroid={true}
//                  domStorageEnabled={true}
//                  onLoadEnd = {() => { this.setState({contacturl : 'https://accounts.google.com/o/oauth2/auth?response_type=code&redirect_uri=http%3A%2F%2Fdbc.demos.classicinformatics.com%2Fgcontacts&client_id=167305329007-1gl7jbvgg23vevkdhqhsomi4nnm243rs.apps.googleusercontent.com&scope=https%3A%2F%2Fwww.google.com%2Fm8%2Ffeeds&access_type=online&approval_prompt=auto'})}}
//                />
//            </View>
//            <View style={[{backgroundColor:'#ffffff'}]}>
//            <TouchableOpacity style={[styles.btnyellow]} onPress={this.hide} >
//              <Text style={[{justifyContent:'center',alignSelf:'center'}]}>close</Text>
//            </TouchableOpacity>
//            </View>
//          </Modal >
// modal for list
/* <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.contactListModal}
            onRequestClose={() => {alert("Modal has been closed.")}}
        >
            <View style={styles.modalbox}>
                <View style={styles.modalinnerbox}>
                    <View style={styles.modalhead}>
                        <TouchableOpacity onPress={() => {this.setState({contactListModal:false})}}>
                            <Image style = {styles.modalbackicon} source = {images.backIcon}></Image>
                        </TouchableOpacity>
                        <Text style={styles.headtext}>Import Friends</Text>
                    </View>
                    <View style = {styles.modallist}>
                        <View style = {styles.modallistbox}>
                            <TouchableOpacity onPress={ () => {this.setState({ checkboximg: !this.state.checkboximg });} }>
                                    {this.renderImage()}
                            </TouchableOpacity>
                            <View style={style=styles.listdetailbox}>
                                <View>
                                    <Text style={styles.modalfullnametext}>Full Name</Text>
                                </View>
                                <View style={styles.birthdatemailfield}>
                                    <Text style={styles.modalbirthdatetext}>email@email.com</Text>
                                    <Text style={styles.modalemailtext}>  hotmail</Text>
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
            </View>
        </Modal> */
