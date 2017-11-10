import {StyleSheet,Platform,Dimensions} from 'react-native';
const { width, height } = Dimensions.get('window');
import comman from '../../Constant/Style';

const style = {

      innerwidth:{
        width:'80%',
        marginLeft:'10%',
      },
      errorMsg: {
           backgroundColor: 'transparent',
    	     color:'#ff0000',
    	     width:'100%',
    	     alignSelf:'center',
    	   },
      dropdown:{
        marginTop:20
      },
      sharefbtext:{
        marginLeft:5,
        fontSize:18,
        color:'#446CAE'
      },

      sharefbcontainer:{
        flexDirection:'row',
        marginBottom:5,
      },

      shareonfacebookimg:{
        height:20,
        width:20,
        resizeMode:'contain',
      },
      TextAreaInputStyle: {
          width: '100%',
          height: 80,
          paddingBottom:5,
          alignItems: "flex-start",
          textAlignVertical: "top",
      },
      textcontainer:{
        marginLeft:'5%',
        marginTop: 5
      },

      userdesc:{
      },

      formimage:{
        flex:1,
        flexDirection:'row',
      },

      userImage:{
        height:60,
        width:60,
      },

      usertext:{
        fontSize:22,
        fontWeight:'bold',
      },

    };
      const allRules = Object.assign(comman, style);
      const styles = StyleSheet.create(allRules);

      export default styles;
