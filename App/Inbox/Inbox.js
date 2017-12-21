import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  ActivityIndicator,
  AsyncStorage,
  Modal,
  FlatList
} from 'react-native';

import Toast from 'react-native-simple-toast';
import images from '../Constant/Images';
import Label from '../Constant/Languages/LangConfig';
import styles from './Style/InboxStyle';
import {dateformateMDY, currencySymbol} from '../Constant/Function';
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
        messages:[],
    };
    
}

fetchlist(item){
  console.log(item);
   if(item.messages !== 0 && item != null){
     console.log(this.state.nodatacheck);
      if(item.status == 'COMPLETED' ){
      
    return(<View  key={`${item.gift_id}`} style={styles.messagebox}>
        <View style={styles.imagecontainer}>
            <Image style = {styles.userimage} source = {images.placeholderImage}/>
            <View style={styles.userdetailscontainer}>
                <Text style={styles.username}>{item.sender_name}</Text>
                <Text style={styles.datetime}>{dateformateMDY({datetime:item.gift_sent_time,time:true})}</Text>
            </View>
        </View>
        <Text style={styles.message}>{`${item.message}`}</Text>
        <Image style = {[styles.greenbg,item.gift_amount*1 === 0 ? styles.hide : '']} source = {images.greenpricetag}/>
        <View style = {[styles.greenbg,item.gift_amount*1 === 0 ? styles.hide : '']}>
            <Text style={[styles.donationvalue]}>${//currencySymbol(item.gift_currency)+
              item.gift_amount}</Text>
            <Text style={styles.currency}>{item.gift_currency != null ? item.gift_currency: 'USD'}</Text>
        </View>
        <Image style = {[styles.redbg ,item.charity_amount*1 === 0 ? styles.hide : '']} source = {images.redpricetag}/>
        <View style = {[styles.redbg ,item.charity_amount*1 === 0  ? styles.hide : '']}>
            <Text style={[styles.donationvalue]}>${//currencySymbol(item.gift_currency)+
              item.charity_amount}</Text>
            <Text style={styles.currency}>{item.gift_currency != null ? item.gift_currency: 'USD'}</Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.donationlisting}>
            <View style = {[styles.heartlogobox,item.charity_amount*1 === 0  ? styles.hide : '']}>
                <Image style = {styles.heartlogo} source = {images.heartlogo}/>
                <Text style = {styles.charitytext}>{Label.t('17')} {`${item.charity_name}`}</Text>
            </View>
        </View>
    </View>)
    }
  }else{
      return(<View key={`${item.id}`} style = {styles.listbox}>
        <View style={[styles.nodatabox]}>
            { this.state.showProgress ? (<MyActivityIndicator progress={this.state.showProgress} />):(<Text style={[styles.fullnametext,styles.bothcenter]}>{Label.t('146')}</Text>)}
        </View>
       </View>)
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
             callApiWithAuth('user/inbox','GET', this.state.auth_token).then((response) => {
                if(response.status === 201){
                  response.json().then((responseobject) => {
                    console.log(responseobject);
                      //Remove quote from next line to update flatlist with dynamic data
                      //  this.setState({messages: responseobject});
                      this.setState({messages: responseobject.data.list});
                      //this.setState({messages: JSON.parse(JSON.stringify(settings.INBOX_DEMO_DATA)).data.list});
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
  console.log(this.state.nodatacheck);
    return(
      <Image style = {styles.backgroundImage} source = {images.loginbackground}>
        <View style={[styles.full]}>
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
            <View >
                <ScrollView keyboardShouldPersistTaps="always">
                    {(this.state.messagelist == true) ?
                    (<View ><FlatList
                        data={this.state.messages.length > 0 ? this.state.messages :[{id:0,messages:0}]}
                        renderItem={({item}) => this.fetchlist(item)}
                        keyExtractor={item => item.gift_id}
                        /></View>) : (<View ></View>)}

                </ScrollView>

            </View>
          </View>
        </View>
      </Image>
        );

    }
}
// {this.state.nodatacheck ? (<View  style = {styles.listbox}>
//   <View style={[styles.nodatabox]}>
//       { this.state.showProgress ? (<MyActivityIndicator progress={this.state.showProgress} />):(<Text style={[styles.fullnametext,styles.bothcenter]}>{Label.t('146')}</Text>)}
//   </View>
//  </View>):''} not found
//<View style={[styles.messagebox,{flexDirection:'row',alignSelf:'center',justifyContent:'center',height:40,},styles.nodatabox]}><Text >{Label.t('146')}</Text></View>
