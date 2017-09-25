import {Dimensions , StyleSheet,  Platform} from 'react-native';
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
    marginTop: (Platform.OS === 'ios')? '7%' : '1%',


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
    fontSize:16,
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
   alignItems:'center',
 },
 signInButton: {

   fontSize: 18,
   color:'#ffffff',
   fontFamily:'OpenSans-Semibold'
 },
 orDivider: {

   fontSize: 20,
   color:'#000000',
   alignSelf:'center',
   marginTop:20,
   backgroundColor:'transparent',
   fontFamily:'Open Sans'
 },

 term_service: {
   flex:1,
   fontSize: 14,
   color:'#b7b7b7',
   fontFamily:'Open Sans',
   marginTop:10,
   backgroundColor:'transparent',
   fontFamily:'Open Sans',
   alignSelf:'center',
   justifyContent:'center',
 },
 heading1:{
   alignSelf:'center',
   fontSize:25,
   fontFamily:'OpenSans-Semibold',
   color:'#DC6966',
   backgroundColor:'transparent',
 },
 subhead1:{
   fontSize:14,
   fontFamily:'Open Sans',
   color:'#000000',
   alignSelf:'center',
   justifyContent:'center',
   backgroundColor:'transparent',
 },
 skip:{
   fontSize: 14,
   color:'#000000',
   fontFamily:'Open Sans',
   backgroundColor:'transparent',
   fontFamily:'Open Sans',
   alignSelf:'center',
   justifyContent:'center',
 },
 skipContainer:{
   width:'20%',
   marginTop:'9%',
   alignSelf:'center',
   justifyContent:'center',
 }
  });

  export default styles;
