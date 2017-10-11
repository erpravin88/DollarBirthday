import {StyleSheet,Platform,Dimensions} from 'react-native';
const { width, height } = Dimensions.get('window');
import comman from '../../Constant/Style';

const style = {

      amountdropdown:{
        width:'60%'
      },
      selectboxes:{
        paddingLeft:10,
        width:'100%'
      },

      logoview:{
        flexDirection:'row'
      },

        charitylogo:{
            height:100,
            width:100,
            resizeMode:'contain',
            borderWidth:1,
            borderColor:'#e7e7e7'
        },

        donationbox:{
            flexDirection:'row'
        },

      innerwidth:{
        width:'80%',
        marginLeft:'10%',
      },

      dropdown:{
        marginTop:20,
        width:'60%'
      },


      sharefbtext:{
        marginLeft:5,
        fontSize:16,
        color:'#406BB0',
      },

      sharefbcontainer:{
        marginTop:12,
        paddingLeft:5,
        paddingRight:5,
        flexDirection:'row'
      },

      shareonfacebookimg:{
        paddingTop:2,
        height:20,
        width:20,
        resizeMode:'contain',
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
