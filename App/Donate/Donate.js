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
import styles from './Style/DonateStyle';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import {checkinternetconnectivity} from '../Constant/netinfo';
import DatePicker from 'react-native-datepicker';
import MyActivityIndicator from '../Component/MyActivityIndicator';
import ModalAlert from '../Component/ModalAlert';
import settings from '../Constant/UrlConstant';
import { Dropdown } from 'react-native-material-dropdown';
import { USER_KEY, AUTH_TOKEN, USER_DETAILS, onSignIn, setUserDetails, afterSignIn } from '../Constant/Auth';
import {callApiWithAuth,callApiWithoutAuth, callApiToPaypal} from '../Service/WebServiceHandler';
const date = new Date(Date.now());
import { NavigationActions } from 'react-navigation';
import {ShareDialog} from 'react-native-fbsdk';
const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'DASHBOARD' })],
  });
export default class Donate extends Component {

constructor(props){
    super(props);
    this.senddonation = this.senddonation.bind(this);
    this.hideErrors = this.hideErrors.bind(this);
    this.hidestatusmsg = this.hidestatusmsg.bind(this);
    this.state = {
        showProgress: false,
        charity_type:'',
        charity_list:[],
        donation_list:[],
        pre_amount:'',
        other_amount:'',
        checkboximg: true,
        errorMsg:{charity_type:'', pre_amount:'', other_amount:''},
        shareLinkContent: {contentType: 'link',contentUrl: 'https://www.dollarbirthdayclub.com/',contentDescription: 'I just donated to this charity'},
        modalVisible:false,
        payUrl: settings.PAYPAL_ENV === 'live'? settings.PAYPAL_LIVE_AUTHURL : settings.PAYPAL_SANDBOX_AUTHURL,
        payKey:'',
        statusmsg:'',
        modelstatusmsg: false,
        paymentalerthead: '',
        paymentalertmsg: '',
        auth_token:'',
        user_details:'',
    };
}

componentWillMount(){

    AsyncStorage.getItem(AUTH_TOKEN).then((token)=>{
       this.setState({auth_token: token});
        //  callApiWithAuth('user/friends','GET', this.state.auth_token).then((response) => {
        //     if(response.status === 200){
        //       response.json().then((responseobject) => {
        //         this.setState({ Friends: responseobject.data });
        //       });
        //       this.setState({showProgress : false});
        //       //Toast.show('Task fetched');
        //     }else if (response.status === 401) {
        //        this.setState({showProgress : false});
        //        Toast.show(Label.t('64'));
        //     }else if (response.status === 500) {
        //        this.setState({showProgress : false});
        //        Toast.show(Label.t('64')+':500');
        //     }
        //  }).catch((error) => { this.setState({showProgress : false}); console.log(error); });
    }).catch((err)=>{
      onSignOut;
      Toast.show(err);
    });
    AsyncStorage.getItem(USER_DETAILS).then((details)=>{
      details = JSON.parse(details);
      this.setState({user_details: details});
      callApiWithoutAuth('charityList','GET' ).then((response) => {
          if(response.status === 200){
            response.json().then((responseobject) => {
              let charityList = Object.keys(responseobject.data).map(function(key,data) {
                return { value: responseobject.data[key].organization, index:responseobject.data[key].id, logo:responseobject.data[key].logo};

               });
               if(this.state.user_details.charity[0] !== undefined){

                    let charity_type_label='';
                    Object.keys(responseobject.data).map((key,data) => {
                       if(responseobject.data[key].id == this.state.user_details.charity[0].charity_id){
                         charity_type_label = responseobject.data[key].organization;
                         return false;
                       }
                     });
                     this.setState({
                       showProgress : false,
                       charity_list : charityList,
                       charity_type:{
                   value:charity_type_label,
                   index:this.state.user_details.charity[0].charity_id}
                     });
                   }else {
                     this.setState({
                       showProgress : false,
                       charity_list : charityList,});
                   }
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
              if(this.state.user_details.charity[0] !== undefined ){
               let donation_label ='';
               let donation_value = '';
               let donation_value1 = '';
               Object.keys(responseobject.data).map((key,data) => {
                  if(key == this.state.user_details.charity[0].gift_amount){
                    donation_value = key;
                    donation_label = responseobject.data[key];
                    return false;
                  }
                });
               if(donation_label == '' && this.state.user_details.charity[0].gift_amount !== '' ){
                  donation_value = 'specify';
                  donation_label = 'Speicify Amount';
                  donation_value1= this.state.user_details.charity[0].gift_amount+"";
               }
               this.setState({
                 showProgress : false,
                 donation_list : donationList,
                 pre_amount : { value: donation_label,index:donation_value},
                 other_amount : donation_value1,
               });
             }else{
               this.setState({
                 showProgress : false,
                 donation_list : donationList,
               });
             }
               });

          }else if (response.status === 401) {
             this.setState({showProgress : false});
          }else if (response.status === 500) {
             this.setState({showProgress : false});
          }
       }).catch((error) => {console.log(error); });
    }).catch((err)=>{
      Toast.show(err);
    });
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

        let param = {charity_id: this.state.charity_type.index,donation_amount: this.state.pre_amount.index == 'specify' ? this.state.other_amount : this.state.pre_amount.index,facebook_share:this.state.checkboximg ? 0 : 1 ,facebook_message:""}
        console.log(param);
        //API Call
        //for test
        checkinternetconnectivity().then((response)=>{
          if(response.Internet == true){
            this.setState({showProgress : true});
            // callApiWithAuth('charitydonation','POST',this.state.auth_token, param ).then((response) => {
            //   if(response.status === 200){
            //     response.json().then((responseobject) => {
            //       console.log(responseobject);//CREATED/COMPLETED/INCOMPLETE/ERROR/REVERSALERROR/PROCESSING/PENDING
            //       if(responseobject.data.paymentExecStatus === 'CREATED'){
            //         this.setState({payKey:responseobject.data.payKey,modalVisible:true,showProgress : false});
            //       }else if(responseobject.data.paymentExecStatus === 'COMPLETED'){
            //           this.setState({ modalVisible: false,paymentalerthead:  Label.t('120')  ,paymentalertmsg:  Label.t('121'),modelstatusmsg: true});
            //       }
            //
            //     });
            //     Toast.show('');
            //   }else if (response.status === 401) {
            //     response.json().then((responseobject) => {
            //       console.log(responseobject);
            //     });
            //     this.setState({showProgress : false});
            //     Toast.show('Unauthorized');
            //   }else if (response.status === 406) {
            //     response.json().then((responseobject) => {
            //       this.setState({showProgress : false});
            //     //  Toast.show(responseobject.error_messages);
            //       Toast.show('Please Check Your Paypal Id and Currency.');
            //     });
            //   }else if (response.status === 500) {
            //     this.setState({showProgress : false});
            //     Toast.show('Unsuccessfull error:500');
            //     }
            // }).catch((error) => {console.log(error); });

            callApiToPaypal('Pay','POST', {actionType:'PAY',currencyCode:'USD',feesPayer:'EACHRECEIVER',receiverList:{receiver:[{amount:'0.01',email:'ronnage123@gmail.com',primary:false}]},requestEnvelope:{errorLanguage:'en_US'},returnUrl:'http://dbc.demos.classicinformatics.com?type=complete',cancelUrl:'http://dbc.demos.classicinformatics.com?type=cancel'}).then((response)=> {
              response.json().then((res)=>{ console.log(res);
                if(res.responseEnvelope.ack === 'Failure'){
                  console.log(res);
                   Toast.show(res.error.message);this.setState({showProgress : false});
                }else if(res.responseEnvelope.ack === 'Success'){

                this.setState({payKey:res.payKey,modalVisible:true,showProgress : false});
                }
              });
            });
            // callApiToPaypal('Pay','POST',{}).then((response)=> {console.log(response.json().then((res)=>{ this.setState({payKey:res.payKey,modalVisible:true});}));});
            // console.log(this.state);
        }else{
          Toast.show("No Internet Connection");
        }
        });

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


_onNavigationStateChange (webViewState) { console.log(webViewState.url);
  if(webViewState.url != undefined){
    substring = "?";
if(webViewState.url.includes(substring)){
  let url = webViewState.url.split("?");
  let urlparam = url[1].split("&");
  let result = {};
  let temp = '';
  Object.keys(urlparam).map((index) => {
    temp = urlparam[index].split('=');
    result[temp[0]] = temp[1];
  });
  if(result.hasOwnProperty('type') ){
    this.setState({ statusmsg: result.type, modalVisible: false,paymentalerthead: result.type ==='complete' ? Label.t('120') : result.type ==='cancel' ? Label.t('122') : '' ,paymentalertmsg: result.type ==='complete' ? Label.t('121') : result.type ==='cancel' ? Label.t('123') : '',modelstatusmsg: true});
  }
}
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
  console.log(this.state.payUrl+this.state.payKey);

  return(
      <View style={[styles.full]}>
      <ModalAlert visible={this.state.modelstatusmsg} onRequestClose={this.hidestatusmsg} head={this.state.paymentalerthead} message={ this.state.paymentalertmsg }/>
        <Modal
          animationType={'slide'}
          visible={this.state.modalVisible}
          onRequestClose={this.hide.bind(this)}
          transparent
        >
          <View style={[styles.full]}>
            <View style={[styles.full]}>
              <WebView
                style={[{ flex: 1 }, {marginTop: 20}]}
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
            <TouchableOpacity style = {styles.dashboardIconw} onPress={()=>{this.props.navigation.dispatch(resetAction)}}>
                <Image style = {styles.img} source = {images.dashboardIcon} />
            </TouchableOpacity>
            <View style = {styles.titleContainer}>
                <Text style = {styles.titleTextFirst}>{Label.t('9')}</Text>
                <Text style = {styles.titleTextSecond}>{Label.t('1')}</Text>
            </View>
            <View style = {[styles.formgroup]}>
                <ScrollView keyboardShouldPersistTaps="never"><View style = {styles.innerwidth}>
                    <View style={styles.logoview}>
                    {(this.state.charity_type.logo) ? (<Image style = {styles.charitylogo} source = {{uri : settings.BASE_URL+this.state.charity_type.logo}}></Image>) : (<Image style = {styles.charitylogo} source ={images.placeholderImage}/>)}
                        <View style={styles.selectboxes}>
                            <View style={styles.dropdown}>
                                <Dropdown
                                ref = 'ThirdInput'
                                label={Label.t('10')}
                                style = {styles.TextInputStyle}
                                containerStyle ={{marginTop:-40}}
                                baseColor = '#B3B3B3'
                                value = {this.state.charity_type.value}
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
                                    value = {this.state.pre_amount.value}
                                    data={this.state.donation_list}
                                    onChangeText = {(value,index,data)=>{this.setState({pre_amount:data[index]});this.hideErrors();}}
                                />
                            </View>
                            <Text style = {styles.errorMsg}>{this.state.errorMsg['pre_amount']}</Text>
                        </View>
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
                              {Label.t('112')}
                          </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
        );

    }
}
// <View style={[{backgroundColor:'#ffffff'}]}>
// <TouchableOpacity style={[{height:40,width:'30%',justifyContent:'center',alignSelf:'center',backgroundColor:'#FDAA3C',borderWidth:1,borderColor:'gray',borderRadius:5}]} onPress={this.hide.bind(this)} >
//   <Text style={[{justifyContent:'center',alignSelf:'center'}]}>close</Text>
// </TouchableOpacity>
// </View>
