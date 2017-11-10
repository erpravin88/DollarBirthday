import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
 View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
Modal,
} from 'react-native';
import images from '../Constant/Images';
import Label from '../Constant/Languages/LangConfig';

export default class ModalAlert extends Component {

  constructor(props){
     super(props);
   }

  render(){
    const {
      head,
      message,
      visible,
      onRequestClose,
    } = this.props;
  return(
  <Modal
      animationType={'slide'}
      visible={visible}
      onRequestClose={onRequestClose}
      transparent
    ><View style={[{
      flex: 1,
      backgroundColor:'rgba(0,0,0,0.5)',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',

    }]}>
    <View style= {[ {  padding:10,height:'15%',
      width:'85%',
      backgroundColor:'#ffffff',
      alignItems: 'flex-start',}]}>
      <View style= {[ {  padding:10}]}><Text style={[{fontSize:20,fontWeight:'600',fontFamily:'Open Sans'}]}>{head}</Text>
      <Text style= {[ {  marginTop:5}]}>{message}</Text></View>
    </View>
    <View style= {[ { height:'8%',
      width:'85%',
      backgroundColor:'#ffffff',}]}>
    <TouchableOpacity style={[{height:40,width:'30%',justifyContent:'center',alignSelf:'center',backgroundColor:'#ec5756',borderWidth:1,borderColor:'gray',borderRadius:5}]} onPress={onRequestClose} >
      <Text style={[{justifyContent:'center',alignSelf:'center'}]}>Close</Text>
    </TouchableOpacity>
    </View>
    </View>
  </Modal >
);
  }

}
ModalAlert.defaultProps = {
  head: 'Heading here',
  message: 'Here you pass an message in message property',
  visible: false,
};

ModalAlert.propTypes = {
  head: PropTypes.string,
  message: PropTypes.string,
  visible: PropTypes.bool,
  onRequestClose: PropTypes.func,
  };
// const styles = StyleSheet.create({
//
// });
