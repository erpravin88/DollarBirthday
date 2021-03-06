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
        paddingBottom: 200,
        flex:1,
      },
    titleContainer: {
        marginTop: 40,
        alignItems: 'center',
        backgroundColor:'transparent',
        height: 220,
      },
      btnyellow:{height:40,width:'30%',justifyContent:'center',alignSelf:'center',backgroundColor:'#FDAA3C',borderWidth:1,borderColor:'gray',borderRadius:5},
      amountdropdown:{
        width:'60%'
      },
      errorMsg:{
        backgroundColor: 'transparent',
        color:'#ff0000',
        width:'100%',
        alignSelf:'center',
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
