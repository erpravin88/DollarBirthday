import {
  StyleSheet,
  Platform
  } from 'react-native';

  import {Dimensions} from 'react-native';
  const { width, height } = Dimensions.get('window');

  const styles = StyleSheet.create({

    backgroundImage: {

     flex:1,
     width:  '100%',
     height: '100%',
     resizeMode:'stretch'
    },
    baseContainer: {

     width: width,
     height: height,

   },

   logo: {
    width: 185,
    height: 103,
    resizeMode: 'contain',
    marginTop: (Platform.OS === 'ios')? '8%' : '1%',


  },

   titleContainer: {
     width: width,
     paddingTop: 20,
     alignItems: 'center',
     backgroundColor:'transparent',
     marginTop: 20
   },

   titleTextFirst: {
     fontSize: 18,
     color:'#efd7fe',
    fontFamily:'OpenSans-Semibold'
   },

   titleTextSecond: {
     fontSize: 25,
     fontWeight: 'bold',
     color:'#ffffff',
     fontFamily:'OpenSans-Semibold'
   },

   TextInputStyle: {

    width: '100%',
    height: 40,
    fontSize:18,
    paddingBottom:0,
    paddingBottom:5,
    paddingRight:22,
    fontFamily:'Open Sans'
  },

  TextInputContainer: {

   width: '85%',
   alignSelf: 'center',


  },

  EmailTextInputContainer: {

   width: '85%',
   alignSelf: 'center',
   paddingTop:'10%',

 },


  TextInputIcon: {

   width: 18,
   height: 18,
   borderBottomWidth: 1,
   resizeMode:'contain',
   position:'absolute',
   zIndex: 99,
   right:0,
   top:55,
  },

  TextInputPasswordIcon: {

   width: 18,
   height: 18,
   borderBottomWidth: 1,
   resizeMode:'contain',
   position:'absolute',
   zIndex: 99,
   right:0,
   top:18,
  },


  TextInputLine: {

   width: '100%',
   height:0,
   borderBottomWidth: 1,
 borderBottomColor: '#e0e0e0'
 },

 signInButtonContainer: {

   width: '100%',
   height:50,
   marginTop: 30,
   backgroundColor:'#84ce6f',
   justifyContent:'center',
   alignItems:'center'
 },

 facebookButtonContainer: {

   width: '100%',
   height:50,
   marginTop: 20,
   backgroundColor:'#426cb1',
   justifyContent:'center',
   alignItems:'center',
   marginBottom:20,
 },

 signInButton: {

   fontSize: 18,
   color:'#ffffff',
   fontFamily:'OpenSans-Semibold'
 },

 dob_label: {

   fontSize: 14,
   color:'#000000',
   marginTop:10,
   backgroundColor:'transparent',
   fontFamily:'Open Sans'
 },

 date_picker:{
   width: '100%',
   alignSelf: 'center',
   backgroundColor:'transparent',
   marginBottom:1,

   },

   errorMsg: {

    backgroundColor: 'transparent',
    color:'#ff0000',
    fontSize: 16,
  },

 orDivider: {

   fontSize: 16,
   color:'#000000',
   alignSelf:'center',
   marginTop:20,
   backgroundColor:'transparent',
   fontStyle: 'italic'
 },

 term_service: {

   fontSize: 14,
   color:'#b7b7b7',
   fontFamily:'Open Sans',
   marginTop:5,
   backgroundColor:'transparent',
   fontFamily:'Open Sans'
 },

 facebookButton:{
   width:'100%',
   height:'100%',
   resizeMode:'contain'
 },

 dateInput:{
      alignItems : 'flex-start',
      padding : 5,
      borderWidth : 0,
      borderBottomColor : '#e0e0e0',
      borderBottomWidth : 1,

    },
    dateIcon:{
       position: 'absolute',
       right: 0,
       top:20,
       width: 12,
       height: 12,
       marginLeft: 0
    },

    login_button: {

      fontSize: 16,
      color:'#5e3a93',
      marginTop: 5,
      alignSelf:'flex-end',
      backgroundColor:'transparent',
      fontFamily:'Open Sans'
    },

    activityloder:{
    position:'absolute',
    flex:1,
    width:width,
    height:height,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
    },


  });

  export default styles;
