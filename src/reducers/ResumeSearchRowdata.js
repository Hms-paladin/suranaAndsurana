import { GET_RESUMESEARCH_ROWDATA } from '../utils/Constants.js'

// const initalState = {
//     getResumeRowData: []
// }

export default function (state = [], action) {
    const { type, payload } = action;
    switch (type) {
        case GET_RESUMESEARCH_ROWDATA:
            return payload
        default:
            return state;
    }

}
