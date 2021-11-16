import { GET_PROJECT_DETAILS } from '../utils/Constants.js'

const intialState = {
    getProjectDetails:[]
}

export default function (state = intialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_PROJECT_DETAILS:
            return  { ...state, getProjectDetails: payload }
  
        default:
            return state;
    }

}