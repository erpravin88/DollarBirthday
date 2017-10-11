import {StyleSheet,Platform,Dimensions} from 'react-native';
const { width, height } = Dimensions.get('window');
import comman from '../../Constant/Style';

const style = {

    titleContainer: {
      width: width,
      marginTop: 40,
      alignItems: 'center',
      backgroundColor:'transparent',
      height:'32%',
    },
  facebookButtonContainer: {
     width: '100%',
     height:40,
     marginTop: 20,
     backgroundColor:'#426cb1',
     justifyContent:'center',
     alignItems:'center',
     marginBottom:20,
   },
   facebookButton:{
     width:'100%',
     height:'100%',
     resizeMode:'contain'
   },
      button_below:{
        fontSize: 9,
        color:'#C2C2C2',
        marginTop: 5,
        alignSelf:'center',
        backgroundColor:'transparent',
        fontFamily:'Open Sans'
      },
  linkColor:{
      color:'#5e3a93',
    },
    login_button: {

          fontSize: 14,
          color:'#5e3a93',
          marginTop: 5,
          alignSelf:'flex-end',
          backgroundColor:'transparent',
          fontFamily:'Open Sans'
        },
        formgroup:{
    	       backgroundColor:'transparent',
    	       height:'58%',
    	       overflow:'hidden',
    	       width: '100%',
    	  },
    };
      const allRules = Object.assign(comman, style);
      const styles = StyleSheet.create(allRules);

      export default styles;
