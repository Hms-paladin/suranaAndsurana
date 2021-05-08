import {GET_TASK_LIST} from '../utils/Constants'
const intialState = {
    getTaskList: []
}

export default function (state = intialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_TASK_LIST:
            return { ...state, getTaskList: payload }
        default:
            return state;
    }

}