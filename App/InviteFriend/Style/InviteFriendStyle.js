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
    addBtn: {
      width: 12,
      height: 12,
      borderBottomWidth: 1,
      resizeMode:'contain',
    },
    dob_label: {

      fontSize: 14,
      color:'#000000',
      marginTop:10,
      backgroundColor:'transparent',
      fontFamily:'Open Sans'
    },
    date_picker:{
      width: '100%',
      alignSelf: 'center',
      backgroundColor:'transparent',
      marginBottom:1,

      },
      dateInput:{
           alignItems : 'flex-start',
           padding : 5,
           borderWidth : 0,
           borderBottomColor : '#e0e0e0',
           borderBottomWidth : 1,

         },
      dateIcon:{
            position: 'absolute',
            right: 0,
            top:20,
            width: 12,
            height: 12,
            marginLeft: 0
         },
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
