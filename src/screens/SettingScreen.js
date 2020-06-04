import React, { Component } from 'react'
import {View, Text, Platform, StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'

import * as actions from '../actions/index'

class SettingScreen extends Component {
    onPressHandler = ()=>{
        this.props.clearJobs();
        this.props.navigation.navigate('Review')
    }

    render() {
        return (
            <View style={styles.shelter}>
                <Button 
                icon={{ name : 'delete-forever'}}
                buttonStyle ={{ backgroundColor :'#F44336', marginHorizontal:15}}
                title='Clear selected jobs'
                onPress={this.onPressHandler}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    shelter :{
        marginTop : Platform.OS === 'android'? 50 :0
    }
})

export default  connect(null, actions)(SettingScreen)