import {
  StyleSheet,
  Platform
  } from 'react-native';

  import {Dimensions} from 'react-native';
  const { width, height } = Dimensions.get('window');

  const styles = StyleSheet.create({

TextInputStyle: {
    width: '100%',
    height: 30,
    fontSize:14,
    paddingBottom:0,
    marginBottom:0,
    paddingRight:18,
    fontFamily:'Open Sans',
  },
  TextInputContainer: {
   width:'95%',
   alignSelf: 'center',
  },
TextInputIcon: {
   width: 18,
   height: 18,
   borderBottomWidth: 1,
   resizeMode:'contain',
   position:'absolute',
   zIndex: 99,
   right:0,
   top:6,
 },
 signInButtonContainer: {

   width: '100%',
   height:40,
   marginTop: 5,
   backgroundColor:'#84ce6f',
   justifyContent:'center',
   alignItems:'center'
 },
 signInButton: {

   fontSize: 18,
   color:'#ffffff',
   fontFamily:'OpenSans-Semibold'
 },

 dob_label: {

   fontSize: 14,
   color:'#000000',
   backgroundColor:'transparent',
   fontFamily:'Open Sans'
 },

 date_picker:{
   width: '100%',
   alignSelf: 'center',
   backgroundColor:'transparent',
   marginBottom:1,
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
   errorMsg: {

    backgroundColor: 'transparent',
    color:'#ff0000',
    fontSize: 16,
    width:'95%',
    alignSelf:'center',
  },
linkColor:{
    color:'#5e3a93',
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
    formgroup:{
      backgroundColor:'transparent',
      height:'100%',
      overflow:'hidden',
      width: '100%',
    },inputBorderBottom: {
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0'
      },

  });

  export default styles;
