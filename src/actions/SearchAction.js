import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import { notification } from 'antd';
import { GET_SKILLS } from '../utils/Constants.js'


export const getSkills = () => async (dispatch) => {
    const response = await axios.get(apiurl + '/get_s_tbl_m_skills');
    return dispatch(({type:GET_SKILLS,payload:response.data.data}));
}; 