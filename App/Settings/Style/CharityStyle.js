import {Dimensions , StyleSheet,  Platform} from 'react-native';
const { width, height } = Dimensions.get('window');
import comman from '../../Constant/Style';

const style = {


  btn1:{backgroundColor: '#439FD8',justifyContent:'center',alignItems:'center',padding:'1.5%',marginLeft:'5%'},
  text1:{color:'#ffffff',fontSize:12,fontWeight:'600'},
  linkColor:{
      color:'#5e3a93',
      backgroundColor:'transparent',
    },
    TextInputIcon: {
              width: 30,
              height: 18,
              position:'absolute',
              zIndex: 99,
              right:0,
              top:6,
    },
  };
    const allRules = Object.assign(comman, style);
    const styles = StyleSheet.create(allRules);

    export default styles;
