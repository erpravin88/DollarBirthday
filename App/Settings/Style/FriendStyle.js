import {StyleSheet,Platform,Dimensions} from 'react-native';
const { width, height } = Dimensions.get('window');
import comman from '../../Constant/Style';

const style = {

        scrolllist:{
            backgroundColor:'transparent',
            overflow:'hidden',
            width: '100%',
            marginTop: 20
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
            shadowOpacity: 0.75,
            shadowRadius: 5,
            shadowColor: '#cccccc',
            shadowOffset: { height: 0, width: 0 },
            elevation:3,
            borderWidth: 1,
            borderRadius: 2,
            borderColor: '#ddd',
            marginBottom:5,
            padding:8,
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
        };
          const allRules = Object.assign(comman, style);
          const styles = StyleSheet.create(allRules);

          export default styles;
