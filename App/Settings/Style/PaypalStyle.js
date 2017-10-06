import {Dimensions , StyleSheet,  Platform} from 'react-native';
const { width, height } = Dimensions.get('window');

  const styles = StyleSheet.create({

    backgroundImage: {
     flex:1,
     width:  '100%',
     height: '100%',
     resizeMode:'stretch'
    },
  titleContainer: {
      width: width,
      marginTop: 40,
      alignItems: 'center',
      backgroundColor:'transparent',
      height:'36%',
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
 signupPaypal:{
  color:'#449FD8',
  fontWeight:'600'
},
errorMsg: {

 backgroundColor: 'transparent',
 color:'#ff0000',
 fontSize: 16,
 width:'95%',
 alignSelf:'center',
},
formgroup:{
      backgroundColor:'transparent',
      height:'100%',
      overflow:'hidden',
      width: '100%',
    },
  inputBorderBottom: {
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0'
      },
  });

  export default styles;
