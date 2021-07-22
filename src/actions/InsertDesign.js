import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import moment from "moment";
import { notification } from 'antd';
import { GET_DESIGN_DETAILS } from "../utils/Constants";


export const InsertDesign = (data, ProjectDetails, design_id) => async dispatch => {
    console.log(design_id, "ProjectDetailsTest")

    try {
        axios({
            method: 'POST',
            url: apiurl + 'insert_design',
            data: {
                "design_id": design_id?.design_id || 0,
                "project_id": ProjectDetails.project_id,
                "file_cover": data.file_cover && data.file_cover.value || "",
                "associate": data.associate && data.associate.value || "",
                "our_reference": data.our_ref && data.our_ref.value || "",
                "client_reference": data.client_ref && data.client_ref.value || "",
                "application_no": data.app_num && data.app_num.value || "",
                "application_date": data.app_date && data.app_date.value ? moment(data.app_date.value).format("YYYY-MM-DD") : '0000-00-00',
                "applicant": data.applicant && data.applicant.value || "",
                "title": data.title && data.title.value || "",
                "class_id": data.class && data.class.value || 0,
                "country_id": data.country && data.country.value || 0,
                "priority_country_id": data.priority_country && data.priority_country.value || 0,
                "priority_date": data.priority_date && data.priority_date.value ? moment(data.priority_date.value).format("YYYY-MM-DD") : '0000-00-00',
                "status": data.status && data.status.value || 0,
                "comments": data.comments && data.comments.value || "",
                "renewal_date": data.renewal_date && data.renewal_date.value ? moment(data.renewal_date.value).format("YYYY-MM-DD") : '0000-00-00',
                "client_petitioner": data.client_respontent ? data.client_respontent.value : data.client_petition ? data.client_petition.value : "",
                "design_number": data.des_number && data.des_number.value || "",
                "petitioner": data.petitioner ? data.petitioner.value : data.petitioner_rep ? data.petitioner_rep.value : "",
                "responent_rep": data.respondent_rep ? data.respondent_rep.value : data.respondent ? data.respondent.value : "",
                "created_on": moment().format('YYYY-MM-DD HH:m:s'),
                "updated_on": moment().format('YYYY-MM-DD HH:m:s'),
                "created_by": localStorage.getItem("empId"),
                "updated_by": localStorage.getItem("empId")
            }
        })
            .then((response) => {
                if (response.data.status === 1) {
                    notification.success({
                        message: 'Design '+response.data.msg,
                    });
                    dispatch(getDesignDetails(ProjectDetails.project_id))
                    return Promise.resolve();
                }
            })

    } catch (err) {
        notification.error({
            message: 'Something Went Wrong,Record Not Added',
        });
    }
}

export const getDesignDetails = (ProjectId) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'get_design',
            data: {
                "project_id": ProjectId,
            }
        })
            .then((response) => {
                dispatch({ type: GET_DESIGN_DETAILS, payload: response.data.data })
            })

    } catch (err) {
    }
}