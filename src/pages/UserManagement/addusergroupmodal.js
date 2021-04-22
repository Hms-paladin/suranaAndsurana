import react, { useState } from 'react';
import CustomButton from "../../component/Butttons/button";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import ValidationLibrary from "../../helpers/validationfunction";
import './usermanagement.scss';
import { connect, useDispatch } from "react-redux";
import { InsertUsergroup } from "../../actions/UserGroupAction";


function UserGroupModal() {
    const dispatch = useDispatch();
    const [groupName, setGroupName] = useState()
    const [UserGroup, setUserGroup] = useState({
        groupname: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        }
    });

    function checkValidation(data, key, multipleId) {
        console.log(data, "onchangeValue")
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            UserGroup[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: UserGroup[key].validation,
        };
        // console.log(UserGroup.project_type.value, "UserGroup.client.value")
        setGroupName(data)
        setUserGroup((prevState) => ({
            ...prevState,
            [key]: dynObj,
        }));

        // variable popup==>

    }

    function onsubmit() {
        var mainvalue = {};
        var targetkeys = Object.keys(UserGroup);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                UserGroup[targetkeys[i]].value,
                UserGroup[targetkeys[i]].validation
            );
            UserGroup[targetkeys[i]].error = !errorcheck.state;
            UserGroup[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = UserGroup[targetkeys[i]].value;
        }

        var filtererr = targetkeys.filter((obj) => UserGroup[obj].error == true);

        dispatch(InsertUsergroup(UserGroup, groupName)).then(
            (response) => {
                handleCancel();
            }
        );

        setUserGroup((prevState) => ({
            ...prevState,
        }));
    }

    const handleCancel = () => {
        let From_key = [
            "groupname",

        ];

        From_key.map((data) => {
            try {
                UserGroup[data].value = "";
                console.log("mapping", UserGroup[data].value);
            } catch (error) {
                throw error;
            }
        });

        setUserGroup((prevState) => ({
            ...prevState,
        }));
    };


    return (
        <div>
            <div className="groupame">
                <Grid item xs={12} container direction="column" spacing={4}>
                    <div className="inputModeltitle">Group Name</div>
                    <Labelbox type="text"
                        changeData={(data) => checkValidation(data, "groupname")}
                        value={UserGroup.groupname.value}
                        error={UserGroup.groupname.error}
                        errmsg={UserGroup.groupname.errmsg} />
                </Grid>
            </div>
            <div className="groupbtn">
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" />
                <CustomButton btnName={"Create"} custombtnCSS="custom_cancel" btnCustomColor="customPrimary" onBtnClick={onsubmit} />
            </div>
        </div>
    )
}
export default UserGroupModal;