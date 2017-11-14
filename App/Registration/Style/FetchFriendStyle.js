import {StyleSheet,Platform,Dimensions} from 'react-native';
const { width, height } = Dimensions.get('window');
import comman from '../../Constant/Style';

const style = {
  full:{
      width:width,
      height:height,
      flex:1,
      marginTop:(Platform.OS === 'ios')?  20 : 10,
      marginBottom:10,
    },
    top:{resizeMode:'stretch',height:null,flex:1},
    containerWidth:{width:'94%',marginLeft:'3%',marginRight:'3%',},
    formgroup:{
        backgroundColor:'#FFFFFF',
        paddingBottom: 110,
        flex:1,
      },
    titleContainer: {
        marginTop: 40,
        alignItems: 'center',
        backgroundColor:'transparent',
        height: 220,
      },
 heading1:{
   alignSelf:'center',
   fontSize:25,
   fontFamily:'Open Sans',
   color:'#336D96',
   backgroundColor:'transparent',
   fontFamily:'OpenSans-Semibold',
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
  fontSize: 14,
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
