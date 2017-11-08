import {StyleSheet,Platform,Dimensions} from 'react-native';
const { width, height } = Dimensions.get('window');
import comman from '../../Constant/Style';

const style = {

    calendarmodal:{
      backgroundColor:'#5e4289',
      padding:6, 
      width:'100%', 
      height:'100%'
    },

    modaldata:{
      height:'60%',
      width:'85%',
      backgroundColor:'#ffffff',
      alignItems: 'center',
    },

    modalparentview:{
      flex: 1,
      backgroundColor:'rgba(0,0,0,0.5)',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'

    },
      item:{flexDirection:'row',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#502b8c',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        margin: 5,
        padding:6,
      },
      name:{fontSize:16,color:'#FFFFFF'},
      btnw:{width:'26%',justifyContent:'center'},
      namew:{width:'54%',justifyContent:'center',paddingLeft:'2%',paddingRight:'2%',},


    };
      const allRules = Object.assign(comman, style);
      const styles = StyleSheet.create(allRules);

      export default styles;
