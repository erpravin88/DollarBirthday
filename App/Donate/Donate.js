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

import Toast from 'react-native-simple-toast';
import Label from '../Constant/Languages/LangConfig';
import images from '../Constant/Images';
import styles from './Style/DonateStyle';
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
export default class Donate extends Component {

constructor(props){
    super(props);
    this.senddonation = this.senddonation.bind(this);
    this.hideErrors = this.hideErrors.bind(this);
    this.state = {
        showProgress: false,
        charity_type:'',
        charity_list:[],
        donation_list:[],
        pre_amount:'',
        other_amount:'',
        checkboximg: true,
        errorMsg:{charity_type:'', pre_amount:'', other_amount:''},
    };
}

senddonation(){
    let error = this.state.errorMsg;
    let shareonfb = !this.state.checkboximg;
    error.charity_type = '';
    error.pre_amount = '';
    error.other_amount = '';
    let flag = true;

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
        //API Call
      }
}

hideErrors(){
    let error = this.state.errorMsg;
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

    // to fetch charity list
    callApiWithoutAuth('charityList','GET' ).then((response) => {
        if(response.status === 200){
          response.json().then((responseobject) => {
            let charityList = Object.keys(responseobject.data).map(function(key,data) {
              return { value: responseobject.data[key].organization, index:responseobject.data[key].id, logo:responseobject.data[key].logo};

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
    let image = (this.state.charity_type.logo) ?
    (
    <Image style = {styles.charitylogo} source = {{uri : settings.BASE_URL+this.state.charity_type.logo}}></Image>) : (<Image style = {styles.charitylogo} source ={images.placeholderImage}/>);
    return(
      <View style={[styles.full]}>
          <Image style = {styles.backgroundImage} source = {images.background} />
            <MyActivityIndicator progress={this.state.showProgress} />
            <TouchableOpacity style = {styles.dashboardIconw} onPress={()=>{this.props.navigation.dispatch(resetAction)}}>
                <Image style = {styles.img} source = {images.dashboardIcon} />
            </TouchableOpacity>
            <View style = {styles.titleContainer}>
                <Text style = {styles.titleTextFirst}>{Label.t('9')}</Text>
                <Text style = {styles.titleTextSecond}>{Label.t('1')}</Text>
            </View>
            <View style = {[styles.formgroup]}>
                <ScrollView keyboardShouldPersistTaps="always"><View style = {styles.innerwidth}>
                    <View style={styles.logoview}>
                        {image}
                        <View style={styles.selectboxes}>
                            <View style={styles.dropdown}>
                                <Dropdown
                                ref = 'ThirdInput'
                                label={Label.t('10')}
                                style = {styles.TextInputStyle}
                                containerStyle ={{marginTop:-40}}
                                baseColor = '#B3B3B3'
                                data={this.state.charity_list}
                                onSubmitEditing={(event) => {this.refs.FourthInput.focus();}}
                                onChangeText = {(value,index,data)=>{this.setState({charity_type:data[index]});this.hideErrors();}}
                                />
                            </View>
                            <Text style = {styles.errorMsg}>{this.state.errorMsg['charity_type']}</Text>
                            <View style={styles.amountdropdown}>
                                <Dropdown
                                    ref = 'FourthInput'
                                    label={Label.t('11')}
                                    style = {styles.TextInputStyle}
                                    containerStyle ={{marginTop:-20}}
                                    baseColor = '#B3B3B3'
                                    data={this.state.donation_list}
                                    onChangeText = {(value,index,data)=>{this.setState({pre_amount:data[index]});this.hideErrors();}}
                                />
                            </View>
                            <Text style = {styles.errorMsg}>{this.state.errorMsg['pre_amount']}</Text>
                        </View>
                    </View>

                    {(this.state.pre_amount.index == 'specify') ?
                    (<View style = {styles.inputBorderBottom}>
                      <TextInput
                      style = {styles.TextInputStyle}
                      keyboardType = 'numeric'
                      placeholderTextColor = "#b7b7b7"
                      placeholder = {Label.t('11')}
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
                    <View style={[styles.marginBottomFive]}>
                        <TouchableOpacity style={styles.sharefbcontainer}
                        onPress={ () => this.setState({ checkboximg: !this.state.checkboximg }) }
                        >
                            {this.renderImage()}
                            <Text style={styles.sharefbtext}>{Label.t('12')}</Text>
                        </TouchableOpacity>
                    </View>
                        <TouchableOpacity
                        style = {[styles.signInButtonContainer,{backgroundColor:'#DC6966',}]}
                        onPress = {this.senddonation}>
                          <Text style = {styles.signInButton}>
                              {Label.t('13')}
                          </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
        );

    }
}
