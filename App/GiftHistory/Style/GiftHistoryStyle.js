import {
    StyleSheet,
    Platform
    } from 'react-native';
  
    import {Dimensions} from 'react-native';
    const { width, height } = Dimensions.get('window');
  
    const styles = StyleSheet.create({

      donatedamount:{
        fontSize:10,
        color:'#D96662',
        marginTop:2
      },

      sentamount:{
        fontSize:10,
        color:'#5896C8',
        marginTop:2
      },

      recievedamount:{        
        fontSize:10,
        color:'#5C3F89',
        marginTop:2
      },

      usernamepending:{        
        fontSize:12,
        fontWeight:'bold',
        color:'#b7b7b7'
      },

      flatlistview:{
        backgroundColor:'transparent',
        height:'42%',
        overflow:'hidden',
        width: '100%',
      },

      pendingamount:{
        fontSize:10,
        color:'#b7b7b7',
        marginTop:2
      },

      username:{
        fontSize:12,
        fontWeight:'bold'
      },

      usernametext:{
        flexDirection:'row'
      },

      userdetailtext:{
        marginLeft:10
      },

      userimg:{
        width:35,
        height:35
      },

      listbox:{
        borderWidth:0.5,
        borderColor:'#e7e7e7',
        flexDirection:'row',
        padding:5,
        marginTop:20,
        elevation:2,
        borderRadius:2
      },

      flatlistdisplay:{
        width:'80%',
        marginLeft:'10%',
        marginTop:10
      },

      detaillogo:{
        height:40,
        width:40,
        resizeMode:'contain',
      },

      donationtext:{
        fontSize:12,
        fontWeight:'bold',
        color:'#D96662'

      },

      senttext:{
        fontSize:12,
        fontWeight:'bold',
        color:'#5896C8'

      },

      recievedtext:{
        fontSize:12,
        fontWeight:'bold',
        color:'#5C3F89'

      },

      detailsheading:{
        fontSize:12,
        fontWeight:'bold'
      },

      detailscontainersecond:{
        alignItems:'center',
        width:'30%',
        marginLeft:'5%'
      },

      detailscontainer:{
        alignItems:'center',
        width:'30%'
      },

      donationdetailsbox:{
        width:'93.6%',
        marginLeft:'3.2%',
        backgroundColor:'#E8F6FD',
        flexDirection:'row',
        padding:10,
        elevation:5
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
       backgroundColor:'transparent',
       height:'32%'
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
      fontSize: 14,
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
  