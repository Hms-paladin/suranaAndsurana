import { GET_INTERVIEW_STATUS } from '../utils/Constants.js'
const initalState = {
    getInterview: {}
}

export default function (state = initalState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_INTERVIEW_STATUS:
            return payload
        default:
            return state;
    }

}
