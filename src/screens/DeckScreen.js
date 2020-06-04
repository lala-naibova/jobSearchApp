import React, { Component } from 'react'
import {View, Text, StyleSheet, Platform} from 'react-native'
import { connect } from 'react-redux'
import MapView from 'react-native-maps';
import { Button, Card } from 'react-native-elements'

import Swipe from '../components/Swipe'

import * as actions from '../actions/index'

class DeckScreen extends Component {

    renderNoMoreCards=()=>{
        return (
            <Card title='No more jobs'>
                <Button 
                icon={{name:'my-location'}}
                title='Back To Map'
                onPress={()=> this.props.navigation.navigate('Map')}/>
            </Card>
        )
    }

    renderCard=(job)=>{
        const initialRegion = {
            latitude : job.latitude,
            longitude: job.longitude,
            latitudeDelta : 0.045,
            longitudeDelta : 0.02
        }
        return (
            <Card title={job.jobtitle}>
                <View style={{height:300}}>
                    <MapView 
                    scrollEnabled={false} 
                    cacheEnabled={Platform.OS==='android'}
                    initialRegion={initialRegion}
                    style={{flex:1}}>
                    </MapView>
                </View>
                
                <View style={styles.details}>
                    <Text >{job.company}</Text>
                    <Text>{job.formattedRelativetime}</Text>
                </View>
                <Text>{job.snippet}</Text>
            </Card>
        )
    }


    render() {
        return (
            <View style={styles.shelter}>
                <Swipe 
                data={this.props.jobs}
                renderCard={this.renderCard}
                renderNoMoreCards={this.renderNoMoreCards}
                onSwipeRight={job => this.props.likeJob(job)}
                />
            </View>
        )
    }
}

const styles= StyleSheet.create({
    shelter :{
        flex:1,
        marginTop: Platform.OS==='android'? 50 :0 ,
    },
    details:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:10
    }
})

function mapStateToProps(store) {
    return {jobs : store.jobs.results}
}
export default  connect(mapStateToProps, actions)(DeckScreen)