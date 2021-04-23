import { GET_PROJECT_TYPE, INSERT_IPPROJECT } from '../utils/Constants.js';
// const initalState = {
//     getProject_type:[],

// }


const intialState = {
    InsertIpProject: [],
}


export default function (state = [], action) {
    const { type, payload } = action;
    switch (type) {
        case GET_PROJECT_TYPE:
            return payload
        case INSERT_IPPROJECT:
            return { ...state, InsertIpProject: payload }
        default:
            return state;
    }

}
