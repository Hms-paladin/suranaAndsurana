
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


                client_id: projectform.client.value,
                sub_project_id: projectform.project_Subtype.value,
                process_id: projectform.process_type.value,
                file_type_id: projectform.filing_type.value,
                project_name: projectform.projectname.value,
                billable_type_id: projectform.billable_type.value,


                // client_id: projectform.client.value,
                // project_type_id: projectform.project_type.value,
                // sub_project_id: projectform.project_Subtype.value,
                // process_id: projectform.process_type.value,
                // file_type_id: projectform.filing_type.value,
                // project_name: "Surana",
                // billable_type_id: projectform.billable_type.value,
                // councel_id: projectform.employeelist.value,
                // hod_hr_id: projectform.hod_attorny.value,
                // range_id: projectform.projectcostrange.value,
                // comments: null,
                // created_on: null,
                // updated_on: null,
                // created_by: null,
                // updated_by: null,
                // ip_address: null,
                // base_rate: null,
                // unit_of_measure: projectform.unit_measurement.value,
                // limit_in_hours: null,
                // additional_rate: null,
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

