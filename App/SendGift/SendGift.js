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
  Picker
} from 'react-native';

import PayPal from 'react-native-paypal-wrapper';
import Toast from 'react-native-simple-toast';
import images from '../Constant/Images';
import styles from './Style/SendGiftStyle';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import DatePicker from 'react-native-datepicker';
import MyActivityIndicator from '../Component/MyActivityIndicator';
import { Dropdown } from 'react-native-material-dropdown';
import { USER_KEY, AUTH_TOKEN, USER_DETAILS, onSignIn, setUserDetails, afterSignIn } from '../Constant/Auth';
import settings from '../Constant/UrlConstant';
import {callApiWithAuth,callApiWithoutAuth} from '../Service/WebServiceHandler';
const date = new Date(Date.now());
import { NavigationActions } from 'react-navigation';
const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'DASHBOARD' })],
  });
  const monthshort =["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
export default class SendGift extends Component {

constructor(props){
    super(props);
    this.sendgiftandcharity = this.sendgiftandcharity.bind(this);
    this.hideErrors = this.hideErrors.bind(this);
    this.state = {
        friend:{},
        showProgress: false,
        Message:'',
        GiftValue:'',
        charity_type:'',
        charity_list:[],
        donation_list:[],
        pre_amount:'',
        other_amount:'',
        checkboximg: true,
        errorMsg:{Message:'', GiftValue:'' , charity_type:'', pre_amount:'', other_amount:''},
    };
}

sendgiftandcharity(){
  console.log(settings);
  // PayPal.initialize(settings.PAYPAL_ENV,settings.PAYPAL_CLIENT_ID);
  // PayPal.pay({
  //   price:'1.00',
  //   currency:'USD',
  //   description:'Test transctions',
  // }).then(confirm => console.log(confirm))
  //   .catch(error => console.log(error));
    let error = this.state.errorMsg;
    let shareonfb = !this.state.checkboximg;
    error.Message = '';
    error.GiftValue = '';
    error.charity_type = '';
    error.pre_amount = '';
    error.other_amount = '';
    let flag = true;

    if(this.state.Message == ''){
        flag = false;
        error.Message = 'Please Enter a Message.';
    }
    if(this.state.GiftValue == ''){
        flag = false;
        error.GiftValue = 'Please Enter a Gift Value.';
    }
    if(this.state.charity_type == ''){
    flag = false;
    error.charity_type = 'Please select Charity.';
    }
    if(this.state.pre_amount == ''){
    flag = false;
    error.pre_amount = 'Please select Donation Value.';
    }
    if(this.state.pre_amount.index == 'specify'){

      if(this.state.other_amount == ''){
      flag = false;
      error.other_amount = 'Please fill Donation Value.';
      }
    }
    if(flag != true){
        this.setState({errorMsg: error});
      }
      else
      {
        console.log(PayPal);
        // 3 env available: NO_NETWORK, SANDBOX, PRODUCTION

      }
}

hideErrors(){
    let error = this.state.errorMsg;
    error.Message = '';
    error.GiftValue = '';
    error.charity_type = '';
    error.pre_amount = '';
    error.other_amount = '';
    this.setState({errorMsg: error});
}

renderImage() {
    var imgSource = this.state.checkboximg? images.uncheckedcheckbox : images.checkedcheckbox;
    return (
        <Image style={styles.shareonfacebookimg} source = {imgSource}/>
    );
}

componentWillMount(){
  if(this.props.navigation.state != undefined){
    if(this.props.navigation.state.params != undefined){
      if(this.props.navigation.state.params.friend != undefined){
        this.setState({friend:this.props.navigation.state.params.friend});
      }
    }
  }
  //  this.state.friend = this.props.navigation.state.params.friend;

    // to fetch charity list
    callApiWithoutAuth('charityList','GET' ).then((response) => {
        if(response.status === 200){
          response.json().then((responseobject) => {
            console.log(responseobject);
            let charityList = Object.keys(responseobject.data).map(function(key,data) {
              return { value: responseobject.data[key].organization, index:responseobject.data[key].id};

             });
             this.setState({
               showProgress : false,
               charity_list : charityList,
             });
          });
        }else if (response.status === 401) {
           this.setState({showProgress : false});
        }else if (response.status === 500) {
           this.setState({showProgress : false});
        }
     }).catch((error) => {console.log(error); });
     //--fetch donation list
     callApiWithoutAuth('donationList','GET' ).then((response) => {
        if(response.status === 200){
          response.json().then((responseobject) => {
           console.log(responseobject);
           let donationList = Object.keys(responseobject.data).map(function(key,data) {
             return { value: responseobject.data[key], index:key};

            });
            this.setState({
              showProgress : false,
              donation_list : donationList,
            });
             });

        }else if (response.status === 401) {
           this.setState({showProgress : false});
        }else if (response.status === 500) {
           this.setState({showProgress : false});
        }
     }).catch((error) => {console.log(error); });
}

render(){
  let bdate = new Date(this.state.friend.birth_date)
    return(
      <View style={[styles.full]}>
        <Image style = {styles.backgroundImage} source = {images.background} />
            <MyActivityIndicator progress={this.state.showProgress} />
            <TouchableOpacity style = {styles.dashboardIconw} onPress={()=>{this.props.navigation.goBack()}}>
                <Image style = {styles.img} source = {images.backIcon}></Image>
            </TouchableOpacity>
            <View style = {styles.titleContainer}>
                <Text style = {styles.titleTextFirst}>Send Gift</Text>
                <Text style = {styles.titleTextSecond}>Dollar Birthday Club!</Text>
            </View>
            <View style = {[styles.formgroup]}>
                <ScrollView keyboardShouldPersistTaps="always">
                <View style = {styles.innerwidth}>
                    <View style = {[styles.formimage]}>
                        <View>
                            <Image style = {styles.userImage} source = {images.placeholderImage}></Image>
                        </View>
                        <View style = {styles.textcontainer}>
                            <Text style = {styles.usertext}>{this.state.friend.full_name}</Text>
                            <Text style = {styles.userdesc}>{this.state.friend.first_name}'s Birthday is {monthshort[bdate.getMonth()]} {bdate.getDate()}</Text>
                        </View>
                    </View>
                    <View style={[{marginTop:'3%'},{borderWidth: 1,
                    borderRadius: 1,
                    borderColor: '#b7b7b7',borderBottomWidth:.5,paddingLeft:2}]}>
                        <TextInput style = {[styles.TextInputStyle,styles.TextAreaInputStyle]}
                            keyboardType = 'default'
                            placeholderTextColor = "#b7b7b7"
                            placeholder = 'Message'
                            underlineColorAndroid = 'transparent'
                            multiline = {true}
                            numberOfLines={2}
                            maxLength = {100}
                            returnKeyType="next"
                            autoCorrect={false}
                            onSubmitEditing={(event) => {this.refs.SecondInput.focus();}}
                            onChangeText = {(val) => {this.setState({Message: val});this.hideErrors();}}
                        />
                    </View>
                    <Text style = {styles.errorMsg}>{this.state.errorMsg['Message']}</Text>
                    <View style = {styles.inputBorderBottom}>
                        <TextInput style = {styles.TextInputStyle}
                            ref = 'SecondInput'
                            keyboardType = 'numeric'
                            placeholderTextColor = "#b7b7b7"
                            placeholder = 'Gift Value'
                            underlineColorAndroid = 'transparent'
                            multiline = {false}
                            maxLength = {100}
                            returnKeyType="next"
                            autoCorrect={false}
                            onSubmitEditing={(event) => {this.refs.ThirdInput.focus();}}
                            onChangeText = {(val) => {this.setState({GiftValue: val});this.hideErrors();}}
                        />
                        <Image style = {styles.TextInputIcon} source = {images.dollarIcon}/>
                    </View>
                    <Text style = {styles.errorMsg}>{this.state.errorMsg['GiftValue']}</Text>
                    <View style={styles.dropdown}>
                        <Dropdown
                        ref = 'ThirdInput'
                        label='Choose a Charity'
                        style = {styles.TextInputStyle}
                        containerStyle ={{marginTop:-50}}
                        baseColor = '#B3B3B3'
                        data={this.state.charity_list}
                        onSubmitEditing={(event) => {this.refs.FourthInput.focus();}}
                        onChangeText = {(value,index,data)=>{this.setState({charity_type:data[index]});this.hideErrors();}}
                        />
                    </View>
                    <Text style = {styles.errorMsg}>{this.state.errorMsg['charity_type']}</Text>
                    <View>
                        <Dropdown
                            ref = 'FourthInput'
                            label='Donation Value'
                            style = {styles.TextInputStyle}
                            containerStyle ={{marginTop:-38}}
                            baseColor = '#B3B3B3'
                            data={this.state.donation_list}
                            onChangeText = {(value,index,data)=>{this.setState({pre_amount:data[index]});this.hideErrors();}}
                        />
                    </View>
                    <Text style = {styles.errorMsg}>{this.state.errorMsg['pre_amount']}</Text>
                    {(this.state.pre_amount.index == 'specify') ?
                    (<View style = {styles.inputBorderBottom}>
                      <TextInput
                      style = {styles.TextInputStyle}
                      keyboardType = 'numeric'
                      placeholderTextColor = "#b7b7b7"
                      placeholder = 'Donation Value'
                      underlineColorAndroid = 'transparent'
                      multiline = {false} maxLength = {3}
                      returnKeyType="send"
                      autoCapitalize="none"
                      autoCorrect={false}
                      onChangeText = {(val) => {this.setState({other_amount: val});this.hideErrors();}}
                      />
                      <Image style = {styles.TextInputIcon} source = {images.dollarIcon}/>
                    </View>) : (<View ></View>)}
                    <Text style = {styles.errorMsg}>{this.state.errorMsg['other_amount']}</Text>
                    <View style={styles.marginBottomFive}>
                        <TouchableOpacity style={styles.flexDirectionRow}
                        onPress={ () => {        this.setState({ checkboximg: !this.state.checkboximg });} }
                        >
                            {this.renderImage()}
                            <Text style={styles.sharefbtext}>Share this on Facebook</Text>
                        </TouchableOpacity>
                    </View>
                        <TouchableOpacity
                        style = {[styles.signInButtonContainer,{backgroundColor:'#439FD8'}]}
                        onPress = {this.sendgiftandcharity}
                        >

                            <Text style = {styles.signInButton}>
                                Send Gift
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
        );

    }
}
