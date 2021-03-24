import { GET_VARIABLERATE_TABLE_DATA,INSERT_VARIABLERATE } from '../utils/Constants.js'

const intialState = {
    getVariableRateTableData: [],insertVariableRateStatus:false
}

export default function (state = intialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_VARIABLERATE_TABLE_DATA:
            return  { ...state, getVariableRateTableData: payload }
        case INSERT_VARIABLERATE:
            return  { ...state, insertVariableRateStatus: payload }  
        default:
            return state;
    }

}