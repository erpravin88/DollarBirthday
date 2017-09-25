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
  // androidMode: 'default',
  // date: '',
  // // component height: 216(DatePickerIOS) + 1(borderTop) + 42(marginTop), IOS only
  // height: 259,
  //
  // // slide animation duration time, default to 300ms, IOS only
  // duration: 300,
  // confirmBtnText: '确定',
  // cancelBtnText: '取消',
  // iconSource: require('./date_icon.png'),
  // customStyles: {},
  //
  // // whether or not show the icon
  // showIcon: true,
  // disabled: false,
  // hideText: false,
  // placeholder: '',
  // TouchableComponent: TouchableHighlight,
  // modalOnResponderTerminationRequest: e => true
};

MyActivityIndicator.propTypes = {
  progress:PropTypes.bool,
  //mode: PropTypes.oneOf(['date', 'datetime', 'time']),
  // androidMode: PropTypes.oneOf(['calendar', 'spinner', 'default']),
  // date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  // format: PropTypes.string,
  // minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  // maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  // height: PropTypes.number,
  // duration: PropTypes.number,
  // confirmBtnText: PropTypes.string,
  // cancelBtnText: PropTypes.string,
  // iconSource: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  // iconComponent: PropTypes.element,
  // customStyles: PropTypes.object,
  // showIcon: PropTypes.bool,
  // disabled: PropTypes.bool,
  // onDateChange: PropTypes.func,
  // onOpenModal: PropTypes.func,
  // onCloseModal: PropTypes.func,
  // onPressMask: PropTypes.func,
  // placeholder: PropTypes.string,
  // modalOnResponderTerminationRequest: PropTypes.func,
  // is24Hour: PropTypes.bool
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
