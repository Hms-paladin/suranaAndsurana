import { INSERT_LEAVE_FORM, GET_EMP_LEAVE_BALANCE, GET_LEAVE_FORM, GET_SUBJECT_LIST, GET_LEAVE_FORM_DETAILS, UPDATE_LEAVE_FROM, INSERT_LEAVE_FORM_CEP } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import moment from 'moment';
import { GET_EMP_APPROVAL, UPDATE_EMP_APPROVAL } from '../utils/Constants'
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
                "from_time": moment(Leave_Form.fromtime.value).format('HH:MM:ss') || 0,
                "to_time": moment(Leave_Form.totime.value).format('HH:MM:ss') || 0,
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


export const getLeaveForm = (id) => async dispatch => {
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
                console.log(response.data.data, "response.data.data")
                dispatch({ type: GET_LEAVE_FORM_DETAILS, payload: response.data.data })
                return Promise.resolve();
            }
        });

    } catch (err) {

    }
}

export const updateLeaveFrom = (Leave_Form) => async dispatch => {
    console.log(Leave_Form.leavetype.value, "Leave_Form.reasoncmt.value")
    try {
        axios({
            method: 'POST',
            url: apiurl + 'update_leave_form',
            data: {
                "emp_leave_id": Leave_Form.leavetype.value,
                "employee_id": localStorage.getItem("empId"),
                "from_date": Leave_Form.fromdate.value || 0,
                "to_date": Leave_Form.todate.value || 0,
                "from_time":  moment(Leave_Form.fromtime.value).format('HH:mm:ss') || 0,
                "to_time": moment(Leave_Form.totime.value).format('HH:mm:ss') || 0,
                "reason": Leave_Form.reasoncmt.value || 0,
                "address": Leave_Form.address.value || 0,
                "contact_number": Leave_Form.contactperson.value || 0,
                "client_id": Leave_Form.client.value || 0,
                "assigned_by": Leave_Form.assignedby.value || 0,
                "updated_on": moment().format("YYYY-MM-DD "),
                "updated_by": localStorage.getItem("empId")
            },
        }).then((response) => {
            if (response.data.status === 1) {
                notification.success({
                    message: "updated sucessfully",
                });
                dispatch({ type: UPDATE_LEAVE_FROM, payload: response.data.status })
                dispatch(getLeaveForm(Leave_Form.leavetype.value))
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
                notification.success({
                    message: "Leave Form deleted sucessfully",
                });
                dispatch(getLeaveForm())
                return Promise.resolve();
            }
        });

    } catch (err) {

    }
}

export const insertLeaveCep = (Leave_Form, examSchedule) => async dispatch => {

    let subject_details = []
    examSchedule.length > 0 && examSchedule.map((data, index) =>
        subject_details.push({
            emp_id: localStorage.getItem("empId"),
            subject_id: data.subject_id,
            subject_date: data.date,
            created_on: moment().format("YYYY-MM-DD"),
            updated_on: moment().format("YYYY-MM-DD "),
            created_by: localStorage.getItem("empId"),
            updated_by: localStorage.getItem("empId"),
        })
    );

    var DocumentData = new FormData();
    DocumentData.set("employee_id", localStorage.getItem("empId"))
    DocumentData.set("leave_type_id", Leave_Form.leavetype.value)
    DocumentData.set("professional_course_id", Leave_Form.profess_course.value || 0)
    DocumentData.set("total_days_leave", Leave_Form.tot_leave.value || 0)
    DocumentData.set("no_exam_days", Leave_Form.exam_days.value || 0)

    DocumentData.set("no_other_days", Leave_Form.other_days.value || 0)

    DocumentData.set("hall_ticket", null)
    DocumentData.set("description", Leave_Form.reasoncmt.value || 0)
    DocumentData.set("remarks", Leave_Form.remarks.value || 0)
    DocumentData.set("subject", JSON.stringify(subject_details) || 0)

    DocumentData.set("created_on", moment().format('YYYY-MM-DD HH:m:s'))
    DocumentData.set("updated_on", moment().format('YYYY-MM-DD HH:m:s'))
    DocumentData.set("created_by", localStorage.getItem("empId"))
    DocumentData.set("updated_by", localStorage.getItem("empId"))

    DocumentData.set("referred_by", Leave_Form.referred_by.value || 0)

    try {
        axios({
            method: 'POST',
            url: apiurl + 'insert_leave_cep',
            data: DocumentData, headers: { "Content-Type": "multipart/form-data" },
        }).then((response) => {
            if (response.data.status === 1) {
                notification.success({
                    message: "Leave Form added sucessfully",
                });
                dispatch({ type: INSERT_LEAVE_FORM_CEP, payload: response.data.status })
                dispatch(getLeaveForm())
                return Promise.resolve();
            }
        });

    } catch (err) {

    }
}


export const updateLeaveCep = (Leave_Form, examSchedule) => async dispatch => {
    console.log(examSchedule, "examSchedule1")
    let subject_details = []
    examSchedule.length > 0 && examSchedule.map((data, index) =>
        subject_details.push({
            emp_leave_cep_sub_id: data.emp_leave_cep_sub_id,
            emp_leave_id: data.emp_leave_id,
            emp_id: localStorage.getItem("empId"),
            subject_id: data.subject_id,
            subject_date: data.subject_date,
            created_on: moment().format("YYYY-MM-DD"),
            updated_on: moment().format("YYYY-MM-DD "),
            created_by: localStorage.getItem("empId"),
            updated_by: localStorage.getItem("empId"),
        })
    );
    var DocumentData = new FormData();
    DocumentData.set("employee_id", localStorage.getItem("empId"))
    DocumentData.set("leave_type_id", Leave_Form.leavetype.value)
    DocumentData.set("professional_course_id", Leave_Form.profess_course.value || 0)
    DocumentData.set("total_days_leave", Leave_Form.tot_leave.value || 0)
    DocumentData.set("no_exam_days", Leave_Form.exam_days.value || 0)

    DocumentData.set("no_other_days", Leave_Form.other_days.value || 0)
    DocumentData.set("hall_ticket", null)
    DocumentData.set("description", Leave_Form.reasoncmt.value || 0)
    DocumentData.set("remarks", Leave_Form.remarks.value || 0)
    DocumentData.set("subject", JSON.stringify(subject_details) || 0)

    DocumentData.set("emp_leave_id", examSchedule[0].emp_leave_id)
    DocumentData.set("referred_by", examSchedule[0].emp_leave_id)

    DocumentData.set("created_on", moment().format('YYYY-MM-DD HH:m:s'))
    DocumentData.set("updated_on", moment().format('YYYY-MM-DD HH:m:s'))
    DocumentData.set("created_by", localStorage.getItem("empId"))
    DocumentData.set("updated_by", localStorage.getItem("empId"))


    try {
        axios({
            method: 'POST',
            url: apiurl + 'update_leave_cep',
            data: DocumentData, headers: { "Content-Type": "multipart/form-data" },
        }).then((response) => {
            if (response.data.status === 1) {
                notification.success({
                    message: "Leave Form updated sucessfully",
                });
                dispatch({ type: INSERT_LEAVE_FORM_CEP, payload: response.data.status })
                dispatch(getLeaveForm())
                return Promise.resolve();
            }
        });

    } catch (err) {

    }
}






// leave get approval
export const getEmpApproval = (data) => async dispatch => {
    console.log(data,"checkdata")
    try {
        axios({
            method: 'POST',
            url: apiurl + 'get_leave_approval',
            data: {
                "employee_id":data.employee_id||0,
                "emp_leave_id":data.emp_leave_id||0
            }
        })
            .then((response) => {
                console.log(response, "res_id")
                dispatch({ type: GET_EMP_APPROVAL, payload: response.data.data })
            })

    } catch (err) {

    }
}


export const EmployeeLeaveApprove = (leaveStatus, leaveId) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'update_leave_approval',
            data: {
                "emp_leave_id": leaveId,
                "approve_status": leaveStatus === true ?1:2
            },
        })
            .then((response) => {
                dispatch(getEmpApproval(leaveId))
                return Promise.resolve();
            })
    }
    catch (err) {
    }
}

export const getUnblockUser = (leaveStatus, leaveId) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'update_leave_approval',
            data: {
                "emp_leave_id": leaveId,
                "approve_status": leaveStatus === true ?1:2
            },
        })
            .then((response) => {
                dispatch(getUnblockUser(leaveId))
                return Promise.resolve();
            })
    }
    catch (err) {
    }
}