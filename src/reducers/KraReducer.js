import { GET_KRA } from '../utils/Constants.js'

const intialState = {
    getKra: []
}

export default function (state = intialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_KRA:
            return { ...state, getKra: payload }
        default:
            return state;
    }

}
