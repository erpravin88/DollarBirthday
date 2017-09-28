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
  AsyncStorage
} from 'react-native';

import images from '../Constant/Images';
import styles from './Style/DashboardStyle';
import { USER_KEY, AUTH_TOKEN, USER_DETAILS, onSignOut } from '../Constant/Auth';

export default class SignUp extends Component {
  constructor(props){
   super(props);
   this.state = {'date': new Date(Date.now())};
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
    <Text style = {styles.titleTextFirst}>Explore</Text>
    <Text style = {styles.titleTextSecond}>Dollar Birthday Club!</Text>
    <Image style = {styles.logo} source = {images.dbtoplogo}/>
  </View>
    <View style={[styles.iconContainer,styles.iconContainerfix1]}>
      <TouchableOpacity
      style = {[styles.dbIcon]}
      onPress = {this.onLoginClick}>
      <Image style = {styles.full} source = {images.inboxIcon}/>
      </TouchableOpacity>
      <TouchableOpacity
      style = {[styles.dbIcon]}
      onPress = {this.onLoginClick}>
      <Image style = {styles.full} source = {images.upcomingIcon}/>
      </TouchableOpacity>
      <TouchableOpacity
      style = {[styles.dbIcon]}
      onPress={()=>{this.props.navigation.navigate('CALENDAR')}}>
      <Image style = {styles.full} source = {images.colenderIcon}/>
      </TouchableOpacity>
    </View>
    <View style={[styles.iconContainer,styles.iconContainerfix2]}>
      <TouchableOpacity
      style = {[styles.dbIcon]}
      onPress = {this.onLoginClick}>
      <Image style = {styles.full} source = {images.donateIcon}/>
      </TouchableOpacity>
      <TouchableOpacity
      style = {[styles.dbIcon]}
      onPress = {this.onLoginClick}>
      <Image style = {styles.full} source = {images.gifthistoryIcon}/>
      </TouchableOpacity>
      <TouchableOpacity
      style = {[styles.dbIcon]}
      onPress = {this.onLoginClick}>
      <Image style = {styles.full} source = {images.settingsIcon}/>
      </TouchableOpacity>
    </View>
    <View style = {[styles.iconContainer,styles.iconContainerfix3]}>
      <TouchableOpacity
      style = {[styles.dbIcon]}
      onPress={()=>{this.props.navigation.navigate('ADDFRIEND')}}>
      <Image style = {styles.full} source = {images.addfriendIcon}/>
      </TouchableOpacity>
      <TouchableOpacity
      style = {[styles.dbIcon]}
      onPress = {()=>{onSignOut(this);}}>
      <Image style = {styles.full} source = {images.logoutIcon}/>
      </TouchableOpacity>
    </View>
</Image>);

  }
}
