import axios from "axios";
import { apiurl } from "../utils/baseUrl.js";


import { GET_SKILLS } from '../utils/Constants.js';
import { GET_TRAITS } from '../utils/Constants.js';
import { GET_CERTIFICATION } from '../utils/Constants.js';
import { GET_ACHIEVEMENT } from '../utils/Constants.js';
import { GET_SPECILIZATION } from '../utils/Constants.js';
import { GET_CAPABILITY } from '../utils/Constants.js';
import { GET_TALENTS } from '../utils/Constants.js';
import { GET_STATUS } from '../utils/Constants.js';


export const getSkills = () => async (dispatch) => {
    const response = await axios.get(apiurl + '/get_s_tbl_m_skills');
    return dispatch(({type:GET_SKILLS,payload:response.data.data}));
}; 

export const getTraits = () => async (dispatch) => {
    const response = await axios.get(apiurl + '/get_s_tbl_m_traits');
    return dispatch(({type:GET_TRAITS,payload:response.data.data}));
}; 

export const getCertification = () => async (dispatch) => {
    const response = await axios.get(apiurl + '/get_s_tbl_m_certification');
    return dispatch(({type:GET_CERTIFICATION,payload:response.data.data}));
}; 

export const getAchievement = () => async (dispatch) => {
    const response = await axios.get(apiurl + '/get_s_tbl_m_achievement');
    return dispatch(({type:GET_ACHIEVEMENT,payload:response.data.data}));
}; 

export const getSpecilization = () => async (dispatch) => {
    const response = await axios.get(apiurl + '/get_s_tbl_m_specialization');
    return dispatch(({type:GET_SPECILIZATION,payload:response.data.data}));
}; 

export const getCapability = () => async (dispatch) => {
    const response = await axios.get(apiurl + '/get_s_tbl_m_capability');
    return dispatch(({type:GET_CAPABILITY,payload:response.data.data}));
}; 

export const getTalents = () => async (dispatch) => {
    const response = await axios.get(apiurl + '/get_s_tbl_m_talents');
    return dispatch(({type:GET_TALENTS,payload:response.data.data}));
}; 

export const getStatus = () => async (dispatch) => {
    const response = await axios.get(apiurl + '/get_s_tbl_m_status');
    return dispatch(({type:GET_STATUS,payload:response.data.data}));
}; 