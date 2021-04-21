import { GET_EMPLOYEE,INSERT_LEAVE_UPDATE } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import moment from 'moment';
import { notification } from "antd";

export const insertLeaveUpdate = (params,employee_id,eligible_leave) => async dispatch => {

    var DocumentData = new FormData();
    DocumentData.set("employee_id",employee_id)
    DocumentData.set("leave_type_id",params.leavetype.value)
    DocumentData.set("eligible_leave",eligible_leave)
    DocumentData.set("start_date",params.start_date.value)
    DocumentData.set("end_date",params.end_date.value)
    DocumentData.set("created_on",moment().format('YYYY-MM-DD HH:m:s')  )
    DocumentData.set("updated_on",moment().format('YYYY-MM-DD HH:m:s')  )
    DocumentData.set("created_by",localStorage.getItem("empId"))
    DocumentData.set("updated_by",localStorage.getItem("empId"))
    try {
        axios({
            method: 'POST',
            url: apiurl + 'insert_leave_balance',
            data: DocumentData
          }).then((response) => {
            if (response.data.status === 1) {
                notification.success({
                    message: "Leave Balance added sucessfully",
                  });
                dispatch({type:INSERT_LEAVE_UPDATE,payload:response.data.status})
                // dispatch(getCopyRight(IdDetails.project_id))
              return Promise.resolve();
            }
          });
        
    } catch (err) {
        
    }
}

export const getEmployee = (emp_code) => async dispatch => {

  try {

      axios({
          method: "POST",
          url: apiurl + "get_emp_by_code",
          data: {
            employee_code: emp_code,
          },
        }).then((response) => {
          if (response.data.status === 1) {
            // console.log(response.data.data.length,"//")
              dispatch({type:GET_EMPLOYEE,payload:response.data.data})
            return Promise.resolve();
          }
        });
      
  } catch (err) {
      
  }
}

// export const getCopyRight = (id) => async dispatch => {

//     try {
  
//         axios({
//             method: "POST",
//             url: apiurl + "get_copyright",
//             data: {
//               project_id: id,
//             },
//           }).then((response) => {
//             if (response.data.status === 1) {
//               // console.log(response.data.data.length,"//")
//                 dispatch({type:GET_COPYRIGHT,payload:response.data.data})
//               return Promise.resolve();
//             }
//           });
        
//     } catch (err) {
        
//     }
//   }

//   export const updateCopyright = (params,IdDetails,fileupload,copy_right_id) => async dispatch => {

//     var DocumentData = new FormData();
//     DocumentData.set("copy_right_id",copy_right_id)
//     DocumentData.set("project_id",IdDetails.project_id)
//     DocumentData.set("title",params.title.value)
//     DocumentData.set("type_of_work",params.type_of_work.value)
//     DocumentData.set("upload_images",fileupload)
//     DocumentData.set("reference",params.reference.value)
//     DocumentData.set("status",params.status.value)
//     DocumentData.set("created_on",moment().format('YYYY-MM-DD HH:m:s')  )
//     DocumentData.set("updated_on",moment().format('YYYY-MM-DD HH:m:s')  )
//     DocumentData.set("created_by",localStorage.getItem("empId"))
//     DocumentData.set("updated_by",localStorage.getItem("empId"))
//     try {
//         axios({
//             method: 'PUT',
//             url: apiurl + 'update_copyright',
//             data: DocumentData
//           }).then((response) => {
//             if (response.data.status === 1) {
//                 notification.success({
//                     message: "Copyright Updated sucessfully",
//                   });
//                 dispatch({type:UPDATE_COPYRIGHT,payload:response.data.status})
//                 dispatch(getCopyRight(IdDetails.project_id))
//               return Promise.resolve();
//             }
//           });
        
//     } catch (err) {
        
//     }
// }
