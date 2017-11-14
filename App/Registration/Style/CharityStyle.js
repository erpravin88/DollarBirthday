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
        paddingBottom: 10,
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
   fontSize:24,
   fontFamily:'OpenSans-Semibold',
   color:'#DC6966',
   backgroundColor:'transparent',
   marginBottom:5
 },
 subhead1:{
   fontSize:12,
   fontFamily:'Open Sans',
   color:'#3E3E3E',
   alignSelf:'center',
   justifyContent:'center',
   backgroundColor:'transparent',
   fontWeight:'bold',
   marginTop:5
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
