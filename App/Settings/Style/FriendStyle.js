  import {
    StyleSheet,
    Platform
    } from 'react-native';
  
    import {Dimensions} from 'react-native';
    const { width, height } = Dimensions.get('window');
  
    const styles = StyleSheet.create({

        scrolllist:{
            backgroundColor:'transparent',
            overflow:'hidden',
            width: '100%',
            marginTop: 20
        },

        formgroup:{
            
            marginTop: 10, 
            backgroundColor:'transparent',
            overflow:'hidden',
            width: '100%',
          }, 

          friendboxes:{
            flexDirection:'row',
            width:'100%',
            
          },

          addfriendbox:{
              backgroundColor:'#DE6963',
              height:50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius:2,
              
          },

          addfriendtouch:{
              width:'30%',
              borderRadius:2,
              
          },

          boxtext:{
              color:'#ffffff',
              textAlign: 'center',
              fontFamily:'OpenSans-Semibold'
          },

          addicon:{
              width:13,
              height:13,
          },

          fbicon:{
              width:7,
              height:13,
          },

          googlesigninbox:{
            backgroundColor:'#6A479C',
            height:50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius:2,
          },

          googlesigninview:{
            marginLeft:'5%',
            width:'30%',
          },

          fbfriendsbox:{
            backgroundColor:'#426CB1',
            height:50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius:2,
          },

          fbfriendsview:{
            marginLeft:'5%',
            width:'30%',

          },

          googlefbtext:{
            color:'#b7b7b7',
            textAlign: 'center',
            fontFamily:'OpenSans-Semibold',
            fontSize:8              
          },

          listbox:{
              borderRadius:1,
              borderWidth:0.5,
              borderColor:'#ffffff',
              height:65,
              elevation:2,
              padding:5,
              justifyContent: 'center',
              marginBottom:20
          },

          crossicon:{
            width: 15,
            height: 15,
          },

          crossiconposi:{            
            position:'absolute',
            zIndex: 99,
            right:8,
            top:5,
          },

          editicon:{
            width: 15,
            height: 15,
          },

          editiconposi:{
            position:'absolute',
            zIndex: 99,
            right:35,
            top:5,
          },

          birthdatemailfield:{
            flexDirection:'row',
          },

          fullnametext:{
            fontSize:22,
            fontWeight: 'bold',
            fontFamily:'OpenSans-Semibold'
          },

          birthdatetext:{            
            fontSize:12,
            fontFamily:'OpenSans-Semibold'
          },
          
          emailtext:{
            fontSize:10,
            fontFamily:'OpenSans-Semibold',
            color:'#6CB8FB'             
          },
    });
  
    export default styles;
  