import { GET_INTERVIEW_QUESTIONS } from "../utils/Constants.js";
import { GET_CANDIDATES_DETAILS, INTERVIEWAPPROVER_TABLE_DATA } from '../utils/Constants'
import { POST_INTERVIEW_QUESTIONS } from "../utils/Constants.js";


const initalState = {
    getInterviewquestions: {},
    getInterview: [],
    insertInterviewquestions: {},
    getcandiate: {},
    interviewApproverTableData:[]
}

export default function (state = initalState, action) {
    const { type, payload } = action;
    
    switch (type) {

        case GET_INTERVIEW_QUESTIONS:
            return payload
        case GET_CANDIDATES_DETAILS:
            return payload
        case INTERVIEWAPPROVER_TABLE_DATA:
            return payload
        default:
            return state;
    }

}
