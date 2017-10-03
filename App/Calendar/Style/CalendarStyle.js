import {
  StyleSheet,
  Platform
  } from 'react-native';

  import {Dimensions} from 'react-native';
  const { width, height } = Dimensions.get('window');

  const styles = StyleSheet.create({

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
      flex:1,
      marginBottom:'7.5%'

    },

    calendar:{
      marginTop:153,
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
