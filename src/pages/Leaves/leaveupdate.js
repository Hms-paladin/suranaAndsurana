import react, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../helpers/labelbox/labelbox';
import CustomButton from '../../component/Butttons/button';
import EnhancedTable from '../../component/DynTable/table';
import Edit from "../../images/editable.svg";
import ValidationLibrary from "../../helpers/validationfunction";
import { getLeaveType } from "../../actions/MasterDropdowns";
import { useDispatch, connect } from "react-redux";
import './leaveupdate.scss';
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { updateLeaveBalance,insertLeaveUpdate,getEmployee,getLeaveBalance} from "../../actions/LeaveUpdateAction";
import Delete from "../../images/dashboard/delete.svg";
import { useLocation, Switch } from 'react-router-dom'; 
import { notification } from "antd";

const { Search } = Input;

const headCells = [
    { id: 'leavetype', label: 'Leave Type' },
    { id: 'previousbalance', label: 'Previous Balance' },
    { id: 'eligible', label: 'Eligible' },
    { id: 'currentbalance', label: 'Current Balance' },
    // { id: 'start_date', label: 'Start Date' },
    // { id: 'end_date', label: 'End Date' },
    { id: 'action', label: 'Action' }
];

function LeaveUpdate(props) {
    const location = useLocation();
    const dispatch = useDispatch();
    const [leaveType, setLeaveType] = useState({})
    const [employeeCode, setEmployeeCode] = useState("")
    const [errEmployee, setErrEmployee] = useState(false)

    
    const [employeeName, setEmployeeName] = useState({})
    const [eligible_leave, setEligible_leave] = useState('')
    const [updateList, setUpdatelist] = useState([])
   
    const [editBtn, setEditBtn] = useState(false)

    const [saveRights, setSaveRights] = useState([])

    const [leaveupdateEdit, setLeaveupdateEdit] = useState(false)
    const [leaveEditMasId, setLeaveEditMasId] = useState("")
    const [Leave_Update, setleaveUpdate] = useState({
        start_date: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        end_date: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        leavetype: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        noofdays: {
            value:'',
            validation: [{ "name": "required" },{ "name": "allowNumaricOnly1" },{ "name": "custommaxLength","params":"2" }],
            error: null,
            errmsg: null,
        },
        
        

    })

    /////////// 
    const onEditLeaveForm=(val)=>{
        console.log("test,",val)
       Leave_Update.leavetype.value = val.leave_type_id
       setEligible_leave(val.eligible_leave)
    //    setLeaveupdateEdit(true)
       setLeaveEditMasId(val.emp_leave_mas_id)
       setEditBtn(true)
        setleaveUpdate((prevState) => ({
            ...prevState,
            }));
    }
    
    /////////////////
    useEffect(() => {
        dispatch(getLeaveType());
        // dispatch(getUserPermission());
    }, [])

    //Leave type
    useEffect(() => {
  
        let LeaveType = [];
        props.LeaveType.map((data) =>
            LeaveType.push({ id: data.status_id, value: data.leave_type })
        );
        setLeaveType({ LeaveType });

    }, [props.LeaveType])
    /////////

    const onSearchEmpId=(val)=>{

        setEmployeeCode(val)
        val!==""?setErrEmployee(false):setErrEmployee(true)
        dispatch(getEmployee(val))
        dispatch(getLeaveBalance(Leave_Update,val))
        setleaveUpdate((prevState) => ({
            ...prevState,
            }));
    }

    const onChangeEmpId=(data)=>{
   
        let val=data.target.value;
        if(val!==""){
            setErrEmployee(false)
            setEmployeeCode(val)
        }
        else {
                setEmployeeCode("")
                setErrEmployee(true)
            }
      
            dispatch(getEmployee(val))
            dispatch(getLeaveBalance(Leave_Update,val))

        setleaveUpdate((prevState) => ({
            ...prevState,
            }));
    }
   
    useEffect(() => {
        //employee name
        if(employeeCode===""){setEmployeeName({})}
        else if(props.getEmployee.length>0){setEmployeeName(props.getEmployee)}
        else{setEmployeeName("")}
    }, [employeeCode,props.getEmployee])

    /////
    // useEffect(()=>{
        
    //     let leaveUpdateList = [];
    //     if(props.getUpdateTableData.length>0){
    //     props.getUpdateTableData.map((data) => leaveUpdateList.push(data));

    //     for (var m = 0; m < leaveUpdateList.length; m++) {
    //         if(leaveUpdateList[m].leave_type_id===Leave_Update.leavetype.value){
    //             if(editBtn){
    //             setLeaveupdateEdit(true);
    //             }else{
    //             setLeaveupdateEdit(false);
    //             }
    //             return;
    //         }else if(leaveUpdateList[m].leave_type_id!==Leave_Update.leavetype.value){
    //             setLeaveupdateEdit(false);

    //         }

    //     }
    //     setleaveUpdate((prevState) => ({
    //         ...prevState,
    //         }));
        
    //     }
        
    // },[Leave_Update.leavetype.value])
    /////
 
    useEffect(() => {

        let leaveUpdateList = [];
        
        props.getUpdateTableData.map((data,index) => leaveUpdateList.push(data));
        var updatelist = [];
        for (var m = 0; m < leaveUpdateList.length; m++) {
            const index = m;
          var listarray = {
            leave_type: leaveUpdateList[m].leave_type,
            previous_balance: leaveUpdateList[m].previous_balance===0?'0':leaveUpdateList[m].previous_balance,
            eligible_leave: leaveUpdateList[m].eligible_leave===0?'0':leaveUpdateList[m].eligible_leave,
            current_balance: leaveUpdateList[m].current_balance===0?'0':leaveUpdateList[m].current_balance,
            action: (
                <>
                    <img src={Edit} className="editImage" style={{cursor:'pointer'}} onClick={()=>onEditLeaveForm(leaveUpdateList[index])}    />{" "}
                  {/* <img src={Edit} className="editImage" style={{cursor:'pointer'}} onClick={()=>( permission.allow_edit&&permission.allow_edit==='N'?(onEditLeaveForm(leaveUpdateList[index])):rights())}    />{" "} */}
                  {/* <img src={Delete} className="editImage" style={{cursor:'pointer'}} id={leaveUpdateList[m].emp_leave_mas_id} /> */}
                </>
              ),
          };
          updatelist.push(listarray);
        }
        setUpdatelist({ updatelist });
        // permission.allow_view==='Y'?setUpdatelist({ updatelist }):setUpdatelist([]);
      }, [props.getUpdateTableData])

    function checkValidation(data, key) {
  
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            Leave_Update[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: Leave_Update[key].validation,
        };

        if(key==='noofdays'){
            setEligible_leave(data)
        }
        if(key==='leavetype'){
            setEligible_leave("")
            // setLeaveupdateEdit(false)
            setEditBtn(false)
        }
        
        setleaveUpdate((prevState) => ({
            ...prevState,
            [key]: dynObj,
        }));
    }

    const handleCancel = () => {
        let LeaveUpdate_key = [
            "start_date","end_date","leavetype","noofdays"
        ]

        LeaveUpdate_key.map((data) => {
            Leave_Update[data].value = ""
        })
        setleaveUpdate(prevState => ({
            ...prevState,
        }));

        setEmployeeName({})
        setUpdatelist([])
        setEmployeeCode("")
       
    }
    useEffect(() => {
        handleCancel();
      }, [location]);

    function onSubmit() {
        var mainvalue = {};
        var targetkeys = Object.keys(Leave_Update);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                Leave_Update[targetkeys[i]].value,
                Leave_Update[targetkeys[i]].validation
            );
            Leave_Update[targetkeys[i]].error = !errorcheck.state;
            Leave_Update[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = Leave_Update[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter((obj) => Leave_Update[obj].error == true);

        if (filtererr.length > 0 || employeeCode==="" || employeeName==="") {
           if(employeeCode===""){setErrEmployee(true)}
           if(employeeName===""){
            notification.success({
                message: "Employee Details Not Found With This Selected Dates",
              });
            }
        } 
        else{
            if(editBtn){
                dispatch(updateLeaveBalance(Leave_Update,eligible_leave,leaveEditMasId,employeeCode)).then(() => {
                })
             }else{
                dispatch(insertLeaveUpdate(Leave_Update,employeeName[0].emp_id,eligible_leave,employeeCode)).then(() => {
                })
            }
        }

        setleaveUpdate((prevState) => ({
            ...prevState,
        }));
    }

            ///***********user permission**********/
    useEffect(() => {
    if(props.UserPermission.length>0&&props.UserPermission){
       let data_res_id = props.UserPermission.find((val) => { 
       return (
           "Leave Master - Save" == val.control 
       ) 
      })
      setSaveRights(data_res_id)
   }
  
   }, [props.UserPermission]);
  
  
    // console.log(saveRights,"rights")
  
   function rightsNotification(){
    notification.success({
        message: "You are not Authorized. Please Contact Administrator",
    });
  }
  /////////////

    return (
        <div>
            <div className="leaveMainHeader">Leave Balance Update</div>
            <div className="leaveFields">
                <Grid item xs={12} container direction="row" spacing={2}>
                    { Leave_Update.leavetype.value !== "" &&
                        <>

                            <Grid item xs={3}>
                                <div className="leaveFieldheading">From</div>
                                <div>
                                    <Labelbox type="datepicker" disablePast={true}
                                        changeData={(data) =>
                                            checkValidation(data, "start_date")
                                        }
                                        value={Leave_Update.start_date.value}
                                        error={Leave_Update.start_date.error}
                                        errmsg={Leave_Update.start_date.errmsg} />
                                </div>
                            </Grid>
                            <Grid item xs={3}>
                                <div className="leaveFieldheading">To</div>
                                <div>
                                    <Labelbox type="datepicker" disablePast={true}
                                        changeData={(data) =>
                                            checkValidation(data, "end_date")
                                        }
                                        value={Leave_Update.end_date.value}
                                        error={Leave_Update.end_date.error}
                                        errmsg={Leave_Update.end_date.errmsg} />
                                </div>
                            </Grid>


                        </>}
                    {(Leave_Update.leavetype.value !== 38 || Leave_Update.leavetype.value === 38) && Leave_Update.leavetype.value !== "" && <>
                        <Grid item xs={3}>
                            <div className="leaveFieldheading">Employee Id</div>
                            <div className="searchbtnChange">
                            <Search onSearch={(value)=>onSearchEmpId(value)} onChange={(value)=> onChangeEmpId(value)}
                             className={errEmployee && "required_box"} enterButton />
                            {errEmployee && <span className={"required_text"}>Field required</span>}
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <div className="leaveFieldheading">Name</div>
                            <div>
                                {/* {(props.EmployeeName.length>0)?props.EmployeeName[0].name:''} */}
                                {employeeName.length>0?employeeName[0].name:''}
                        </div>
                        </Grid>
                        {/* {Leave_Update.leavetype.value === 38 &&
                            <>
                                <Grid item xs={6}></Grid>

                            </>
                        } */}
                    </>}

                    <Grid item xs={3}>
                        <div className="leaveFieldheading">Leave Type</div>
                        <div>
                            <Labelbox type="select"
                                dropdown={leaveType.LeaveType}
                                changeData={(data) =>
                                    checkValidation(data, "leavetype")
                                }
                                value={Leave_Update.leavetype.value}
                                error={Leave_Update.leavetype.error}
                                errmsg={Leave_Update.leavetype.errmsg} />
                        </div>
                    </Grid>
                    {Leave_Update.leavetype.value !== 38 && Leave_Update.leavetype.value !== "" && <>
                        <Grid item xs={3}>
                            <div className="leaveFieldheading">Add No.of Days</div>
                            <div>
                                <Labelbox type="text" 
                                 value={eligible_leave} 
                                 changeData={(data) =>
                                     checkValidation(data, "noofdays")
                                 }
                                 // value={Leave_Update.noofdays.value}
                                 // changeData={(value)=>setEligible_leave(value)}
                                  error={Leave_Update.noofdays.error}
                                  errmsg={Leave_Update.noofdays.errmsg}
                                />
                            </div>
                        </Grid>
                    </>}



                    {Leave_Update.leavetype.value === 38 &&
                        <>
                            <Grid item xs={3}>
                                <div className="leaveFieldheading">Add No. of Hours/Per Month</div>
                                <div>
                                    <Labelbox type="text" 
                                    value={eligible_leave} 
                                    changeData={(data) =>
                                        checkValidation(data, "noofdays")
                                    }
                                    // value={Leave_Update.noofdays.value}
                                    // changeData={(value)=>setEligible_leave(value)}
                                     error={Leave_Update.noofdays.error}
                                     errmsg={Leave_Update.noofdays.errmsg}
                                     />
                                </div>
                            </Grid>



                        </>
                    }


                    
                    {Leave_Update.leavetype.value?<Grid item xs={3} container direction="row" spacing={2}>
                        <Grid item xs={6}>
                            <CustomButton btnName={editBtn?"Update":"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save"  btnDisable={!saveRights||saveRights.display_control&&saveRights.display_control==='N'?true:false} onBtnClick={onSubmit}  />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" onBtnClick={handleCancel}/>
                        </Grid>
                    </Grid>:null}


                </Grid>

            </div>
            <div className="leavetableformat">
                <EnhancedTable headCells={headCells} 
                 rows={updateList.length == 0 ? updateList : updateList.updatelist} 
                />
            </div>
        </div>
    )
}
const mapStateToProps = (state) =>
({
    LeaveType: state.getOptions.getLeaveType,
    getInsertStatus: state.LeaveUpdateReducer.insertLeaveUpdate,
    getEmployee: state.LeaveUpdateReducer.getEmployee,
    getUpdateTableData: state.LeaveUpdateReducer.getLeaveBalance,
    UserPermission: state.UserPermissionReducer.getUserPermission,
});
export default connect(mapStateToProps)(LeaveUpdate);
