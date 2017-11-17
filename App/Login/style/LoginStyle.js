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
        paddingBottom: 230,
        flex:1,
      },
    titleContainer: {
        marginTop: 40,
        alignItems: 'center',
        backgroundColor:'transparent',
        height: 220,
      },fulls:{
        width:width,
        height:height,
        flex:1,
      },
      errorMsg: {
        backgroundColor: 'transparent',
 	     color:'#ff0000',
 	     width:'78%',
 	     alignSelf:'center',
 	   },
  tempTextInputContainer: {
    marginTop:5,
   width:'78%',
   alignSelf: 'center',
  },

tempoTextInputContainer: {
    marginTop:35,
    width:'78%',
    alignSelf: 'center',
  },

viewStyle: {
    flexDirection: 'row',
    flex:1,
    alignItems:'center',
  },

  forgot: {

    fontSize: 12,
    color:'#5e3a93',
    marginTop: 5,
    alignSelf:'flex-end',
    backgroundColor:'transparent',
    fontFamily:'Open Sans'
  },
  facebookButtonContainer: {

    width: '100%',
    height:40,
    marginTop: 20,
    backgroundColor:'#426cb1',
    justifyContent:'center',
    alignItems:'center',

  },
  orDivider: {

    fontSize: 16,
    color:'#000000',
    alignSelf:'center',
    marginTop:10,
    backgroundColor:'transparent',
    fontStyle: 'italic'
  },

  facebookButton:{
    width:'100%',
    height:'100%',
    resizeMode:'contain',
  },

};
  const allRules = Object.assign(comman, style);
  const styles = StyleSheet.create(allRules);

  export default styles;
