import React, { Component } from 'react'
import {View, ScrollView, Text, StyleSheet, Dimensions} from 'react-native'
import { Button } from 'react-native-elements'

const SCREEN_WIDTH = Dimensions.get('window').width

export default class Slides extends Component {

    renderLastSlide = (index)=>{
if (index === this.props.data.length - 1) {
    return <Button title = "I'm ready" raised 
    buttonStyle={styles.buttonStyle}
    onPress={()=>{this.props.onComplete()}}/>
}
    }
    renderSlides=()=>{
        return this.props.data.map((slide, index)=>{
            return(
                <View key={slide.text} style={{...styles.slide, backgroundColor:slide.color}}>
                    <Text style={styles.slideText}>{slide.text}</Text>
                {this.renderLastSlide(index)}
                </View>
            )
            
        })
    }
    render() {
        return (
            <ScrollView horizontal style={{flex: 1}} pagingEnabled>
                {this.renderSlides()}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    slideText:{
        fontSize:30,
        textAlign:'center',
        marginHorizontal:10,
        color:'white',
        marginBottom:15
    },
    slide:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        width:SCREEN_WIDTH,
        //marginHorizontal:10
    },
    buttonStyle :{
        backgroundColor:'#5c5a78',
    }
})