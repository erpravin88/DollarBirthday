import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  AsyncStorage,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import MyActivityIndicator from '../Component/MyActivityIndicator';
import Label from '../Constant/Languages/LangConfig';
import images from '../Constant/Images';
import settings from '../Constant/UrlConstant';
import styles from './Style/SettingsStyle';
import { USER_KEY, AUTH_TOKEN, USER_DETAILS, onSignOut } from '../Constant/Auth';
import MaterialTabs from 'react-native-material-tabs';
import General from './General'
import Paypal from './Paypal'
import Charity from './Charity'
import Friends from './Friends'
import Notification from './Notification'
import { NavigationActions } from 'react-navigation';
const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'DASHBOARD' })],
    });
export default class Settings extends Component {
  constructor(props){
   super(props);
   this.state = {
     selectedTab:0,
     showProgress: false
   };
  }
  componentDidMount(){
  //this.setState({name: this.props.navigation.state.params.name});
      AsyncStorage.getItem(USER_KEY).then((key)=>{
        this.setState({user_key: key});
      }).catch((err)=>{
        Toast.show(err);
      });
      AsyncStorage.getItem(AUTH_TOKEN).then((token)=>{
         this.setState({auth_token: token,showProgress : false}); console.log(this.state);
      }).catch((err)=>{
        onSignOut;
        console.log(err);
        Toast.show(err);
      });
      AsyncStorage.getItem(USER_DETAILS).then((details)=>{
        details = JSON.parse(details);
        this.setState({user_details: details});
      }).catch((err)=>{
        Toast.show(err);
      });
      if(this.props.navigation.state != undefined){
        if(this.props.navigation.state.params != undefined){
          if(this.props.navigation.state.params.tabName != undefined){
            if(this.props.navigation.state.params.tabName == 'friends'){

              this.setState({selectedTab:4});
            }
          }
        }
      }
  }
  render(){

  return(
<View style={[styles.full]}>
  <Image style = {styles.backgroundImage} source = {images.loginbackground} />
  <MyActivityIndicator progress={this.state.showProgress} />
    <TouchableOpacity style = {[styles.dashboardIconw]} onPress={()=>{this.props.navigation.dispatch(resetAction);}}>
    <Image style={styles.img} source = {images.dashboardIcon}/>
  </TouchableOpacity>
  <View style = {styles.titleContainer}>
    <Text style = {styles.titleTextFirst}>{Label.t('33')}</Text>
    <Text style = {styles.titleTextSecond}>{Label.t('1')}</Text>
  </View>
  <View style = {[styles.TabContainer,styles.tabs]}>
  <MaterialTabs
  items={[ Label.t('34'), Label.t('35'), Label.t('36'), Label.t('37'), Label.t('38')]}
  barColor="#FFFFFF"
  indicatorColor='#DC6865'
  activeTextColor='#DC6865'
  inactiveTextColor= '#3B3B3A'
  scrollable = {false}
  selectedIndex={this.state.selectedTab}
  onChange={(index) => this.setState({selectedTab: index})}/>
  </View>
    <View style={[styles.iconContainer,{height:'49%',marginTop: '4%'}]}>

      {this.state.selectedTab == 0 ? (<ScrollView ><General /></ScrollView>):(this .state.selectedTab == 1? (<ScrollView><Paypal /></ScrollView>):(this .state.selectedTab == 2? (<ScrollView><Charity/></ScrollView>):(this .state.selectedTab == 3? (<ScrollView><Notification /></ScrollView>):(<Friends nav={this.props}/>))))}

    </View>
</View>);

  }
}
