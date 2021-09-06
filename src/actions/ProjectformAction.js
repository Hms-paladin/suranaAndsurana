
import { GET_DEPARTMENT, GET_PROJECT_TYPE, INSERT_IPPROJECT,GET_EMP_BY_DEPARTMENT } from "../utils/Constants";
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
                dispatch({ type: GET_PROJECT_TYPE, payload: response.data.data })
            })

    } catch (err) {

    }
}

export const getEmployeeByDepartment = (department) => async dispatch => {
    // try {
        axios({
            method: "POST",
            url: apiurl + "get_employee_by_departmentId",
            data: {
                department: department || "",
            },
        }).then((response) => {
            if (response.data.status === 1) {
                dispatch({ type: GET_EMP_BY_DEPARTMENT, payload: response.data.data })
                return Promise.resolve();
            }
        });

    // } catch (err) {

    // }
}

export const InsertIpProject = (projectform, VariableRate, proj_type_name) => async dispatch => {
    console.log(projectform, "projectformprojectform")

    // try {
        axios({
            method: "POST",
            url: apiurl + "insert_project_form",
            data: {
                client_id: projectform.client.value || 0,
                project_type_id: projectform.project_type.value || 0,
                project_name: projectform.projectname.value || null,
                //
                sub_project_id: projectform.project_Subtype.value || 0,
                process_id: projectform.process_type.value || 0,
                file_type_id: projectform.filing_type.value || 0,
                billable_type_id: projectform.billable_type.value || 0,
                //
                created_on: moment().format("YYYY-MM-DD HH:m:s"),
                updated_on: moment().format("YYYY-MM-DD HH:m:s"),
                created_by: localStorage.getItem("empId"),
                updated_by: localStorage.getItem("empId"),
                //
                unit_of_measure: projectform.unit_measurement.value || 0,
                project_name: projectform.projectname.value || 0,
                //
                councel_id: projectform.employeelist.valueById || 0,
                hod_hr_id: projectform.hod_attorny.value || 0,
                //
                range_id: projectform.projectcostrange.value.replace(/,/g, "") || 0,
                ip_address: "1233",
                comments: projectform.comments.value || 0,
                base_rate: projectform.baseRate.value || 0,
                limit_in_hours: projectform.limits.value || 0,
                additional_rate: projectform.additionalRate.value || 0,
                //VariableRate
                variable_rate: VariableRate || 0,
            },
        }).then((response) => {
            if (response.data.status === 1) {
                dispatch({ type: INSERT_IPPROJECT, payload: true })
                notification.success({
                    message: proj_type_name + " Inserted Successfully",
                });
                return Promise.resolve();
            }
        });

    // } catch (err) {

    // }
}

