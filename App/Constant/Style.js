import {Dimensions , StyleSheet,  Platform} from 'react-native';
const { width, height } = Dimensions.get('window');

  const styles = {
		full:{
			width:'100%',
			height:'100%',

		},
		font1:{
			fontSize:10,
		},
		font2:{
			fontSize:12,
		},
		font3:{
			fontSize:14,
		},
		font4:{
			fontSize:16,
		},
		font5:{
			fontSize:18,
		},
    font6:{
			fontSize:20,
		},
		font7:{
			fontSize:22,
		},
    font8:{
			fontSize:24,
		},
    fontFamilyBold:{
      fontFamily:'OpenSans-Semibold',
    },
    fontFamilyNormal:{
      fontFamily:'Open Sans',
    },
		colorWhite:{
			color:'#FFFFFF',
		},
		colorBlack:{
			color:'#000000',
		},
		colorGray:{
			color:'#e0e0e0',
		},
		backgroundtrans:{
			backgroundColor:'transparent',
		},
		backgroundwhite:{
			backgroundColor:'#ffffff',
		},
		hide:{
			display:'none',
		},
		show:{
			display:'flex',
		},
    marginTopFive:{
      marginTop:'5%',
    },
    marginBottomFive:{
      marginBottom:'5%',
    },
    marginLeftFive:{
      marginLeft:'5%',
    },
    marginRightFive:{
      marginRight:'5%',
    },
    paddingTopFive:{
      paddingTop: '5%',
    },
    paddingBottomFive:{
      paddingBottom: '5%',
    },
    paddingTopDownTwo:{
      paddingTop:'2%',
      paddingBottom:'2%',
    },
    flexDirectionRow:{
      flexDirection:'row',
    },
    bothcenter:{justifyContent:'center',alignSelf:'center'},
		backgroundImage: {
		 flex:1,
		 resizeMode:(Platform.OS === 'ios')?  'cover':'stretch',
     width: width,
     height: (Platform.OS === 'ios')? height : '100%',
     position:'absolute',
     zIndex: 0,
		},
	 titleContainer: {
				 width: width,
				 marginTop: 40,
				 alignItems: 'center',
				 backgroundColor:'transparent',
				 height:'32%',
		 },

	 titleTextFirst: {
		 fontSize: 18,
		 color:'#efd7fe',
		fontFamily:'OpenSans-Semibold'
	 },

	 titleTextSecond: {
		 fontSize: 25,
		 fontWeight: 'bold',
		 color:'#ffffff',
		 fontFamily:'OpenSans-Semibold'
	 },
 dashboardIconw:{
    position:'absolute',
    width:25,
    height:24,
    left:'3%',
    top:'3.5%',
  },
	 img:{
	   width:'100%',
	   height:'100%',
	 },

		TextInputStyle: {
				width: '100%',
				height: 35,
                        fontSize:14,
				paddingBottom:0,
				marginBottom:0,
				paddingRight:18,
			},
			TextInputContainer: {
			 width:'89%',
			 alignSelf: 'center',
			},
	SettingsTextInputContainer: {
		width:'87%',
		alignSelf: 'center',
	},
      errorMsg: {
            backgroundColor: 'transparent',
            color:'#ff0000',
            width:'87%',
            alignSelf:'center',
	},
      settingdetailwrap:{
            marginTop:10,
            height:'100%',
      },
	TabContainer: {
		width:'94%',
		alignSelf: 'center',
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
	formgroup:{
	       backgroundColor:'transparent',
	       height:'100%',
	       overflow:'hidden',
	       width: '100%',
	  },
	  inputBorderBottom: {
	       borderBottomWidth: 1,
	       borderBottomColor: '#e0e0e0'
		},
		inputBorder: {
			borderWidth: 1,
			borderColor: '#e0e0e0'
 		},
		
		signInButtonContainer: {

	    width: '100%',
	    height:40,
	    marginTop: 5,
	    backgroundColor:'#84ce6f',
	    justifyContent:'center',
	    alignItems:'center'
	  },
	  signInButton: {

	    fontSize: 18,
	    color:'#ffffff',
	    fontFamily:'OpenSans-Semibold'
	  },
		activityloder:{
		    position:'absolute',
		    flex:1,
		    width:width,
		    height:height,
		    backgroundColor: 'rgba(0, 0, 0, 0.5)',
		    alignItems: 'center',
		    justifyContent: 'center',
		    zIndex: 999,
		    },
		formgroup:{
					backgroundColor:'transparent',
					height:'100%',
					overflow:'hidden',
					width: '100%',
				},
	 		ListContainer:{
	 		  flexDirection:'row',
	 		  justifyContent:'flex-start',
	 		  alignItems:'flex-start',
	 		},
	 		ListContainerfix1:{height:'49%',marginTop: '4%'},
	 		item:{flexDirection:'row',
	 		  borderWidth: 1,
	 		  borderRadius: 2,
	 		  borderColor: '#ddd',
	 		  borderBottomWidth: 0,
	 		  shadowColor: '#000',
	 		  shadowOffset: { width: 0},
	 		  shadowOpacity: 0.8,
	 		  shadowRadius: 2,
	 		  elevation: 1,
	 		  margin: 5,
	 		  padding:6,
	 		  backgroundColor: '#ffffff',
	 		},
	 		picw:{width:'20%',justifyContent:'center',alignItems:'center',backgroundColor:'#ccc'},
	 		pic:{width:'100%' ,height:55},
	 		name:{fontSize:15,color:'#3F3F3F',fontWeight:'600'},
	 		btnw:{width:'25%',justifyContent:'center'},
	 		btn1:{backgroundColor: '#439FD8',justifyContent:'center',alignItems:'center',padding:'5%'},
	 		text1:{color:'#ffffff',fontSize:12,fontWeight:'600'},
	 		namew:{width:'55%',justifyContent:'center',paddingLeft:18},
	 		tabs:{
	 		      shadowOpacity: 0.75,
	 		      shadowRadius: 5,
	 		      shadowColor: '#cccccc',
	 		      shadowOffset: { height: 0, width: 0 },
	 		      elevation:3,
	 		      borderWidth: 1,
	 		      borderRadius: 2,
	 		      borderColor: '#ddd',
	 		      borderBottomWidth: 0,
	 		      justifyContent:'center',
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
							 orDivider: {
								 fontSize: 15,
								 color:'#3C3C3C',
								 alignSelf:'center',
								 marginTop:10,
								 backgroundColor:'transparent',
								 fontStyle: 'italic'
							 },

							 term_service: {
								 marginTop:'1%',
								 fontSize: 14,
								 color:'#b7b7b7',
								 fontFamily:'Open Sans',
								 backgroundColor:'transparent',
								 fontFamily:'Open Sans',
								 alignSelf:'center',
								 justifyContent:'center',
							 },

  };

  export default styles;
