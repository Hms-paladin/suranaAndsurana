import {GET_EMPLOYEE_APPROVE} from '../utils/Constants.js'
import {POST_EMPLOYEE_APPROVE} from "../utils/Constants.js"
const initalState = {
   getemployee:{} 
}



export default function(state=initalState,action) {
    const {type,payload} = action;
    switch(type) {
        case GET_EMPLOYEE_APPROVE:
            return payload 
        // case POST_EMPLOYEE_APPROVE:
        //     return payload
        default:
            return state;    
    }
   
}
