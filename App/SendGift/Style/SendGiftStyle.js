import {
    StyleSheet,
    Platform
    } from 'react-native';
  
    import {Dimensions} from 'react-native';
    const { width, height } = Dimensions.get('window');
  
    const styles = StyleSheet.create({

      formimage:{
        flex:1,
        flexDirection:'row',
      },
      
      userImage:{
        flex:0.3,
        height:70,
        width:70,
      },

      usertext:{
        flex:0.6,

      },
      
      formgroup:{
        
        marginTop: 130, 
        backgroundColor:'transparent',
        height:'54%',
        overflow:'hidden',
        width: '75%',
        marginLeft:'12.5%',
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
  