import { ADD_CLIENT, ADD_CLIENT_DOCUMENT } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import Axios from "axios";
import moment from 'moment';
import { notification } from "antd";


export const InsertClient = (Addclient_Form, Document_Form) => async dispatch => {
  console.log(Document_Form,"Document_Form")
  try {

    var DocumentData = new FormData();
    DocumentData.set("client_name", Addclient_Form.client_name.value )
    DocumentData.set("industry", Addclient_Form.industrty.value)
    DocumentData.set("client_type", Addclient_Form.client_type.value )
    
    DocumentData.set("contact_person_1", Addclient_Form.con_per_1.value||0 )
    DocumentData.set("gender",Addclient_Form.gender_1.value )
    DocumentData.set("dob", (Addclient_Form.DOB_1.value===""||Addclient_Form.DOB_1.value===null)?'0-0-0000':Addclient_Form.DOB_1.value)
    
    DocumentData.set("contact_no", Number(Addclient_Form.con_ph_1.value))
    DocumentData.set("email_id", Addclient_Form.email_id_1.value )
    DocumentData.set("state", Addclient_Form.state.value)
    DocumentData.set("city", Addclient_Form.city.value )
    DocumentData.set("address", Addclient_Form.postal_address.value)
    DocumentData.set("contact_person_2", Addclient_Form.cont_per_2.value||0 )
    DocumentData.set("ct_gender", Addclient_Form.gender_2.value||0)
    DocumentData.set("ct_dob", Addclient_Form.DOB_2.value||'0-0-0000' )

    DocumentData.set("ct_contact_no", Number(Addclient_Form.con_ph_2.value) || 0)
    DocumentData.set("ct_email_id", Addclient_Form.emai_id_2.value||0 )


    DocumentData.set("created_on", moment().format('YYYY-MM-DD HH:m:s'))
    DocumentData.set("updated_on", moment().format('YYYY-MM-DD HH:m:s'))
    DocumentData.set("created_by", localStorage.getItem("empId"))
    DocumentData.set("updated_by", localStorage.getItem("empId"))

    Axios({
      method: 'POST',
      url: apiurl + 'insert_client',
      data: DocumentData
    }).then((response) => {
      if (response.data.status === 1) {
        dispatch({ type: ADD_CLIENT, payload: response.data.status })
        dispatch(InsertClientDocument(Document_Form, response.data.data.client_id))
        notification.success({
          message: "Client Added Successfully",
        });
        return Promise.resolve();
      }
    });

  } catch (err) {

  }
}
export const InsertClientDocument = (Document_Form, id) => async dispatch => {

  for (var i = 0; i < Document_Form.length; i++) {
    var fileObject = Document_Form[i].originFileObj;
    var poa_name = Document_Form[i].poa_name;

    var DocumentData = new FormData();
    DocumentData.set("client_id", id)
    DocumentData.set("POA", poa_name || "TEST")
    DocumentData.append("file_name_upload", fileObject)
    DocumentData.set("created_on", moment().format('YYYY-MM-DD HH:m:s'))
    DocumentData.set("updated_on", moment().format('YYYY-MM-DD HH:m:s'))
    DocumentData.set("created_by", localStorage.getItem("empId"))
    DocumentData.set("updated_by", localStorage.getItem("empId"))

    try {
      Axios({
        method: "POST",
        url: apiurl + "insert_client_document",
        data: DocumentData, headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        if (Document_Form.length == i) {
          if (response.data.status === 1) {
            dispatch({ type: ADD_CLIENT_DOCUMENT, payload: response.data.status })
            console.log("Testing", Document_Form)

            return Promise.resolve();
          }
        }
      });

    } catch (err) {

    }
  }
}
