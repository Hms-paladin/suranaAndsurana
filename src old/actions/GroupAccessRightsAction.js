
import { INSERT_GROUPACCESS, GET_GROUPNAME,GET_GROUPPERMISION } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import { notification } from 'antd'
import moment from 'moment'


export const GetGroupPermision = () => async dispatch => {
    

        try {
           // console.log(groupName, "groupName")
            axios({
                method: "POST",
                url: apiurl + "getgroupPermission",
                data: {
                    "group_id":"8"
                },
            }).then((response) => {
                if (response.data.status === 1) {
                    dispatch({ type: GET_GROUPPERMISION, payload: true })
                    /*notification.success({
                        message: " inserted Successfully",
                    });*/
                    return Promise.resolve();
                }
            });
    
        } catch (err) {
    
        }
}



export const InsertGroupAccess = (UserGroup) => async dispatch => {
    try {
        //console.log(groupName, "groupName")
        axios({
            method: "POST",
            url: apiurl + "insertGroupPermission",
            data: {

                "group_name": UserGroup.groupname.value || 0,
                "created_by": "1",
                "group_id": "8"
            },
        }).then((response) => {
            if (response.data.status === 1) {
                dispatch({ type: INSERT_GROUPACCESS, payload: true })
                notification.success({
                    message: " inserted Successfully",
                });
                return Promise.resolve();
            }
        });

    } catch (err) {

    }
}

