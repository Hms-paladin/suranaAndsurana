
import { INSERT_LEAVE_FORM,GET_EMP_LEAVE_BALANCE,GET_LEAVE_FORM ,GET_SUBJECT_LIST} from "../utils/Constants";
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

export const SubjectList = (data) => async dispatch => {
    console.log(data, "actiondata")
    try {
        axios({
            method: 'POST',
            url: apiurl + 'get_subject',
            data: {
                "professional_course_id": data,

            }
        })
            .then((response) => {
                // console.log(response.data.data,"GET_HRSEARCH_ROWDATA")

                dispatch({ type: GET_SUBJECT_LIST, payload: response.data.data })
            })

    } catch (err) {

    }
}


export const getEmpAvailableBalance = (employee_id,leave_type_id) => async dispatch => {
   
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

export const insertLeaveForm = (params) => async dispatch => {

    var DocumentData = new FormData();
    DocumentData.set("employee_id",localStorage.getItem("empId"))
    DocumentData.set("leave_type_id",params.leavetype.value)
    DocumentData.set("from_date",params.fromdate.value)
    DocumentData.set("to_date",params.todate.value)
    DocumentData.set("from_time",params.fromtime.value)
    DocumentData.set("to_time",params.totime.value)
    DocumentData.set("reason",params.reasoncmt.value)
    DocumentData.set("address",params.address.value)
    DocumentData.set("contact_number",params.contactperson.value)
    DocumentData.set("client_id",params.client.value)
    DocumentData.set("assigned_by",params.assignedby.value)
    DocumentData.set("created_on",moment().format('YYYY-MM-DD HH:m:s')  )
    DocumentData.set("updated_on",moment().format('YYYY-MM-DD HH:m:s')  )
    DocumentData.set("created_by",localStorage.getItem("empId"))
    DocumentData.set("updated_by",localStorage.getItem("empId"))
    try {
        axios({
            method: 'POST',
            url: apiurl + 'insert_leave_form',
            data: DocumentData
          }).then((response) => {
            if (response.data.status === 1) {
                notification.success({
                    message: "Leave Form added sucessfully",
                  });
                dispatch({type:INSERT_LEAVE_FORM,payload:response.data.status})
                // dispatch(getLeaveBalance(params,employee_code))
              return Promise.resolve();
            }
          });
        
    } catch (err) {
        
    }
}