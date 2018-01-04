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
  AsyncStorage,
  Modal,
  Linking,
  Platform,
  Settings,
} from 'react-native';

import images from '../Constant/Images';
import styles from './Style/DashboardStyle';
import Toast from 'react-native-simple-toast';
import Label from '../Constant/Languages/LangConfig';
import { USER_KEY, AUTH_TOKEN, USER_DETAILS, onSignIn, setUserDetails, afterSignIn,onSignOut} from '../Constant/Auth';
import {checkinternetconnectivity} from '../Constant/netinfo';
import {callApiWithAuth,callApiWithoutAuth, callApiToPaypal} from '../Service/WebServiceHandler';
import settings from '../Constant/UrlConstant';
import MyActivityIndicator from '../Component/MyActivityIndicator';
import ModalAlert from '../Component/ModalAlert';

export default class Dashboard extends Component {
  constructor(props){
   super(props);
   this.navfromdashboard = this.navfromdashboard.bind(this);
   this.state = {
     auth_token: '',
     showProgress: false,
     paymentalerthead:'',
     paymentalertmsg:'',
     modelstatusmsg:false,
     payment_type:'',
    };
  }
  componentWillMount(){
        AsyncStorage.getItem(AUTH_TOKEN).then((token)=>{
           this.setState({auth_token: token});
           checkinternetconnectivity().then((response)=>{
            if(response.Internet == true){
            callApiWithAuth('user/upcoming','GET', this.state.auth_token).then((response) => {
                 if (response.status === 401) {
                 onSignOut(this);
                 this.setState({showProgress : false});
                 Toast.show(Label.t('51'));
               }
            }).catch((error) => {
              this.setState({showProgress : false});
              Toast.show(Label.t('155'));
              console.log(error); 
              });
          }else{
            Toast.show(Label.t('140'));
          }
        });
        }).catch((err)=>{
          onSignOut(this);
          Toast.show(err);
        });
      }
  componentDidMount() { 
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        if(url !== null)this.navigate(url);
      });
    } else {
        Linking.addEventListener('url', this.handleOpenURL);
      }
    }
    componentWillUnmount() { 
      Linking.removeEventListener('url', this.handleOpenURL);
    }
    handleOpenURL = (event) => { 
      console.log(event);
      if(event !== undefined)this.navigate(event.url);
    }
    navigate = (url) => { 
      console.log(url);
      const { navigate } = this.props.navigation;
      const route = url.replace(/.*?:\/\//g, '');
      console.log(route);
      if(route != undefined){
      if(route.includes("?")){
        let urldata = route.split("?");
        let urlparam = urldata[1].split("&");
        let result = {};
        let temp = '';
        Object.keys(urlparam).map((index) => {
          temp = urlparam[index].split('=');
          result[temp[0]] = temp[1];
        }); console.log(result);
        if(result.hasOwnProperty('type') ){
          this.setState({payment_type:result.type});
          if(result.type == settings.ROUTE_TYPE.donate){
            //let returndata = this.checkPaymentStatus({param:{payKey:result.payKey,trackingid:result.trackingId}});
            //console.log(returndata);
            //navigate('DONATE', { data:  result});
          }else if(result.type == settings.ROUTE_TYPE.send_gift){
            if(result.from == settings.ROUTE_TYPE.upcoming ){
              // navigate upcoming with data
            }else if(result.from == settings.ROUTE_TYPE.calender){
              // navigate calender with data
            }
            // send screen
          }
        }
      }
    }
  }
  openURL = (url) => {
     Linking.canOpenURL(url).then(supported => {
       if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  checkPaymentStatus = (inputdata) => {
    console.log(inputdata);
    let param = inputdata.param;
    //let result = inputdata.result;
    console.log(param);
    //console.log(result);
    checkinternetconnectivity().then((response)=>{
  
      if(response.Internet == true){
        let result = '';
        let head = '';
        let message = '';
        this.setState({showProgress : true});
        console.log(this.state);
        callApiWithoutAuth('paymentdetails','POST', param ).then((response) => {
          if(response.status === 201){
            response.json().then((responseobject) => {
              console.log(responseobject);//CREATED/COMPLETED/INCOMPLETE/ERROR/REVERSALERROR/PROCESSING/PENDING
              if(responseobject.data.responseEnvelope.ack == 'Success'){
                switch(responseobject.data.status){
                  case 'COMPLETED':
                    result ='complete';
                    head = Label.t('156');
                    message = Label.t('157');
                  break;
                  case 'CREATED':
                    result ='cancel';
                    head = Label.t('158');
                    message = Label.t('159');
                  break;
                  case 'PROCESSING':
                    result ='PROCESSING';
                    head = 'Payment processing ...';
                    message = '';
                  break;
                  case 'PENDING':
                    result ='PENDING';
                    head = 'Payment Pending.';
                    message = '';
                  break;
                  case 'INCOMPLETE':
                    result ='INCOMPLETE';
                    head = 'Payment Incomplete.';//Label.t('120');
                    message = '';
                  break;
                  case 'REVERSALERROR':
                    result ='INCOMPLETE';
                    head = 'Payment REVERSALERROR.';//Label.t('120');
                    message = '';
                  break;
                  case 'ERROR':
                    result ='INCOMPLETE';
                    head = 'Payment Error';
                    message = '';
                  break;
                  default:
                  result ='APICALLFAILED';
                  head = 'Payment chack failed.';
                  message = '';
                  break;
  
                }
                this.setState({ showProgress : false,statusmsg: result,paymentalerthead: head ,paymentalertmsg: message,modelstatusmsg: true});
              }
  
            });
          }else if (response.status === 406) {
            response.json().then((responseobject) => {
              this.setState({showProgress : false});
              console.log(responseobject);
            //  Toast.show(responseobject.error_messages);
              Toast.show(Label.t('137'));
            });
          }else if (response.status === 500) {
            this.setState({showProgress : false});
            Toast.show(Label.t('52'));
            }
        }).catch((error) => {
          this.setState({showProgress : false});
          Toast.show(JSON.stringify(error));
          console.log(error); 
          });
    }else{
      Toast.show(Label.t('140'));
    }
    });
  }
  hidestatusmsg = () => {
    if(this.state.payment_type == settings.ROUTE_TYPE.donate ){
      this.setState({ modelstatusmsg: false });
    }
  } 
  
  navfromdashboard(route){
    checkinternetconnectivity().then((response)=>{
      if(response.Internet == true){
          if(route == settings.ROUTE_TYPE.donate){
            if (Platform.OS === 'android') {
              route = 'DONATE';
              this.props.navigation.navigate(route);
            }else{
              let outpath = settings.BASE_URL+'/mobileapp?type='+settings.ROUTE_TYPE.donate+'&t='+this.state.auth_token;
              this.openURL(outpath);
            }
          }else{
            this.props.navigation.navigate(route);
          }
        
      }else{
        Toast.show(Label.t('140'));
      }
    });
  }

  render(){

  return(
<View style={[styles.full]}>
<MyActivityIndicator progress={this.state.showProgress} />
<ModalAlert visible={this.state.modelstatusmsg} onRequestClose={this.hidestatusmsg} head={this.state.paymentalerthead} message={ this.state.paymentalertmsg }/>
  <Image style = {styles.backgroundImage} source = {images.dbbackground} />
  <View style = {[styles.titleContainer ]}>
    <Text style = {styles.titleboldheading}>{Label.t('115')}</Text>
    <Image style = {styles.logo} source = {images.dbtoplogo}/>
  </View>
  <View style = {[styles.iconsContainer]}>
    <View style={[styles.iconContainer,styles.iconContainerfix1]}>
      <TouchableOpacity
      style = {[styles.dbIcon]}
      onPress={()=>{this.navfromdashboard('INBOX')}}>
      <Image style = {[styles.full,styles.resizeModec]} source = {images.inboxIcon}/>
      </TouchableOpacity>
      <TouchableOpacity
      style = {[styles.dbIcon]}
      onPress={()=>{this.navfromdashboard('UPCOMINGS')}}>
      <Image style = {[styles.full,styles.resizeModec]} source = {images.upcomingIcon}/>
      </TouchableOpacity>
      <TouchableOpacity
      style = {[styles.dbIcon]}
      onPress={()=>{this.navfromdashboard('CALENDAR')}}>
      <Image style = {[styles.full,styles.resizeModec]} source = {images.colenderIcon}/>
      </TouchableOpacity>
    </View>
    <View style={[styles.iconContainer,styles.iconContainerfix2]}>
    <TouchableOpacity
    style = {[styles.dbIcon]}
    onPress={()=>{this.navfromdashboard('ADDFRIEND_MENU')}}>
    <Image style = {styles.full} source = {images.addfriendIcon}/>
    </TouchableOpacity>
    <TouchableOpacity
    style = {[styles.dbIcon]}
    onPress={()=>{this.navfromdashboard('INVITE_FRIEND')}}>
    <Image style = {styles.full} source = {images.invitefriendIcon}/>
    </TouchableOpacity>
    <TouchableOpacity
      style = {[styles.dbIcon]}
      onPress={()=>{this.navfromdashboard('GIFTHISTORY')}}>
      <Image style = {[styles.full,styles.resizeModec]} source = {images.gifthistoryIcon}/>
      </TouchableOpacity>
    </View>
    <View style = {[styles.iconContainer,styles.iconContainerfix3]}>
      {/* <TouchableOpacity
      style = {[styles.dbIcon]}
      onPress={()=>{this.navfromdashboard(settings.ROUTE_TYPE.donate)}}>
      <Image style = {[styles.full,styles.resizeModec]} source = {images.donateIcon}/>
      </TouchableOpacity> */}
      <TouchableOpacity
      style = {[styles.dbIcon]}
      onPress={()=>{this.navfromdashboard('BIRTHDAY_CAMPAIGN')}}>
      <Image style = {[styles.full,styles.resizeModec]} source = {images.startcampaignIcon}/>
      </TouchableOpacity>
      <TouchableOpacity
      style = {[styles.dbIcon]}
      onPress = {()=>{this.navfromdashboard('SETTING')}}>
      <Image style = {[styles.full,styles.resizeModec]} source = {images.settingsIcon}/>
      </TouchableOpacity>

      <TouchableOpacity
      style = {[styles.dbIcon]}
      onPress = {()=>{ Alert.alert( Label.t('30'), Label.t('31'), [ {text: Label.t('7'), onPress: () => console.log('Cancel Pressed'), style: 'cancel'}, {text: Label.t('32'), onPress: () => onSignOut(this)}, ], { cancelable: false } )}}>
      <Image style = {styles.full} source = {images.logoutIcon}/>
      </TouchableOpacity>
    </View>
  </View>
</View>);

  }
}
