import { GET_EMPLOYEEFORM_ID } from "../utils/Constants";

const initialState = {
    getemplyoeeformid:{}
}
export  default function(state=initialState, action){
    const {type, payload} = action;
    switch(type){
        case GET_EMPLOYEEFORM_ID:
            return payload
        default:
            return state;     
    }
}