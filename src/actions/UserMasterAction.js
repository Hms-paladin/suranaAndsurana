import { GET_TABLE_NAME} from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";


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

