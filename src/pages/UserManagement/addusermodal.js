import react, { useEffect, useState } from 'react';
import CustomButton from "../../component/Butttons/button";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import ValidationLibrary from "../../helpers/validationfunction";
import { connect, useDispatch } from "react-redux";
import { Switch } from 'antd';
import './usermanagement.scss';
import { getEmployeeList, getUserGroup } from "../../actions/MasterDropdowns";


function UserMasterModal(props) {
    const dispatch = useDispatch();
    const [employeeList, setEmployeeList] = useState({})
    const [userGroup, setUserGroup] = useState({})
    const [UserMaster, setUserMaster] = useState({
        emp_name: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        user_name: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        mobilenumber: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        emailid: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        usergroup: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },

    });

    function checkValidation(data, key) {
        console.log(key, "onchangeValue")
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            UserMaster[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: UserMaster[key].validation,
        };
        // console.log(UserMaster.project_type.value, "UserMaster.client.value")
        setUserMaster((prevState) => ({
            ...prevState,
            [key]: dynObj,
        }));

        // variable popup==>

    }

    function onsubmit() {
        var mainvalue = {};
        var targetkeys = Object.keys(UserMaster);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                UserMaster[targetkeys[i]].value,
                UserMaster[targetkeys[i]].validation
            );
            UserMaster[targetkeys[i]].error = !errorcheck.state;
            UserMaster[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = UserMaster[targetkeys[i]].value;
        }

        var filtererr = targetkeys.filter((obj) => UserMaster[obj].error == true);
        // if (props.editbtn) {
        //     dispatch(updateGroupName(UserMaster)).then(
        //         (response) => {
        //             handleCancel();
        //             props.handleChangeCloseModel()
        //         }
        //     )
        // } else {

        setUserMaster((prevState) => ({
            ...prevState,
        }));
    }

    const handleCancel = () => {
        let From_key = [
            "emp_name",
            "user_name",
            "mobilenumber",
            "emailid",
            "UserMaster"

        ];

        From_key.map((data) => {
            try {
                UserMaster[data].value = "";
                console.log("mapping", UserMaster[data].value);
            } catch (error) {
                throw error;
            }
        });

        setUserMaster((prevState) => ({
            ...prevState,
        }));
    };

    useEffect(() => {
        dispatch(getEmployeeList())
        dispatch(getUserGroup())
    }, [])

    useEffect(() => {
        const EmployeeList = []
        props.EmployeeList.map((data, index) => {
            EmployeeList.push({ value: data.name, id: data.emp_id })
        })
        setEmployeeList({ EmployeeList })

        // UserGroup
        const UserGroup = []
        props.UserGroup.map((data, index) => {
            UserGroup.push({ value: data.group_name, id: data.id })
        })
        setUserGroup({ UserGroup })

    }, [props.EmployeeList, props.UserGroup])


    const [change, setchange] = useState(false)
    function SwitchChange() {
    }
    function onChange() {
        setchange(!change)

    }


    return (
        <div>
            <div className="groupame">
                <Grid item xs={12} container direction="row" spacing={2}>
                    <Grid item xs={4} container direction="column">
                        <div className="inputModeltitle">Employee Name</div>
                        <Labelbox type="select"
                            dropdown={employeeList.EmployeeList}
                            changeData={(data) => checkValidation(data, "emp_name")}
                            value={UserMaster.emp_name.value}
                            error={UserMaster.emp_name.error}
                            errmsg={UserMaster.emp_name.errmsg} />
                    </Grid>
                    <Grid item xs={4} container direction="column">
                        <div className="inputModeltitle">User Name</div>
                        <Labelbox type="text"
                            changeData={(data) => checkValidation(data, "user_name")}
                            // dropdown={industryOptions}
                            value={UserMaster.user_name.value}
                            error={UserMaster.user_name.error}
                            errmsg={UserMaster.user_name.errmsg} />
                    </Grid>
                    <Grid item xs={4} container direction="column">
                        <div className="inputModeltitle">Password</div>
                        <input type="password" className="passwordinput" />
                    </Grid>

                </Grid>
                <Grid item xs={12} container direction="row" spacing={2}>
                    <Grid item xs={4} container direction="column">
                        <div className="inputModeltitle">Mobile Number</div>
                        <Labelbox type="text"
                            changeData={(data) => checkValidation(data, "mobilenumber")}
                            // dropdown={industryOptions}
                            value={UserMaster.mobilenumber.value}
                            error={UserMaster.mobilenumber.error}
                            errmsg={UserMaster.mobilenumber.errmsg} />
                    </Grid>
                    <Grid item xs={4} container direction="column">
                        <div className="inputModeltitle">E-mail Id</div>
                        <Labelbox type="text"
                            changeData={(data) => checkValidation(data, "emailid")}
                            // dropdown={industryOptions}
                            value={UserMaster.emailid.value}
                            error={UserMaster.emailid.error}
                            errmsg={UserMaster.emailid.errmsg} />
                    </Grid>

                    <Grid item xs={4} container direction="column">
                        <div className="inputModeltitle">User Group</div>
                        <Labelbox type="select"
                            changeData={(data) => checkValidation(data, "usergroup")}
                            dropdown={userGroup.UserGroup}
                            value={UserMaster.usergroup.value}
                            error={UserMaster.usergroup.error}
                            errmsg={UserMaster.usergroup.errmsg} />
                    </Grid>
                </Grid>
                <Grid item xs={12} container direction="row" spacing={2}>
                    <Grid item xs={4} container direction="row">
                        <div className="switchdiv">
                            {change ? <div className="activeStatus">In Active</div> : <div className="activeStatus"> Active</div>}
                            <Switch defaultChecked onChange={onChange} />
                        </div>
                    </Grid>
                    <Grid item xs={8} container direction="column"></Grid>
                </Grid>
            </div>
            <div className="groupbtn">
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" />
                <CustomButton btnName={"Create"} custombtnCSS="custom_cancel" btnCustomColor="customPrimary" onBtnClick={onsubmit} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) =>
(
    {
        EmployeeList: state.getOptions.getEmployeeList || [],
        UserGroup: state.getOptions.getUserGroup || [],

    }
);

export default connect(mapStateToProps)(UserMasterModal);
