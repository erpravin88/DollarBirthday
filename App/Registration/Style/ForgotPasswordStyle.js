import {StyleSheet,Platform,Dimensions} from 'react-native';
const { width, height } = Dimensions.get('window');
import comman from '../../Constant/Style';

const style = {
  
    tempTextInputContainer: {
      marginTop:5,
     width:'78%',
     alignSelf: 'center',
    },

    tempoTextInputContainer: {
      marginTop:-5,
     width:'78%',
     alignSelf: 'center',
    },

 heading1:{
   alignSelf:'center',
   fontSize:25,
   fontFamily:'Open Sans',
   color:'#6A4A9A',
   backgroundColor:'transparent',
   fontFamily:'OpenSans-Semibold',
   marginTop:'5%',
   marginBottom:'5%',
 },
 subhead1:{
   fontSize:14,
   fontFamily:'Open Sans',
   color:'#000000',
   alignSelf:'center',
   justifyContent:'center',
   backgroundColor:'transparent',
   fontWeight:'bold',
   color:'#3E3E3E'
 },
signupPaypal:{
  color:'#449FD8',
  fontWeight:'600'
},
};
  const allRules = Object.assign(comman, style);
  const styles = StyleSheet.create(allRules);

  export default styles;
