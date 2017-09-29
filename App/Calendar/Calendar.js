import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  Image,ScrollView, ImageBackground,
  ActivityIndicator,
  AsyncStorage,
  Modal,
  TouchableHighlight
} from 'react-native';

import Toast from 'react-native-simple-toast';
import images from '../Constant/Images';
import styles from './Style/CalendarStyle';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import DatePicker from 'react-native-datepicker';
import MyActivityIndicator from '../Component/MyActivityIndicator';
import { USER_KEY, AUTH_TOKEN, USER_DETAILS, onSignIn, setUserDetails, afterSignIn } from '../Constant/Auth';
import {callApiWithAuth} from '../Service/WebServiceHandler';
const date = new Date(Date.now());
export default class Calendars extends Component {

constructor(props){
    super(props);
    this.state = {
        Friends:[],
        auth_token: '',
        friends_date:{},
        showProgress: false,
        modalVisible: false
    };
}

setModalVisible(visible) { 
    this.setState({modalVisible: visible}); 
} 

componentWillMount(){
    //this.setState({name: this.props.navigation.state.params.name});
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
                    for (let friend of this.state.Friends) {
                        this.state.friends_date[friend.birth_date]={marked: true};
                    }
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

render(){
    return(
        <ScrollView keyboardShouldPersistTaps="always">
            <Image style = {styles.backgroundImage} source = {images.background}>
                <MyActivityIndicator progress={this.state.showProgress} />
                <Image style = {styles.dashlogo} source = {images.dashboardIcon}></Image>
                <View style = {styles.titleContainer}>
                    <Text style = {styles.titleTextFirst}>Birthday Calendar</Text>
                    <Text style = {styles.titleTextSecond}>Dollar Birthday Club!</Text>
                </View>
                <View style = {styles.CalendarContainer}>
                    <Calendar
                    // Specify style for calendar container element. Default = {}
                    style = {styles.calendar}
                    monthFormat={'MMM yyyy'}
                    markedDates={this.state.friends_date}
                    onDayPress={(day) => {this.setModalVisible(true) }}
                    // Specify theme properties to override specific styles for calendar parts. Default = {}
                    
                    />
                </View>
                <Modal 
                    animationType="slide" 
                    transparent={true} 
                    visible={this.state.modalVisible} 
                    onRequestClose={() => {this.setModalVisible(false) }} 
                > 
                    <View style={styles.modalparentview}> 
                        <View style={styles.modaldata}>
                            <Text>Hello World!</Text>
                            <TouchableHighlight onPress={() => { this.setModalVisible(!this.state.modalVisible) }}> 
                                <Text>Hide Modal</Text> 
                            </TouchableHighlight>
                        </View> 
                    </View> 
                </Modal>    
            </Image>            
        </ScrollView>);
    }
}
