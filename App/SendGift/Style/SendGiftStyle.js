import {
    StyleSheet,
    Platform
    } from 'react-native';
  
    import {Dimensions} from 'react-native';
    const { width, height } = Dimensions.get('window');
  
    const styles = StyleSheet.create({

      innerwidth:{
        width:'80%',
        marginLeft:'10%',
      },

      inputBorderBottom: {
        borderBottomWidth: .8,
        borderBottomColor: '#e0e0e0'
        },

      dropdown:{
        marginTop:20
      },

      signInButton: {
        
           fontSize: 18,
           color:'#ffffff',
           fontFamily:'OpenSans-Semibold'
         },

      signInButtonContainer: {
        
           width: '100%',
           height:50,
           marginTop: 15,
           backgroundColor:'#5d90e4',
           justifyContent:'center',
           alignItems:'center'
         },

      sharefbtext:{
        marginLeft:5,
        fontSize:18,
        color:'#3b5998'
      },

      sharefbcontainer:{
        marginTop:12,
        paddingLeft:5,
        paddingRight:5,
        flexDirection:'row'
      },

      shareonfacebookimg:{
        height:20,
        width:20,
        resizeMode:'contain',
      },

      TextInputPasswordIcon: {
        
           width: 18,
           height: 18,
           borderBottomWidth: 1,
           resizeMode:'contain',
           position:'absolute',
           zIndex: 99,
           right:0,
           top:12,
          },

      errorMsg: {
        
            backgroundColor: 'transparent',
            color:'#ff0000',
            fontSize: 16,
          },

      TextInputLine: {
        
           width: '100%',
           height:0,
           borderBottomWidth: 1,
         borderBottomColor: '#e0e0e0'
         },

      TextInputStyle: {
        
          width: '100%',
          height: 40,
          fontSize: 18,
          paddingBottom:10,
          fontFamily:'Open Sans'
      },

      TextAreaInputStyle: {
        
          width: '100%',
          height: 80,
          fontSize:16,
          paddingBottom:0,
          paddingBottom:5,
          fontFamily:'Open Sans'
      },
      
      TextInputContainer: {
        marginTop:5   
      },

      textcontainer:{
        marginLeft:'5%',
        marginTop: 5
      },

      userdesc:{
      },

      formimage:{
        flex:1,
        flexDirection:'row',
      },
      
      userImage:{
        height:60,
        width:60,
      },

      usertext:{
        fontSize:22,
        fontWeight:'bold',
      },
      
      formgroup:{
        
        marginTop: 130, 
        backgroundColor:'transparent',
        height:'54%',
        overflow:'hidden',
        width: '100%',
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
  