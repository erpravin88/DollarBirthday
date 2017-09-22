import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  Image,ScrollView, ImageBackground
} from 'react-native';

import images from '../Constant/Images';
import styles from './Style/DashboardStyle';
import DatePicker from 'react-native-datepicker';
import { Dropdown } from 'react-native-material-dropdown';

export default class SignUp extends Component {


  constructor(props){

   super(props);

   this.state = {'date': new Date(Date.now())};
 }


  render(){
    let data = [{
      value: 'Banana',
    }, {
      value: 'Mango',
    }, {
      value: 'Pear',
    }];

  return(
<Image style = {styles.backgroundImage} source = {images.dbbackground}>
  <View style = {styles.titleContainer}>
    <Text style = {styles.titleTextFirst}>Explore</Text>
    <Text style = {styles.titleTextSecond}>Dollar Birthday Club!</Text>
    <Image style = {styles.logo} source = {images.dbtoplogo}/>
  </View>
    <View style={styles.iconContainer}>
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
      onPress = {this.onLoginClick}>
      <Image style = {styles.full} source = {images.colenderIcon}/>
      </TouchableOpacity>
    </View>
    <View style={styles.iconContainer}>
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
    <View style = {[styles.iconContainer]}>
      <TouchableOpacity
      style = {[styles.dbIcon]}
      onPress = {this.onLoginClick}>
      <Image style = {styles.full} source = {images.addfriendIcon}/>
      </TouchableOpacity>
      <TouchableOpacity
      style = {[styles.dbIcon]}
      onPress = {this.onLoginClick}>
      <Image style = {styles.full} source = {images.logoutIcon}/>
      </TouchableOpacity>
    </View>
</Image>);

  }
}
