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
   titleContainer: {
         width: width,
         marginTop: 40,
         alignItems: 'center',
         backgroundColor:'transparent',
         height:'32%',
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
full:{
  width:'100%',
  height:'100%',
  resizeMode: 'stretch',

},
iconContainer:{
  width:'88%',
  marginLeft:'6%',
  flexDirection:'row',
  justifyContent:'flex-start',
  alignItems:'flex-start',
},
iconContainerfix1:{
  flex:1.1,
  marginTop:'6%',
},
iconContainerfix2:{
  height:60,
  flex:1,
  overflow:'hidden',
},
iconContainerfix3:{
  flex:1,
  marginBottom:'5%',
},
dashboardIconw:{
  position:'absolute',
  width:25,
  height:25,
  left:'5.5%',
  top:'.01%',
},img:{
  width:'100%',
  height:'100%',
},
item:{flexDirection:'row',
  borderWidth: 1,
  borderRadius: 2,
  borderColor: '#ddd',
  borderBottomWidth: 0,
  shadowColor: '#000',
  shadowOffset: { width: 0},
  shadowOpacity: 0.8,
  shadowRadius: 2,
  elevation: 1,
  margin: 5,
  padding:6,
  backgroundColor: '#ffffff',
},
picw:{width:'20%',justifyContent:'center',alignItems:'center',backgroundColor:'#ccc'},
pic:{width:'50%' ,height:40},
name:{fontSize:15,color:'#3F3F3F',fontWeight:'600'},
btnw:{width:'20%',justifyContent:'center'},
btn1:{backgroundColor: '#439FD8',justifyContent:'center',alignItems:'center',padding:'5%'},
text1:{color:'#ffffff',fontSize:12,fontWeight:'600'},
namew:{width:'60%',justifyContent:'center',paddingLeft:18},
  });

  export default styles;
