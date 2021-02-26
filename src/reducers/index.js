import { combineReducers } from "redux";
import getInterviewquestions from "./interviewReducer";
import insertInterviewquestions from "./interviewReducer"

export default combineReducers({
    getInterviewquestions,
    insertInterviewquestions
})

