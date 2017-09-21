import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  Image,ScrollView
} from 'react-native';

import {callPostApi} from '../Service/WebServiceHandler';


export default class Test extends Component {

constructor(props) {
  super(props);

this.handleSubmit = this.handleSubmit.bind(this);
let obj = {name: 'test'};
}


render(){

return(

<View
style={styles.viewStyle}
>
  <TouchableOpacity
  onPress={() => this.handleSubmit(this)}>
     <Text style={styles.titleText}>SIGN UP2</Text>
 </TouchableOpacity>
 </View>
);


}


handleSubmit() {

console.log('button working');


//this.props.navigation.navigate('A',{abc: {name: 'test'}});
callPostApi('login', {'login_type':'dbc','email': 'cipliphone@classicinformatics.com',
 'password': '12345678',
 'device_id' : '0987654321',
 'device_type' : 'android'
}).then((response) =>{

//var a=JSON.parse(response._bodyInit);
console.log(response);

})
.catch(error =>{console.log(error)})

}

}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',


  },

  viewStyle: {
    flexDirection: 'row',
     flex:1,
     alignItems:'center',
  },
});
