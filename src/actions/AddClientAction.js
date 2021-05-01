import { ADD_CLIENT,ADD_CLIENT_DOCUMENT} from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import Axios from "axios";
import moment from 'moment';
import { notification } from "antd";


export const InsertClient = (Addclient_Form,Document_Form) => async dispatch => {
    try {
        Axios({
            method: 'POST',
            url: apiurl + 'insert_client',
            data: {
              client: Addclient_Form.client_name.value,
              industry: Addclient_Form.industrty.value,
              client_type: Addclient_Form.client_type.value,
              contact_person_1: Addclient_Form.con_per_1.value,
              gender: Addclient_Form.gender_1.value,
             dob: Addclient_Form.DOB_1.value,
              contact_no: Number(Addclient_Form.con_ph_1.value),
              email_id: Addclient_Form.email_id_1.value,
              state: Addclient_Form.state.value,
              city: Addclient_Form.city.value,
              address: Addclient_Form.postal_address.value,
              contact_person_2: Addclient_Form.cont_per_2.value || 0,
              ct_gender: Addclient_Form.gender_2.value || 0,
              ct_dob: Addclient_Form.DOB_2.value || 0,
              ct_contact_no: Number(Addclient_Form.con_ph_2.value) || 0,
              ct_email_id: Addclient_Form.emai_id_2.value|| 0,
              created_on: moment().format("YYYY-MM-DD HH:m:s"),
              updated_on: moment().format("YYYY-MM-DD HH:m:s"),
              created_by: localStorage.getItem("empId"),
              updated_by: localStorage.getItem("empId"),
            }
          }).then((response) => {
            if (response.data.status === 1) {
                dispatch({type:ADD_CLIENT,payload:response.data.status})
               dispatch(InsertClientDocument(Document_Form,response.data.data.client_id))
              return Promise.resolve();
            }
          });
        
    } catch (err) {
        
    }
}
export const InsertClientDocument = (Document_Form,id) => async dispatch => {

   for (var i=0; i< Document_Form.length;i++){
     var fileObject = Document_Form[i].originFileObj;
     var poa_name = Document_Form[i].poa_name;
   
    var DocumentData = new FormData();
    DocumentData.set("client_id",id)
    DocumentData.set("POA",poa_name || "TEST")
    DocumentData.append("file_name_upload",fileObject)
    DocumentData.set("created_on",moment().format('YYYY-MM-DD HH:m:s')  )
    DocumentData.set("updated_on",moment().format('YYYY-MM-DD HH:m:s')  )
    DocumentData.set("created_by",localStorage.getItem("empId"))
    DocumentData.set("updated_by",localStorage.getItem("empId"))

    try {
        Axios({
            method: "POST",
            url: apiurl + "insert_client_document" ,
            data: DocumentData,headers: { "Content-Type": "multipart/form-data" },
          }).then((response) => {
            if(Document_Form.length == i){
            if (response.data.status === 1) {
                dispatch({type:ADD_CLIENT_DOCUMENT,payload:response.data.status})
                console.log("Testing",Document_Form)
              notification.success({
                message: "Client Details Updated Successfully",
              });
              return Promise.resolve();
            }
          }
          });
        
    } catch (err) {
        
    }
  }
}
