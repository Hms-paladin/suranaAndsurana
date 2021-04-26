import { GET_TABLE_NAME,INSERT_USER,GET_USER,EDIT_USER,DELETE_USER,GET_CANDIDATES_NAMES} from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import { notification } from 'antd'

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



export const insertUser = (UserMaster,password,changeActive) => async dispatch => {

  var DocumentData = new FormData();
  DocumentData.set("active_flag",changeActive)
  DocumentData.set("created_by",localStorage.getItem("empId"))
  DocumentData.set("email",UserMaster.emailid.value)
  DocumentData.set("groupId",UserMaster.usergroup.value)
  DocumentData.set("mobileno",UserMaster.mobilenumber.value)
  DocumentData.set("password",password )
  DocumentData.set("username",UserMaster.user_name.value)
  DocumentData.set("employee_id",UserMaster.emp_name.value)
  DocumentData.set("user_id",localStorage.getItem("user_id"))
  try {
      axios({
          method: 'POST',
          url: apiurl + 'insertUser',
          data: DocumentData
        }).then((response) => {
          if (response.data.status === 1) {
              notification.success({
                  message: "User Inserted Successfully",
                });
              dispatch({type:INSERT_USER,payload:response.data.status})
             
            return Promise.resolve();
          }
        });
      
  } catch (err) {
      
  }
}


export const getUser = () => async dispatch => {

  try {

      axios({
          method: "GET",
          url: apiurl + "getUser",
          data: {
            
          },
        }).then((response) => {
          if (response.data.status === 1) {
            // console.log(response.data.data.length,"//")
              dispatch({type:GET_USER,payload:response.data.data})
            return Promise.resolve();
          }
        });
      
  } catch (err) {
      
  }
}

export const editUser = (UserMaster,password,changeActive) => async dispatch => {

  
  var DocumentData = new FormData();
  DocumentData.set("active_flag",changeActive)
  DocumentData.set("created_by",localStorage.getItem("empId"))
  DocumentData.set("email",UserMaster.emailid.value)
  DocumentData.set("groupId",UserMaster.usergroup.value)
  DocumentData.set("mobileno",UserMaster.mobilenumber.value)
  DocumentData.set("password",password )
  DocumentData.set("username",UserMaster.user_name.value)
  DocumentData.set("employee_id",UserMaster.emp_name.value)
  DocumentData.set("user_id",localStorage.getItem("user_id"))
  try {
      axios({
          method: 'PUT',
          url: apiurl + 'editUser',
          data: DocumentData
        }).then((response) => {
          if (response.data.status === 1) {
              notification.success({
                  message: "User Edited Successfully",
                });
              dispatch({type:EDIT_USER,payload:response.data.status})
              dispatch(getUser())
            return Promise.resolve();
          }
        });
      
  } catch (err) {
      
  }
}

export const deleteUser = (user_id) => async dispatch => {

  var DocumentData = new FormData();
  DocumentData.set("user_id",user_id)
 
  try {
      axios({
          method: 'DELETE',
          url: apiurl + 'deleteUser',
          data: DocumentData
        }).then((response) => {
          if (response.data.status === 1) {
              notification.success({
                  message: "User Deleted Successfully",
                });
              dispatch({type:DELETE_USER,payload:response.data.status})
              dispatch(getUser())
            return Promise.resolve();
          }
        });
      
  } catch (err) {
      
  }
}

export const getCandidateName = () => async dispatch => {

  try {

    axios({
        method: "GET",
        url: apiurl + "getCandidateName",
      }).then((response) => {
        if (response.data.status === 1) {
          // console.log(response.data.data.length,"//")
            dispatch({type:GET_CANDIDATES_NAMES,payload:response.data.data})
          return Promise.resolve();
        }
      });
    
} catch (err) {
    
}
}

// export const getCandidateName = () => async (dispatch) => {
//   const response = await axios.get(apiurl + "/getCandidateName");
//   return dispatch({ type: GET_CANDIDATES_NAMES, payload: response.data.data }); 
// };



