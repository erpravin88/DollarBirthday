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
  TouchableHighlight,
  Platform,
  Linking,
} from 'react-native';

import Toast from 'react-native-simple-toast';
import Label from '../Constant/Languages/LangConfig';
import images from '../Constant/Images';
import styles from './Style/CalendarStyle';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import DatePicker from 'react-native-datepicker';
import MyActivityIndicator from '../Component/MyActivityIndicator';
import DirectiveMsg from '../Component/DirectiveMsg';
import { USER_KEY, AUTH_TOKEN, USER_DETAILS, onSignIn, setUserDetails, afterSignIn,onSignOut } from '../Constant/Auth';
import {checkinternetconnectivity} from '../Constant/netinfo';
import {callApiWithAuth} from '../Service/WebServiceHandler';
const date = new Date(Date.now());
import { NavigationActions } from 'react-navigation';
import settings from '../Constant/UrlConstant';

const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'DASHBOARD' })],
    });
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
    checkinternetconnectivity().then((response)=>{
        if(response.Internet == true){
            if (Platform.OS === 'android') {
                this.setModalVisible(false);
                this.props.navigation.navigate('SEND_GIFT',{"friend":friend});
            }else{
                this.openURL(settings.BASE_URL+'/mobileapp?type='+settings.ROUTE_TYPE.send_gift+'&from='+settings.ROUTE_TYPE.calender+'&fid='+friend.id+'&t='+this.state.auth_token);
            }
            
        }else{
            Toast.show(Label.t('140'));
        }
    });
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

setModalVisible(visible) {
    this.setState({modalVisible: visible});
}
//friend.picture
displaybirthdays(){
    return this.state.Friends.map((friend,key) => {

        var birth_date = friend.birth_date.split('-');// YYYY-MM-DD
        if(birth_date[2] == this.state.dateSelected.day && birth_date[1] == this.state.dateSelected.month){
            return (<View key={key} style={styles.item}>
               <View style={styles.picw}><Image style = {styles.pic} source = {images.placeholderImage}/></View>
               <View style={styles.namew}><Text style={styles.name}>{friend.full_name}<Text style = {styles.userbirthdate}> | {this.state.monthshort[this.state.dateSelected.month-1]} {this.state.dateSelected.day}</Text></Text></View>
               <View style={styles.btnw}>
                  <TouchableOpacity style={styles.btn1} onPress={()=>{this.navigatetoSendGift(friend);console.log(friend.email);}}>
                    <Text style={styles.text1}>{Label.t('13')}</Text>
                  </TouchableOpacity>
               </View>
               </View>
            )
        }
    });
}
formBorthdaytakemonthandday(indate){

	let newdate1 = indate.split("-");// YYYY-MM-DD
    return newdate1[1]+" "+newdate1[2];
}
modalOpen(selectedDate){console.log(selectedDate, this.state.Friends);
    let bdayfound = false;
    let currentmonthday = this.formBorthdaytakemonthandday(selectedDate.dateString);
    for (let friend of this.state.Friends) {
      let birthmonthday = this.formBorthdaytakemonthandday(friend.birth_date);

        if(birthmonthday === currentmonthday){
            bdayfound = true;
            break;
        }
    }
    if(bdayfound == true){
    this.state.dateSelected = selectedDate;
    this.setModalVisible(true);
    }
}

checkyear(month){
    if(this.state.calendaryear != month.year){
        this.state.calendaryear = month.year;
        console.log(month.year);
        let friends_date={};
        for (let friend of this.state.Friends) {
            let temp = friend.birth_date.split("-");
            let date = this.state.calendaryear+'-'+temp[1]+'-'+temp[2];
            console.log(date);
            friends_date[date]={marked: true};
           // console.log( this.state.friends_date);
        }
        this.setState({friends_date:friends_date});
        console.log( this.state.friends_date);
    }
}

componentWillMount(){
    //this.setState({name: this.props.navigation.state.params.name});
    //this.setState({showProgress : true});
        AsyncStorage.getItem(USER_KEY).then((key)=>{
          //this.setState({user_key: key});
        }).catch((err)=>{
          Toast.show(err);
        });
        AsyncStorage.getItem(AUTH_TOKEN).then((token)=>{
           this.setState({auth_token: token,showProgress : true});
             callApiWithAuth('user/friends','GET', this.state.auth_token).then((response) => {
                //  response.json().then((responseobject) => {
                //    console.log(responseobject);
                //  });
                if(response.status === 200){
                  response.json().then((responseobject) => {
                    this.setState({ Friends: responseobject.data });
                    this.state.calendaryear = (new Date()).getFullYear();
                    console.log(this.state.calendaryear);
                    let friends_date = {};
                    for (let friend of this.state.Friends) {
                        let temp = friend.birth_date.split("-");
                        let date = this.state.calendaryear+'-'+temp[1]+'-'+temp[2];
                        console.log(date);
                        friends_date[date]={marked: true};
                        
                    }
                    console.log( this.state.friends_date);
                    this.setState({friends_date: friends_date});
                  });
                  this.setState({showProgress : false});
                  //Toast.show('Task fetched');
                }else if (response.status === 404) {
                   this.setState({showProgress : false});
                   Toast.show('No friends found');
                }else if (response.status === 401) {
                   this.setState({showProgress : false});
                   onSignOut(this);
                   Toast.show(Label.t('51'));
                }else if (response.status === 500) {
                   this.setState({showProgress : false});
                   Toast.show('Error fetching friends:500');
                }
             }).catch((error) => {
                this.setState({showProgress : false});
                Toast.show(Label.t('155'));
                console.log(error); 
                });
        }).catch((err)=>{
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
      <Image style = {styles.backgroundImage} source = {images.loginbackground}>
        <View style={[styles.full]}>
          <MyActivityIndicator progress={this.state.showProgress} />
            <ScrollView  style={styles.scrollviewheight} keyboardShouldPersistTaps='never'>
              <Image style = {[styles.top,styles.containerWidth]} source = {images.topbackground} >
            <TouchableOpacity style = {[styles.dashboardIconw]} onPress={()=>{console.log(styles);this.props.navigation.dispatch(resetAction);}}>
              <Image style={styles.img} source = {images.dashboardIcon}/>
            </TouchableOpacity>
            <View style = {styles.titleContainer}>
                <Text style = {styles.titleTextFirst}>{Label.t('14')}</Text>
                <Text style = {styles.titleTextSecond}>{Label.t('1')}</Text>
            </View>
            </Image>
      <View style={[styles.formgroup,styles.containerWidth]}>
            <View style = {styles.TextInputContainer}>
                    <Calendar
                    // Specify style for calendar container element. Default = {}
                    style = {styles.calendar}
                    monthFormat={'MMM yyyy'}
                    onMonthChange={(month) => {this.checkyear(month)}}
                    markedDates={this.state.friends_date}
                    onDayPress={(day) => {this.modalOpen(day) }}
                    // Specify theme properties to override specific styles for calendar parts. Default = {}

                    />
                    <DirectiveMsg icon={true} iconSource={images.smallbdclogo} message={Label.t('113')} />
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {this.setModalVisible(false) }}
            >
                <View style={styles.modalparentview}>
                    <View style={styles.modaldata}>
                      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <Text style={{flex:0.9,paddingLeft:'3%',fontSize:18}}>{Label.t('15')} {this.state.monthshort[this.state.dateSelected.month-1]} {this.state.dateSelected.day}</Text>
                        <TouchableOpacity style={{flex:0.1,padding:10,alignSelf:'flex-end'}} onPress={() => { this.setModalVisible(!this.state.modalVisible) }}>
                            <Image style={{width:15,height:15}} source={images.crossicon} />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.calendarmodal}>
                          <ScrollView keyboardShouldPersistTaps='never'>
                              {this.displaybirthdays()}
                          </ScrollView>
                      </View>
                    </View>
                </View>
            </Modal>
            </View>
          </ScrollView>
        </View>
      </Image>
        );

    }
}
