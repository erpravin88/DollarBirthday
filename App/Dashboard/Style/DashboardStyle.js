import {Dimensions , StyleSheet,  Platform} from 'react-native';
const { width, height } = Dimensions.get('window');

  const styles = StyleSheet.create({

    backgroundImage: {
     flex:1,
     width:  '100%',
     height: '100%',
     resizeMode:'stretch'
    },
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
  width:'31.33%',
  margin: '1%',
  height: '80%',
},
full:{
  width:'100%',
  height: '100%',
  resizeMode: 'stretch',
},
iconContainer:{
  width:'86%',
  marginLeft:'7%',
  flex: 1,
  flexDirection:'row',
  justifyContent:'flex-start',
  alignItems:'flex-start',
},
  });

  export default styles;
