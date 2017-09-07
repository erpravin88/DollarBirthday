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
}


render(){

return(

<View
style={styles.viewStyle}
>
  <TouchableOpacity
  onPress={() => this.handleSubmit(this)}>
     <Text style={styles.titleText}>SIGN UP</Text>
 </TouchableOpacity>
 </View>
);


}


handleSubmit() {

console.log('button working')

callPostApi('api/login', {'user_type':'O','email': 'abhay.agrawal@classicinformatics.com',
 'password': '12345',
 'device_id' : '123',
 'device_type' : 'abc'
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
