import { GET_TRADEMARKSTATUS,GET_CLASS_DETS,GET_POA,GET_TRADEMARK_USAGE_DETS,GET_COUNTRY,INSERT_TRADE_MARK,GET_TRADE_MARK,
    INSERT_APPEAL_FILING, INSERT_RECTIFICATION_DEFENDED, INSERT_PATENT_APPEAL_FILING,INSERT_PATENT_RECTIFICATION_DEF, 
    INSERT_PATENT_RECTIFICATION_FILED, INSERT_PATENT_REVOCATION_DEF, INSERT_PATENT_REVOCATION_FILED, INSERT_RECTIFICATION_FILED,
    INSERT_REVOCATION_DEFENDED, INSERT_REVOCATION_FILED,GET_IPAP, GET_FILING_TYPE,GET_FILING_TYPE_IPAB }  from '../utils/Constants.js'

const intialState = {
    getTradeMarkStatusList: [],getClassDetailsList :[],getPOAList :[],
    gettradeMarkUsageList :[],getCountryList :[],insertTrademark:[],getTrademark:{},getIPAP:{}, insertAppealFiling: [],
    insertRectificationDefended: [], insertPatentAppealFiling: [], insertPatentRectificationDef:[], insertPatentRectificationFiled: [], insertPatentRevocationDef: [], 
    insertPatentRevocationFiled: [], insertRectificationFiled: [], insertRevocationFiled: [], insertRevocationDefended: [], getFilingType: [],getFilingTypeIpab:[] }

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
        case GET_TRADE_MARK:
            return  { ...state, getTrademark: payload } 
        case INSERT_APPEAL_FILING:
            return  { ...state, insertAppealFiling: payload } 
        case INSERT_RECTIFICATION_DEFENDED:
            return  { ...state, insertRectificationDefended: payload } 
        case INSERT_PATENT_APPEAL_FILING:
            return  { ...state, insertPatentAppealFiling: payload } 
        case INSERT_PATENT_RECTIFICATION_DEF:
            return  { ...state, insertPatentRectificationDef: payload } 
        case INSERT_PATENT_RECTIFICATION_FILED:
            return  { ...state, insertPatentRectificationFiled: payload } 
        case INSERT_PATENT_REVOCATION_DEF:
            return  { ...state, insertPatentRevocationDef: payload }             
        case INSERT_PATENT_REVOCATION_FILED:
            return  { ...state, insertPatentRevocationFiled: payload } 
        case INSERT_RECTIFICATION_FILED:
            return  { ...state, insertRectificationFiled: payload } 
        case INSERT_REVOCATION_DEFENDED:
            return  { ...state, insertRevocationDefended: payload } 
        case INSERT_REVOCATION_FILED:
            return  { ...state, insertRevocationFiled: payload } 
        case GET_IPAP:
                return  { ...state, getIPAP: payload } 
        case GET_FILING_TYPE:
            return { ...state, getFilingType: payload }
        case GET_FILING_TYPE_IPAB:
            return { ...state, getFilingTypeIpab: payload }
        default:
            return state;
    }

}