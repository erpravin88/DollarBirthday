import {StyleSheet,Platform,Dimensions} from 'react-native';
const { width, height } = Dimensions.get('window');
import comman from '../../Constant/Style';

const style = {

  scrollviewheight:{
    flex: 1, 
    maxHeight: "45%"

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

  titleContainer: {
    width: width,
    marginTop: 40,
    alignItems: 'center',
    backgroundColor:'transparent',
    height:'36%',
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
