import {StyleSheet,Platform,Dimensions} from 'react-native';
const { width, height } = Dimensions.get('window');
import comman from '../../Constant/Style';

const style = {

      iconContainer:{
        width:'88%',
        marginLeft:'6%',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'flex-start',
      },
      iconContainerfix1:{
        flex:1.1,
        marginTop:'6%',
      },
      iconContainerfix2:{
        height:60,
        flex:1,
        overflow:'hidden',
      },
      iconContainerfix3:{
        flex:1,
        marginBottom:'5%',
      },
};
  const allRules = Object.assign(comman, style);
  const styles = StyleSheet.create(allRules);

  export default styles;
