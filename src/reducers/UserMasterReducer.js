import { GET_TABLE_NAME,GET_USER,EDIT_USER,DELETE_USER,GET_CANDIDATES_NAMES, GET_TABLE_GROUP} from "../utils/Constants";
import {
    GET_TABLE_STATUS,
    GET_TABLE_TRATITS,
    GET_TABLE_SKILLS,
    GET_TABLE_CERTIFICATION,
    GET_TABLE_SPECIFICATION,
    GET_TABLE_QUALIFICATION,
    GET_TABLE_INDUSTRY,
    GET_TABLE_INSTITUTE,
    GET_TABLE_CAPABILITY,
    GET_TABLE_TALENTS,
    GET_TABLE_RESOURCE,
    GET_TABLE_DESGINATION,
    GET_TABLE_QUESTION,
    GET_TABLE_DEPARTMENT,
    GET_TABLE_ACTIVITY,
    GET_TABLE_COURT,
    GET_TABLE_SUB_STAGE,
    GET_TABLE_CLASS,
    GET_TABLE_SUBACTIVITY,
    GET_CHECKLIST,
    GET_USER_CLASS,
    GET_COST_RANGE,
    COMMON_UPDATE_TEXT

} from  "../utils/Constants";
const intialState = {
    getCandidateName:[],getUser:[],TableNamedropdownData: [],getTableStatus:[],getTableGroup:[],getTableSkills:[],getTableTraits:[],
    getTableCertification:[],getTableSpecification:[],getTableQualification:[],getTableLanguage:[],getTableIndustry:[],getTableInsitute:[],
    getTableCapability:[],getTableTalents:[],getTableResource:[],getTableDesgination:[],getTableQuestion:[],getTableDepartment:[],
    getTableActivity:[],getTableCourt:[],getSubStage:[],getClass:[],getSubActivity:[],getChecklist:[],get_user_class:[],Common_Update_text:[],
    getRange:[]
}

export default function (state = intialState, action) {
    const { type, payload } = action;

    console.log(payload,"test")
    switch (type) {
        case GET_TABLE_NAME:
            return  { ...state, TableNamedropdownData: payload.data }
        case GET_USER:
            return  { ...state, getUser: payload}
        case GET_CANDIDATES_NAMES:
            return  { ...state, getCandidateName: payload}
        case GET_TABLE_GROUP:
            return  { ...state, getTableGroup: payload}    
        case GET_TABLE_STATUS:
           return  { ...state, getTableStatus: payload}
        case GET_TABLE_SKILLS:
            return  { ...state, getTableSkills: payload}   
        case GET_TABLE_TRATITS:
            return  { ...state, getTableTraits: payload}     
        case GET_TABLE_CERTIFICATION:
            return  { ...state, getTableCertification: payload}   
        case GET_TABLE_SPECIFICATION:
            return  { ...state, getTableSpecification: payload}   
        case GET_TABLE_QUALIFICATION:
            return  { ...state, getTableQualification: payload}  
        case GET_TABLE_INDUSTRY:
            return  { ...state, getTableIndustry: payload} 
        case GET_TABLE_INSTITUTE:
            return  { ...state, getTableInsitute: payload}
        case GET_TABLE_CAPABILITY:
            return {...state, getTableCapability: payload}
        case GET_TABLE_TALENTS:
            return {...state, getTableTalents: payload}  
        case GET_TABLE_RESOURCE:
            return {...state, getTableResource: payload}  
        case GET_TABLE_DESGINATION:
            return {...state, getTableDesgination: payload} 
        case GET_TABLE_QUESTION:
            return {...state, getTableQuestion: payload} 
        case GET_TABLE_DEPARTMENT:
            return {...state, getTableDepartment: payload}  
        case GET_TABLE_ACTIVITY:
            return {...state, getTableActivity: payload}   
        case GET_TABLE_COURT:
            return {...state, getTableCourt: payload}   
        case GET_TABLE_SUB_STAGE:
            return {...state, getSubStage: payload}
        case GET_TABLE_CLASS:
            return {...state, getClass: payload}
        case GET_TABLE_SUBACTIVITY:
            return {...state, getSubActivity: payload} 
        case GET_CHECKLIST:
            return {...state, getChecklist: payload}   
        case GET_USER_CLASS:
            return {...state, get_user_class: payload} 
        case GET_COST_RANGE:
            return {...state, getRange:payload}    
        case COMMON_UPDATE_TEXT:
            return {...state, Common_Update_text:payload}                                                 
        default:
            return state;
    }

}