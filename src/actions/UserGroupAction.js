import { INSERT_USERGROUP, GET_GROUPNAME, UPDATE_GROUP_NAME, 
    DELETE_GROUPNAME, GET_GROUP_LIST,GET_EMP_LIST,GET_EMP_GROUP_LIST,
    GET_GROUP_EMP,GET_GROUP_CONTROL_LIST,EDIT_GROUP_NAME,EDIT_GROUP_CONTROL,GET_CONTROL_LIST,INSERT_GROUP_CONTROL} from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import { notification } from 'antd'
import moment from 'moment'

export const getGroupList = () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl + 'get_group',
        })
            .then((response) => {
                dispatch({ type: GET_GROUP_LIST, payload: response.data.data })
            })

    } catch (err) {

    }
}

export const getControl = () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl + 'get_controls',
        })
            .then((response) => {
                dispatch({ type: GET_CONTROL_LIST, payload: response.data.data })
            })

    } catch (err) {

    }
}
export const getEmployeeList = () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl + 'get_employee_list',
        })
            .then((response) => {
                dispatch({ type: GET_EMP_LIST, payload: response.data.data })
            })

    } catch (err) {

    }
}

export const getEmployeeGroupDetails = () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl + 'get_employee_group',
        })
            .then((response) => {
                dispatch({ type: GET_EMP_GROUP_LIST, payload: response.data.data })
            })

    } catch (err) {

    }
}

export const getGroupsbyEmpId = (empId) => async dispatch => {
    try {

        axios({
            method: 'POST',
            url: apiurl + 'get_emp_group_details',
            data: {
                "emp_id":empId
            }
        })
            .then((response) => {
                dispatch({ type: GET_GROUP_EMP, payload: response.data.data })
            })

    } catch (err) {

    }
}


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



export const InsertUsergroupMaster = (data) => async dispatch => {
    try {
        axios({
            method: "POST",
            url: apiurl + "insert_employee_group",
            data: data,
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
export const InsertGroupControlMaster = (data) => async dispatch => {
    try {
        axios({
            method: "POST",
            url: apiurl + "insert_group_control",
            data: data,
        }).then((response) => {
            if (response.data.status === 1) {
                dispatch({ type: INSERT_GROUP_CONTROL, payload: true })
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


export const editEmployeeGroup = (UserGroup) => async dispatch => {
    try {

        axios({
            method: 'PUT',
            url: apiurl + 'edit_employee_group',
            data: UserGroup , /*{

                "group_name": UserGroup.groupname.value || 0,
                "created_by": localStorage.getItem("empId"),
                "group_id": UserGroup.groupid.value || 0,
            }*/
        }).then((response) => {
            if (response.data.status === 1) {
                notification.success({
                    message: "updated sucessfully",
                });
                dispatch({ type: EDIT_GROUP_NAME, payload: response.data.status })
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
//edit_employee_group


export const editGroupControl = (UserGroup) => async dispatch => {
    try {

        axios({
            method: 'PUT',
            url: apiurl + 'edit_group_control',
            data: UserGroup , /*{

                "group_name": UserGroup.groupname.value || 0,
                "created_by": localStorage.getItem("empId"),
                "group_id": UserGroup.groupid.value || 0,
            }*/
        }).then((response) => {
            if (response.data.status === 1) {
                notification.success({
                    message: "updated sucessfully",
                });
                dispatch({ type: EDIT_GROUP_CONTROL, payload: response.data.status })
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

export const getGroupControlList = () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl + 'get_group_control',
        })
            .then((response) => {
                dispatch({ type: GET_GROUP_CONTROL_LIST, payload: response.data.data })
            })

    } catch (err) {

    }
}