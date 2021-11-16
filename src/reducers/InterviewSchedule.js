import {GET_INTERVIEWERS,GET_INTERVIEW_APPR_FINALROUND} from '../utils/Constants.js'
const intialState = {
    GetInterviewers:[],GetInterviewersApprFinal:[]
}

export default function (state = intialState, action) {
    const { type, payload } = action;
    switch (type) {
       
        case GET_INTERVIEWERS:
            return  { ...state, GetInterviewers: payload } 
        case GET_INTERVIEW_APPR_FINALROUND:
            return  { ...state, GetInterviewersApprFinal: payload } 
       
        default:
            return state;
    }

}