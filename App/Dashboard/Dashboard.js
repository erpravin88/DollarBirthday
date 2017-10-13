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
} from 'react-native';

import images from '../Constant/Images';
import styles from './Style/DashboardStyle';
import Toast from 'react-native-simple-toast';
import Label from '../Constant/Languages/LangConfig';
import { USER_KEY, AUTH_TOKEN, USER_DETAILS, onSignOut } from '../Constant/Auth';
import {checkinternetconnectivity} from '../Constant/netinfo';

export default class Dashboard extends Component {
  constructor(props){
   super(props);
   this.navfromdashboard = this.navfromdashboard.bind(this);
   this.state = {
     'date': new Date(Date.now()),
    };
  }

  navfromdashboard(route){
    checkinternetconnectivity().then((response)=>{
      if(response.Internet == true){
        this.props.navigation.navigate(route);
      }else{
        Toast.show("No Internet Connection");
      }
    });
  }

  componentWillMount(){
  //this.setState({name: this.props.navigation.state.params.name});
      AsyncStorage.getItem(USER_KEY).then((key)=>{
        //this.setState({user_key: key});
      }).catch((err)=>{
        Toast.show(err);
      });
      AsyncStorage.getItem(AUTH_TOKEN).then((token)=>{
        // this.setState({auth_token: token,showProgress : true});
        //   callApiWithAuth('api/task/show','GET', this.state.auth_token).then((response) => {
        //      if(response.status === 200){
        //        response.json().then((responseobject) => {
        //          this.setState({ taskList: responseobject.data });
        //          console.log(responseobject);
        //        });
        //        this.setState({showProgress : false});
        //        Toast.show('Task fetched');
        //      }else if (response.status === 401) {
        //         this.setState({showProgress : false});
        //         Toast.show('Task not fetched');
        //      }else if (response.status === 500) {
        //         this.setState({showProgress : false});
        //         Toast.show('Task not fetched:500');
        //      }
        //   }).catch((error) => { this.setState({showProgress : false}); console.log(error); });
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


  render(){

  return(
<Image style = {styles.backgroundImage} source = {images.dbbackground}>
  <View style = {styles.titleContainer}>
    <Text style = {styles.titleTextFirst}>{Label.t('29')}</Text>
    <Text style = {styles.titleTextSecond}>{Label.t('1')}</Text>
    <Image style = {styles.logo} source = {images.dbtoplogo}/>
  </View>
    <View style={[styles.iconContainer,styles.iconContainerfix1]}>
      <TouchableOpacity
      style = {[styles.dbIcon]}
      onPress={()=>{this.navfromdashboard('INBOX')}}>
      <Image style = {styles.full} source = {images.inboxIcon}/>
      </TouchableOpacity>
      <TouchableOpacity
      style = {[styles.dbIcon]}
      onPress={()=>{this.navfromdashboard('UPCOMINGS')}}>
      <Image style = {styles.full} source = {images.upcomingIcon}/>
      </TouchableOpacity>
      <TouchableOpacity
      style = {[styles.dbIcon]}
      onPress={()=>{this.navfromdashboard('CALENDAR')}}>
      <Image style = {styles.full} source = {images.colenderIcon}/>
      </TouchableOpacity>
    </View>
    <View style={[styles.iconContainer,styles.iconContainerfix2]}>
      <TouchableOpacity
      style = {[styles.dbIcon]}
      onPress={()=>{this.navfromdashboard('DONATE')}}>
      <Image style = {styles.full} source = {images.donateIcon}/>
      </TouchableOpacity>
      <TouchableOpacity
      style = {[styles.dbIcon]}
      onPress={()=>{this.navfromdashboard('GIFTHISTORY')}}>
      <Image style = {styles.full} source = {images.gifthistoryIcon}/>
      </TouchableOpacity>
      <TouchableOpacity
      style = {[styles.dbIcon]}
      onPress = {()=>{this.navfromdashboard('SETTING')}}>
      <Image style = {styles.full} source = {images.settingsIcon}/>
      </TouchableOpacity>
    </View>
    <View style = {[styles.iconContainer,styles.iconContainerfix3]}>
      <TouchableOpacity
      style = {[styles.dbIcon]}
      onPress={()=>{this.navfromdashboard('ADDFRIEND')}}>
      <Image style = {styles.full} source = {images.addfriendIcon}/>
      </TouchableOpacity>
      <TouchableOpacity
      style = {[styles.dbIcon]}
      onPress = {()=>{ Alert.alert( Label.t('30'), Label.t('31'), [ {text: Label.t('7'), onPress: () => console.log('Cancel Pressed'), style: 'cancel'}, {text: Label.t('32'), onPress: () => onSignOut(this)}, ], { cancelable: false } )}}>
      <Image style = {styles.full} source = {images.logoutIcon}/>
      </TouchableOpacity>
    </View>
</Image>);

  }
}
