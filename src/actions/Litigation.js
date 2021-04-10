import { INSERT_LITIGATION,GET_LITIGATION ,UPDATE_LITIGATION_DETAILS} from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import moment from 'moment';
import { notification } from "antd";

export const InsertLitigation = (Litigation_Form,IdDetails) => async dispatch => {
    try {
        console.log(IdDetails,"IdDetails")
        axios({
            method: "POST",
            url: apiurl + "insert_litigation",
            data: 
              {
                project_id:IdDetails.project_id||"0",
                client_id:IdDetails.client_id||"0",
                internal_case_no:Litigation_Form.internalcaseno.value ||"0",
                case_type_id:Litigation_Form.casetype.value||"0",
                status_id:Litigation_Form.status.value||'0',
                court_id:Litigation_Form.courtname.value||'0',
               court_case_no:Litigation_Form.courtcaseno.value||'0',
               responsible_attorney:Litigation_Form.ddra.valueById ||'0',
               next_hearing_date:Litigation_Form.hearingdate.value||"0",
               due_date:Litigation_Form.duedate.value||"0",
               sub_case:Litigation_Form.subcase.value||"0",
               suit_value:Litigation_Form.suitvalue.value||"0",
               created_on: moment().format("YYYY-MM-DD HH:m:s"),
               updated_on: moment().format("YYYY-MM-DD HH:m:s"),
               created_by: localStorage.getItem("empId"),
               updated_by: localStorage.getItem("empId"),
            },
          }).then((response) => {
            if (response.data.status === 1) {
                dispatch({type:INSERT_LITIGATION,payload:response.data.status})
              notification.success({
                message: "Litigation Updated Successfully",
              });
              return Promise.resolve();
            }
          });
        
    } catch (err) {
        
    }
}

export const GetLitigation = (ProjectID) => async dispatch => {
  try {

      axios({
          method: "POST",
          url: apiurl + "get_litigation",
          data: 
          {
            project_id:ProjectID||0,
        },
        }).then((response) => {
          if (response.data.status === 1) {
              dispatch({type:GET_LITIGATION,payload:response.data.data})
          }
        });
      
  } catch (err) {
      
  }
}

export const InsertLitigationDetails = (Litigation_Form) => async dispatch => {
  try {
      axios({
          method: "POST",
          url: apiurl + "get_litigation_councel",
          data: 
            {
               litigation_id:"1",
               liti_councel_id:"1",
               name:"sam",
               phone_no:"9344120434",
               email_id:"sam@gmail.com",
               address:"chennai",
               interim_name:"visu",
               interim_appln_no:"123",
               interim_application_date:"2021-02-01",
               interim_details:"chennai",
             created_on: moment().format("YYYY-MM-DD HH:m:s"),
             updated_on: moment().format("YYYY-MM-DD HH:m:s"),
             created_by: localStorage.getItem("empId"),
             updated_by: localStorage.getItem("empId"),
          },
        }).then((response) => {
          if (response.data.status === 1) {
              dispatch({type:UPDATE_LITIGATION_DETAILS,payload:response.data.data})
            notification.success({
              message: "Litigation Details Added Successfully",
            });
            return Promise.resolve();
          }
        });
      
  } catch (err) {
      
  }
}