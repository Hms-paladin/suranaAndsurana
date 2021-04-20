import { UPDATE_COPYRIGHT,GET_COPYRIGHT,INSERT_COPYRIGHT } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import moment from 'moment';
import { notification } from "antd";

export const insertCopyright = (params,IdDetails,file) => async dispatch => {

    var DocumentData = new FormData();
    DocumentData.set("project_id",IdDetails.project_id)
    DocumentData.set("title",params.title.value)
    DocumentData.set("type_of_work",params.type_of_work.value)
    DocumentData.append("upload_images","")
    DocumentData.set("reference",params.reference.value)
    DocumentData.set("status",params.status.value)
    DocumentData.set("created_on",moment().format('YYYY-MM-DD HH:m:s')  )
    DocumentData.set("updated_on",moment().format('YYYY-MM-DD HH:m:s')  )
    DocumentData.set("created_by",localStorage.getItem("empId"))
    DocumentData.set("updated_by",localStorage.getItem("empId"))
    try {
        axios({
            method: 'POST',
            url: apiurl + 'insert_copyright',
            data: DocumentData
          }).then((response) => {
            if (response.data.status === 1) {
                notification.success({
                    message: "Copyright added sucessfully",
                  });
                dispatch({type:INSERT_COPYRIGHT,payload:response.data.status})
                dispatch(getCopyRight(IdDetails.project_id))
              return Promise.resolve();
            }
          });
        
    } catch (err) {
        
    }
}

export const getCopyRight = (id) => async dispatch => {

    try {
  
        axios({
            method: "POST",
            url: apiurl + "get_copyright",
            data: {
              project_id: id,
            },
          }).then((response) => {
            if (response.data.status === 1) {
              // console.log(response.data.data.length,"//")
                dispatch({type:GET_COPYRIGHT,payload:response.data.data})
              return Promise.resolve();
            }
          });
        
    } catch (err) {
        
    }
  }

  export const updateCopyright = (params,IdDetails,fileupload,copy_right_id) => async dispatch => {

    var DocumentData = new FormData();
    DocumentData.set("copy_right_id",copy_right_id)
    DocumentData.set("project_id",IdDetails.project_id)
    DocumentData.set("title",params.title.value)
    DocumentData.set("type_of_work",params.type_of_work.value)
    DocumentData.set("upload_images",fileupload)
    DocumentData.set("reference",params.reference.value)
    DocumentData.set("status",params.status.value)
    DocumentData.set("created_on",moment().format('YYYY-MM-DD HH:m:s')  )
    DocumentData.set("updated_on",moment().format('YYYY-MM-DD HH:m:s')  )
    DocumentData.set("created_by",localStorage.getItem("empId"))
    DocumentData.set("updated_by",localStorage.getItem("empId"))
    try {
        axios({
            method: 'PUT',
            url: apiurl + 'update_copyright',
            data: DocumentData
          }).then((response) => {
            if (response.data.status === 1) {
                notification.success({
                    message: "Copyright Updated sucessfully",
                  });
                dispatch({type:UPDATE_COPYRIGHT,payload:response.data.status})
                dispatch(getCopyRight(IdDetails.project_id))
              return Promise.resolve();
            }
          });
        
    } catch (err) {
        
    }
}
