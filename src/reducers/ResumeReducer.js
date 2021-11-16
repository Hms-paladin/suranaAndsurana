import { GET_RESUMELIST } from "../utils/Constants.js";



const initalState = {
    GetResumeList: []
}

export default function (state = initalState, action) {
    const { type, payload } = action;
 
    switch (type) {
        case GET_RESUMELIST:
            return payload
        default:
            return state;
    }

}