import {UPDATE_BILLABLE_HOURS, GET_BEI_BY_PROJECT,GET_BEI_SEARCH,INSERT_GENERATE_INVOICE }  from "../utils/Constants"

const intialState = {
    getBeiListByProjectId:[],getBeiSearch:[],insertGenerateInvoice:false,lengthData:""
}

export default function (state = intialState, action) {
    const { type, payload } = action;
    switch (type) {
       
        case INSERT_GENERATE_INVOICE:
            return  { ...state, insertGenerateInvoice: payload }  
        case GET_BEI_SEARCH:
            return  { ...state, getBeiSearch: payload }
        case GET_BEI_BY_PROJECT:
            return  { ...state, getBeiListByProjectId: payload }
        case UPDATE_BILLABLE_HOURS:
                return  { ...state, updateBillableHours: payload ,lengthData: payload.length}
        default:
            return state;
    }

}