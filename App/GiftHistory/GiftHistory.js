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
  Picker,
  FlatList
} from 'react-native';

import Toast from 'react-native-simple-toast';
import images from '../Constant/Images';
import Label from '../Constant/Languages/LangConfig';
import styles from './Style/GiftHistoryStyle';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import DatePicker from 'react-native-datepicker';
import MyActivityIndicator from '../Component/MyActivityIndicator';
import settings from '../Constant/UrlConstant';
import { Dropdown } from 'react-native-material-dropdown';
import { USER_KEY, AUTH_TOKEN, USER_DETAILS, onSignIn, setUserDetails, afterSignIn } from '../Constant/Auth';
import {callApiWithAuth,callApiWithoutAuth} from '../Service/WebServiceHandler';
const date = new Date(Date.now());
import { NavigationActions } from 'react-navigation';
const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'DASHBOARD' })],
  });
export default class GiftHistory extends Component {

constructor(props){
    super(props);
    this.fetchlist = this.fetchlist.bind(this);
    this.state = {
        showProgress: false,
        giftHistory: [],
        displaylist: true,
    };
}

fetchlist(item){
    return(
        <View style={styles.listbox}>
            <Image style = {styles.userimg} source ={images.placeholderImage}/>
            <View style={styles.userdetailtext}>
                <View style={styles.usernametext}>
                    <Text style={styles.username}>Sick Kids Hospital Toronto</Text>
                    <Text style={styles.donatedamount}>  {Label.t('27')} $5.00</Text>
                </View>
                <Text style={styles.pendingamount}>August 11, 2016</Text>
            </View>
        </View>
    )
}

componentWillMount(){
    this.setState({showProgress : true});
    AsyncStorage.getItem(USER_KEY).then((key)=>{
      //this.setState({user_key: key});
    }).catch((err)=>{
      Toast.show(err);
    });
    AsyncStorage.getItem(AUTH_TOKEN).then((token)=>{
       this.setState({auth_token: token});
         callApiWithAuth('user/giftHistory','GET', this.state.auth_token).then((response) => {
            if(response.status === 201){
              response.json().then((responseobject) => {
                this.setState({giftHistory : responseobject.data});
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
    let Historylist = (this.state.displaylist == true) ?
    (<View><FlatList
        data={this.state.giftHistory.list}
        renderItem={({item}) => this.fetchlist(item)}
        keyExtractor={item => item.email}
        /></View>) : (<View ><Text></Text></View>);
    return(
        <Image style = {styles.backgroundImage} source = {images.background}>
            <MyActivityIndicator progress={this.state.showProgress} />
            <TouchableOpacity style = {styles.dashboardIconw} onPress={()=>{this.props.navigation.dispatch(resetAction)}}>
                <Image style = {styles.img} source = {images.dashboardIcon}></Image>
            </TouchableOpacity>
            <View style = {styles.titleContainer}>
                <Text style = {styles.titleTextFirst}>{Label.t('22')}</Text>
                <Text style = {styles.titleTextSecond}>{Label.t('1')}</Text>
            </View>
            <View style={styles.donationdetailsbox}>
                <View style={styles.detailscontainer}>
                    <Image style = {styles.detaillogo} source = {images.giftrecieved}></Image>
                    <Text style={styles.detailsheading}>{Label.t('23')} {Label.t('25')}</Text>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.recievedtext}>$ {this.state.giftHistory.total_recieved}</Text>
                        <Text style={{fontSize:12,color:'#5C3F89'}}> USD</Text>
                    </View>
                </View>
                <View style={styles.detailscontainersecond}>
                    <Image style = {styles.detaillogo} source = {images.giftsent}></Image>
                    <Text style={styles.detailsheading}>{Label.t('23')} {Label.t('24')}</Text>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.senttext}>$ {this.state.giftHistory.total_sent}</Text>
                        <Text style={{fontSize:12,color:'#5896C8'}}> USD</Text>
                    </View>
                </View>
                <View style={styles.detailscontainersecond}>
                    <Image style = {styles.detaillogo} source = {images.giftdonation}></Image>
                    <Text style={styles.detailsheading}>{Label.t('23')} {Label.t('26')}</Text>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.donationtext}>$ {this.state.giftHistory.total_donation}</Text>
                        <Text style={{fontSize:12,color:'#D96662'}}> USD</Text>
                    </View>
                </View>
            </View>
            <View style={styles.flatlistview}>
                <ScrollView keyboardShouldPersistTaps="always">
                    <View style={styles.flatlistdisplay}>
                        <View style={styles.listbox}>
                            <Image style = {styles.userimg} source ={images.placeholderImage}/>
                            <View style={styles.userdetailtext}>
                                <View style={styles.usernametext}>
                                    <Text style={styles.usernamepending}>Linda Jones</Text>
                                    <Text style={styles.pendingamount}>  {Label.t('24')} $5.00({Label.t('28')})</Text>
                                </View>
                                <Text style={styles.pendingamount}>August 11, 2016</Text>
                            </View>
                        </View>
                        <View style={styles.listbox}>
                            <Image style = {styles.userimg} source ={images.placeholderImage}/>
                            <View style={styles.userdetailtext}>
                                <View style={styles.usernametext}>
                                    <Text style={styles.username}>David Mathews</Text>
                                    <Text style={styles.recievedamount}>  {Label.t('25')} $5.00</Text>
                                </View>
                                <Text style={styles.pendingamount}>July 5, 2016</Text>
                            </View>
                        </View>
                        <View style={styles.listbox}>
                            <Image style = {styles.userimg} source ={images.placeholderImage}/>
                            <View style={styles.userdetailtext}>
                                <View style={styles.usernametext}>
                                    <Text style={styles.username}>Jane Dough</Text>
                                    <Text style={styles.sentamount}>  {Label.t('24')} $5.00</Text>
                                </View>
                                <Text style={styles.pendingamount}>July 1, 2016</Text>
                            </View>
                        </View>
                        <View style={styles.listbox}>
                            <Image style = {styles.userimg} source ={images.placeholderImage}/>
                            <View style={styles.userdetailtext}>
                                <View style={styles.usernametext}>
                                    <Text style={styles.username}>Sick Kids Hospital Toronto</Text>
                                    <Text style={styles.donatedamount}>  {Label.t('27')} $5.00</Text>
                                </View>
                                <Text style={styles.pendingamount}>August 11, 2016</Text>
                            </View>
                        </View>
                        {Historylist}
                    </View>
                </ScrollView>
            </View>
        </Image>
        );

    }
}
