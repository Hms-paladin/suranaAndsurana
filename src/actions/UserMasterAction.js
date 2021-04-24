import { GET_TABLE_NAME,COMMON_INSERT_TEXT,INSERT_CLASS} from "../utils/Constants";
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
export const Common_insert_text = (data) =>async dispatch => {
console.log(data,"sss")
    try{
        axios({
            method: 'POST',
            url: apiurl +'common_insert_text',
            data: 
            {

                // "table_names":UserMaster.table_names.value,
                // // "text_val":UserMaster.traits.value ? UserMaster.traits.value||"":UserMaster.skills.value ? UserMaster.skills.value||"":
                // "text_val":UserMaster.groupname,
                // "created_by":"2"
                "table_names":data,
                "text_val":"User group",
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
          
            }
           
          });
        
    }
    catch(err){
      notification.error({
        message: 'Something Went Wrong,Record Not Added',
      });
    }
}

// class insert api 
export const InsertClass = (UserMaster,props) =>async dispatch => {
  console.log(UserMaster.class_type.value,"ttt_s")
  try{
      axios({
          method: 'POST',
          url: apiurl +'insert_class',
          data: 
          {

            "class_id":0,
            "class_type":UserMaster.class_type.value,
            "class":UserMaster.class_name.value,
            "class_description":UserMaster.description.value,
            "created_on":"2021-03-02",
            "created_by":"3"
              },
      })
      .then((response) => {
        console.log("names",response)
  
          dispatch({type:INSERT_CLASS,payload:response.data.status})
          if (response.data.status === 1) {
            notification.success({
              message: 'Record Added Successfully',
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
