import {StyleSheet,Platform,Dimensions} from 'react-native';
const { width, height } = Dimensions.get('window');
import comman from '../../Constant/Style';

const style = {
  full:{
      width:width,
      height:height,
      flex:1,
      marginTop:(Platform.OS === 'ios')?  20 : 10,
      marginBottom:10,
    },
    top:{resizeMode:'stretch',maxHeight:290,flex:1},
    containerWidth:{width:'94%',marginLeft:'3%',marginRight:'3%',},
    formgroup:{
        backgroundColor:'#FFFFFF',
        paddingBottom: 110,
        flex:1,
      },
    titleContainer: {
        marginTop: 40,
        alignItems: 'center',
        backgroundColor:'transparent',
      },
        scrolllist:{
            backgroundColor:'transparent',
            height:(Platform.OS === 'ios')?  '58%' : '55%',
            marginTop:'2%',
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
            color:'#1a1b1a',
            textAlign: 'center',
            fontSize:9.5,
            fontStyle:'italic',
            padding:.5,
          },
          listbox:{
            shadowOpacity: 0.4,
            shadowRadius: 2,
            shadowColor: '#cccccc',
            shadowOffset: { height: 0, width: 0 },
            elevation:1,
            borderWidth: 1,
            borderRadius: 2,
            borderColor: '#ddd',
            marginBottom:5,
            padding:5,
            backgroundColor:'#FFFFFF',
          },

          crossicon:{
            width: 15,
            height: 15,
          },

          crossiconposi:{
            position:'absolute',
            zIndex: 99,
            right:5,
            padding:5,
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
            padding:5,
            marginRight:5,
            top:5,
          },

          birthdatemailfield:{
            flexDirection:'column',
          },
          fullnametext:{
            fontSize:14,
            fontFamily:'OpenSans-Semibold'
          },

          birthdatetext:{
            fontSize:10,
            color:'#b7b7b7',
            fontFamily:'OpenSans-Semibold'
          },

          emailtext:{
            fontSize:10,
            fontFamily:'OpenSans-Semibold',
            color:'#6CB8FB'
          },
          heading1:{
            alignSelf:'center',
            fontSize:23,
            fontFamily:'Open Sans',
            color:'#336D96',
            backgroundColor:'transparent',
            fontFamily:'OpenSans-Semibold',
          },
        };
          const allRules = Object.assign(comman, style);
          const styles = StyleSheet.create(allRules);

          export default styles;
