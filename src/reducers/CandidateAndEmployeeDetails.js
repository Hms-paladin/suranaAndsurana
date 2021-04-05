import { GET_CANDIDATES_DETAILS,GET_EMPLOYEE_DETAILS } from "../utils/Constants";

const intialState = {
    getCandidatesDetails:[],getEmployeeDetails:[],
}

export default function (state = intialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_CANDIDATES_DETAILS:
            return  { ...state, getCandidatesDetails: payload }
        case GET_EMPLOYEE_DETAILS:
            return  { ...state, getEmployeeDetails: payload }
        default:
            return state;
    }

}