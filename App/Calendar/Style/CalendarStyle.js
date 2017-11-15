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
        paddingBottom: 50,
        flex:1,
      },
    titleContainer: {
        marginTop: 40,
        alignItems: 'center',
        backgroundColor:'transparent',
        height: 220,
      },
    calendarmodal:{
      backgroundColor:'#5e4289',
      padding:6,
      width:'100%',
    },

    modaldata:{
      maxHeight:'60%',
      width:'95%',
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
