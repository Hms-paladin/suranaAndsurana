import {GET_INTERVIEWERS,GET_DESIGNATION} from '../utils/Constants.js'
const initalState = {
    GetInterviewers:{},
    GetDesignation:{}
}

export default function(state=initalState,action) {
    const {type,payload} = action;
    switch(type) {
        case GET_INTERVIEWERS:
            return payload
        case GET_DESIGNATION:
                return payload
        default:
            return state;    
    }
   
}
