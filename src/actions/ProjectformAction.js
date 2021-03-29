
import { GET_PROJECT_TYPE, INSERT_IPPROJECT } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import { notification } from 'antd'
import moment from 'moment'

export const GetProject_Type = () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl + 'get_project_type',
        })
            .then((response) => {
                console.log(response.data.data, "datacheck")
                dispatch({ type: GET_PROJECT_TYPE, payload: response.data.data })
            })

    } catch (err) {

    }
}


export const InsertIpProject = (projectform) => async dispatch => {
    try {

        axios({
            method: "POST",
            url: apiurl + "insert_project_form",
            data: {
                project_type_id:projectform.project_type.value,
                client_id: projectform.client.value,
                sub_project_id: projectform.project_Subtype.value,
                process_id: projectform.process_type.value,
                file_type_id: projectform.filing_type.value,
                project_name: projectform.projectname.value,
                billable_type_id: projectform.billable_type.value,
                created_on: moment().format("YYYY-MM-DD HH:m:s"),
                updated_on: moment().format("YYYY-MM-DD HH:m:s"),
                created_by: localStorage.getItem("empId"),
                updated_by: localStorage.getItem("empId"),
                unit_of_measure: projectform.unit_measurement.value,
                project_name:  projectform.projectname.value ,
                councel_id: projectform.employeelist.value || 0,
                hod_hr_id: projectform.hod_attorny.value || 0,
                range_id: projectform.projectcostrange.value || 0,
                ip_address: "1233",
                comments:projectform.comments.value || 0 ,
                base_rate: projectform.baseRate.value || 0 ,
                limit_in_hours:  projectform.limit.value || 0 ,
                additional_rate:  projectform.additionalRate.value || 0 ,
            },
        }).then((response) => {
            if (response.data.status === 1) {
                dispatch({ type: INSERT_IPPROJECT, payload: true })
                notification.success({
                    message: "IP project inserted Successfully",
                });
                return Promise.resolve();
            }
        });

    } catch (err) {

    }
}

