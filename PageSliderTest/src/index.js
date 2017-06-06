import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  PanResponder,
  Animated
} from 'react-native';
pageSliderPropTypes={
  style:PropTypes.object,

}
export default class PageSlider extends Component {
  constructor(props) {
    super(props);
    this.preOffset = 0;
    this.state = {
      currentItemIndex: 0,
      offset: new Animated.Value(0)
    }
    this.itemList = this.getcomponents();
    this.itemResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,

      onPanResponderGrant: (evt, gestureState) => {
        this.preOffset = this.state.offset._value;
      },
      onPanResponderMove: (evt, gestureState) => {
          let width=this.props.style.width;
        if (this.preOffset + gestureState.dx > 0.5*width|| this.preOffset + gestureState.dx < -1*width* this.itemList.length +0.5*width) return;
        Animated.timing(this.state.offset, { toValue: this.preOffset + gestureState.dx ,duration:0}).start();;
      },
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderRelease: (evt, gestureState) => {
        let width=this.props.style.width
        let curOffset = this.preOffset + gestureState.dx;
                console.log('release',curOffset)
        let tv = curOffset > -0.5*width ? 0 : curOffset < -1*width * this.itemList.length +width ? -this.itemList.length * width + width : this.getresOffset(curOffset);
      this.preOffset=tv;this.setState({})
        Animated.spring(this.state.offset, { toValue: tv }).start();
        
      },
    });
  }
  getresOffset(curOffset) {
    let style=this.props.style;
    for (let i = 0; i < this.itemList.length; i++) {
      if (curOffset < -1*(i+0.5)*style.width && curOffset >=-1*(i+1.5)*style.width) {
        return -1*(i+1)*style.width;
      }
    }
  }
 
  render() {
    let cIndex=1-this.preOffset/this.props.style.width
    return (
      <View style={[{ height: 200, width: 200, backgroundColor: 'white', flexDirection: 'row' },this.props.style,{flexDirection:'row'}]}>
        {
          this.itemList.map((data, index) => this.renderItems(data, index))
          }
          <View style={{position:'absolute',top:this.props.style.height-40,height:30,width:50,left:this.props.style.width*0.5-25,justifyContent:'center',
          alignItems:'center'
          }}>
          <Text style={{fontSize:16}}>{cIndex+'/'+this.itemList.length}</Text></View>
      </View>)
  }

  renderItems(data, index) {
    let style=this.props.style
    return(
    <Animated.View 
    style={{ position:'absolute',left:index*style.width,height: style.height, width:style.width, justifyContent: 'center', alignItems: 'center',
    transform:[{translateX:this.state.offset}]}} 
    {...this.itemResponder.panHandlers}
      key={index}>{data}</Animated.View>)
  }
  getcomponents() {
    let iList = this.props.children;
    let tres = new Array(0);
    for (let i = 0; i < iList.length; i++) {
      if(iList[i].type == PageSliderItem)
      tres.push(iList[i]);
    }
    let res = new Array(0);
    for (let j = 0; j <= tres.length; j++) {
      for (let k = 0; k < tres.length; k++) {
        if (tres[k].props.index == j) {
          res.push(tres[k].props.children); {  break; }
        }
      }
      if (res.length != j+1) break;
    }
    return res;
  }
}
PageSlider.defaultProps={
  style:{
    height:200,width:200,alignItems:'center',backgroundColor:'white'
  }
}
export class PageSliderItem extends Component {
  constructor(props) {
    super(props);
    this.index = this.props.index == undefined ? -1 : this.props.index;
    this.components = this.props.children == undefined || this.props.children.length < 1 ? <View /> : this.props.children;
  }
  getcomponents() {
    return this.components;
  }
  getIndex() {
    return this.index;
  }
  getName() {
    return 'PageSliderItem'
  }
}
itemPropsType = {
  index: PropTypes.number.isRequired
}