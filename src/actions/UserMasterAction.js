import { GET_TABLE_NAME,COMMON_INSERT_TEXT} from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import { notification } from 'antd';
export const get_Tablenames = () => async dispatch => {
  try {

    axios({
      method: 'GET',
      url: apiurl + 'get_table_names',
    })
      .then((response) => {
          console.log("resuser",response)
        dispatch(
          {
            type: GET_TABLE_NAME,
            payload: response.data
          }
        )
      })

  } catch (err) {

  }
}
export const Common_insert_text = (UserMaster) =>async dispatch => {
    try{
        axios({
            method: 'POST',
            url: apiurl +'common_insert_text',
            data: 
            {

                "table_names":UserMaster.table_names.value,
                "text_val":UserMaster.traits.value,
                "created_by":"2"
                
                },
        })
        .then((response) => {
          console.log("names",response)
    
            dispatch({type:COMMON_INSERT_TEXT,payload:response.data.status})
            if (response.data.status === 1) {
              notification.success({
                message: 'Resume Added Successfully',
              });
              return Promise.resolve();
            }
          });
       
    }
    catch(err){
      notification.error({
        message: 'Something Went Wrong,Record Not Added',
      });
    }
}