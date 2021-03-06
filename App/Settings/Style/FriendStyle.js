import {StyleSheet,Platform,Dimensions} from 'react-native';
const { width, height } = Dimensions.get('window');
import comman from '../../Constant/Style';

const style = {

        // modalbackicon:{
        //   marginTop:5,
        //   height:18,
        //   width:18,
        //   marginRight:10,
        // },
        //
        // modalfullnametext:{
        //   fontSize:18,
        //   fontFamily:'OpenSans-Semibold'
        // },
        //
        // modalbirthdatetext:{
        //   fontSize:12,
        //   color:'#b7b7b7',
        //   fontFamily:'OpenSans-Semibold'
        // },
        //
        // modalemailtext:{
        //   fontSize:12,
        //   fontFamily:'OpenSans-Semibold',
        //    color:'#6CB8FB'
        // },

        checkboxicon:{
          marginTop:3,
          height:25,
          width:25
        },

        listdetailbox:{
          width:'90%',
          paddingLeft:10
        },

        // modallistbox:{
        //
        //   flexDirection:'row',
        //   shadowOpacity: 0.75,
        //   shadowRadius: 5,
        //   shadowColor: '#cccccc',
        //   shadowOffset: { height: 0, width: 0 },
        //   elevation:3,
        //   borderWidth: 1,
        //   borderRadius: 2,
        //   borderColor: '#ddd',
        //   marginBottom:5,
        //   padding:8,
        // },
        //
        // modalpicker:{
        //   backgroundColor:'transparent',
        //   marginBottom:1,
        //   width:'50%',
        // },
        //
        // modallist:{
        //   padding:10,
        //   marginTop:5,
        // },

        cross:{
          color:'#FFFFFF',
          fontSize:20,
          fontFamily:'OpenSans-Semibold',
          textAlign:'right'

        },

        headtext:{
            color:'#FFFFFF',
            fontSize:20,
            fontFamily:'OpenSans-Semibold',

        },

        modalhead:{
            backgroundColor:'#62458F',
            height:50,
            padding:10,
            flexDirection:'row',

        },

        modalbox:{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#00000070',
            height: height
        },

        modalinnerbox:{
            width:'94%',
            height:'96%',
            backgroundColor: '#FFFFFF'
        },

        scrolllist:{
            backgroundColor:'transparent',
            marginTop: '2%',
            height:80,
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

          boxtextsmall:{
              color:'#ffffff',
              fontSize:10,
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

          yahoosigninbox:{
            backgroundColor:'#6A479C',
            height:50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius:2,
          },

          hotmailsigninbox:{
            backgroundColor:'#6A479C',
            height:50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius:2,
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

          yahoosigninview:{
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
          nodatabox:{minHeight: 40,justifyContent:'center',backgroundColor: 'transparent'},
        };
          const allRules = Object.assign(comman, style);
          const styles = StyleSheet.create(allRules);

          export default styles;
