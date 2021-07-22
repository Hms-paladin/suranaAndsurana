import { GET_TRADEMARKSTATUS,GET_COUNTRY,INSERT_PATENT,GET_PATENT_DETAILS}  from '../utils/Constants.js'

const intialState = {
    getTradeMarkStatusList: [],getCountryList :[],insertPatent: [],getPatentDetails:[]
}

export default function (state = intialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_TRADEMARKSTATUS:
            return  { ...state, getTradeMarkStatusList: payload }
            case GET_COUNTRY:
            return  { ...state, getCountryList: payload }  
            case INSERT_PATENT:
            return  { ...state, insertPatent: payload } 
            case GET_PATENT_DETAILS:
            return  { ...state, getPatentDetails: payload } 
            
        default:
            return state;
    }

}