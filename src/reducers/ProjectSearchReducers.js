import { GET_PROJECT_SEARCH_TABLEDATA }  from '../utils/Constants.js'

const intialState = {
    getProjectSearchTableData: [],
}

export default function (state = intialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_PROJECT_SEARCH_TABLEDATA:
            return  { ...state, getProjectSearchTableData: payload } 
        default:
            return state;
    }

}