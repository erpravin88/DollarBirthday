import {
  StyleSheet,
  Platform
  } from 'react-native';

  import {Dimensions} from 'react-native';
  const { width, height } = Dimensions.get('window');

  const styles = StyleSheet.create({

    usertext:{
      flex:0.6,
      paddingTop:3,
      
    },

    sendgiftbtn:{
      flex:0.2,
      backgroundColor:'#77b780',
      width:'100%',
      paddingLeft:5,
      paddingRight:5,
      height:30
    },

    username:{
      fontWeight:'bold',
      fontSize:18,
      paddingLeft:5
    },

    userbirthdate:{
      fontSize:18,
      paddingLeft:5
    },

    userImage:{
      height:30,
      width:30,
    },

    listview:{
      flex: 1, 
      flexDirection: 'row',
      marginTop:10
    },

    modalfootertext:{
      
      color:'#ffffff',
    },

    modalfooter:{
      flex:0.12,
      width:'80%',      
      alignItems: 'center',  
      backgroundColor:'#000',
      marginBottom:4,
      height:10
    },

    modalcontent:{
      flex:0.75,
    },

    modalheader:{
      flex:0.13,
      backgroundColor:'#340344',
      width:'100%',
      color:'#ffffff',
      paddingTop:4,
      fontFamily:'OpenSans-Semibold'
    },

    modaldata:{
      height:'60%',
      width:'85%',
      backgroundColor:'#ffffff',
      alignItems: 'center',
    },

    modalparentview:{
      flex: 1,
      backgroundColor:'rgba(0,0,0,0.5)',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'

    },

    CalendarContainer:{
      marginTop:153,
      flex:1,
      marginBottom:'7.5%'

    },

    calendar:{
      width:'85%',
      marginLeft:'7.5%'

    },

    dashlogo:{
      height: 15,
      width:15,
      zIndex:99,
      marginTop:'7.5%',
      marginLeft: '7.5%'
    
    },

    backgroundImage: {

     flex:1,
     width:  '100%',
     height: height,
     resizeMode:'stretch'
    },
    baseContainer: {

     width: width,
     height: height,

   },

   titleContainer: {
     width: width,
     alignItems: 'center',
     backgroundColor:'transparent'
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
    
 date_picker:{
   width: '100%',
   alignSelf: 'center',
   backgroundColor:'transparent',
   marginBottom:1,

   },

   errorMsg: {

    backgroundColor: 'transparent',
    color:'#ff0000',
    fontSize: 16,
  },



    activityloder:{
    position:'absolute',
    flex:1,
    width:width,
    height:height,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
    },


  });

  export default styles;
