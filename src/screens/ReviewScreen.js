import React, { Component } from 'react'
import { FlatList } from 'react-native'
import {Icon} from 'react-native-elements'
import { connect } from 'react-redux'

import * as actions from '../actions/index'
import Job from '../components/Job'

 class ReviewScreen extends Component {

    static navigationOptions =(navData)=>
     {
        return      {
                    title: 'Review jobs',
                    headerRight : ()=>{
                        return <Icon 
                        name='settings' 
                        size={23} 
                        iconStyle={{marginRight:5}}
                        onPress={()=>{ navData.navigation.navigate('Settings')}}/>
                    }
             }
    }

    render() {
        return (
            <FlatList
            keyExtractor={(item)=> item.jobkey}
            data={this.props.likedJobs}
            renderItem={(itemData) => <Job job={itemData.item}/>}
            />
        )
    }
}

function mapStateToProps(store){
    return {likedJobs : store.likedJobs}
}

export default connect(mapStateToProps, actions)(ReviewScreen)