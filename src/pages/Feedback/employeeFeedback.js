import Grid from '@material-ui/core/Grid';
import Labelbox from '../../helpers/labelbox/labelbox';
import CustomButton from '../../component/Butttons/button';
import './employeeFeedback.scss';
import { Checkbox } from 'antd'
import { notification } from "antd";
import { useDispatch, connect } from "react-redux";
import react, { useState,useEffect } from 'react';

function EmployeeFeedback(props) {

    const [permission, setPermission] = useState([])

        ///*****user permission**********/
    useEffect(() => {
        if(props.UserPermission.length>0&&props.UserPermission[0].item[0].item){
        let data_res_id = props.UserPermission[0].item[0].item.find((val) => { 
        return (
            "Employee Form" == val.screen_name
        ) 
    })
    setPermission(data_res_id)
    if(data_res_id.allow_view==='N')
    rights()
    }
    }, [props.UserPermission]);
    /////////////
    console.log(props.UserPermission,"props.UserPermission")
    function rights(){
        notification.success({
            message: "You Dont't Have Rights To Access This",
        });
    }

    return (
        <div>
             {/* { permission.allow_view==='Y'&&<div> */}
            <div className="headerpage">Employee Feedback</div>
            <div className="fbContainer">
                <div className="feedbackSubheading">Which of the following influenced your decision to leave the company?  </div>
                <div className="checkboxChooser">
                    <div>
                        <Checkbox />
                        <div>Compensation</div>
                    </div>
                    <div>
                        <Checkbox />
                        <div>New Job</div>
                    </div>
                    <div>
                        <Checkbox />
                        <div>Personal reasons</div>
                    </div>
                    <div>
                        <Checkbox />
                        <div>Relocation</div>
                    </div>
                    <div>
                        <Checkbox />
                        <div>Conflict with works</div>
                    </div>
                    <div>
                        <Checkbox />
                        <div>Benefits</div>
                    </div>
                    <div>
                        <Checkbox />
                        <div>Retirement</div>
                    </div>
                    <div>
                        <Checkbox />
                        <div>Other</div>
                    </div>


                </div>
                <div className="feedbackSubheading">How do you feel about the following?</div>
                <Grid item xs={12} container direction="row" spacing={1} className="cmdbox">
                    <Grid item xs={6}>
                        <div className="appraisalFieldheading"> Work Environment</div>
                        <div className="reasonBoxseverance">
                            <div className="reasonsSeverance">
                                <Labelbox type="textarea"

                                />
                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={6}>
                        <div className="appraisalFieldheading"> Compensation</div>
                        <div className="reasonBoxseverance">
                            <div className="reasonsSeverance">
                                <Labelbox type="textarea"

                                />
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <div className="feedbacbtn">
                    <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save" onBtnClick={permission.allow_add==="Y"?'':rights}/>
                    <CustomButton btnName={"Cancel"} custombtnCSS="custom_save" />
                </div>


            </div>
            {/* </div> } */}

    </div>
    )
}
const mapStateToProps = (state) =>
({
    UserPermission: state.UserPermissionReducer.getUserPermission,
});
export default connect(mapStateToProps) (EmployeeFeedback);