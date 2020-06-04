import reverseGeoCode from 'latlng-to-zip'

import { FETCH_JOBS, LIKE_JOB, CLEAR_LIKED_JOBS } from './types'
import { data } from '../data/temp_data'

export const fetchJobs = (region, callBack) =>  dispatch =>{
    // try {
    //     let zip = await reverseGeoCode(region);  // if you have api with jobs feel free

    //     dispatch({type: FETCH_JOBS, payload : data}) // i can not find jobs api thats why using fake data :(
    //     console.log(data);
        
    // } catch (error) {
    //     console.log(error); 
        
    // }

    dispatch({type: FETCH_JOBS, payload : data}) // i can not find jobs api thats why using fake data :(
    callBack()
}

export const likeJob = (job)  =>{
    return ({type: LIKE_JOB, payload : job})
}

export const clearJobs = () =>{
    return ({type : CLEAR_LIKED_JOBS, payload :[]})
}