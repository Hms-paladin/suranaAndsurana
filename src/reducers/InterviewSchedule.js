import {GET_INTERVIEWERS,GET_DESIGNATION} from '../utils/Constants.js'
const intialState = {
    GetInterviewers:[],GetDesignation:[]
}

export default function (state = intialState, action) {
    const { type, payload } = action;
    switch (type) {
       
        case GET_INTERVIEWERS:
            return  { ...state, GetInterviewers: payload }  
        case GET_DESIGNATION:
            return  { ...state, GetDesignation: payload }
       
        default:
            return state;
    }

}