import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  NetInfo,
} from 'react-native';

export default class ConnectionCheck extends Component {

  constructor(props){

     super(props);
     this.state = {
                Connected: false,
                };
   }
componentDidMount(){
  const dispatchConnected = (isConnected) => { check = isConnected; this.setState({ Connected: isConnected })};

  NetInfo.isConnected.fetch().then().done(() => {
    NetInfo.isConnected.addEventListener('change', dispatchConnected);
  });
  NetInfo.isConnected.addEventListener('change', dispatchConnected);
}
componentWillUnmount(){
  NetInfo.isConnected.removeEventListener('change', dispatchConnected);
}
isConnectednow(){
  return this.state.Connected;
}
  render(){

  return( (this.state.Connected) ?  (<View></View>):(<View style={styles.activityloder}>
    <View><Text>Please check your internet connection.</Text><ActivityIndicator animating={true} size="large" style = {{width:80}} /></View>
  </View>) );

  }

}

const styles = StyleSheet.create({
  activityloder:{
  position:'absolute',
  flex:1,
  width:'100%',
  height:'100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
},
});
