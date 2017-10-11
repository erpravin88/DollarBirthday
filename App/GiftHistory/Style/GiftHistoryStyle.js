import {StyleSheet,Platform,Dimensions} from 'react-native';
const { width, height } = Dimensions.get('window');
import comman from '../../Constant/Style';

const style = {

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
        color:'#b7b7b7'
      },

      flatlistview:{
        backgroundColor:'transparent',
        height:'42%',
        overflow:'hidden',
        width: '100%',
      },

      pendingamount:{
        fontSize:10,
        color:'#b7b7b7',
        marginTop:2
      },

      username:{
        fontSize:12,
        fontWeight:'bold'
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
        marginTop:20,
        elevation:2,
        borderRadius:2
      },

      flatlistdisplay:{
        width:'80%',
        marginLeft:'10%',
        marginTop:10
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
        fontSize:12,
        fontWeight:'bold'
      },

      detailscontainersecond:{
        alignItems:'center',
        width:'30%',
        marginLeft:'5%'
      },

      detailscontainer:{
        alignItems:'center',
        width:'30%'
      },

      donationdetailsbox:{
        width:'93.6%',
        marginLeft:'3.2%',
        backgroundColor:'#E8F6FD',
        flexDirection:'row',
        padding:10,
        elevation:5
      },


    };
      const allRules = Object.assign(comman, style);
      const styles = StyleSheet.create(allRules);

      export default styles;
