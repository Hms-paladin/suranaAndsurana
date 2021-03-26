import { ADD_CLIENT} from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import moment from 'moment';
import { notification } from "antd";



export const InsertClient = (Addclient_Form,Document_Form) => async dispatch => {
    try {
        axios({
            method: "POST",
            url: apiurl + "insert_client",headers:{                                                                                                                                                                                                                                                                                                                                                                                                                                               
                  'Content-Type': 'application/json',                                                                                                                                                                                                               
                 } ,
            data: {
              client: Addclient_Form.client_name.value,
              industry: Addclient_Form.industrty.value,
              client_type: Addclient_Form.client_type.value,
              contact_person_1: Addclient_Form.con_per_1.value,
              gender: Addclient_Form.gender_1.value,
              dob: Addclient_Form.DOB_1.value,
              contact_no: Addclient_Form.con_ph_1.value,
              email_id: Addclient_Form.email_id_1.value,
              state: Addclient_Form.state.value,
              city: Addclient_Form.city.value,
              address: Addclient_Form.postal_address.value,
              contact_person_2: Addclient_Form.cont_per_2.value,
              ct_gender: Addclient_Form.gender_2.value,
              ct_dob: Addclient_Form.DOB_2.value,
              ct_contact_no: Addclient_Form.con_ph_2.value,
              ct_email_id: Addclient_Form.emai_id_2.value,
              created_on: moment().format("YYYY-MM-DD HH:m:s"),
              updated_on: moment().format("YYYY-MM-DD HH:m:s"),
              created_by: localStorage.getItem("empId"),
              updated_by: localStorage.getItem("empId"),
            },
          }).then((response) => {
            if (response.data.status === 1) {
                dispatch({type:ADD_CLIENT,payload:response.data.data})
                dispatch(InsertClientDocument(Document_Form,response.data.data.client_id))
            //   notification.success({
            //     message: "Client Details Updated Successfully",
            //   });
              return Promise.resolve();
            }
          });
        
    } catch (err) {
        
    }
}
export const InsertClientDocument = (Document_Form,id) => async dispatch => {
    try {
        axios({
            method: "POST",
            url: apiurl + "insert_client_document",headers:{                                                                                                                                                                                                                                                                                                                                                                                                                                               
                  'Content-Type': 'multipart/form-data',                                                                                                                                                                                                               
                 } ,
            data: {
              client_id: id,
              POA: "Testing File",
              file_name_upload: Document_Form,
              created_on: moment().format("YYYY-MM-DD HH:m:s"),
              updated_on: moment().format("YYYY-MM-DD HH:m:s"),
              created_by: localStorage.getItem("empId"),
              updated_by: localStorage.getItem("empId"),
            },
          }).then((response) => {
            if (response.data.status === 1) {
                // dispatch({type:ADD_CLIENT,payload:response.data.data})

              notification.success({
                message: "Client Details Updated Successfully",
              });
              return Promise.resolve();
            }
          });
        
    } catch (err) {
        
    }
}
