import {StyleSheet,Platform,Dimensions} from 'react-native';
const { width, height } = Dimensions.get('window');
import comman from '../../Constant/Style';

const style = {

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
   marginTop:'2%',
   marginBottom:'30%',
   alignSelf:'center',
   justifyContent:'center',
 },
};
  const allRules = Object.assign(comman, style);
  const styles = StyleSheet.create(allRules);

  export default styles;
