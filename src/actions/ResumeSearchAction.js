import { GET_INTERVIEW_STATUS, GET_RESUMESEARCH_ROWDATA } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import { notification } from 'antd'

export const ResumeSearchStatus = () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl + 'get_Interview_Status',
        })
            .then((response) => {
                console.log(response.data.data, "ddd")
                dispatch({ type: GET_INTERVIEW_STATUS, payload: response.data.data })
            })

    } catch (err) {

    }
}

export const searchRowdata = (data) => async dispatch => {
    console.log(data, "data")
    try {
        axios({
            method: 'POST',
            url: apiurl + 'get_resume_search',
            data: {
                "skill_id": data.skill_id,
                "trait_id": data.trait_id,
                "certification_id": data.certification_id,
                "achievement_id": "",
                "specialization_id": data.specialization_id,
                "capability_id": data.capability_id,
                "talent_id": data.talent_id,
                "status_id": "",
                "qualification_id": data.qualification_id,
                "min_experience": data.exp_min || data.exp_max,
                "max_experience": data.exp_max || data.exp_min,
            }
        })
            .then((response) => {
               
                    dispatch({ type: GET_RESUMESEARCH_ROWDATA, payload: response.data.data })
                    return Promise.resolve();
               

            })

    } catch (err) {
        
    }
}