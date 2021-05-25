import react, { useState,useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../helpers/labelbox/labelbox';
import CustomButton from '../../component/Butttons/button';
import './severance.scss';
import { notification } from "antd";
import { useDispatch, connect } from "react-redux";
import {GetSeverance,InsertSeverance}  from '../../actions/ExitSeveranceAction'
import ValidationLibrary from "../../helpers/validationfunction";
function Severance(props) {

    const [permission, setPermission] = useState([])
    const [SeveranceDetails,setSeveranceDetails]=useState([])
    const [ExitSeverance,setExitSeverance]=useState({
        date: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        reason: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
    })
    let dispatch=useDispatch()
    useEffect(() => {
        dispatch(GetSeverance())
    },[])
    ///*****user permission**********/
    useEffect(() => {
        if(props.UserPermission.length>0&&props.UserPermission[0].item[0].item){
        let data_res_id = props.UserPermission[0].item[0].item.find((val) => { 
        return (
            "Exit Interview form" == val.screen_name
        ) 
    })
    setPermission(data_res_id)
    if(data_res_id.allow_view==='N')
    rights()
    }

    }, [props.UserPermission]);
    /////////////
    useEffect(() => {
        props.GetSeverance.map((data)=>{
            setSeveranceDetails({
                emp_name:data.name===null?"-":data.name,
                designation:data.designation===null?"-":data.designation,
                department:data.department===null?"-":data.department
            })
        })
    },[props.GetSeverance])    
    function rights(){
        notification.success({
            message: "You Dont't Have Rights To Access This",
        });
    }
    function checkValidation(data, key) {
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            ExitSeverance[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: ExitSeverance[key].validation,
        };
        setExitSeverance((prevState) => ({
            ...prevState,
            [key]: dynObj,
        }));
       

    }

    const handleCancel = () => {
        let From_key = ["date","reason"]
        From_key.map((data) => {
            ExitSeverance[data].value = ""; 
        });
        setExitSeverance((prevState) => ({
            ...prevState,
        }));
    }
    function onsubmit() {
        var mainvalue = {};
        var targetkeys = Object.keys(ExitSeverance);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                ExitSeverance[targetkeys[i]].value,
                ExitSeverance[targetkeys[i]].validation
            );
            ExitSeverance[targetkeys[i]].error = !errorcheck.state;
            ExitSeverance[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = ExitSeverance[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter((obj) => ExitSeverance[obj].error == true);
        if(filtererr.length>0){
          
        }else{
               dispatch(InsertSeverance(ExitSeverance,props.GetSeverance[0]&&props.GetSeverance[0].employee_id)).then((response)=>{
                 handleCancel()
               })     
        }
        setExitSeverance((prevState) => ({
            ...prevState,
        }));
    }
    return (
        <div>
       {/* { permission.allow_view==='Y'&&<div> */}
            <div className="heading">Severance</div>
            <div className="severanceContainer">
                <div className="severanceHeader">
                    <div>
                        <div>Employee</div>
                        
                        <div className="severanceData">{SeveranceDetails.emp_name}</div>
                    </div>
                    <div>
                        <div>Designation</div>
                        <div className="severanceData">{SeveranceDetails.designation}</div>
                    </div>
                    <div>
                        <div>Department</div>
                        <div className="severanceData">{SeveranceDetails.department}</div>
                    </div>
                </div>
                <div className="severanceFields">
                    <Grid item xs={12} container direction="row" spacing={2}>

                        <Grid item xs={3}>
                            <div className="appraisalFieldheading"> Date of Resignation</div>
                            <div>
                                <Labelbox type="datepicker"
                                placeholder="Date"
                                changeData={(data) =>
                                    checkValidation(data, "date")
                                }
                                value={ExitSeverance.date.value}
                                error={ExitSeverance.date.error}
                                errmsg={ExitSeverance.date.errmsg}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={9}>
                            <div className="appraisalFieldheading"> Reason for Resignation</div>
                            <div className="reasonBoxseverance">
                                <div className="reasonsSeverance">
                                    <Labelbox type="textarea"
                                    changeData={(data) =>
                                        checkValidation(data, "reason")
                                    }
                                    value={ExitSeverance.reason.value}
                                    error={ExitSeverance.reason.error}
                                    errmsg={ExitSeverance.reason.errmsg}
                                    />
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={3}>

                        </Grid>
                        <Grid item xs={9}>
                            <div className="appraisalBtn">
                                <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save" 
                                // onBtnClick={permission.allow_add==="Y"?'':rights}
                                onBtnClick={onsubmit}
                                />
                                <CustomButton btnName={"Cancel"} custombtnCSS="custom_save" onBtnClick={handleCancel}/>
                            </div>

                        </Grid>
                    </Grid>

                </div>
            </div>
        {/* </div> } */}

    </div>
    )
}
    const mapStateToProps = (state) =>
    ({
        UserPermission: state.UserPermissionReducer.getUserPermission,
        GetSeverance:state.ExitSeverance.GetSeverance
    });
export default connect(mapStateToProps) (Severance);
