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
        //         formData.append("type_of_resource",getEmployeeFormDetails.type_of_resource)
        formData.append("gender", getEmployeeFormDetails.gender)
        //         formData.append("dob",getEmployeeFormDetails.dob)
        //         formData.append("bas_qual",getEmployeeFormDetails.bas_qual)
        //         formData.append("add_quali_1",getEmployeeFormDetails.add_quali_1)
        //         formData.append("add_quali_2",getEmployeeFormDetails.add_quali_2)
        // formData.append("institution",getEmployeeFormDetails.institution)
        // formData.append("last_employer",getEmployeeFormDetails.last_employer)
        // formData.append("start_date",getEmployeeFormDetails.last_empr_start_date)
        // formData.append("end_date",getEmployeeFormDetails.last_empr_end_date)
        // formData.append("skills",getEmployeeFormDetails.skills)
        // formData.append("traits",getEmployeeFormDetails.traits)
        // formData.append("certification",getEmployeeFormDetails.certification)
        // formData.append("specialization",getEmployeeFormDetails.specialization)
        // formData.append("achievement",getEmployeeFormDetails.achievement)
        // formData.append("capabilities",getEmployeeFormDetails.capabilities)
        // formData.append("talents",getEmployeeFormDetails.talents)
        // formData.append("special_interest",getEmployeeFormDetails.special_interest)
        // formData.append("con_ph_no",EmpForm.supervisor_ph.value)
        // formData.append("email_addr",getEmployeeFormDetails.email_addr)
        // formData.append("address",getEmployeeFormDetails.postal_addr)
        // formData.append("state_of_domecile",getEmployeeFormDetails.state_of_domecile)
        // formData.append("city",getEmployeeFormDetails.city)
        // formData.append("status",getEmployeeFormDetails.status_resource)
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

