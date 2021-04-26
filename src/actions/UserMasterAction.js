import { GET_TABLE_NAME,INSERT_CLASS,COMMON_INSERT_TEXT,INSERT_ACTIVITY,INSERT_CHECKLIST,INSERT_SUBSTAGE,INSERT_STATUS} from "../utils/Constants";
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
export const Common_insert_text = (data,UserMaster) =>async dispatch => {
  
var name=data.filter((item)=>{
  return item.t_name
})
  
console.log(name,"name_divya")
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
                "table_names":data[0].t_name,
                "text_val":UserMaster.groupname.value,
                 "created_by":"2"

                },
        })
        .then((response) => {
          console.log("names",response)
    
            dispatch({type:COMMON_INSERT_TEXT,payload:response.data.status})
            if (response.data.status === 1) {
              notification.success({
                message:'Inserted Successfully',
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
              message:'Inserted Successfully',
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

// subactivity insert api 
export const InsertSubActivity = (UserMaster,props) =>async dispatch => {
  try{
      axios({
          method: 'POST',
          url: apiurl +'insert_sub_activity',
          data: 
          {
            "activity":UserMaster.activity_drop.value,
            "sub_activity":UserMaster.activity.value,
          },
      })
      .then((response) => {
          dispatch({type:INSERT_ACTIVITY,payload:response.data.status})
          if (response.data.status === 1) {
            notification.success({
              message: 'Inserted Successfully',
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

// subactivity insert api 
export const InsertCheckList = (UserMaster,props) =>async dispatch => {
  try{
      axios({
          method: 'POST',
          url: apiurl +'insert_check_list',
          data: 
          {
            "check_list_id":"0",
            "check_list":UserMaster.checklist_name.value,
            "project_type_id":UserMaster.project_type.value,
            "created_on":"2021-03-02",
            "created_by":"3"
          },
      })
      .then((response) => {
          dispatch({type:INSERT_CHECKLIST,payload:response.data.status})
          if (response.data.status === 1) {
            notification.success({
              message:'Inserted Successfully',
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

// stage insert api
export const InsertSubstage = (UserMaster,props) =>async dispatch => {
  try{
      axios({
          method: 'POST',
          url: apiurl +'insert_stage',
          data: 
          {   
          "stage_id":UserMaster.stage_dropdown.value,
          "stage":UserMaster.stage_name.value,
          "created_on":"2021-03-02",
          "created_by":"3"    
          },
      })
      .then((response) => {
          dispatch({type:INSERT_SUBSTAGE,payload:response.data.status})
          if (response.data.status === 1) {
            notification.success({
              message:'Inserted Successfully',
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

// insert status insert api
export const InsertStatus = (UserMaster,props) =>async dispatch => {
  try{
      axios({
          method: 'POST',
          url: apiurl +'insert_stage',
          data: 
          {   
             "status_id":"0",
            "status_type":UserMaster.status_type.value,
            "status":UserMaster.status_name.name,
            "created_on":"2021-02-01",
            "created_by":"2"
          }
      })
      .then((response) => {
          dispatch({type:INSERT_STATUS,payload:response.data.status})
          if (response.data.status === 1) {
            notification.success({
              message:'Inserted Successfully',
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




// get table api

