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
  WebView,
} from 'react-native';

import Toast from 'react-native-simple-toast';
import Label from '../Constant/Languages/LangConfig';
import images from '../Constant/Images';
import styles from './Style/SendGiftStyle';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import {checkinternetconnectivity} from '../Constant/netinfo';
import DatePicker from 'react-native-datepicker';
import MyActivityIndicator from '../Component/MyActivityIndicator';
import ModalAlert from '../Component/ModalAlert';
import { Dropdown } from 'react-native-material-dropdown';
import { USER_KEY, AUTH_TOKEN, USER_DETAILS, onSignIn, setUserDetails, afterSignIn } from '../Constant/Auth';
import settings from '../Constant/UrlConstant';
import {callApiWithAuth,callApiWithoutAuth, callApiToPaypal} from '../Service/WebServiceHandler';
const date = new Date(Date.now());
import { NavigationActions } from 'react-navigation';
import {ShareDialog} from 'react-native-fbsdk';
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
    this.hidestatusmsg = this.hidestatusmsg.bind(this);
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
        shareLinkContent: {contentType: 'link',contentUrl: 'https://www.dollarbirthdayclub.com/',message: 'I just donated to this charity'},
        modalVisible:false,
        payUrl: settings.PAYPAL_ENV === 'live'? settings.PAYPAL_LIVE_AUTHURL : settings.PAYPAL_SANDBOX_AUTHURL,
        payKey:'',
        statusmsg:'',
        modelstatusmsg: false,
    };
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
sendgiftandcharity(){

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
        error.Message = Label.t('124');
    }
    if(this.state.GiftValue == ''){
        flag = false;
        error.GiftValue = Label.t('125');
    }
    if(this.state.charity_type == ''){
    flag = false;
    error.charity_type = Label.t('45');
    }
    if(this.state.charity_type.index !== settings.DONOT_CHARITY_ID){
      if(this.state.pre_amount == ''){
      flag = false;
      error.pre_amount = Label.t('46');
      }
      if(this.state.pre_amount.index == 'specify'){

        if(this.state.other_amount == ''){
        flag = false;
        error.other_amount = Label.t('47');
        }
      }
    }

    if(flag != true){
        this.setState({errorMsg: error});
      }
      else
      {
        let param = {};
        param['charity_id'] = this.state.charity_type.index;
        param['donation_amount'] = this.state.pre_amount.index == 'specify' ? this.state.other_amount: this.state.charity_type.index=== settings.DONOT_CHARITY_ID ? 0.00 : this.state.pre_amount.index;
        console.log(this.state.friend);
        param['friend_id'] = this.state.friend.id;
        param['gift_amount'] =  this.state.GiftValue;
        param['gift_message'] = this.state.Message;
        param['facebook_share'] = this.state.checkboximg ? 0 : 1;
        param['facebook_message'] = '';

        console.log(param);
        checkinternetconnectivity().then((response)=>{
          if(response.Internet == true){
          callApiToPaypal('Pay','POST',{}).then((response)=> {console.log(response.json().then((res)=>{ this.setState({payKey:res.payKey,modalVisible:true});}));});
          console.log(this.state);
        }else{
          Toast.show("No Internet Connection");
        }
        });

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

_onNavigationStateChange (webViewState) {
  console.log(webViewState);
  let url = webViewState.url.split("?");
  let urlparam = url[1].split("&");
  let result = {};
  let temp = '';
  Object.keys(urlparam).map((index) => {
    temp = urlparam[index].split('=');
    result[temp[0]] = temp[1];
  });
  if(result.hasOwnProperty('type') ){
    this.setState({ modalVisible: false ,statusmsg:result.type,modelstatusmsg: true});
  }
}
// show () {
//   this.setState({ modalVisible: true })
// }
//
hide () {
  this.setState({ modalVisible: false })
}
hidestatusmsg(){
  this.setState({ modelstatusmsg: false });
  if(this.state.statusmsg ==='complete'){
    if(!this.state.checkboximg){
        var tmp = this;
        ShareDialog.canShow(this.state.shareLinkContent).then(
        function(canShow) {
            if (canShow) {
            return ShareDialog.show(tmp.state.shareLinkContent);
            }
        }
        ).then(
        function(result) {
            if (result.isCancelled) {
            console.log('Share cancelled');
            this.props.navigation.dispatch(resetAction);
            } else {
                console.log('Share success with postId: ' + result.postId);
                this.props.navigation.dispatch(resetAction);
            }
        },
        function(error) {
            console.log('Share fail with error: ' + error);
        }
        );

    }else {
      this.props.navigation.dispatch(resetAction);
    }

  }
}
render(){
  let hide;
  if(this.state.charity_type.index === settings.DONOT_CHARITY_ID){
    this.state.pre_amount = { value: '',index:''};
    this.state.other_amount = '0.00';
    hide = true;
  }else{
     hide = false;
  }
  let bdate = new Date(this.state.friend.birth_date);
  console.log(this.state.payUrl+this.state.payKey);
    return(
      <View style={[styles.full]}>
      <ModalAlert visible={this.state.modelstatusmsg} onRequestClose={this.hidestatusmsg} head={this.state.statusmsg ==='complete' ? Label.t('120') : this.state.statusmsg ==='cancel' ? Label.t('122') : ''} message={ this.state.statusmsg ==='complete' ? Label.t('121') : this.state.statusmsg ==='cancel' ? Label.t('123') : ''}/>

      <Modal
        animationType={'slide'}
        visible={this.state.modalVisible}
        onRequestClose={this.hide.bind(this)}
        transparent
      >
        <View style={[styles.full]}>
          <View style={[styles.full]}>
            <WebView
              style={[{ flex: 1 }, {marginTop: 20,marginBottom:20}]}
              source={{ uri: this.state.payUrl+this.state.payKey }}
              scalesPageToFit
              startInLoadingState
              onNavigationStateChange={this._onNavigationStateChange.bind(this)}
              onError={this._onNavigationStateChange.bind(this)}
              javaScriptEnabledAndroid={true}
              domStorageEnabled={true}
            />
          </View>
        </View>
      </Modal >
        <Image style = {styles.backgroundImage} source = {images.background} />
            <MyActivityIndicator progress={this.state.showProgress} />
            <TouchableOpacity style = {styles.dashboardIconw} onPress={()=>{this.props.navigation.goBack()}}>
                <Image style = {styles.img} source = {images.backIcon}></Image>
            </TouchableOpacity>
            <View style = {styles.titleContainer}>
                <Text style = {styles.titleTextFirst}>{Label.t('13')}</Text>
                <Text style = {styles.titleTextSecond}>{Label.t('1')}</Text>
            </View>
            <View style = {[styles.formgroup]}>
                <ScrollView keyboardShouldPersistTaps="never">
                <View style = {styles.innerwidth}>
                    <View style = {[styles.formimage]}>
                        <View >
                            <Image style = {styles.userImage} source = {images.placeholderImage} />
                        </View>
                        <View style = {styles.textcontainer}>
                            <Text style = {styles.usertext}>{this.state.friend.full_name}</Text>
                            <Text style = {styles.userdesc}>{this.state.friend.first_name+Label.t('126')+` `+monthshort[bdate.getMonth()]} {bdate.getDate()}</Text>
                        </View>
                    </View>
                    <View style={[{marginTop:'3%'},{borderWidth: 1,
                    borderRadius: 1,
                    borderColor: '#b7b7b7',borderBottomWidth:.5,paddingLeft:2}]}>
                        <TextInput style = {[styles.TextInputStyle,styles.TextAreaInputStyle]}
                            keyboardType = 'default'
                            placeholderTextColor = "#b7b7b7"
                            placeholder = {Label.t('127')}
                            underlineColorAndroid = 'transparent'
                            multiline = {true}
                            numberOfLines={2}
                            maxLength = {300}
                            returnKeyType= {Label.t('3')}
                            autoCorrect={false}
                            blurOnSubmit = {true}
                            onSubmitEditing={(event) => {console.log(event);this.refs.SecondInput.focus();}}
                            onChangeText = {(val) => {this.setState({Message: val});this.hideErrors();}}
                        />
                    </View>
                    <Text style = {styles.errorMsg}>{this.state.errorMsg['Message']}</Text>
                    <View style = {styles.inputBorderBottom}>
                        <TextInput style = {styles.TextInputStyle}
                            ref = 'SecondInput'
                            keyboardType="numeric"
                            placeholderTextColor = "#b7b7b7"
                            placeholder = {Label.t('128')}
                            underlineColorAndroid = 'transparent'
                            multiline = {false}
                            maxLength = {100}
                            returnKeyType= {Label.t('3')}
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
                        label= {Label.t('10')}
                        style = {styles.TextInputStyle}
                        containerStyle ={{marginTop:-45}}
                        baseColor = '#B3B3B3'
                        data={this.state.charity_list}
                        onSubmitEditing={(event) => {this.refs.FourthInput.focus();}}
                        onChangeText = {(value,index,data)=>{this.setState({charity_type:data[index]});this.hideErrors();}}
                        />
                    </View>
                    <Text style = {styles.errorMsg}>{this.state.errorMsg['charity_type']}</Text>
                    <View style = {[ hide ? styles.hide : styles.show, ]}>
                    <Dropdown
                          label={Label.t('11')}
                          style = {styles.TextInputStyle}
                          containerStyle ={{marginTop:-30}}
                          baseColor = '#B3B3B3'
                          value = {this.state.pre_amount.value}
                          data={this.state.donation_list}
                          onChangeText = {(value,index,data)=>{if(data[index].index === 'specify'){this.setState({ pre_amount:data[index],other_amount:''});}else{this.setState({ pre_amount:data[index]});} this.hideErrors();}}
                        />
                        <Text style = {[styles.errorMsg ,styles.TextInputContainer]}>{this.state.errorMsg['pre_amount']}</Text>
                    </View>
                    <View style={[hide ? styles.hide : styles.show,]}>
                    {(this.state.pre_amount.index == 'specify') ?
                            (<View><View style = {[styles.inputBorderBottom]}>
                              <TextInput
                              style = {styles.TextInputStyle}
                              keyboardType = 'numeric'
                              placeholderTextColor = "#b7b7b7"
                              placeholder = {Label.t('11')}
                              underlineColorAndroid = 'transparent'
                              multiline = {false} maxLength = {6}
                              returnKeyType="send"
                              autoCapitalize="none"
                              autoCorrect={false}
                              value= {this.state.other_amount}
                              onChangeText = {(val) => {this.setState({other_amount: val});this.hideErrors();}}
                              />
                              <Image style = {styles.TextInputIcon} source = {images.dollarIcon}/>
                            </View>
                            <Text style = {[styles.errorMsg ,styles.TextInputContainer]}>{this.state.errorMsg['other_amount']}</Text></View>) : (<Text style={{height:0}}></Text>)}
                      </View>
                    <View style={styles.marginBottomFive}>
                        <TouchableOpacity style={styles.flexDirectionRow}
                        onPress={ () => {        this.setState({ checkboximg: !this.state.checkboximg });} }
                        >
                            {this.renderImage()}
                            <Text style={styles.sharefbtext}>{Label.t('12')}</Text>
                        </TouchableOpacity>
                    </View>
                        <TouchableOpacity
                        style = {[styles.signInButtonContainer,{backgroundColor:'#439FD8'}]}
                        onPress = {this.sendgiftandcharity}
                        ><Text style = {styles.signInButton}>
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
