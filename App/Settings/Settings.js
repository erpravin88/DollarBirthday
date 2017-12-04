import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  Image,
  ScrollView,
  AsyncStorage,
  Keyboard,
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
    <Image style = {styles.backgroundImage} source = {images.loginbackground}>
      <View style={[styles.full]}>
        <MyActivityIndicator progress={this.state.showProgress} />
        <TouchableOpacity style={[styles.fulls]} activeOpacity = { 1 } onPress={ Keyboard.dismiss } >
          <Image style = {[styles.top,styles.containerWidth]} source = {images.topbackground} >
            <TouchableHighlight style = {[styles.dashboardIconw]} onPress={()=>{this.props.navigation.dispatch(resetAction);}}>
              <Image style={styles.img} source = {images.dashboardIcon}/>
            </TouchableHighlight>
            <View style = {styles.titleContainer}>
              <Text style = {styles.titleTextFirst}>{Label.t('33')}</Text>
              <Text style = {styles.titleTextSecond}>{Label.t('1')}</Text>
            </View>
          </Image>
          </TouchableOpacity>
          <View style = {[styles.paddingBottomFive,styles.containerWidth,{backgroundColor:'#FFFFFF'}]}>
          <View style = {[styles.tabs]}>
            <MaterialTabs
            items={[ Label.t('34'), Label.t('35'), Label.t('36'), Label.t('37'), Label.t('152')]}
            barColor="#FFFFFF"
            indicatorColor='#DC6865'
            activeTextColor='#DC6865'
            inactiveTextColor= '#3B3B3A'
            scrollable = {false}
            selectedIndex={this.state.selectedTab}
            onChange={(index) => this.setState({selectedTab: index})}/>
            </View>
          </View>
          <View style={[styles.formgroup,styles.containerWidth]}>
            {this.state.selectedTab == 0 ? (<ScrollView keyboardShouldPersistTaps="never"><General navigation={this.props.navigation}/></ScrollView>):
            (this.state.selectedTab == 1? (<ScrollView keyboardShouldPersistTaps="never"><Paypal navigation={this.props.navigation}/></ScrollView>):
            (this.state.selectedTab == 2? (<ScrollView keyboardShouldPersistTaps="never"><Charity navigation={this.props.navigation}/></ScrollView>):
            (this.state.selectedTab == 3? (<ScrollView keyboardShouldPersistTaps="never"><Notification navigation={this.props.navigation}/></ScrollView>):
            (<Friends navigation={this.props.navigation} />))))}
          </View>
        </View>
      </Image>);
  }
}
