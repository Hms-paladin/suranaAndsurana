import { GET_INTERVIEW_QUESTIONS } from "../utils/Constants.js";
import { POST_INTERVIEW_QUESTIONS } from "../utils/Constants.js";

const initalState = {
    getInterviewquestions:{},
    insertInterviewquestions:{}

}

export default function(state=initalState,action) {
    const {type,payload} = action;
    switch(type) {
        case GET_INTERVIEW_QUESTIONS:
            return payload
        case POST_INTERVIEW_QUESTIONS:
            return payload    
        default:
            return state;    
    }
}