import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import { notification } from 'antd';

export const InesertInterviewDetails = (Interviewschedule,selectedCandidateId) => async dispatch => {
    console.log(Interviewschedule,selectedCandidateId,"<<<<<<<<<")
    try {
        axios({
            method: 'POST',
            url: apiurl + 'insert_s_tbl_pm_int_details',
            data:{
                "selected_cand_id":selectedCandidateId.toString(),
                "employee_id":Interviewschedule.interviewer.value,
                "prop_designation":Interviewschedule.desgination.value,
                "prop_date_time":Interviewschedule.propsedDate.value,
                "created_on":"2021-02-22 14:00:00",
                "updated_on":"2022-02-13 09:00:00",
                "created_by":"6",
                "updated_by":"1",
                "ip_address":"198"
            }
          })
            .then(function (response) {
                if(response.data.status===1){
                notification.success({
                    message: 'Record Added Successfully',
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
