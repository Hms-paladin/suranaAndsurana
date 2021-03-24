import { GET_SKILLS } from '../utils/Constants.js';
import { GET_TRAITS } from '../utils/Constants.js';
import { GET_CERTIFICATION } from '../utils/Constants.js';
import { GET_ACHIEVEMENT } from '../utils/Constants.js';
import { GET_SPECILIZATION } from '../utils/Constants.js';
import { GET_CAPABILITY } from '../utils/Constants.js';
import { GET_TALENTS } from '../utils/Constants.js';
import { GET_STATUS, GET_QUALIFICATION, GET_INDUSTRY, GET_PROJECT_SUB_TYPE, GET_PROCESS_TYPE, GET_SUB_STAGE, GET_INTERVIEW_APPROVER, GET_CLIENT_TYPE, GET_CLIENT, GET_PROJECT_TYPE, GET_PROJECT_NAME ,GET_BILLABLE_TYPE} from '../utils/Constants.js';

const initalState = {
    getSkills: [],
    getTraits: [],
    getCertification: [],
    getAchievement: [],
    getSpecilization: [],
    getCapability: [],
    getTalents: [],
    getStatus: [],
    getQualification: [],
    getIndustry: [],
    getProjectSubType: [],
    getProcessType: [],
    getSubStage: [],
    getInterviewApprover: [],
    getClientType: [],
    getClient: [],
    getProjectType: [],
    getProjectName: [],
    getBillableType:[],
}

export default function (state = initalState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_SKILLS:
            return { ...state, getSkills: payload }
        case GET_TRAITS:
            return { ...state, getTraits: payload }
        case GET_CERTIFICATION:
            return { ...state, getCertification: payload }
        case GET_ACHIEVEMENT:
            return { ...state, getAchievement: payload }
        case GET_SPECILIZATION:
            return { ...state, getSpecilization: payload }
        case GET_CAPABILITY:
            return { ...state, getCapability: payload }
        case GET_TALENTS:
            return { ...state, getTalents: payload }
        case GET_STATUS:
            return { ...state, getStatus: payload }
        case GET_QUALIFICATION:
            console.log(payload, "payloadpayload")
            return { ...state, getQualification: payload }
        case GET_INDUSTRY:
            return { ...state, getIndustry: payload }
        case GET_PROJECT_SUB_TYPE:
            return { ...state, getProjectSubType: payload }
        case GET_PROCESS_TYPE:
            return { ...state, getProcessType: payload }
        case GET_SUB_STAGE:
            return { ...state, getSubStage: payload }
        case GET_INTERVIEW_APPROVER:
            return { ...state, getInterviewApprover: payload }
        case GET_CLIENT_TYPE:
            return { ...state, getClientType: payload }
        case GET_CLIENT:
            return { ...state, getClient: payload }
        case GET_PROJECT_TYPE:
            return { ...state, getProjectType: payload }
        case GET_PROJECT_NAME:
            return { ...state, getProjectName: payload }
        case GET_BILLABLE_TYPE:
            return { ...state, getBillableType: payload }
        default:
            return state;
    }

}