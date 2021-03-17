import { GET_PROJECT_TYPE } from '../utils/Constants.js';
// const initalState = {
//     getProject_type:[],
   
// }


export default function (state = [], action) {
    const { type, payload } = action;
    switch (type) {
        case GET_PROJECT_TYPE:
            return payload
        default:
            return state;
    }

}
