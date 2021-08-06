import { GET_VARIABLERATE_TABLE_DATA, INSERT_EMPLOYEE,SEARCH_VARIABLERATE } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import moment from 'moment';
import { notification } from "antd";
import { getHrTaskList } from "./TodoListAction";


export const InsertEmployeeForm = () => async dispatch => {
    try {
        var formData = new FormData();
        formData.append("name", getEmployeeFormDetails.name)
        formData.append("gender", getEmployeeFormDetails.gender)
        formData.append("lang_known", getEmployeeFormDetails.lang_known)
        formData.append("industry", getEmployeeFormDetails.industry)
        formData.append("designation", EmpForm.desgination.value)
        formData.append("doj", EmpForm.date_of_birth.value)
        formData.append("supervisor", EmpForm.supervisor_name.value)
        formData.append("email", EmpForm.EmpOfficialEmail.value)
        formData.append("supervisor_name", "")
        formData.append("supervisor_email", EmpForm.supervisor_email.value)
        formData.append("official_email", EmpForm.EmpOfficialEmail.value)
        formData.append("official_contact", EmpForm.EmpOfficialContact.value)
        formData.append("department", EmpForm.department.value)
        formData.append("employee__code", EmpForm.employee_code.value)
        formData.append("upload_document", file)
        formData.append("biometric_data", "notes")
        formData.append("approved_by", localStorage.getItem("empId"))
        formData.append("approved_date", moment().format('YYYY-MM-DD HH:m:s'))
        formData.append("is_interviewer", localStorage.getItem("user_id"))
        formData.append("created_on", moment().format('YYYY-MM-DD HH:m:s'))
        formData.append("updated_on", moment().format('YYYY-MM-DD HH:m:s'))
        formData.append("created_by", localStorage.getItem("empId"))
        formData.append("updated_by", localStorage.getItem("empId"))
        formData.append("ip_address", "Adress")
        formData.append("task_id", props.emp_form_id && props.emp_form_id.task_id)
        axios({
            method: "post",
            url: apiurl + "insert_employee",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
          }).then((response) => {
           if (response.data.status === 1) {
            dispatch(
                {
                  type: INSERT_EMPLOYEE,
                  payload: response.data.data
                }
              )
            notification.success({
                message: 'Record Added Successfully',
            });
            dispatch(getHrTaskList())
              return Promise.resolve();
            }
          });
        
    } catch (err) {
        
    }
}

