import { GET_TABLE_NAME,INSERT_USER} from "../utils/Constants";
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

export const insertUser = (UserMaster,password) => async dispatch => {
  try {
      // console.log(groupName, "groupName")
      axios({
          method: "POST",
          url: apiurl + "insertUser",
          data: {
            "active_flag": 1,
            "created_by": localStorage.getItem("empId"),
            "email": UserMaster.emailid.value || 0,
            "groupId": UserMaster.usergroup.value || 0,   
            "mobileno": UserMaster.mobilenumber.value || 0,
            "password": password,
            "username": UserMaster.username.value || 0,
            "employee_id":UserMaster.emp_name.value || 0,
            "user_id":UserMaster.groupname.value || 0,

          },
      }).then((response) => {
          if (response.data.status === 1) {
              dispatch({ type: INSERT_USER, payload: true })
              notification.success({
                  message: " User Inserted Successfully",
              });
              // dispatch(getGroupName())
              return Promise.resolve();
          }
      });

  } catch (err) {

  }
}

