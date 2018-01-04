import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  AsyncStorage,
  Modal
} from 'react-native';
import Label from '../Constant/Languages/LangConfig';
import Toast from 'react-native-simple-toast';
import images from '../Constant/Images';
import {checkinternetconnectivity} from '../Constant/netinfo';
import styles from './Style/BirthdayCampaignStyle';
import MyActivityIndicator from '../Component/MyActivityIndicator';
import ModalAlert from '../Component/ModalAlert';
import { USER_KEY, AUTH_TOKEN, USER_DETAILS, onSignIn, setUserDetails, afterSignIn ,onSignOut} from '../Constant/Auth';
import {callApiWithAuth} from '../Service/WebServiceHandler';
import { NavigationActions } from 'react-navigation';
import DatePicker from 'react-native-datepicker';
import MultiSelect from 'react-native-multiple-select';

const date = new Date(Date.now());

const resetAction = NavigationActions.reset({
     index: 0,
     actions: [NavigationActions.navigate({ routeName: 'DASHBOARD'})],
   });

export default class BirthdayCampaign extends Component {

constructor(props){
    super(props);
    this.invitefriend = this.invitefriend.bind(this);
    this.hideErrors = this.hideErrors.bind(this);
    let month = (date.getMonth()+1).toString();
    month = month.length>1?month:'0'+month;
    this.state = {
      maxdob: month+'/'+date.getDate()+'/'+date.getFullYear(),
      initialdob: month+'/'+date.getDate()+'/'+(date.getFullYear() - 15),
      paypalemail:'',
      Name:'',
      errorMsg:{"emails":'', "Name":'',"paypalemail":''},
      auth_token: '',
      showProgress: false,
      modalVisible: false,
      statusmsg:'',
      Friends:[],
      emails: [],
      emailscommasaprated: '',
      selectedItems: [],
      itemcountcheck: false,
    };
    
}

componentWillMount(){
        AsyncStorage.getItem(AUTH_TOKEN).then((token)=>{
           this.setState({auth_token: token});
           checkinternetconnectivity().then((response)=>{
            if(response.Internet == true){
            this.setState({showProgress : true});
            callApiWithAuth('user/friends','GET', this.state.auth_token).then((response) => {
  
              if(response.status === 200){
                response.json().then((responseobject) => {
                  console.log(responseobject.data);
                  let Friends = Object.keys(responseobject.data).map(function(key,data) {
                    return { id:responseobject.data[key].id+'#'+responseobject.data[key].email,name:responseobject.data[key].full_name,};
                   });
                  this.setState({ Friends: Friends });
                });
                this.setState({showProgress : false});
                //Toast.show('Task fetched');
              }else if (response.status === 401) {
                 this.setState({showProgress : false});
                 Toast.show(Label.t('64'));
              }else if (response.status === 404) {
                 this.setState({showProgress : false});
                 Toast.show('No friends found');
              }else if (response.status === 500) {
                 this.setState({showProgress : false});
                 Toast.show(Label.t('64')+':500');
              }
           }).catch((error) => { this.setState({showProgress : false}); console.log(error); });
          }else{
            Toast.show(Label.t('140'));
          }
          });
        }).catch((err)=>{
          onSignOut;
          Toast.show(err);
        });
        
   }

    invitefriend = ()=> {
          let error = this.state.errorMsg;
          error.emails = '';
          error.paypalemail = '';
          error.Name = '';
          let flag = '';
          var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

          if(this.state.emails == '' || this.state.emails == []){
            flag = '0';
            error.emails = Label.t('171');
          }
          if(this.state.Name == ''){
            flag = '0';
            error.Name = Label.t('132');
          }
          if(this.state.paypalemail == ''){
            flag = '0';
            error.paypalemail = Label.t('75');
          }else if(!re.test(this.state.paypalemail)){
            flag = '0';
            error.paypalemail = Label.t('76');
          }
          if(flag != ''){
            this.setState({errorMsg: error});
          }else {
           
              let emails = '';
              Object.keys(this.state.emails).map((key) => {
                let emailidtemp = this.state.emails[key].split('#');
                if(key == 0){
                  emails = emailidtemp[1]
                }else{
                  emails = emails+','+emailidtemp[1];
                }
               });
              let param = {};

              param['emails'] = emails;
              param['name'] = this.state.Name;
              param['dob'] = this.state.initialdob;
              param['paypalemail'] = this.state.paypalemail;
                console.log(param);
              this.setState({ emailscommasaprated:emails, modalVisible: true});
        }

    }
    startcampaign = ()=>{
      
      const {emailscommasaprated, Name, paypalemail, initialdob } = this.state;
       //API Call
       checkinternetconnectivity().then((response)=>{
        if(response.Internet == true){
        this.setState({showProgress : true,modalVisible: false});
        let param = {};
        param['emails'] = emailscommasaprated;
        param['friend_name'] = Name;
        param['bday'] = initialdob;
        param['paypal_email'] = paypalemail;
        console.log(param);
        callApiWithAuth('startcampaign','POST',this.state.auth_token, param
        ).then((response) => {
          if(response.status === 201){
            response.json().then((responseobject) => {
              console.log(responseobject);
              this.setState({showProgress : false});
            });
            Toast.show(Label.t('173'));
            this.props.navigation.dispatch(resetAction);
          }else if (response.status === 401) {

            onSignOut(this);
            this.setState({showProgress : false});
            Toast.show(Label.t('51'));
          }else if (response.status === 406) {
            response.json().then((responseobject) => {
              this.setState({showProgress : false});
              Toast.show(responseobject.error_messages);
            });
          }else if (response.status === 500) {
            this.setState({showProgress : false});
            Toast.show(Label.t('52'));
            }
        }).catch((error) => {
          this.setState({showProgress : false});
          Toast.show(Label.t('155'));
          console.log(error); 
          });
      }else{
        Toast.show(Label.t('140'));
      }
      });
    };
    hideErrors(){
      let error = this.state.errorMsg;
      error.emailMsg = '';
      error.Name = '';
      this.setState({errorMsg: error});
    }

    hidestatusmsg(){
      this.setState({ modelstatusmsg: false });
      if(this.state.statusmsg === 'success'){
          this.props.navigation.dispatch(resetAction);
        }else {
          this.props.navigation.dispatch(resetAction);
        }

      }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    displaybirthdays(){
      return  (<View style={{padding:'3%'}}><Text style={[{fontWeight:'bold'}]}>Receiver Users: </Text><Text>{this.state.emailscommasaprated}</Text>
        <Text style={{paddingTop:'2%'}}>Our Friend, <Text style={[{fontWeight:'bold'}]}>{this.state.Name}</Text> is having a Birthday on <Text style={[{fontWeight:'bold'}]}>{this.state.initialdob}</Text> and I’m starting a “Birthday Campaign” with a Cool New Web Site called www.DollarBirthdayClub.com! With Dollar Birthday Club, we can EASILY send <Text style={[{fontWeight:'bold'}]}>{this.state.Name}</Text> $1 or more with your PayPal Account and some of the money also automatically goes to some top Charities of your choice at the same time! If you do not have a PayPal Account, Sign Up for one For Free in minutes at https://www.paypal.com.</Text>
        <Text style={{paddingTop:'2%'}}>Simply go to www.DollarBirthdayClub.com and Register with your PayPal Account (You must have a PayPal Account to send Gift Dollars with Dollar Birthday Club), and add <Text style={[{fontWeight:'bold'}]}>{this.state.Name}</Text> Birthdate, <Text style={[{fontWeight:'bold'}]}>{this.state.initialdob}</Text>, to your personalized Dollar Birthday Club Birthday Calendar where you can import and add ALL of your Friends Birthday’s. Sending $1 with Birthday Dollar Club is CHEAPER than sending a Birthday Card, <Text style={[{fontWeight:'bold'}]}>{this.state.Name}</Text> could get $200-$300 or more in Birthday Money from Friends like You AND money is raised for Charity! Everybody Wins!</Text>
        <Text style={{paddingTop:'2%'}}><Text style={[{fontWeight:'bold'}]}>{this.state.Name}</Text> ’s PayPal Address is <Text style={[{fontWeight:'bold'}]}>{this.state.paypalemail}</Text> Add this PayPal address to your “Add a Friend” list at Dollar Birthday Club and Send a Gift to <Text style={[{fontWeight:'bold'}]}>{this.state.Name}</Text> on or before <Text style={[{fontWeight:'bold'}]}>{this.state.initialdob}</Text>!</Text></View>)
  }

  onSelectedItemsChange = selectedItems => {
    console.log(selectedItems);
    this.setState({ selectedItems: selectedItems ,emails: selectedItems});
    //console.log(this.state.emails);
  };

render(){
  const { selectedItems } = this.state;
    return(<Image style = {styles.backgroundImage} source = {images.loginbackground}>
      <View style={[styles.full]}>
        <MyActivityIndicator progress={this.state.showProgress} />
          <ScrollView  style={styles.scrollviewheight} keyboardShouldPersistTaps="always">
            <Image style = {[styles.top,styles.containerWidth]} source = {images.topbackground} >
              <TouchableOpacity style = {[styles.dashboardIconw]}  onPress={()=>{this.props.navigation.goBack()}}>
                  <Image style={styles.img} source = {images.backIcon}></Image>
              </TouchableOpacity>
              <View style = {[styles.titleContainer]}>
                  <Text style = {styles.titleTextFirst}>{Label.t('162')}</Text>
                  <Text style = {styles.titleTextSecond}>{Label.t('1')}</Text>
              </View>
            </Image>
            <View style={[styles.formgroup,styles.containerWidth,{top:-18}]}>
              <View style={[styles.SettingsTextInputContainer,styles.backgroundwhite,{marginBottom:20}]}>
                <Text>{Label.t('163')}</Text>
                <Text>{Label.t('164')}</Text>
                <Text>{Label.t('165')}</Text>
                <Text style={[styles.textst1]}>{Label.t('166')}</Text>
                <Text style={[styles.textst1]}>{Label.t('167')}</Text>
              </View>
              <View style = {[styles.SettingsTextInputContainer]}>
                <MultiSelect
                  hideTags
                  items={this.state.Friends}
                  uniqueKey="id"
                  ref={(component) => { this.multiSelect = component}}
                  onSelectedItemsChange={this.onSelectedItemsChange}
                  selectedItems={selectedItems}
                  selectText="Select E-Mail Recipients"
                  searchInputPlaceholderText="Search Items..."
                  onChangeInput={ (text)=> console.log(text)}
                  tagRemoveIconColor="#CCC"
                  tagBorderColor="#CCC"
                  tagTextColor="#CCC"
                  selectedItemTextColor="#CCC"
                  selectedItemIconColor="#CCC"
                  itemTextColor="#000"
                  displayKey="name"
                  searchInputStyle={{ color: '#CCC' }}
                  submitButtonColor="#CCC"
                  submitButtonText="Close"
                />
              <View>
                {/* { this.multiSelect.getSelectedItemsExt(selectedItems)} */}
              </View>
            </View>
            <Text style = {[styles.errorMsg,styles.SettingsTextInputContainer]}>{this.state.errorMsg['emails']}</Text>
             <View style = {[styles.SettingsTextInputContainer,styles.inputBorderBottom]}>
                        <TextInput style = {[styles.TextInputStyle,styles.font3]}
                            keyboardType = 'default'
                            placeholderTextColor = "#b7b7b7"
                            placeholder = {Label.t('168')}
                            underlineColorAndroid = 'transparent'
                            value = {this.state.Name}
                            multiline = {false}
                            maxLength = {100}
                            returnKeyType={Label.t('3')}
                            autoCorrect={false}
                            onChangeText = {(val) => {this.setState({Name: val});this.hideErrors();}}
                        />
                        <Image style = {styles.TextInputIcon} source = {images.fullName}/>
                    </View>
                    <Text style = {[styles.errorMsg,styles.SettingsTextInputContainer]}>{this.state.errorMsg['Name']}</Text>
                  <View style = {[styles.SettingsTextInputContainer]}>
                    <Text style = {[styles.dob_label, styles.font1]}>{Label.t('43')}</Text>
                    <DatePicker
                      style = {[styles.date_picker]}
                      date = {this.state.initialdob}
                      format = "MM/DD/YYYY"
                      maxDate = {this.state.maxdob}
                      confirmBtnText = {Label.t('6')}
                      cancelBtnText = {Label.t('7')}
                      iconSource = {images.dropdownArrow}
                      onDateChange = {(date) => {this.setState({initialdob:date})}}
                      customStyles={{dateInput: styles.dateInput,
                                    dateIcon: styles.dateIcon,}}
                    />
                  </View>
                    <View style = {[styles.SettingsTextInputContainer,styles.inputBorderBottom]}>
                        <TextInput
                            style = {[styles.TextInputStyle,styles.font3]}
                            ref='thirdInput'
                            placeholderTextColor = "#b7b7b7"
                            placeholder = {Label.t('169')}
                            value = {this.state.paypalemail}
                            underlineColorAndroid = 'transparent'
                            multiline = {false}
                            maxLength = {100}
                            returnKeyType= {Label.t('3')}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText = {(val) => {this.setState({paypalemail: val});this.hideErrors();}}
                        />
                        <Image style = {styles.TextInputIcon} source = {images.emailIcon}/>
                    </View>
                    <Text style = {[styles.errorMsg,styles.SettingsTextInputContainer]}>{this.state.errorMsg['paypalemail']}</Text>
                    <View style = {[styles.SettingsTextInputContainer,{marginTop:10}]}>
                    <TouchableOpacity style = {[styles.signInButtonContainer,{backgroundColor:'#DC6966',borderRadius:3,}]}  onPress = {this.invitefriend}>
                      <Text style = {styles.signInButton}>
                      { Label.t('170')}
                      </Text>
                    </TouchableOpacity>
                    </View>
                </View>
                <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {this.setModalVisible(false) }}
            >
                <View style={styles.modalparentview}>
                    <View style={styles.modalsizeone}>
                      <View style={[styles.headmodal,{flexDirection:'row',justifyContent:'center',alignItems:'center'}]}>
                        <Text style={{flex:0.9,paddingLeft:'3%',fontSize:18,color:'#ffffff'}}>{Label.t('162')}</Text>
                        <TouchableOpacity style={{flex:0.1,padding:10,alignSelf:'flex-end'}} onPress={() => { this.setModalVisible(!this.state.modalVisible) }}>
                            <Image style={{width:15,height:15}} source={images.crossicon} />
                        </TouchableOpacity>
                      </View>
                      <View style={{maxHeight:'84%'}} >
                          <ScrollView keyboardShouldPersistTaps='never'>
                              {this.displaybirthdays()}
                          </ScrollView>
                      </View>
                      <View style={[{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:3}]}>
                        <TouchableOpacity style = {[{padding:10,alignSelf:'flex-start',backgroundColor:'#5e4289',borderRadius:3,marginRight:'4%',marginBottom:3}]}  onPress = {this.startcampaign}>
                        <Text style={{color:'#ffffff',fontWeight:'bold',alignSelf:'center'}}>{Label.t('162')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{padding:10,alignSelf:'flex-end',backgroundColor:'#DC6966',borderRadius:3,marginBottom:3}} onPress={() => { this.setModalVisible(!this.state.modalVisible) }}>
                        <Text style={{color:'#ffffff',fontWeight:'bold',alignSelf:'center'}}>{Label.t('172')}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                </View>
            </Modal>
            </ScrollView>
          </View>
        </Image>
        );
    }
}
