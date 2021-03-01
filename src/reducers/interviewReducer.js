
import { GET_INTERVIEW_QUESTIONS } from "../utils/Constants.js"
import {GET_INTERVIEW_STATUS} from '../utils/Constants.js'
const initalState = {
    getInterviewquestions:{},
    getInterview:[]
}

export default function(state=initalState,action) {
    const {type,payload} = action;
    switch(type) {
        case GET_INTERVIEW_QUESTIONS:
            return payload
        default:
            return state;    
    }
   
}
