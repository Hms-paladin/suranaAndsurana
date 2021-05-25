import react, { useEffect, useState } from 'react';
import CustomButton from "../../component/Butttons/button";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import ValidationLibrary from "../../helpers/validationfunction";
import { connect, useDispatch } from "react-redux";
import { Switch } from 'antd';
import './usermanagement.scss';
import { getUserGroup } from "../../actions/MasterDropdowns";
import {insertUser,editUser,getCandidateName,GetEmployeeDetails} from "../../actions/UserMasterAction";
import {
    getGroupList
  } from "../../actions/UserGroupAction";

function UserMasterModal(props) {
    const dispatch = useDispatch();
    const [employeeList, setEmployeeList] = useState([])
    const [userGroup, setUserGroup] = useState({})
    const [password, setPassword] = useState("")
    const [changeActive, setChangeActive] = useState(true)
    const [errPassword, setErrPassword] = useState(false)
    const [user_Id, setUser_Id] = useState(0)
    const [groups, setgroups] = useState({})
    const [disable,setdisable]=useState(false)
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
            validation: [{ name: "required" },{ name: "mobileSurana" }],
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

    ////// api dispatch
    useEffect(() => {
        dispatch(getGroupList())
        dispatch(getCandidateName())
        dispatch(getUserGroup())
        dispatch(GetEmployeeDetails())
    }, [])
    //////
 


    useEffect(() => {
        dispatch(getCandidateName())

    }, [props.user_add])


    useEffect(() => {
       
        let groupsData = []
        props.groupLists.map((data) =>
        groupsData.push({
            value: data.group_name,
            id: data.group_id
          })
        )
        setgroups({ groupsData })
        
        if(!props.user_data){
        const Employee_List = []
        props.EmployeeList.map((data, index) => {
            Employee_List.push({ value: data.EmpName, id: data.emp_id })
        })
       
        
        setEmployeeList(Employee_List)
        }
        // UserGroup
        const UserGroup = []
        props.UserGroup.map((data, index) => {
            UserGroup.push({ value: data.group_name, id: data.id })
        })
        setUserGroup({ UserGroup })
        // employee details
        let employee_details=[]
       
        props.GetEmployeeDetails.map((data)=>{
            setdisable(true)
            setUserMaster((prevState) => ({
                ...prevState,
                mobilenumber:{value:data.official_contact},
                emailid:{value:data.official_email}
            }));
        })
    }, [props.EmployeeList, props.UserGroup,props.groupLists,props.GetEmployeeDetails])

      
    // function SwitchChange() {
    // }
    function onChangeActive(data) {
      
        setChangeActive(data)
        
    }

    function checkValidation(data, key) {
        // console.log(key, "onchangeValue")
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
        if(key==="emp_name" && data){
           
            dispatch(GetEmployeeDetails(data))
          
        }
        // variable popup==>
        if(UserMaster.emp_name.value){
           
        }

    }

    const handleCancel = () => {
        let From_key = [
            "emp_name",
            "user_name",
            "mobilenumber",
            "emailid",
            "usergroup"
        ];

        From_key.map((data) => {
            try {
                UserMaster[data].value = "";
                console.log("mapping", UserMaster[data].value);
            } catch (error) {
                throw error;
            }
        });

        setPassword("")
        setUserMaster((prevState) => ({
            ...prevState,
        }));
        props.closeModel()

    };

    useEffect(() => {
        console.log(props.user_data,"props.user_data")
        if(props.user_data){
            const Employee_List = []
                Employee_List.push({ value: props.user_data.candidateName, id: props.user_data.employee_id })
                console.log(Employee_List,"Employee_List")
            setEmployeeList(Employee_List)

        UserMaster.emp_name.value=props.user_data.employee_id
        UserMaster.user_name.value=props.user_data.user_name
        UserMaster.mobilenumber.value=props.user_data.mobileno
        UserMaster.emailid.value=props.user_data.email
        UserMaster.usergroup.value=props.user_data.group_id
        // setPassword(props.user_data.password)
        props.user_data.active_flag===1?setChangeActive(true):setChangeActive(false)
        setUser_Id(props.user_data.user_id)
        setUserMaster((prevState) => ({
            ...prevState,
        }));
        }

    }, [props.user_data])
    
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
            // console.log(filtererr.length,"filtererr.length")

        if(filtererr.length>0||password===""){
            console.log(filtererr.length,"filtererr.length")
            if(password===""){setErrPassword(true)}
        }else{
                if(props.user_data){
                    dispatch(editUser(UserMaster,password,changeActive,user_Id)).then(() => {
                        handleCancel()
                       
                    })
                }
                else{
                dispatch(insertUser(UserMaster,password,changeActive)).then(() => {
                    handleCancel()
                   
                })
                }
                
        }
        setUserMaster((prevState) => ({
            ...prevState,
        }));
    }
// console.log(props.EmployeeList,"EmployeeList")

    return (
        <div>
            <div className="groupame">
                <Grid item xs={12} container direction="row" spacing={2}>
                    <Grid item xs={4} container direction="column">
                        <div className="inputModeltitle">Employee Name</div>
                        <Labelbox type="select"
                            disabled={props.user_data?true:false}
                            dropdown={employeeList}
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
                        <input type="password" className="passwordinput" value={password} onChange={(data)=>(setPassword(data.target.value),data.target.value!==''?setErrPassword(false):setErrPassword(true))}/>
                        {errPassword && <span className={"required_text"}>Field required</span>}
                    </Grid>

                </Grid>
                <Grid item xs={12} container direction="row" spacing={2}>
                    <Grid item xs={4} container direction="column">
                        <div className="inputModeltitle">Mobile Number</div>
                        <Labelbox type="text"
                            disabled={disable}
                            changeData={(data) => checkValidation(data, "mobilenumber")}
                            // dropdown={industryOptions}
                            value={UserMaster.mobilenumber.value}
                            error={UserMaster.mobilenumber.error}
                            errmsg={UserMaster.mobilenumber.errmsg} />
                    </Grid>
                    <Grid item xs={4} container direction="column">
                        <div className="inputModeltitle">E-mail Id</div>
                        <Labelbox type="text"
                            disabled={disable}
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
                            dropdown={groups.groupsData}
                            value={UserMaster.usergroup.value}
                            error={UserMaster.usergroup.error}
                            errmsg={UserMaster.usergroup.errmsg} />
                    </Grid>
                </Grid>
                <Grid item xs={12} container direction="row" spacing={2}>
                    <Grid item xs={4} container direction="row">
                        <div className="switchdiv">
                            {changeActive? <div className="activeStatus">Active</div> : <div className="activeStatus"> In Active</div>}
                           <Switch checked={changeActive} onChange={(data)=>onChangeActive(data)} />
                            
                        </div>
                    </Grid>
                    <Grid item xs={8} container direction="column"></Grid>
                </Grid>
            </div>
            <div className="groupbtn">
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" onBtnClick={handleCancel} />
                <CustomButton btnName={props.user_data?"Update":"Create"} custombtnCSS="custom_cancel" btnCustomColor="customPrimary" onBtnClick={onsubmit} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) =>
(
    {
        groupLists: state.UserGroupReducer.groupLists || [],
        getUserList: state.UserMasterReducer.getUser || [],
        EmployeeList: state.UserMasterReducer.getCandidateName || [],
        UserGroup: state.getOptions.getUserGroup || [],
        GetEmployeeDetails:state.UserMasterReducer.getEmployeeDetails||[]
    }
);

export default connect(mapStateToProps)(UserMasterModal);