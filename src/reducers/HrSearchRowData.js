import { GET_HRSEARCH_ROWDATA } from '../utils/Constants.js'

// const initalState = {
//     getResumeRowData: []
// }

export default function (state = [], action) {
    const { type, payload } = action;
    switch (type) {
        case GET_HRSEARCH_ROWDATA:
            return payload
        default:
            return state;
    }

}