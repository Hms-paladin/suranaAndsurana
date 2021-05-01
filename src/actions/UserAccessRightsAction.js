import { GET_USER_PERMISSION} from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import { notification } from 'antd'

export const getUserPermission = () => async dispatch => {

  var DocumentData = new FormData();
  DocumentData.set("user_id",localStorage.getItem("user_id"))
  try {
    axios({
      method: 'POST',
      url: apiurl + 'getUserPermission',
      data: DocumentData
    })
      .then((response) => {
          console.log("resuser",response)
        dispatch(
          {
            type: GET_USER_PERMISSION,
            payload: response.data.data
          }
        )
      })

  } catch (err) {

  }
}
