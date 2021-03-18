import { GET_SKILLS } from '../utils/Constants.js';
import { GET_TRAITS } from '../utils/Constants.js';
import { GET_CERTIFICATION } from '../utils/Constants.js';
import { GET_ACHIEVEMENT } from '../utils/Constants.js';
import { GET_SPECILIZATION } from '../utils/Constants.js';
import { GET_CAPABILITY } from '../utils/Constants.js';
import { GET_TALENTS } from '../utils/Constants.js';
import { GET_STATUS, GET_QUALIFICATION, GET_INDUSTRY } from '../utils/Constants.js';

const initalState = {
    getSkills: [],
    getTraits: [],
    getCertification: [],
    getAchievement: [],
    getSpecilization: [],
    getCapability: [],
    getTalents: [],
    getStatus: [],
    getQualification:[],
    getIndustry:[]
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
            console.log(payload,"payloadpayload")
            return { ...state, getQualification: payload }
        case GET_INDUSTRY:
            return { ...state, getIndustry: payload }
        default:
            return state;
    }

}