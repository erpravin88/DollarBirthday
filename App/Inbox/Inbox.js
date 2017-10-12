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
import { USER_KEY, AUTH_TOKEN, USER_DETAILS, onSignIn, setUserDetails, afterSignIn } from '../Constant/Auth';
import {callApiWithAuth} from '../Service/WebServiceHandler';
const date = new Date(Date.now());
import { NavigationActions } from 'react-navigation';
const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'DASHBOARD' })],
    });
export default class Calendars extends Component {

constructor(props){
    super(props);
    this.fetchlist = this.fetchlist.bind(this);
    this.state = {
        auth_token: '',
        showProgress: false,
        messagelist: true,
        messages:[1]
    };
}

fetchlist(item){
    return(<View style={styles.messagebox}>
        <View style={styles.imagecontainer}>
            <Image style = {styles.userimage} source = {images.placeholderImage}/>
            <View style={styles.userdetailscontainer}>
                <Text style={styles.username}>Sarah Locket</Text>
                <Text style={styles.datetime}>July 22 at 11:00 AM</Text>
            </View>
        </View>
        <Text style={styles.message}>This is a test message</Text>
        <Image style = {styles.greenbg} source = {images.greenpricetag}>
            <Text style={styles.donationvalue}>$10</Text>
            <Text style={styles.currency}>USD</Text>
        </Image>
        <Image style = {styles.redbg} source = {images.redpricetag}>
            <Text style={styles.donationvalue}>$100</Text>
            <Text style={styles.currency}>USD</Text>
        </Image>
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
                      //Remove quote from next line to update flatlist with dynamic data
                    //  this.setState({messages: responseobject});
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
    let messagelist = (this.state.messagelist == true) ?
    (<View><FlatList
        data={this.state.messages}
        renderItem={({item}) => this.fetchlist(item)}
        keyExtractor={item => item.email}
        /></View>) : (<View ></View>);
    return(
        <Image style = {styles.backgroundImage} source = {images.background}>
            <MyActivityIndicator progress={this.state.showProgress} />
            <TouchableOpacity style = {[styles.dashboardIconw]} onPress={()=>{this.props.navigation.dispatch(resetAction);}}>
            <Image style={styles.img} source = {images.dashboardIcon}/>
          </TouchableOpacity>
            <View style = {styles.titleContainer}>
                <Text style = {styles.titleTextFirst}>{Label.t('16')}</Text>
                <Text style = {styles.titleTextSecond}>{Label.t('1')}</Text>
            </View>
            <View style={styles.scrolllist}>
                <ScrollView keyboardShouldPersistTaps="always">
                    {messagelist}
                </ScrollView>
            </View>
        </Image>
        );
    // return(
    //     <Image style = {styles.backgroundImage} source = {images.background}>
    //         <MyActivityIndicator progress={this.state.showProgress} />
    //         <TouchableOpacity  onPress={()=>{this.props.navigation.goBack()}}>
    //             <Image style = {styles.dashlogo} source = {images.dashboardIcon}></Image>
    //         </TouchableOpacity>
    //         <View style = {styles.titleContainer}>
    //             <Text style = {styles.titleTextFirst}>Inbox</Text>
    //             <Text style = {styles.titleTextSecond}>Dollar Birthday Club!</Text>
    //         </View>
    //     </Image>
    //     );

    }
}
