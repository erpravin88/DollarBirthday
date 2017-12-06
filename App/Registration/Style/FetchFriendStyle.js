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
   fontSize:23,
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
  marginBottom:'4%',
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
},
nodatabox:{minHeight: 40,justifyContent:'center',backgroundColor: 'transparent'},
friendboxes:{
  flexDirection:'row',
},
addfriendbox:{
    backgroundColor:'#DE6963',
    height:50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:2,

},

boxtext:{
    color:'#ffffff',
    textAlign: 'center',
    fontFamily:'OpenSans-Semibold'
},

boxtextsmall:{
    color:'#ffffff',
    fontSize:10,
    textAlign: 'center',
    fontFamily:'OpenSans-Semibold'
},

addicon:{
    width:13,
    height:13,
},
yahoosigninbox:{
  backgroundColor:'#6A479C',
  height:50,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius:2,
},

hotmailsigninbox:{
  backgroundColor:'#6A479C',
  height:50,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius:2,
},

googlesigninbox:{
  backgroundColor:'#6A479C',
  height:50,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius:2,
},

signinview:{
  width:'30%',
},

googlefbtext:{
  color:'#1a1b1a',
  textAlign: 'center',
  fontSize:9.5,
  fontStyle:'italic',
  padding:.5,
},
};
  const allRules = Object.assign(comman, style);
  const styles = StyleSheet.create(allRules);

  export default styles;
