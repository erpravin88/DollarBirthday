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
    resizeMode: 'stretch'
  },

   baseContainer: {

    width: width,
    height: height,

  },

  logo: {
   width: 185,
   height: 103,
   resizeMode: 'contain',
   marginTop: (Platform.OS === 'ios')? '10%' : '6%',


 },

  titleContainer: {
    width: width,
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor:'transparent',
  },

  titleTextFirst: {
    fontSize: 25,
    color:'#efd7fe',
    fontFamily:'OpenSans-Semibold'

  },

  titleTextSecond: {
    fontSize: 30,
    color:'#ffffff',
    fontFamily:'OpenSans-Semibold'
  },

  errorMsg: {

   backgroundColor: 'transparent',
   color:'#ff0000',
   fontSize: 16,
 },

  TextInputStyle: {

   width: '100%',
   height: 40,
   fontSize:22,
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
  paddingTop:'15%'
},


 TextInputIcon: {

  width: 18,
  height: 18,
  borderBottomWidth: 1,
  resizeMode:'contain',
  position:'absolute',
  zIndex: 99,
  right:0,
  top:72,
 },

 TextInputPasswordIcon: {

  width: 18,
  height: 18,
  borderBottomWidth: 1,
  resizeMode:'contain',
  position:'absolute',
  zIndex: 99,
  right:0,
  top:17,
 },


 TextInputLine: {

  width: '100%',
  height:0,
  borderBottomWidth: 1,
borderBottomColor: '#e0e0e0'
},

  viewStyle: {
    flexDirection: 'row',
     flex:1,
     alignItems:'center',
  },

  forgot: {

    fontSize: 20,
    color:'#5e3a93',
    marginTop: 10,
    alignSelf:'flex-end',
    backgroundColor:'transparent',
    fontFamily:'Open Sans'
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

  },

  signInButton: {

    fontSize: 25,
    color:'#ffffff',
    fontFamily:'Open Sans'

  },

  orDivider: {

    fontSize: 20,
    color:'#000000',
    alignSelf:'center',
    marginTop:20,
    backgroundColor:'transparent',
    fontFamily:'Open Sans'
  },

  facebookButton:{
    width:'100%',
    height:'100%',
    resizeMode:'contain',
    fontFamily:'Open Sans'
  },


});

export default styles;
