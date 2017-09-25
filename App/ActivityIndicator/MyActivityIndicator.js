import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
 View,
  ActivityIndicator,
  StyleSheet,

} from 'react-native';


export default class MyActivityIndicator extends Component {

  constructor(props){

     super(props);

   }

  render(){
    const {
      progress,
    } = this.props;

  return( (progress) ? (
  <View style={styles.activityloder}>
    <View><ActivityIndicator animating={true} size="large" style = {{width:80}} /></View>
  </View>): (<View></View>)  );

  }

}
MyActivityIndicator.defaultProps = {
  progress: false,
};

MyActivityIndicator.propTypes = {
  progress:PropTypes.bool,
};
const styles = StyleSheet.create({
  activityloder:{
  position:'absolute',
  flex:1,
  width:'100%',
  height:'100%',
  backgroundColor: 'rgba(112, 79, 108, 0.5)',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 999,
},
});
