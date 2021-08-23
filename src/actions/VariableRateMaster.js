import { GET_PROJECT_VARIABLE_RATE, GET_VARIABLERATE_TABLE_DATA, INSERT_VARIABLERATE, SEARCH_VARIABLERATE,
  UPDATE_VARIABLE_RATE_FIRST,
UPDATE_VARIABLERATE} from "../utils/Constants";
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
  console.log("projectid",project_id)
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


export const InsertProjectVariableRate = (data,DataId) => async dispatch => {

 
    console.log("checkid", data.range_id)

      try {
        let api;
        let method;
        var DocumentData = new FormData();

        // if (DataId.rate_master_id) {
        //   api = "update_project_vairable_rate"
        //   method = "PUT"
        //   DocumentData.set("rate_master_id", data[0].rate_master_id || 0)
        //   DocumentData.set("amount", data[0].base_rate || 0)
        // }
        
          api = "insert_project_variable_rate"
          method = "POST"
          DocumentData.set("project_id", DataId[0].project_id || 0)
          DocumentData.set("range_id", data.range_id||0)
          DocumentData.set("court_id", data.location_id || 0)
          DocumentData.set("designation_id", data.designation_id || 0)
          DocumentData.set("activity_id", data.activity_id || 0)
          DocumentData.set("sub_activity_id", data.sub_activity_id || 0)
          DocumentData.set("amount", data.Amount || 0)
          DocumentData.set("upper_limit", data.upper_limit || 0)
          DocumentData.set("lower_limit", data.lower_limit || 0)
          if(data && data.unit_id){
            DocumentData.set("unit_of_measure", data.unit_id || 0) 
          }else if(data && isNaN(data.unit_of_measure)){
          DocumentData.set("unit_of_measure", data.unit_of_measure || 0)
          }
          DocumentData.set("created_on", moment().format('YYYY-MM-DD HH:m:s'))
          DocumentData.set("updated_on", moment().format('YYYY-MM-DD HH:m:s'))
          DocumentData.set("created_by", localStorage.getItem("empId"))
          DocumentData.set("updated_by", localStorage.getItem("empId"))
        
        axios({
          method: method,
          url: apiurl + api,
          data: DocumentData,
        }).then((response) => {


          if (response.data.status === 1) {
              notification.success({
                message: "Variable Rate Added Successfully",
              });
              dispatch({type:INSERT_VARIABLERATE,payload:response.data.status})
            
            dispatch(getProjectVariableRate(DataId[0].project_id))

            return Promise.resolve();
          }else{
            notification.success({
              message: response.data.msg,
            });
          }
        });

      } catch (err) {

      }

    
    
  

}
// export const InsertProjectVariableRate = (data) => async dispatch => {
//   alert(data)
//   setAddTableData({ searchVariableTableData });
//   try {

//     var DocumentData = new FormData();
//     DocumentData.set("project_id", data.project_id || 0)
//     DocumentData.set("range_id", data.range_id||0)
//     DocumentData.set("court_id", data.location_id || 0)
//     DocumentData.set("designation_id", data.designation_id || 0)
//     DocumentData.set("activity_id", data.activity_id || 0)
//     DocumentData.set("sub_activity_id", data.sub_activity_id || 0)
//     DocumentData.set("amount", data.base_rate || 0)
//     DocumentData.set("upper_limit", data.upper_limit || 0)
//     DocumentData.set("lower_limit", data.lower_limit || 0)
//     DocumentData.set("unit_of_measure", data.unit_of_measure || 0)

//     DocumentData.set("created_on", moment().format('YYYY-MM-DD HH:m:s'))
//     DocumentData.set("updated_on", moment().format('YYYY-MM-DD HH:m:s'))
//     DocumentData.set("created_by", localStorage.getItem("empId"))
//     DocumentData.set("updated_by", localStorage.getItem("empId"))

//     axios({
//       method: 'POST',
//       url: apiurl + "insert_project_variable_rate",
//       data: DocumentData
//     }).then((response) => {
//       if (response.data.status === 1) {
//         notification.success({
//           message: " Added Successfully",
//         });
//         dispatch({type:INSERT_VARIABLERATE,payload:response.data.status})
//         dispatch(getProjectVariableRate(data.project_id))
       
//         return Promise.resolve();
//       }
//     });

//   } catch (err) {

//   }
// }

// export const InsertProjectVariableRate = (RateMaster) => async dispatch => {

//   if (RateMaster.length<0) {
//     let loop = 0;
//     RateMaster.map((data, index) => {

//       try {
//         let api;
//         let method;
//         var DocumentData = new FormData();

//         if (data.rate_master_id) {
//           api = "update_project_vairable_rate"
//           method = "PUT"
//           DocumentData.set("rate_master_id", data.rate_master_id || 0)
//           DocumentData.set("amount", data.base_rate || 0)
//         }
//         else {
//           api = "insert_project_variable_rate"
//           method = "POST"
//           DocumentData.set("project_id", data.project_id || 0)
//           DocumentData.set("range_id", data.range_id)
//           DocumentData.set("court_id", data.location_id || 0)
//           DocumentData.set("designation_id", data.designation_id || 0)
//           DocumentData.set("activity_id", data.activity_id || 0)
//           DocumentData.set("sub_activity_id", data.sub_activity_id || 0)
//           DocumentData.set("amount", data.base_rate || 0)
//           DocumentData.set("upper_limit", data.upper_limit || 0)
//           DocumentData.set("lower_limit", data.lower_limit || 0)
//           DocumentData.set("unit_of_measure", data.unit_of_measure || 0)

//           DocumentData.set("created_on", moment().format('YYYY-MM-DD HH:m:s'))
//           DocumentData.set("updated_on", moment().format('YYYY-MM-DD HH:m:s'))
//           DocumentData.set("created_by", localStorage.getItem("empId"))
//           DocumentData.set("updated_by", localStorage.getItem("empId"))
//         }
//         axios({
//           method: method,
//           url: apiurl + api,
//           data: DocumentData,
//         }).then((response) => {


//           if (response.data.status === 1) {
//             if (loop === 0) {
//               notification.success({
//                 message: "Variable Rate Added Successfully",
//               });
//             }
//             loop = 1;
//             console.log("check",data.project_id)
//             dispatch(getProjectVariableRate(data.project_id))
//             //   dispatch({type:INSERT_VARIABLERATE,payload:true})

//             return Promise.resolve();
//           }
//         });

//       } catch (err) {

//       }

//     }
//     );
//   }

// }
export const InsertVariableRate = (RateMaster) => async dispatch => {
  // console.log("ratemastercheck",RateMaster.range_project_cost.value)
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
     

      if (response.data.status === 1) {
        dispatch({ type: INSERT_VARIABLERATE, payload: response.status.msg })
        notification.success({
          message: "Variable Rate Added successfully",
        });
        dispatch(getVariableRateTableData())
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


export const deleteVariableRate = (id,project_id) => async dispatch => {
  try {
      axios({
          method: 'DELETE',
          url: apiurl + 'delete_project_variable_rate',
          data:
          {
           "rate_master_id":id
          }
      }).then((response) => {
          if (response.data.status === 1) {
              notification.success({
                  message: "Variable rate deleted successfully",
              });
              dispatch(getProjectVariableRate(project_id))
              return Promise.resolve();
          }
      });

  } catch (err) {

  }
}


export const UpdateVariableRate = (data,allRowAmount, allrowList,applicapleRatesAmount,applicapleRateLists) => async dispatch => {
  // console.log(projectSearchCreate,"projectSearchCreate")

  for(var i=0; i<allrowList.length;i++){
var amount = allRowAmount["amountSearch"+i];
var ratMasterId = allrowList[i].stage_list_id
if(amount != allrowList[i].Amount){

    try {
      axios({
          method: 'PUT',
          url: apiurl +'update_project_vairable_rate',
          data:
          {
            "rate_master_id":ratMasterId || 0,
            "amount":amount|| 0
         
          }
      }).then((response) => {
          if (response.data.status === 1) {
            dispatch({ type: UPDATE_VARIABLERATE, payload: response.data.status})
              notification.success({
                  message: "Variable rate amount updated successfully",
              });
              //dispatch(getProjectVariableRate(data[0].project_id))
              return Promise.resolve();
          }
      });

  } catch (err) {

  }

  }
}

for(var i=0; i<applicapleRateLists.length;i++){
  var amount = applicapleRatesAmount["amt"+i];
  var ratMasterId = applicapleRateLists[i].rate_master_id
  if(amount != applicapleRateLists[i].amount){
  
      try {
        axios({
            method: 'PUT',
            url: apiurl +'update_project_vairable_rate',
            data:
            {
              "rate_master_id":ratMasterId || 0,
              "amount":amount|| 0
           
            }
        }).then((response) => {
            if (response.data.status === 1) {
              dispatch({ type: UPDATE_VARIABLERATE, payload: response.data.status})
                notification.success({
                    message: "Variable rate amount updated successfully",
                });
                //dispatch(getProjectVariableRate(data[0].project_id))
                return Promise.resolve();
            }
        });
  
    } catch (err) {
  
    }
  
    }
  }
  }


  export const Update_Variable_Rate = (data,amt,AddRow) => async dispatch => {
    console.log(AddRow.stage_list_id,amt,"projectSearchCreate")
      try {
          axios({
              method: 'PUT',
              url: apiurl +'update_variable_rate',
              data:
              {
                "rate_map_id":AddRow.stage_list_id || 0,
                "amount":amt|| 0
             
              }
          }).then((response) => {
              if (response.data.status === 1) {
                  notification.success({
                      message: "Variable rate amount updated successfully",
                  });
                 dispatch({ type: UPDATE_VARIABLE_RATE_FIRST, payload:true})
                  dispatch(getVariableRateTableData())
                  return Promise.resolve();
              }
          });
    
      } catch (err) {
    
      }
    }