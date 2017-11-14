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
    top:{resizeMode:'stretch',height:null,flex:1},
    containerWidth:{width:'94%',marginLeft:'3%',marginRight:'3%',},
    formgroup:{
        backgroundColor:'#FFFFFF',
        paddingBottom: 200,
        flex:1,
      },
    titleContainer: {
        marginTop: 40,
        alignItems: 'center',
        backgroundColor:'transparent',
        height: 220,
      },
  signupbuttonContainer: {
    marginTop:14,
   width:'78%',
   alignSelf: 'center',
  },
  tempTextInputContainer: {
      marginTop:5,
     width:'78%',
     alignSelf: 'center',
    },

    tempoTextInputContainer: {
      marginTop:-8,
     width:'78%',
     alignSelf: 'center',
    },
  facebookButtonContainer: {
     width: '100%',
     height:40,
     marginTop: 20,
     backgroundColor:'#426cb1',
     justifyContent:'center',
     alignItems:'center',
     marginBottom:20,
   },
   facebookButton:{
     width:'100%',
     height:'100%',
     resizeMode:'contain'
   },
      button_below:{
        fontSize: 9,
        color:'#C2C2C2',
        marginTop: 5,
        alignSelf:'center',
        backgroundColor:'transparent',
        fontFamily:'Open Sans'
      },
  linkColor:{
      color:'#5e3a93',
    },
    login_button: {

          fontSize: 14,
          color:'#5e3a93',
          marginTop: 5,
          alignSelf:'flex-end',
          backgroundColor:'transparent',
          fontFamily:'Open Sans'
        },

    };
      const allRules = Object.assign(comman, style);
      const styles = StyleSheet.create(allRules);

      export default styles;
