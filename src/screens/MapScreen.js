import React, { Component } from 'react'
import {View, ActivityIndicator, StyleSheet, AsyncStorage} from 'react-native'
import MapView from 'react-native-maps';
import { connect } from 'react-redux'
import {Button} from 'react-native-elements'

import * as actions from '../actions/index'

 class MapScreen extends Component {
    state = {
        mapLoaded : false,
        region :{
            longitude : -122,
            latitude: 37,
            longitudeDelta: 0.04,
            latitudeDelta: 0.09
        }
    }

    onRegionChangeComplete = (region) => {
        this.setState({region})
    }

    componentDidMount(){
        this.setState({mapLoaded : true})
    }

    onButtonPress = () => {
        this.props.fetchJobs(this.state.region, this.callBackNavigation);
    }
    callBackNavigation = ()=>{
        this.props.navigation.navigate("Deck")
    }

    render() {
        if (!this.state.mapLoaded) {
            <View style={{flex:1, justifyContent:'center'}}>
                <ActivityIndicator size='large'/>
            </View>
        }
        return (
            <View style={{flex:1, position:'relative'}}>
                <MapView 
                region={this.state.region}
                style={{flex:1}}
                onRegionChangeComplete={this.onRegionChangeComplete}/>
                <View style={styles.buttonContainer}>
                <Button 
                buttonStyle={{backgroundColor:'#3a946f', height:50}}
                title='Search This Area' 
                icon={{name:"search"}}
                onPress={this.onButtonPress}/>
                </View>
            </View>

        )
    }
}

const styles= StyleSheet.create({
    buttonContainer :{
        position:'absolute',
        bottom:20,
        left:10,
        right:10
    }
})


export default connect(null, actions)(MapScreen)