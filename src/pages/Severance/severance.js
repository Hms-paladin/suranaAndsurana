import react, { useState,useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../helpers/labelbox/labelbox';
import CustomButton from '../../component/Butttons/button';
import './severance.scss';
import { notification } from "antd";
import { useDispatch, connect } from "react-redux";

function Severance(props) {

    const [saveRights, setSaveRights] = useState([])

        ///***********user permission**********/
useEffect(() => {
    if(props.UserPermission.length>0&&props.UserPermission){
       let data_res_id = props.UserPermission.find((val) => { 
       return (
           "Save" == val.control && "Exit Interview Form" == val.screen
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
       {/* { permission.allow_view==='Y'&&<div> */}
            <div className="heading">Severance</div>
            <div className="severanceContainer">
                <div className="severanceHeader">
                    <div>
                        <div>Employee</div>
                        
                        <div className="severanceData">Rajesh</div>
                    </div>
                    <div>
                        <div>Designation</div>
                        <div className="severanceData">Senior Lawyer</div>
                    </div>
                    <div>
                        <div>Department</div>
                        <div className="severanceData">property lawyer</div>
                    </div>
                </div>
                <div className="severanceFields">
                    <Grid item xs={12} container direction="row" spacing={2}>

                        <Grid item xs={3}>
                            <div className="appraisalFieldheading"> Date of Resignation</div>
                            <div>
                                <Labelbox type="datepicker"
                                // changeData={(data) =>
                                //     checkValidation(data, "area_dev")
                                // }
                                // value={Appraisal.area_dev.value}
                                // error={Appraisal.area_dev.error}
                                // errmsg={Appraisal.area_dev.errmsg}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={9}>
                            <div className="appraisalFieldheading"> Reason for Resignation</div>
                            <div className="reasonBoxseverance">
                                <div className="reasonsSeverance">
                                    <Labelbox type="textarea"
                                    // changeData={(data) =>
                                    //     checkValidation(data, "comment")
                                    // }
                                    // value={Appraisal.comment.value}
                                    // error={Appraisal.comment.error}
                                    // errmsg={Appraisal.comment.errmsg}
                                    />
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={3}>

                        </Grid>
                        <Grid item xs={9}>
                            <div className="appraisalBtn">
                                <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save" onBtnClick={!saveRights||saveRights.display_control&&saveRights.display_control==='N'?rightsNotification:''}/>
                                <CustomButton btnName={"Cancel"} custombtnCSS="custom_save" />
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
    });
export default connect(mapStateToProps) (Severance);
