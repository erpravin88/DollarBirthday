import React, { Component } from 'react';

import {

  ActivityIndicator

} from 'react-native';


export default class MyActivityIndicator extends Component {

  constructor(props){

   super(props);

 }

render(){

return(

  <ActivityIndicator
   animating = {this.props.show}

   size = 'large'
   style = {{width:80}}
  />
);

}

}
