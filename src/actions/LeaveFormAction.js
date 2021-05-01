
import { INSERT_LEAVE_FORM, GET_EMP_LEAVE_BALANCE, GET_LEAVE_FORM, GET_SUBJECT_LIST, GET_LEAVE_FORM_DETAILS } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import moment from 'moment';
import { notification } from "antd";
// Leave Type (CEP)

//Professional_course

export const getProfessionalCourse = () => async (dispatch) => {
    const response = await axios.get(apiurl + "/get_professional_course");
    return dispatch({ type: GET_LEAVE_FORM, payload: response.data.data });
};

export const SubjectList = () => async dispatch => {
    // console.log(data, "actiondata")
    try {
        axios({
            method: 'POST',
            url: apiurl + 'get_subject',
            data: {
                "subject": "",

            }
        })
            .then((response) => {
                // console.log(response.data.data,"GET_HRSEARCH_ROWDATA")

                dispatch({ type: GET_SUBJECT_LIST, payload: response.data.data })
            })

    } catch (err) {

    }
}


export const getEmpAvailableBalance = (employee_id, leave_type_id) => async dispatch => {

    try {
        axios({
            method: 'POST',
            url: apiurl + 'get_emp_available_balance',
            data: {
                "employee_id": employee_id,
                "leave_type_id": leave_type_id,

            }
        })
            .then((response) => {
                // console.log(response.data.data,"GET_HRSEARCH_ROWDATA")

                dispatch({ type: GET_EMP_LEAVE_BALANCE, payload: response.data.data })
            })

    } catch (err) {

    }
}

export const insertLeaveForm = (Leave_Form) => async dispatch => {


    try {
        axios({
            method: 'POST',
            url: apiurl + 'insert_leave_form',
            data: {
                "employee_id": localStorage.getItem("empId"),
                "leave_type_id": Leave_Form.leavetype.value,
                "from_date": Leave_Form.fromdate.value || 0,
                "to_date": Leave_Form.todate.value || 0,
                "from_time": Leave_Form.fromtime.value|| 0,
                "to_time":  Leave_Form.totime.value || 0,
                "reason": Leave_Form.reasoncmt.value || 0,
                "address": Leave_Form.address.value || 0,
                "contact_number": Leave_Form.contactperson.value || 0,
                "client_id": Leave_Form.client.value || 0,
                "assigned_by": Leave_Form.assignedby.value || 0,
                "created_on": moment().format("YYYY-MM-DD"),
                "updated_on": moment().format("YYYY-MM-DD "),
                "created_by": localStorage.getItem("empId"),
                "updated_by": localStorage.getItem("empId")
            }
        }).then((response) => {
            if (response.data.status === 1) {
                notification.success({
                    message: "Leave Form added sucessfully",
                });
                dispatch({ type: INSERT_LEAVE_FORM, payload: response.data.status })
                dispatch(getLeaveForm())
                return Promise.resolve();
            }
        });

    } catch (err) {

    }
}

// export const getLeaveForm = () => async (dispatch) => {
//     const response = await axios.get(apiurl + "/get_leave_form");
//     return dispatch({ type: GET_LEAVE_FORM_DETAILS, payload: response.data.data });
// };

export const getLeaveForm = (id) => async dispatch => {

    // var DocumentData = new FormData();
    // DocumentData.set("employee_id", )
    // DocumentData.set("leave_type_id", "")

    try {
        axios({
            method: 'POST',
            url: apiurl + 'get_leave_form',
            data: {
                "employee_id": localStorage.getItem("empId"),
                "leave_type_id": id || 0
            }
        }).then((response) => {
            if (response.data.status === 1) {
                dispatch({ type: GET_LEAVE_FORM_DETAILS, payload: response.data.data })
                // dispatch(getLeaveBalance(params,employee_code))
                return Promise.resolve();
            }
        });

    } catch (err) {

    }
}

export const deleteLeaveForm = (emp_leave_id) => async dispatch => {

    var DocumentData = new FormData();
    DocumentData.set("emp_leave_id", emp_leave_id)
    try {
        axios({
            method: 'DELETE',
            url: apiurl + 'delete_leave_form',
            data: DocumentData
        }).then((response) => {
            if (response.data.status === 1) {
                dispatch(getLeaveForm())
                return Promise.resolve();
            }
        });

    } catch (err) {

    }
}