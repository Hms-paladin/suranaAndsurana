import {GET_BANK_NAME, GET_CANDIDATES_DETAILS,GET_EMPLOYEE_DETAILS } from "../utils/Constants";

const intialState = {
    getBankName:[],getCandidatesDetails:[],getEmployeeDetails:[],
}

export default function (state = intialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_CANDIDATES_DETAILS:
            return  { ...state, getCandidatesDetails: payload }
        case GET_EMPLOYEE_DETAILS:
            return  { ...state, getEmployeeDetails: payload }
        case GET_BANK_NAME:
            return  { ...state, getBankName: payload } 
        default:
            return state;
    }

}