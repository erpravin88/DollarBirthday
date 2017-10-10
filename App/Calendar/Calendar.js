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
    this.modalOpen = this.modalOpen.bind(this);
    this.checkyear = this.checkyear.bind(this);
    this.navigatetoSendGift = this.navigatetoSendGift.bind(this);
    this.state = {
        Friends:[],
        auth_token: '',
        friends_date:{},
        dateSelected:{},
        showProgress: false,
        modalVisible: false,
        calendaryear:'',
        monthshort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    };
}

navigatetoSendGift(friend){
    this.setModalVisible(false);
    friend.monthshort = this.state.monthshort[this.state.dateSelected.month-1];
    friend.day = this.state.dateSelected.day;
    this.props.navigation.navigate('SEND_GIFT',{"friend":friend});
}

setModalVisible(visible) {
    this.setState({modalVisible: visible});
}
//friend.picture
displaybirthdays(){
    return this.state.Friends.map((friend) => {
        var date = new Date(friend.birth_date);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        if(day == this.state.dateSelected.day && month == this.state.dateSelected.month){
            return (
                <View key={friend.email} style={styles.listview}>
                    <Image style = {styles.userImage} source = {images.background}></Image>
                    <Text style = {styles.username}>{friend.full_name}</Text>
                    <Text style = {styles.userbirthdate}> | {this.state.monthshort[this.state.dateSelected.month-1]} {this.state.dateSelected.day}</Text>
                    <TouchableOpacity onPress={()=>{this.navigatetoSendGift(friend)}}>
                        <View style = {styles.sendgiftbtn}>
                            <Text>Send Gift</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }
    });
}

modalOpen(selectedDate){
    this.state.dateSelected = selectedDate;
    this.setModalVisible(true);
}

checkyear(month){
    if(this.state.calendaryear != month.year){
        this.state.calendaryear = month.year;
        friends_date:{};
        for (let friend of this.state.Friends) {
            var temp = new Date(friend.birth_date);
            var tempday = temp.getDate();
            if(tempday < 10){
                tempday = "0"+tempday;
            }
            var tempmonth = temp.getMonth() + 1;
            if(tempmonth < 10){
                tempmonth = "0"+tempmonth;
            }
            var date = this.state.calendaryear+'-'+tempmonth+'-'+tempday;
            this.state.friends_date[date]={marked: true};
        }
    }
}

componentWillMount(){
    //this.setState({name: this.props.navigation.state.params.name});
    this.setState({showProgress : true});
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
                    this.state.calendaryear = (new Date()).getFullYear();
                    let friends_date = {};
                    for (let friend of this.state.Friends) {
                        var temp = new Date(friend.birth_date);
                        var tempday = temp.getDate();
                        if(tempday < 10){
                            tempday = "0"+tempday;
                        }
                        var tempmonth = temp.getMonth() + 1;
                        if(tempmonth < 10){
                            tempmonth = "0"+tempmonth;
                        }
                        var date = this.state.calendaryear+'-'+tempmonth+'-'+tempday;
                        friends_date[date]={marked: true};
                    }
                    this.setState({friends_date: friends_date});
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
                <ScrollView keyboardShouldPersistTaps="always">
                    <Calendar
                    // Specify style for calendar container element. Default = {}
                    style = {styles.calendar}
                    monthFormat={'MMM yyyy'}
                    onMonthChange={(month) => {this.checkyear(month)}}
                    markedDates={this.state.friends_date}
                    onDayPress={(day) => {this.modalOpen(day) }}
                    // Specify theme properties to override specific styles for calendar parts. Default = {}

                    />
                </ScrollView>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {this.setModalVisible(false) }}
            >
                <View style={styles.modalparentview}>
                    <View style={styles.modaldata}>
                        <Text style={styles.modalheader}>Birthdays on {this.state.dateSelected.day} {this.state.monthshort[this.state.dateSelected.month-1]}</Text>
                        <ScrollView style={styles.modalcontent}>
                            {this.displaybirthdays()}
                        </ScrollView>
                        <TouchableOpacity style={styles.modalfooter} onPress={() => { this.setModalVisible(!this.state.modalVisible) }}>
                            <Text style={styles.modalfootertext}>Close</Text>
                        </TouchableOpacity>
                        </View>
                </View>
            </Modal>
        </Image>
        );

    }
}
