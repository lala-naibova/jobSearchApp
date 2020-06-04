import React, { Component } from 'react'
import { View, StyleSheet, Text, Linking } from 'react-native'
import { Card, Button } from 'react-native-elements'
import MapView from 'react-native-maps';

export default class Job extends Component {
    render() {
        const initialRegion = {
            latitude : this.props.job.latitude,
            longitude: this.props.job.longitude,
            latitudeDelta : 0.045,
            longitudeDelta : 0.02
        }
        return (
            <Card title={this.props.job.jobtitle}>
                <View style={{height:200}}>
                    <MapView 
                    scrollEnabled={false} 
                    cacheEnabled={Platform.OS==='android'}
                    initialRegion={initialRegion}
                    style={{flex:1}}>
                    </MapView>

                    <View style={styles.detail}>
                        <Text style={styles.italic}>{this.props.job.company}</Text>
                        <Text style={styles.italic}>{this.props.job.formattedRelativetime}</Text>
                    </View>
                    <Button
                    buttonStyle={{backgroundColor:'#03A9F4'}}
                    title='Apply now'
                    onPress={()=>Linking.openURL(this.props.job.url)}/>
                </View>
            </Card>
        )
    }
}

const styles= StyleSheet.create({
    detail :{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:10
    },
    italic:{
        fontStyle:'italic'
    }
})