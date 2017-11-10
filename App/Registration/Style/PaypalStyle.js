import {StyleSheet,Platform,Dimensions} from 'react-native';
const { width, height } = Dimensions.get('window');
import comman from '../../Constant/Style';

const style = {


 heading1:{
   alignSelf:'center',
   fontSize:25,
   fontFamily:'Open Sans',
   color:'#60B5EF',
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
 },
 facebookButtonContainer: {

   width: '100%',
   height:40,
   marginTop: '3%',
   backgroundColor:'#449FD8',
   justifyContent:'center',
   alignItems:'center',

 },
 facebookButton:{
   width:'100%',
   height:'100%',
   resizeMode:'contain'
 },
marginFix1:{
  marginTop: '5%',
  marginBottom: '5%',
},
marginFix2:{
  marginTop: '2%',
  marginBottom:'12%',
},
signupPaypal:{
  color:'#449FD8',
  fontWeight:'600'
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
  marginTop:'4%',
  alignSelf:'center',
  justifyContent:'center',
  marginBottom:'30%',
}
};
  const allRules = Object.assign(comman, style);
  const styles = StyleSheet.create(allRules);

  export default styles;
