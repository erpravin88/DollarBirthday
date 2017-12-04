import {Dimensions , StyleSheet,  Platform} from 'react-native';
const { width, height } = Dimensions.get('window');
import comman from '../../Constant/Style';

const style = {
  TextInputIcon: {
             width: 18,
             height: 18,
             borderBottomWidth: 1,
             resizeMode:'contain',
             position:'absolute',
             zIndex: 99,
             right:0,
             top:6,
  },
};
  const allRules = Object.assign(comman, style);
  const styles = StyleSheet.create(allRules);

  export default styles;
