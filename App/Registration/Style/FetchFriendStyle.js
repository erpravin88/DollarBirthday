import {StyleSheet,Platform,Dimensions} from 'react-native';
const { width, height } = Dimensions.get('window');
import comman from '../../Constant/Style';

const style = {

 heading1:{
   alignSelf:'center',
   fontSize:22,
   fontFamily:'Open Sans',
   color:'#336D96',
   backgroundColor:'transparent',
   fontFamily:'OpenSans-Semibold',
 },
 subhead1:{
   fontSize:12,
   fontFamily:'Open Sans',
   color:'#000000',
   alignSelf:'center',
   justifyContent:'center',
   backgroundColor:'transparent',
   fontWeight:'bold'
 },
 facebookButtonContainer: {

   width: '100%',
   height:40,
   marginTop: '5%',
   backgroundColor:'#426cb1',
   justifyContent:'center',
   alignItems:'center',

 },
 facebookButton:{
   width:'100%',
   height:'100%',
   resizeMode:'contain'
 },
marginFix2:{
  marginTop: '2%',
  marginBottom:'12%',
},
skip:{
  fontSize: 12,
  color:'#000000',
  fontFamily:'Open Sans',
  backgroundColor:'transparent',
  alignSelf:'center',
  justifyContent:'center',
},
skipContainer:{
  width:'20%',
  marginTop:'4%',
  alignSelf:'center',
  justifyContent:'center',
}
};
  const allRules = Object.assign(comman, style);
  const styles = StyleSheet.create(allRules);

  export default styles;
