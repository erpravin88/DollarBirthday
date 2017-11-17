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
  List,
  FlatList
} from 'react-native';

import Toast from 'react-native-simple-toast';
import images from '../Constant/Images';
import Label from '../Constant/Languages/LangConfig';
import styles from './Style/InboxStyle';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import MyActivityIndicator from '../Component/MyActivityIndicator';
import { USER_KEY, AUTH_TOKEN, USER_DETAILS, onSignIn, setUserDetails, afterSignIn ,onSignOut} from '../Constant/Auth';
import {callApiWithAuth} from '../Service/WebServiceHandler';
const date = new Date(Date.now());
import { NavigationActions } from 'react-navigation';
const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'DASHBOARD' })],
    });
import settings from '../Constant/UrlConstant';
export default class Calendars extends Component {

constructor(props){
    super(props);
    this.fetchlist = this.fetchlist.bind(this);
    this.state = {
        auth_token: '',
        showProgress: false,
        messagelist: true,
        messages:[10]
    };
}

fetchlist(item){
  console.log(item);
    return(<View  style={styles.messagebox}>
        <View style={styles.imagecontainer}>
            <Image style = {styles.userimage} source = {images.placeholderImage}/>
            <View style={styles.userdetailscontainer}>
                <Text style={styles.username}>{item.sender_name}</Text>
                <Text style={styles.datetime}>July 22 at 11:00 AM</Text>
            </View>
        </View>
        <Text style={styles.message}>This is a test message</Text>
        <Image style = {styles.greenbg} source = {images.greenpricetag}/>
        <View style = {styles.greenbg}>
            <Text style={[styles.donationvalue]}>{item.charity_amount}</Text>
            <Text style={styles.currency}>{item.currency}</Text>
        </View>
        <Image style = {styles.redbg} source = {images.redpricetag}/>
        <View style = {styles.redbg}>
            <Text style={styles.donationvalue}>{item.gift_amount}</Text>
            <Text style={styles.currency}>{item.currency}</Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.donationlisting}>
            <View style = {styles.heartlogobox}>
                <Image style = {styles.heartlogo} source = {images.heartlogo}/>
                <Text style = {styles.charitytext}>{Label.t('17')} Test Charity</Text>
            </View>
        </View>
    </View>)
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
             callApiWithAuth('user/inbox','GET', this.state.auth_token).then((response) => {
                if(response.status === 201){
                  response.json().then((responseobject) => {
                    console.log(responseobject);
                      //Remove quote from next line to update flatlist with dynamic data
                      //  this.setState({messages: responseobject});
                      this.setState({messages: JSON.parse(JSON.stringify(settings.INBOX_DEMO_DATA)).data.list});
                      console.log(this.state.messages);
                  });
                  this.setState({showProgress : false});
                  //Toast.show('Task fetched');
                }else if (response.status === 401) {
                   this.setState({showProgress : false});
                   onSignOut(this);
                   Toast.show(Label.t('51'));
                }else if (response.status === 500) {
                   this.setState({showProgress : false});
                   Toast.show(Label.t('52'));
                }
             }).catch((error) => { this.setState({showProgress : false}); console.log(error); });
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
          <Image style = {[styles.top,styles.containerWidth]} source = {images.topbackground} >
            <TouchableOpacity style = {[styles.dashboardIconw]} onPress={()=>{this.props.navigation.dispatch(resetAction);}}>
              <Image style={styles.img} source = {images.dashboardIcon}/>
            </TouchableOpacity>
            <View style = {styles.titleContainer}>
                <Text style = {styles.titleTextFirst}>{Label.t('16')}</Text>
                <Text style = {styles.titleTextSecond}>{Label.t('1')}</Text>
            </View>
          </Image>
          <View style={[styles.formgroup,styles.containerWidth]}>
            <View>
                <ScrollView keyboardShouldPersistTaps="always">
                    {(this.state.messagelist == true) ?
                    (<View><FlatList
                        data={this.state.messages}
                        renderItem={({item}) => this.fetchlist(item)}
                        keyExtractor={item => item.email}
                        /></View>) : (<View ></View>)}
                </ScrollView>
            </View>
          </View>
        </View>
      </Image>
        );

    }
}
