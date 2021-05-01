import { INSERT_USERGROUP, GET_GROUPNAME, UPDATE_GROUP_NAME, DELETE_GROUPNAME } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import { notification } from 'antd'
import moment from 'moment'
export const getGroupName = () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl + 'getGroupMaster',
        })
            .then((response) => {
                dispatch({ type: GET_GROUPNAME, payload: response.data.data })
            })

    } catch (err) {

    }
}



export const InsertUsergroup = (UserGroup, groupName) => async dispatch => {
    try {
        console.log(UserGroup.groupname.value, "UserGroup.groupname.value")
        axios({
            method: "POST",
            url: apiurl + "insertGroupMaster",
            data: {

                "group_name": UserGroup.groupname.value || 0,
                "created_by": localStorage.getItem("empId"),
                "group_id": "0"
            },
        }).then((response) => {
            if (response.data.status === 1) {
                dispatch({ type: INSERT_USERGROUP, payload: true })
                notification.success({
                    message: " inserted Successfully",
                });
                dispatch(getGroupName())
                return Promise.resolve();
            }
        });

    } catch (err) {

    }
}

export const updateGroupName = (UserGroup) => async dispatch => {
    try {
        axios({
            method: 'PUT',
            url: apiurl + 'updateGroupMaster',
            data: {

                "group_name": UserGroup.groupname.value || 0,
                "created_by": localStorage.getItem("empId"),
                "group_id": UserGroup.groupid.value || 0,
            },
        }).then((response) => {
            if (response.data.status === 1) {
                notification.success({
                    message: "updated sucessfully",
                });
                dispatch({ type: UPDATE_GROUP_NAME, payload: response.data.status })
                // dispatch(getLeaveBalance(params,employee_code))
                dispatch(getGroupName())
                return Promise.resolve();
            } else {
                notification.success({
                    message: response.data.data,
                });
                return Promise.resolve();
            }
        });

    } catch (err) {

    }
}

export const deleteGroupName = (deleteID) => async dispatch => {
    console.log(deleteID,"deleteID")
    try {
        axios({
            method: 'DELETE',
            url: apiurl + 'deleteGroupMaster',
            data: {
                "group_id": deleteID || 0,
            },
        }).then((response) => {
            if (response.data.status === 1) {
                notification.success({
                    message: "Deleted sucessfully",
                });
                dispatch({ type: DELETE_GROUPNAME, payload: response.data.status })
                // dispatch(getLeaveBalance(params,employee_code))
                dispatch(getGroupName())
                return Promise.resolve();
            } else {
                notification.success({
                    message: response.data.data,
                });
                return Promise.resolve();
            }
        });

    } catch (err) {

    }
}