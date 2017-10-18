import {Dimensions , StyleSheet,  Platform,StatusBar} from 'react-native';
const { width, height } = Dimensions.get('window');
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
import comman from '../../Constant/Style';

  const styles = StyleSheet.create({

      statusBar: {
        height: STATUSBAR_HEIGHT,
      },
    backgroundImage: comman.backgroundImage,
    full: comman.full,
    baseContainer: {

     width: width,
     height: height,

   },

   logo: {
    width: '100%',
    height: '60%',
    resizeMode: 'contain',
    marginTop: (Platform.OS === 'ios')? '4%' : '1%',


  },

   titleContainer: {
     width: width,
     height:'45%',
     paddingTop: 20,
     alignItems: 'center',
     backgroundColor:'transparent',
     marginTop: 20,
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
dbIcon:{
  width:'32%',
  marginLeft:'1%',
  marginBottom:'1%',
},
iconContainer:{
  width:'88%',
  marginLeft:'6%',
  flexDirection:'row',
  justifyContent:'flex-start',
  alignItems:'flex-start',
},iconContainerfix1:{
  flex:1.1,
  marginTop:'6%',
},iconContainerfix2:{
  height:60,
  flex:1,
  overflow:'hidden',
},iconContainerfix3:{
  flex:1,
  marginBottom:'5%',
},
  });

  export default styles;
