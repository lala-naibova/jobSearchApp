import _ from 'lodash'
import React, { Component } from 'react'
import { View, AsyncStorage } from 'react-native'
import { AppLoading } from 'expo'

import Slides from '../components/Slides'

const SLIDE_DATA = [
    { text : 'Welcome to JobApp', color : '#03A9F4'},
    { text : 'Use this to get a job.', color : '#009688'},
    { text : 'Set your location, then swipe away', color : '#03A9F4'},
    { text : 'Right => like, left => dislike', color : '#009688'},
]

export default class WelcomeScreen extends Component {
    state = { token : null }

    onSlideComplete = ()=>{
        this.props.navigation.navigate('Auth')
    }

    async UNSAFE_componentWillMount(){
       let result = await AsyncStorage.getItem('fb_token');
       if (result) {
            //AsyncStorage.removeItem('fb_token');
           this.props.navigation.navigate('MainFlow')
           this.setState({token : result})
       }
       else{
        this.setState({ token : false})
       }
       
    }

    render() {
        if (_.isNull(this.state.token)) {
            return <AppLoading/>
        }
        return (
            <View style={{flex:1}}>
                <Slides data={SLIDE_DATA} onComplete={this.onSlideComplete}/>
            </View>
        )
    }
}
