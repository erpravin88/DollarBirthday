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
    fulls:{
      width:width,
      height:height,
      flex:1,
    },
    top:{resizeMode:'stretch',height:null,flex:1},
    containerWidth:{width:'94%',marginLeft:'3%',marginRight:'3%',},
    formgroup:{
        backgroundColor:'#FFFFFF',
        paddingBottom: 230,
        flex:1,
      },
    btnyellow:{height:40,width:'30%',justifyContent:'center',alignSelf:'center',backgroundColor:'#FDAA3C',borderWidth:1,borderColor:'gray',borderRadius:5},
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
