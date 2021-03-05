import { GET_INTERVIEW_QUESTIONS} from "../utils/Constants.js";
import {GET_CANDIDATES_DETAILS} from '../utils/Constants'
import { POST_INTERVIEW_QUESTIONS } from "../utils/Constants.js";


const initalState = {
    getInterviewquestions:{},
    getInterview:[],
    insertInterviewquestions:{},
    getcandiate:{},
}

export default function(state=initalState,action) {
    const {type,payload} = action;
    console.log(type,"type")
    switch(type) {
    
        case GET_INTERVIEW_QUESTIONS:
            return payload    
        case GET_CANDIDATES_DETAILS:
            return payload           
        default:
            return state;    
    }
   
}
