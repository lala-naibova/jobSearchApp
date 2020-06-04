import React, { Component } from 'react'
import {View, Animated, StyleSheet, PanResponder, Dimensions, UIManager, LayoutAnimation } from 'react-native'
import { Platform } from '@unimodules/core';

const SCREEN_WIDTH =  Dimensions.get('window').width;
const SWIPE_TRASHOLD = SCREEN_WIDTH * 0.25;
const SWIPE_OUT_DURATION = 250

export default class Swipe extends Component {

    static defaultProps = {
        onSwipeRight : ()=> {},
        onSwipeLeft : () => {}
    }

    constructor(props){ 
        super(props);
        const position = new Animated.ValueXY()
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) =>{
                position.setValue({x: gesture.dx, y: gesture.dy})
            },
            onPanResponderRelease: (event, gesture) =>{
                if (gesture.dx > SWIPE_TRASHOLD) {
                    this.forceSwipe('right')
                    
                } else if (gesture.dx < -SWIPE_TRASHOLD) {
                    this.forceSwipe('left')
                    
                }else{
                    this.resetPosition()
                }              
            }
        })
        //this.position = position //you also can write like this, state isn't appropirate place for them
        //this.panResponder = panResponder //you also can write like this
        this.state = { panResponder, position, index : 0 }
    }
    UNSAFE_componentWillUpdate(){
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring()
    }
    getCardStyle(){
        const { position } = this.state;
        const rotate = position.x.interpolate({
            inputRange: [ -SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5 ],
            outputRange : [ '-120deg', '0deg', '120deg']
        })
        return {
            ...this.state.position.getLayout(),
            transform: [{rotate}]}
    }
    forceSwipe(direction){
        const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH
        Animated.timing(this.state.position,{ //same with spring but without bounce effect
            toValue:{
                x,
                y:0
            },
            duration: SWIPE_OUT_DURATION
        }).start( () => this.onSwipeComplete(direction) )
    }
 
    onSwipeComplete(direction){

        const { onSwipeRight, onSwipeLeft, data } = this.props;
        const elem = data[this.state.index]
        direction === 'right' ? onSwipeRight(elem) : onSwipeLeft(elem)
        this.state.position.setValue({ x:0, y:0 })
        this.setState({ index : this.state.index + 1})
    }

    resetPosition(){
        Animated.spring(this.state.position,{
            toValue:{x:0, y:0}
        }).start()
    }

    renderCards() {
        if (this.state.index >= this.props.data.length) {
          return this.props.renderNoMoreCards(); 
        }
    
        const deck = this.props.data.map((item, i) => {
          if (i < this.state.index) { return null; }
    
          if (i === this.state.index) {
            return (
              <Animated.View
                key={item.jobkey}
                style={[this.getCardStyle(), styles.cardStyle, { zIndex: 99 }]}
                {...this.state.panResponder.panHandlers}
              >
                {this.props.renderCard(item)}
              </Animated.View>
            );
          }
    
          return (
            <Animated.View
              key={item.jobkey}
              style={[styles.cardStyle, { top: 10 * (i - this.state.index), zIndex: -i }]}
            >
              {this.props.renderCard(item)}
            </Animated.View>
          );
        })
        return Platform.OS === 'android'? deck : deck.reverse()
      }

    render() {
        return (
            <View>
                {this.renderCards()}
            </View>
        )
    }
}
const styles= StyleSheet.create({
    cardStyle: {
        position:'absolute',
       width: SCREEN_WIDTH
    }
})