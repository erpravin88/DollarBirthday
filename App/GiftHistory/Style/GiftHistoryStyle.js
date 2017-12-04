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
      donatedamount:{
        fontSize:10,
        color:'#D96662',
        marginTop:2
      },

      sentamount:{
        fontSize:10,
        color:'#5896C8',
        marginTop:2
      },

      recievedamount:{
        fontSize:10,
        color:'#5C3F89',
        marginTop:2
      },

      usernamepending:{
        fontSize:12,
        fontWeight:'bold',
        color:'#b7b7b7',
        width:130,
      },

     username:{
        fontSize:12,
        fontWeight:'bold',
        width:130,
    },
      flatlistview:{
        backgroundColor:'transparent',
        height:'64%',
        width: '100%',
        marginBottom: '3%',
      },
      flatlistdisplay:{
        width: '90%',
        justifyContent:'center',
        alignSelf:'center',
      },

      pendingamount:{
        fontSize:10,
        color:'#b7b7b7',
        marginTop:2
      },

      usernametext:{
        flexDirection:'row'
      },

      userdetailtext:{
        marginLeft:10
      },

      userimg:{
        width:35,
        height:35
      },

      listbox:{
        borderWidth:0.5,
        borderColor:'#e7e7e7',
        flexDirection:'row',
        padding:5,
        marginBottom:20,
        elevation:2,
        borderRadius:2
      },

      detaillogo:{
        height:40,
        width:40,
        resizeMode:'contain',
      },

      donationtext:{
        fontSize:12,
        fontWeight:'bold',
        color:'#D96662'

      },

      senttext:{
        fontSize:12,
        fontWeight:'bold',
        color:'#5896C8'

      },

      recievedtext:{
        fontSize:12,
        fontWeight:'bold',
        color:'#5C3F89'

      },

      detailsheading:{
        fontSize:10,
        fontWeight:'bold'
      },

      detailscontainersecond:{
        alignItems:'center',
        width:'32%',
        paddingLeft:'2%'
      },

      detailscontainer:{
        alignItems:'center',
        width:'32%'
      },

      donationdetailsbox:{
        backgroundColor:'#E8F6FD',
        flexDirection:'row',
        height:'30%',
        padding:10,
        elevation:5,
      },



    };
      const allRules = Object.assign(comman, style);
      const styles = StyleSheet.create(allRules);

      export default styles;
