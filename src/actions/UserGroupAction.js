
import { INSERT_USERGROUP ,GET_GROUPNAME} from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import { notification } from 'antd'
import moment from 'moment'


export const GetGroupName = () => async dispatch => {
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
        console.log(groupName, "groupName")
        axios({
            method: "POST",
            url: apiurl + "insertGroupMaster",
            data: {

                "group_name": UserGroup.groupname.value || 0,
                "created_by": "1",
                "group_id": "0"
            },
        }).then((response) => {
            if (response.data.status === 1) {
                dispatch({ type: INSERT_USERGROUP, payload: true })
                notification.success({
                    message: " inserted Successfully",
                });
                return Promise.resolve();
            }
        });

    } catch (err) {

    }
}

