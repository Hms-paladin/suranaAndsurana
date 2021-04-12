import { GET_TRADEMARKSTATUS,GET_CLASS_DETS,GET_POA,GET_TRADEMARK_USAGE_DETS,GET_COUNTRY,INSERT_TRADE_MARK }  from '../utils/Constants.js'

const intialState = {
    getTradeMarkStatusList: [],getClassDetailsList :[],getPOAList :[],
    gettradeMarkUsageList :[],getCountryList :[],insertTrademark:[]
}

export default function (state = intialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_TRADEMARKSTATUS:
            return  { ...state, getTradeMarkStatusList: payload }
            case GET_CLASS_DETS:
            return  { ...state, getClassDetailsList: payload }
            case GET_POA:
            return  { ...state, getPOAList: payload }
            case GET_TRADEMARK_USAGE_DETS:
            return  { ...state, gettradeMarkUsageList: payload }
            case GET_COUNTRY:
            return  { ...state, getCountryList: payload }  
            case INSERT_TRADE_MARK:
            return  { ...state, insertTrademark: payload } 
            
        default:
            return state;
    }

}