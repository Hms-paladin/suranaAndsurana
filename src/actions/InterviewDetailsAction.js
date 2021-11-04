import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import { notification } from 'antd';
import moment from 'moment'

export const InesertInterviewDetails = (Interviewschedule,selectedCandidateId) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'insert_s_tbl_pm_int_details',
            data:{
                "selected_cand_id":selectedCandidateId.toString(),
                "employee_id":Interviewschedule.interviewer.value,
                "prop_designation":Interviewschedule.desgination.value,
                "prop_date_time":Interviewschedule.propsedDate.value,
                "created_on":moment().format('YYYY-MM-DD HH:m:s') ,
                "updated_on":moment().format('YYYY-MM-DD HH:m:s') ,
                "created_by":localStorage.getItem("empId"),
                "updated_by":localStorage.getItem("empId"),
                "ip_address":"198",
                "round":Interviewschedule.round.value
            }
          })
            .then(function (response) {
                if(response.data.status===1){
                notification.success({
                    message: 'Interview Scheduled Successfully',
                  });
                return Promise.resolve();
                }
            });
    } catch (err) {
            notification.error({
                message: 'Record Not Added',
              });
    }
}
