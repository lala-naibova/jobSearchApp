import React, { Component } from 'react'
import {View, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'

import * as actions from '../actions/index'

class AuthScreen extends Component {

    componentDidMount(){
        this.props.facebook_login();
        this.onAuthComplete(this.props)
        AsyncStorage.removeItem('fb_token');  

    }
    
    UNSAFE_componentWillReceiveProps(nextProps){
        this.onAuthComplete(nextProps)
    }

    onAuthComplete(props){

        if (props.token) {
            this.props.navigation.navigate('MainFlow')
        }
    }

    render() {
        return (
            <View />
        )
    }
}


function mapStateToProps(state) {
    return { token : state.auth.token}
}

export default  connect(mapStateToProps, actions)(AuthScreen)
