import { GET_PROJECT_VARIABLE_RATE, GET_VARIABLERATE_TABLE_DATA, INSERT_VARIABLERATE, SEARCH_VARIABLERATE } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import moment from 'moment';
import { notification } from "antd";

export const getVariableRateTableData = () => async dispatch => {
  try {

    axios({
      method: 'GET',
      url: apiurl + 'get_variable_rate',
    })
      .then((response) => {
        dispatch(
          {
            type: GET_VARIABLERATE_TABLE_DATA,
            payload: response.data.data
          }
        )
      })

  } catch (err) {

  }
}

export const getProjectVariableRate = (project_id) => async dispatch => {
  try {

    axios({
      method: 'POST',
      url: apiurl + 'get_project_variable_rate',
      data: {
        project_id: project_id || 0,
      },
    })
      .then((response) => {
        dispatch(
          {
            type: GET_PROJECT_VARIABLE_RATE,
            payload: response.data.data
          }
        )
      })

  } catch (err) {

  }
}


export const InsertProjectVariableRate = (RateMaster) => async dispatch => {

  if (RateMaster.length > 0) {
    let loop = 0;
    RateMaster.map((data, index) => {

      try {
        let api;
        let method;
        var DocumentData = new FormData();

        if (data.rate_master_id) {
          api = "update_project_vairable_rate"
          method = "PUT"
          DocumentData.set("rate_master_id", data.rate_master_id || 0)
          DocumentData.set("amount", data.base_rate || 0)
        }
        else {
          api = "insert_project_variable_rate"
          method = "POST"
          DocumentData.set("project_id", data.project_id || 0)
          DocumentData.set("range_id", data.range_id)
          DocumentData.set("court_id", data.location_id || 0)
          DocumentData.set("designation_id", data.designation_id || 0)
          DocumentData.set("activity_id", data.activity_id || 0)
          DocumentData.set("sub_activity_id", data.sub_activity_id || 0)
          DocumentData.set("amount", data.base_rate || 0)
          DocumentData.set("upper_limit", data.upper_limit || 0)
          DocumentData.set("lower_limit", data.lower_limit || 0)
          DocumentData.set("unit_of_measure", data.unit_of_measure || 0)

          DocumentData.set("created_on", moment().format('YYYY-MM-DD HH:m:s'))
          DocumentData.set("updated_on", moment().format('YYYY-MM-DD HH:m:s'))
          DocumentData.set("created_by", localStorage.getItem("empId"))
          DocumentData.set("updated_by", localStorage.getItem("empId"))
        }
        axios({
          method: method,
          url: apiurl + api,
          data: DocumentData,
        }).then((response) => {


          if (response.data.status === 1) {
            if (loop === 0) {
              notification.success({
                message: "Variable Rate Added Successfully",
              });
            }
            loop = 1;
            dispatch(getProjectVariableRate(data.project_id))
            //   dispatch({type:INSERT_VARIABLERATE,payload:true})

            return Promise.resolve();
          }
        });

      } catch (err) {

      }

    }
    );
  }

}

export const InsertVariableRate = (RateMaster) => async dispatch => {

  try {

    axios({
      method: "POST",
      url: apiurl + "insert_vairable_rate",
      data: {
        range_id: RateMaster.range_project_cost.value || 0,
        location_id: RateMaster.court.value || 0,
        designation_id: RateMaster.designation.value || 0,
        activity_id: RateMaster.activity.value || 0,
        created_on: moment().format("YYYY-MM-DD HH:m:s"),
        updated_on: moment().format("YYYY-MM-DD HH:m:s"),
        created_by: localStorage.getItem("empId"),
        updated_by: localStorage.getItem("empId"),
        sub_activity_id: RateMaster.sub_activity.value || 0,
        rate: RateMaster.amount.value || 0,
        upper_limit: RateMaster.upper_limit.value || 0,
        lower_limit: RateMaster.lower_limit.value || 0,
        unit_id: RateMaster.unit_measurement.value || 0,
      },
    }).then((response) => {
      dispatch(getVariableRateTableData())

      if (response.data.status === 1) {
        dispatch({ type: INSERT_VARIABLERATE, payload: true })
        notification.success({
          message: "Variable Rate Added successfully",
        });
        return Promise.resolve();
      }
    });

  } catch (err) {

  }



}

export const SearchVariableRate = (RateMaster) => async dispatch => {
  console.log(RateMaster,"lengthData")

  try {

    axios({
      method: "POST",
      url: apiurl + "variable_rate_search",
      data: {
        range_id: RateMaster.range_project_cost.value || 0,
        location_id: RateMaster.court.value || 0,
        designation_id: RateMaster.designation.value || 0,
        activity_id: RateMaster.activity.value || 0,
        sub_activity_id: RateMaster.sub_activity.value || 0,
        upper_limit: RateMaster.upper_limit.value || 0,
        lower_limit: RateMaster.lower_limit.value || 0,
        unit_id: RateMaster.unit_measurement.value || 0,
      },
    }).then((response) => {
      if (response.data.status === 1) {
        console.log(response.data.data.length,"SEARCH_VARIABLERATE")
        dispatch({ type: SEARCH_VARIABLERATE, payload: response.data.data })
        return Promise.resolve();
      }
    });

  } catch (err) {

  }
}