/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';
import PageSlider from './src/index';
import {PageSliderItem} from './src/index'
export default class PageSliderTest extends Component {
  render() {
    return (
      <View style={styles.container}>
       <PageSlider style={{height:400,width:300}}>
         <PageSliderItem index={0}>
           <View style={{height:200,width:200,backgroundColor:'blue'}}/>
             <TextInput   style={{fontSize:12,backgroundColor:'#101010',width:100}}/ >
         </PageSliderItem>
         <PageSliderItem index={1}>
           <View style={{height:200,width:200,backgroundColor:'red'}}/>
           <TextInput   style={{fontSize:12,backgroundColor:'#101010',width:100}}/ >
         </PageSliderItem>
         <PageSliderItem index={2}>
           <View style={{height:200,width:200,backgroundColor:'yellow'}}/>
           <TouchableOpacity style={{width:50,height:50,backgroundColor:'#412530'}} onPress={()=>{console.log('click')}}/>
         </PageSliderItem>
         </PageSlider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('PageSliderTest', () => PageSliderTest);
