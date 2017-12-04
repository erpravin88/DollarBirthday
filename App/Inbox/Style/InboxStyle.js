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
    top:{resizeMode:'stretch',height:null},
    containerWidth:{width:'94%',marginLeft:'3%',marginRight:'3%',},
    formgroup:{
        backgroundColor:'#FFFFFF',
        flex:1,
      },
    titleContainer: {
        marginTop: 40,
        alignItems: 'center',
        backgroundColor:'transparent',
        height: 220,
      },
        pricetagbox:{
            flex:1,
            alignSelf:'flex-end',
            flexDirection:'row'
        },

        heartlogo:{
            height:16,
            width:18,
            marginLeft:10,
            marginTop:1
        },

        heartlogobox:{
            alignSelf:'flex-end',
            flexDirection:'row'
        },

        charitytext:{
            textAlign:'left',
            color:'#DF7C78',
            width:'80%',
            paddingLeft:'3%',
        },

        donationlisting:{
            paddingTop:4,
            flex:1
        },

        line:{
            borderWidth:0.5,
            marginTop:5,
            borderColor:'#e7e7e7'
        },

        currency:{
            color:'#ffffff',
            fontSize:8
        },

        donationvalue:{
            color:'#ffffff',
            fontSize:12
        },

        greenbg:{
            position:'absolute',
            zIndex: 99,
            right:10,
            height:48,
            width:45,
            alignItems:'center'
        },

        redbg:{
            position:'absolute',
            zIndex: 99,
            right:60,
            height:48,
            width:45,
            alignItems:'center'
        },

        message:{
            paddingTop:10,
            color:'#724FA1',
            fontSize:16,
            backgroundColor:'transparent',
        },

        datetime:{
            fontSize:10,
            color:'#b7b7b7',
            backgroundColor:'transparent',
        },

        username:{
            fontSize:14,
            fontWeight:'bold',
            backgroundColor:'transparent',
        },

        userdetailscontainer:{
            marginLeft:10
        },

        userimage:{
            height:35,
            width:35
        },

        imagecontainer:{
            flexDirection:'row'
        },

        messagebox:{
            width:'85%',
            marginLeft:'7.5%',
            borderWidth: 0.5,
            borderColor:'#e7e7e7',
            padding:5,
            elevation:1,
            borderRadius:2,
            marginBottom:20,
            backgroundColor:'transparent',
        },

    };
      const allRules = Object.assign(comman, style);
      const styles = StyleSheet.create(allRules);

      export default styles;
