import {
    StyleSheet,
    Platform
    } from 'react-native';

    import {Dimensions} from 'react-native';
    const { width, height } = Dimensions.get('window');

    const styles = StyleSheet.create({

        pricetagbox:{
            flex:1,
            alignSelf:'flex-end',
            flexDirection:'row'
        },

        heartlogo:{
            height:16,
            width:18,
            marginRight:5,
            marginTop:1
        },

        heartlogobox:{
            alignSelf:'flex-end',
            flexDirection:'row'
        },

        charitytext:{
            textAlign:'right',
            color:'#DF7C78',
            marginRight:5
        },

        donationlisting:{
            paddingTop:4,
            height:20,
            flex:1
        },

        line:{
            borderWidth:0.5,
            marginTop:5,
            borderColor:'#e7e7e7'
        },

        currency:{
            color:'#ffffff',
            fontSize:8
        },

        donationvalue:{
            color:'#ffffff',
            fontSize:14
        },

        greenbg:{
            position:'absolute',
            zIndex: 99,
            right:10,
            height:35,
            width:35,
            alignItems:'center'
        },

        redbg:{
            position:'absolute',
            zIndex: 99,
            right:55,
            height:35,
            width:35,
            alignItems:'center'
        },

        message:{
            paddingTop:10,
            color:'#724FA1',
            fontSize:16,
            backgroundColor:'transparent',
        },

        datetime:{
            fontSize:10,
            color:'#b7b7b7',
            backgroundColor:'transparent',
        },

        username:{
            fontSize:18,
            fontWeight:'bold',
            backgroundColor:'transparent',
        },

        userdetailscontainer:{
            marginLeft:10
        },

        userimage:{
            height:35,
            width:35
        },

        imagecontainer:{
            flexDirection:'row'
        },

        messagebox:{
            width:'85%',
            marginLeft:'7.5%',
            borderWidth: 0.5,
            borderColor:'#e7e7e7',
            padding:5,
            elevation:1,
            borderRadius:2,
            marginBottom:20,
            backgroundColor:'transparent',
        },

        scrolllist:{
            marginTop:130,
            overflow:'hidden',
            paddingBottom:20,
            height:'58%'
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
