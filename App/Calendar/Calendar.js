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
    this.displaybirthdays = this.displaybirthdays.bind(this);
    this.state = {
        Friends:[],
        auth_token: '',
        friends_date:{},
        Birthdays:[],
        dateSelected:'',
        showProgress: false,
        modalVisible: false
    };
}

setModalVisible(visible) { 
    this.setState({modalVisible: visible}); 
} 

displaybirthdays(selectedDate){
    this.state.Birthdays = this.state.Friends.map((friend) => {
        const date = new Date(friend.birth_date);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        if(day == selectedDate.day && month == selectedDate.month){
            return (
                <View><Text>Test data</Text></View>
            )
        }
    });
    this.setModalVisible(true);
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
                
                <TouchableOpacity  onPress={()=>{this.props.navigation.goBack()}}>
                    <Image style = {styles.dashlogo} source = {images.dashboardIcon}></Image>
                </TouchableOpacity>
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
                    onDayPress={(day) => {this.displaybirthdays(day) }}
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
                            <Text style={styles.modalheader}>Birthdays on {this.state.dateSelected}</Text>
                            <ScrollView style={styles.modalcontent}>
                                <Text>{this.state.Birthdays}</Text>
                            </ScrollView>
                            <TouchableOpacity style={styles.modalfooter} onPress={() => { this.setModalVisible(!this.state.modalVisible) }}>
                                <Text style={styles.modalfootertext}>Close</Text> 
                            </TouchableOpacity>
                        </View> 
                    </View> 
                </Modal>    
            </Image>            
        </ScrollView>);
    }
}
