import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,ScrollView,
  AsyncStorage,
  Modal,
  Picker,
  WebView,
  Keyboard,
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
import { USER_KEY, AUTH_TOKEN, USER_DETAILS, onSignIn, setUserDetails, afterSignIn ,onSignOut} from '../Constant/Auth';
import {callApiWithAuth,callApiWithoutAuth, callApiToPaypal} from '../Service/WebServiceHandler';
const date = new Date(Date.now());
import { NavigationActions } from 'react-navigation';
import  {fbAuthpublish}  from '../Component/Fblogin';
import FBSDK  from 'react-native-fbsdk';
const {
  LoginManager,
  AccessToken,
  ShareApi,
  ShareDialog,
} = FBSDK;
import DirectiveMsg from '../Component/DirectiveMsg';
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
    //this.fbshareposttest = this.fbshareposttest.bind(this);
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
        fbshareModal:false,
        fbMessage: '',
        payment_env:'SANDBOX',
        payKey:'',
        trackingid:'',
        statusmsg:'',
        modelstatusmsg: false,
        paymentalerthead: '',
        paymentalertmsg: '',
        auth_token:'',
        user_details:'',
        loopbreak:0,
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
      onSignOut(this);
      Toast.show(err);
    });
    AsyncStorage.getItem(USER_DETAILS).then((details)=>{
      details = JSON.parse(details);
      this.setState({user_details: details});
      callApiWithoutAuth('charityList','GET' ).then((response) => {
          if(response.status === 200){
            response.json().then((responseobject) => {
              console.log(responseobject.data);
              let removeoptionidotwantcharitythistime ='';
              let charityList = Object.keys(responseobject.data).map(function(key,data) {
                console.log(responseobject.data[key].id !== settings.DONOT_CHARITY_ID);
                console.log(responseobject.data[key].id);
                console.log(settings.DONOT_CHARITY_ID);
                if(responseobject.data[key].id === settings.DONOT_CHARITY_ID){
                  removeoptionidotwantcharitythistime = key;
                }
                  return { value: responseobject.data[key].organization, index:responseobject.data[key].id, logo:responseobject.data[key].logo};

               });
               console.log(removeoptionidotwantcharitythistime);
               charityList.splice(removeoptionidotwantcharitythistime, 1);// to remove i don want charity at this time
               //console.log(charityList);
               if(this.state.user_details.charity[0] !== undefined && this.state.user_details.charity[0].charity_id !== settings.DONOT_CHARITY_ID){

                    let charity_type_label='';
                    let logo='';
                    Object.keys(responseobject.data).map((key,data) => {
                       if(responseobject.data[key].id == this.state.user_details.charity[0].charity_id){
                         charity_type_label = responseobject.data[key].organization;
                         logo = responseobject.data[key].logo;
                         return false;
                       }
                     });console.log(this.state.user_details.charity[0]);
                     this.setState({
                       showProgress : false,
                       charity_list : charityList,
                       charity_type:{
                   value:charity_type_label,
                   index:this.state.user_details.charity[0].charity_id,
                   logo:logo}
                     });
                   }else {
                     this.setState({
                       showProgress : false,
                       charity_list : charityList,});
                   }
            });
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
              if(this.state.user_details.charity[0] !== undefined && this.state.user_details.charity[0].charity_id !== settings.DONOT_CHARITY_ID){
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
                  donation_value = Label.t('142');
                  donation_label = Label.t('143');
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

          }else if (response.status === 500) {
             this.setState({showProgress : false});
          }
       }).catch((error) => {console.log(error); });
    }).catch((err)=>{
      Toast.show(err);
    });
  }
senddonation(){
    Keyboard.dismiss();
    let error = this.state.errorMsg;
    let shareonfb = !this.state.checkboximg;
    error.charity_type = '';
    error.pre_amount = '';
    error.other_amount = '';
    let flag = true;

    if(this.state.charity_type == ''){
    flag = false;
    error.charity_type = Label.t('45');
    }
     if(this.state.pre_amount == ''){
      flag = false;
      error.pre_amount = Label.t('46');
      }
      if(this.state.pre_amount.index == Label.t('142')){

        if(this.state.other_amount == ''){
        flag = false;
        error.other_amount = Label.t('47');
        }
      }
    if(flag != true){
        this.setState({errorMsg: error});
      }
      else
      {

        let param = {charity_id: this.state.charity_type.index,donation_amount: this.state.pre_amount.index == Label.t('142') ? this.state.other_amount : this.state.pre_amount.index,facebook_share:this.state.checkboximg ? 0 : 1 ,facebook_message:this.state.fbMessage}
        console.log(JSON.stringify(param));
        //API Call
        //for test
        checkinternetconnectivity().then((response)=>{
          if(response.Internet == true){
            this.setState({showProgress : true});
            if(this.state.user_details.paypal !==null &&  this.state.user_details.paypal !== ''){
              callApiWithAuth('charitydonation','POST',this.state.auth_token, param ).then((response) => {
               if(response.error !== undefined){
                 response.json().then((responseobject) => {
                   console.log(responseobject);

                 });
                 this.setState({showProgress : false});
                 Toast.show(Label.t('149'));
               }else if(response.status === 201){
                 response.json().then((responseobject) => {
                   console.log(responseobject);//CREATED/COMPLETED/INCOMPLETE/ERROR/REVERSALERROR/PROCESSING/PENDING
                   if(responseobject.data.paymentExecStatus === 'CREATED'){
                     this.setState({payment_env: responseobject.data.payment_env, payKey:responseobject.data.payKey,trackingid:responseobject.data.trackingId,modalVisible:true,showProgress : false});
                   }else if(responseobject.data.paymentExecStatus === 'COMPLETED'){
                       this.setState({ modalVisible: false,paymentalerthead:  Label.t('120')  ,paymentalertmsg:  Label.t('121'),modelstatusmsg: true,showProgress : false,statusmsg :'complete'});
                   }

                 });
                 Toast.show('');
               }else if (response.status === 401) {
                 onSignOut(this);
                 this.setState({showProgress : false});
                 Toast.show(Label.t('51'));
               }else if (response.status === 406) {
                 response.json().then((responseobject) => {
                   this.setState({showProgress : false});
                   console.log(responseobject);
                 //  Toast.show(responseobject.error_messages);
                   Toast.show(Label.t('137'));
                 });
               }else if (response.status === 500) {
                 this.setState({showProgress : false});
                 Toast.show(Label.t('52'));
                 }
              });

              //  callApiToPaypal('Pay','POST', {actionType:'PAY',currencyCode:'USD',feesPayer:'EACHRECEIVER',receiverList:{receiver:[{amount:'0.01',email:'ronnage123@gmail.com',primary:false}]},requestEnvelope:{errorLanguage:'en_US'},returnUrl:'http://dbc.demos.classicinformatics.com?type=complete',cancelUrl:'http://dbc.demos.classicinformatics.com?type=cancel'}).then((response)=> {
              //    response.json().then((res)=>{ console.log(res);
              //      if(res.responseEnvelope.ack === 'Failure'){
              //        console.log(res);
              //         Toast.show(res.error.message);this.setState({showProgress : false});
              //      }else if(res.responseEnvelope.ack === 'Success'){
              //
              //      this.setState({payment_env: 'LIVE',payKey:res.payKey,modalVisible:true,showProgress : false});
              //      }
              //    });
              //  });
 //               callApiToPaypal('Pay','POST',{}).then((response)=> {console.log(response.json().then((res)=>{ //this.setState({payKey:res.payKey,modalVisible:true});
 // console.log(res);
 //             }));
 //             });



          }else{
            this.setState({showProgress : false});
            Toast.show(Label.t('153'));
          }
        }else{
          Toast.show(Label.t('140'));
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


_onNavigationStateChange (webViewState) { console.log(webViewState);
  if(webViewState.title === 'Return to Merchant - PayPal'){
    this.setState({ statusmsg: 'Cancel', modalVisible: false,paymentalerthead: Label.t('122') ,paymentalertmsg: Label.t('123'),modelstatusmsg: true});
  }else if(webViewState.title === 'Thank you for using PayPal!'){
    this.checkPaymentStatus({param:{payKey:this.state.payKey,trackingid:this.state.trackingid}});
  }else{
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
          console.log(this.state);
          console.log(result);
          console.log(this.state.payKey);
          console.log(this.state.trackingid);
          this.checkPaymentStatus({param:{payKey:this.state.payKey,trackingid:this.state.trackingid}});
        }
      }
    }
  }

}

checkPaymentStatus = (inputdata) => {
  console.log(inputdata);
  let param = inputdata.param;
  //let result = inputdata.result;
  console.log(param);
  //console.log(result);
  checkinternetconnectivity().then((response)=>{

    if(response.Internet == true){
      let result = '';
      let head = '';
      let message = '';
      this.setState({showProgress : true});
      console.log(this.state);
      callApiWithoutAuth('paymentdetails','POST', param ).then((response) => {
        if(response.status === 201){
          response.json().then((responseobject) => {
            console.log(responseobject);//CREATED/COMPLETED/INCOMPLETE/ERROR/REVERSALERROR/PROCESSING/PENDING
            if(responseobject.data.responseEnvelope.ack == 'Success'){
              switch(responseobject.data.status){
                case 'COMPLETED':
                  result ='complete';
                  head = Label.t('120');
                  message = Label.t('121');
                break;
                case 'CREATED':
                  result ='cancel';
                  head = Label.t('122');
                  message = Label.t('123');
                break;
                case 'PROCESSING':
                  result ='PROCESSING';
                  head = 'Payment processing ...';
                  message = '';
                break;
                case 'PENDING':
                  result ='PENDING';
                  head = 'Payment Pending.';
                  message = '';
                break;
                case 'INCOMPLETE':
                  result ='INCOMPLETE';
                  head = 'Payment Incomplete.';//Label.t('120');
                  message = '';
                break;
                case 'REVERSALERROR':
                  result ='INCOMPLETE';
                  head = 'Payment REVERSALERROR.';//Label.t('120');
                  message = '';
                break;
                case 'ERROR':
                  result ='INCOMPLETE';
                  head = 'Payment Error';
                  message = '';
                break;
                default:
                result ='APICALLFAILED';
                head = 'Payment chack failed.';
                message = '';
                break;

              }
              this.setState({ showProgress : false,statusmsg: result, modalVisible: false,paymentalerthead: head ,paymentalertmsg: message,modelstatusmsg: true});
            }

          });
        }else if (response.status === 406) {
          response.json().then((responseobject) => {
            this.setState({showProgress : false});
            console.log(responseobject);
          //  Toast.show(responseobject.error_messages);
            Toast.show(Label.t('137'));
          });
        }else if (response.status === 500) {
          this.setState({showProgress : false});
          Toast.show(Label.t('52'));
          }
      }).catch((error) => {console.log(error); });
    console.log(this.state);
  }else{
    Toast.show(Label.t('140'));
  }
  });
}


hide = () => {
  this.checkPaymentStatus({param:{payKey:this.state.payKey,trackingid:this.state.trackingid}});
  this.setState({ modalVisible: false });
}
hideModal = () => {
  let shareData = this.state.shareLinkContent;
  shareData.contentDescription = this.state.fbMessage;
  this.setState({shareLinkContent:shareData,fbshareModal:false });
}
hidestatusmsg = () => { //console.log('in');
  this.setState({ modelstatusmsg: false });
  console.log(this.state);
  if(this.state.statusmsg ==='complete'){ //console.log('in1');
  console.log(!this.state.checkboximg);
    if(!this.state.checkboximg){
      ShareDialog.canShow(this.state.shareLinkContent).then(
      (canShow) => { console.log(canShow);
          if (canShow) {console.log(this.state.shareLinkContent);
          return ShareDialog.show(this.state.shareLinkContent);
          }
      }
      ).then(
      (result) => { console.log(result);
          if (result.isCancelled) {
          console.log('Share cancelled');
          this.props.navigation.dispatch(resetAction);
          } else {
              console.log('Share success with postId: ' + result.postId);
              this.props.navigation.dispatch(resetAction);
          }
      },
      (error) => {
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
  console.log(this.state.payment_env === 'LIVE'? settings.PAYPAL_LIVE_AUTHURL :  this.state.payment_env === 'SANDBOX'? settings.PAYPAL_SANDBOX_AUTHURL : ''+this.state.payKey);
console.log(this.state.charity_type);
  return(
    <Image style = {styles.backgroundImage} source = {images.loginbackground}>
      <View style={[styles.full]}>
      <Modal
          animationType={'slide'}
          visible={this.state.fbshareModal}
          onRequestClose={this.hideModal}
          transparent
        ><View style={[{
          flex: 1,
          backgroundColor:'rgba(0,0,0,0.5)',
          flexDirection: 'column',
          paddingTop:'30%',
          alignItems: 'center',

        }]}>
        <View style= {[ {  padding:10,
          width:'85%',
          backgroundColor:'#ffffff',
          alignItems: 'flex-start',}]}>
          <View style= {[ {  padding:10}]}><Text style={[{fontSize:20,fontWeight:'600',fontFamily:'Open Sans'}]}>Facebook Message</Text>
          <Text style= {[ {  marginTop:5}]}>Enter the message you would like to post on your FaceBook wall about this gift</Text></View>
          <View style={[{borderWidth: 1,
          borderRadius: 1,borderBottomWidth:null,borderColor:'#b7b7b7',padding:1,width:'100%'}]}>
              <TextInput style = {[{
              height: 80,
              padding:10,
              alignItems: "flex-start",
              textAlignVertical: "top",}]}
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
                  value= {this.state.fbMessage}
                  onSubmitEditing={(event) => {this.hideModal();}}
                  onChangeText = {(val) => {this.setState({fbMessage: val});}}
              />
          </View>
          <View style= {[ styles.flexDirectionRow,styles.paddingTopFive]}>
          <TouchableOpacity style={[{height:40,width:'30%',justifyContent:'center',alignSelf:'center',backgroundColor:'#e34c4b',borderWidth:1,borderColor:'gray',borderRadius:5}]} onPress={this.hideModal} >
            <Text style={[{justifyContent:'center',color:'#FFFFFF',alignSelf:'center'}]}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.marginLeftFive,{height:40,width:'30%',justifyContent:'center',alignSelf:'center',backgroundColor:'#61aa6c',borderWidth:1,borderColor:'gray',borderRadius:5}]} onPress={this.hideModal} >
            <Text style={[{justifyContent:'center',color:'#FFFFFF',alignSelf:'center'}]}>Save</Text>
          </TouchableOpacity>
          </View>
        </View>
        </View>
      </Modal >
      <ModalAlert visible={this.state.modelstatusmsg} onRequestClose={this.hidestatusmsg} head={this.state.paymentalerthead} message={ this.state.paymentalertmsg }/>
          <Modal
            animationType={'slide'}
            visible={this.state.modalVisible}
            onRequestClose={this.hide}
            transparent
          >
            <View style={[styles.fulls,{flex:1,backgroundColor:"rgba(112, 79, 108, 0.5)"}]}>
              { this.state.payment_env === 'SANDBOX' ? (<Text style = {[{width:'100%',backgroundColor:'#ffffff',color:'blue'}]}>{Label.t('148')}</Text>): null}
                <WebView
                  source={{ uri: this.state.payment_env === 'LIVE'? settings.PAYPAL_LIVE_AUTHURL+this.state.payKey :  this.state.payment_env === 'SANDBOX'? settings.PAYPAL_SANDBOX_AUTHURL+this.state.payKey : '' }}
                  scalesPageToFit={true}
                  onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                  onError={this._onNavigationStateChange.bind(this)}
                  javaScriptEnabledAndroid={true}
                  domStorageEnabled={true}
                  automaticallyAdjustContentInsets={false}
                  startInLoadingState={true}
                  style={[{paddingTop:20}]}
                />
            </View>
            <View style={[{backgroundColor:'#FFFFFF',borderTopWidth:1,borderColor:'#b7b7b7'}]}>
            <TouchableOpacity style={[{width:'30%',backgroundColor:'#e34c4b',padding:6,margin:5,borderWidth:1,borderColor:'#aa5c5c',borderRadius:4,borderBottomWidth:null,justifyContent:'center',alignSelf:'center'}]} onPress={this.hide} >
              <Text style={[{fontWeight:'bold',color:'#FFFFFF',justifyContent:'center',alignSelf:'center'}]}>close</Text>
            </TouchableOpacity>
            </View>
          </Modal >
        <MyActivityIndicator progress={this.state.showProgress} />
          <ScrollView  style={styles.scrollviewheight} keyboardShouldPersistTaps='always'>
          <TouchableOpacity style={[{flex:1}]} activeOpacity = { 1 } onPress={ Keyboard.dismiss } >
            <Image style = {[styles.top,styles.containerWidth]} source = {images.topbackground} >
              <TouchableOpacity style = {styles.dashboardIconw} onPress={()=>{this.props.navigation.dispatch(resetAction);Keyboard.dismiss();}}>
                  <Image style = {styles.img} source = {images.dashboardIcon} />
              </TouchableOpacity>
              <View style = {styles.titleContainer}>
                  <Text style = {styles.titleTextFirst}>{Label.t('9')}</Text>
                  <Text style = {styles.titleTextSecond}>{Label.t('1')}</Text>
              </View>
            </Image>
            <View style={[styles.formgroup,styles.containerWidth]}>

              <View style = {styles.innerwidth}>
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
                                <Text style = {styles.TextInputIcon}>{this.state.user_details.currency}</Text>
                            </View>
                            <Text style = {styles.errorMsg}>{this.state.errorMsg['pre_amount']}</Text>
                        </View>
                    </View>

                    <View style={[hide ? styles.hide : styles.show,]}>
                    {(this.state.pre_amount.index == Label.t('142')) ?
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
                              <Text style = {styles.TextInputIcon}>{this.state.user_details.currency}</Text>
                            </View>
                            <Text style = {[styles.errorMsg ,styles.TextInputContainer]}>{this.state.errorMsg['other_amount']}</Text></View>) : (<Text style={{height:0}}></Text>)}
                      </View>
                    <View style={[styles.marginBottomFive]}>
                        <TouchableOpacity style={styles.sharefbcontainer}
                        onPress={ () => {this.setState({ checkboximg: !this.state.checkboximg
                          //,fbshareModal: this.state.checkboximg ? true : false
                        });
                        //this.fbshareposttest();
                      } }
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
                          <DirectiveMsg message={Label.t('154')} icon = {false} />
                    </View>
            </View>
            </TouchableOpacity>
            </ScrollView>
          </View>
        </Image>);

    }
}
// // //to test fb share
// // fbshareposttest = () => {
// //   console.log('hello');
// //   console.log(this.state);
// //   ShareDialog.canShow(this.state.shareLinkContent).then(
// //   (canShow) => { console.log(canShow);
// //       if (canShow) {console.log(this.state.shareLinkContent);
// //       return ShareDialog.show(this.state.shareLinkContent);
// //       }
// //   }
// //   ).then(
// //   (result) => { console.log(result);
// //       if (result.isCancelled) {
// //       console.log('Share cancelled');
// //       this.props.navigation.dispatch(resetAction);
// //       } else {
// //           console.log('Share success with postId: ' + result.postId);
// //           this.props.navigation.dispatch(resetAction);
// //       }
// //   },
// //   (error) => {
// //       console.log('Share fail with error: ' + error);
// //   }
// //   );
// // }
// //to test fb share
// fbshareposttest = () => {
//   fbAuthpublish().then((data)=> {
//
//
//     console.log(data);
//       ShareApi.canShare(this.state.shareLinkContent).then(
//           (canShare) => {
//             if (canShare) {
//               return ShareApi.share(this.state.shareLinkContent, '/me', 'Some message.');
//             }
//           }
//         ).then(
//           (result) => {
//             alert('Share operation with ShareApi was successful');
//           },
//           (error) => {
//             alert('Share with ShareApi failed with error: ' + error);
//             console.log('Share with ShareApi failed with error: ' + error);
//           });
//
//   });
//   console.log('hello');
//   console.log(this.state);
// // LoginManager.logInWithPulishPermissions(['publish_actions']).then((result) => {
// // console.log(result);
// //     if(result.isCancelled){
// //       //resolve({status:'cancel', data:result});
// //         Toast.show('Log In cancelled');
// //     }
// //     else {
// // //         AccessToken.getCurrentAccessToken().then(
// // // (fdata) => { console.log(fdata);
// // //   // ShareApi.canShare(this.state.shareLinkContent).then(
// // //   //     (canShare) => {
// // //   //       if (canShare) {
// // //   //         return ShareApi.share(this.state.shareLinkContent, '/me', 'Some message.');
// // //   //       }
// // //   //     }
// // //   //   ).then(
// // //   //     (result) => {
// // //   //       alert('Share operation with ShareApi was successful');
// // //   //     },
// // //   //     (error) => {
// // //   //       alert('Share with ShareApi failed with error: ' + error);
// // //   //       console.log('Share with ShareApi failed with error: ' + error);
// // //   //     });
// // // }
// // //
// // //         );
// //     }
// // }, function(error){
// //     console.log('An error occured: ' + error)
// //     resolve({status:'error', data:error});
// // });
//
// }
