import { GET_PROJECT_VARIABLE_RATE,GET_VARIABLERATE_TABLE_DATA,INSERT_VARIABLERATE ,SEARCH_VARIABLERATE} from '../utils/Constants.js'

const intialState = {
    getProjectVariableRate:[],getVariableRateTableData: [],insertVariableRateStatus:false,searchVariableRate:[],lengthData:""
}

export default function (state = intialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_VARIABLERATE_TABLE_DATA:
            return  { ...state, getVariableRateTableData: payload }
        case INSERT_VARIABLERATE:
            return  { ...state, insertVariableRateStatus: payload }  
        case SEARCH_VARIABLERATE:
                return  { ...state, searchVariableRate: payload ,lengthData: payload.length}
        case GET_PROJECT_VARIABLE_RATE:
                return  { ...state, getProjectVariableRate: payload ,lengthData: payload.length}
        default:
            return state;
    }

}