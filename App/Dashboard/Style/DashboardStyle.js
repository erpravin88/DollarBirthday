import {Dimensions , StyleSheet,  Platform,StatusBar} from 'react-native';
const { width, height } = Dimensions.get('window');
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

  const styles = StyleSheet.create({

      statusBar: {
        height: STATUSBAR_HEIGHT,
      },
      backgroundImage: {
  		 flex:1,
  		 resizeMode:(Platform.OS === 'ios')?  'cover':'stretch',
       width: width,
       height: (Platform.OS === 'ios')? height : '100%',
       position:'absolute',
       zIndex: 0,
  		},
      full:{
  			width:'100%',
  			height:'100%',

  		},
      resizeModec:{
        resizeMode:'stretch',
      },
    baseContainer: {

     width: width,
     height: height,

   },

   logo: {

      width: '85%',
      height: '70%',
      resizeMode: 'contain',
      marginTop: (Platform.OS === 'ios')? '4%' : '1%',


  },

   titleContainer: {
     flex:1,
     width: width,
     paddingTop: '5%',
     alignItems: 'center',
     marginTop: '5%',
     backgroundColor:'transparent',
     height:'30%',
   },
 iconsContainer:{
   flex:1,
   width: width,
   height:'56%',
   backgroundColor:'transparent',
   marginBottom:'4.5%',
  },
  dbIcon:{
    width:'32%',
    marginLeft:'1%',
    marginBottom:'1%',
  },
  iconContainer:{
    width:'90%',
    marginLeft:'5%',
    flexDirection:'row',
    backgroundColor:'transparent',
  },iconContainerfix1:{
    flex:1.3,
  },iconContainerfix2:{
    flex:1,
  },iconContainerfix3:{
    flex:1,
  },
 titleboldheading:{
    fontSize:15,
    color:'#efd7fe',
    fontFamily:'OpenSans-Semibold',
    width:'80%',
    fontWeight:'bold',
    textAlign:'center',
    backgroundColor:'transparent',

   },

   titleTextFirst: {
     fontSize: 16,
     color:'#efd7fe',
    fontFamily:'OpenSans-Semibold'
   },

   titleTextSecond: {
     fontSize: 22,
     fontWeight: 'bold',
     color:'#ffffff',
     fontFamily:'OpenSans-Semibold'
   },

 heading1:{
   alignSelf:'center',
   fontSize:25,
   fontFamily:'OpenSans-Semibold',
   color:'#DC6966',
   backgroundColor:'transparent',
 },
 subhead1:{
   fontSize:14,
   fontFamily:'Open Sans',
   color:'#000000',
   alignSelf:'center',
   justifyContent:'center',
   backgroundColor:'transparent',
 },

  });

  export default styles;
