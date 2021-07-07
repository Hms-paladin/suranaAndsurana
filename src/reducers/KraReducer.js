import { GET_KRA, GET_KRA_APPROVE } from '../utils/Constants.js'

const intialState = {
    getKra: [], getKraApprove: []
}

export default function (state = intialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_KRA:
            return { ...state, getKra: payload }
        case GET_KRA_APPROVE:
            return { ...state, getKraApprove: payload }
        default:
            return state;
    }

}
