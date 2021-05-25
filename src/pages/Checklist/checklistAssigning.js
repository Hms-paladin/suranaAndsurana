import react, { useEffect, useState } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import CustomButton from '../../component/Butttons/button';
import Grid from "@material-ui/core/Grid";
import './checklists.scss'
import { notification } from "antd";
import { useDispatch, connect } from "react-redux";

function CheckListAssign(props) {
    const [saveRights, setSaveRights] = useState([])

    ///***********user permission**********/
useEffect(() => {
    if(props.UserPermission.length>0&&props.UserPermission){
       let data_res_id = props.UserPermission.find((val) => { 
       return (
           "Save" == val.control && "Checklist Assigning" == val.screen
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
            <div className="mainHeading">Check List Assigning</div>
            <div className="clAssignFields">
                <Grid item xs={12} container direction="row" spacing={2}>
                    <Grid item xs={3} container direction="column">
                        <div className="TThead">Check List Name</div>
                        <Labelbox type="select"></Labelbox>
                    </Grid>
                    <Grid item xs={3} container direction="column">
                        <div className="TThead">Employee</div>
                        <Labelbox type="select"></Labelbox>
                    </Grid>
                    <Grid item xs={3} container direction="column">
                        <div className="TThead">Project Type</div>
                        <Labelbox type="select"></Labelbox>
                    </Grid>
                    <Grid item xs={3} container direction="column">
                        <div className="TThead">Project Sub Type</div>
                        <Labelbox type="select"></Labelbox>
                    </Grid>
                    <Grid item xs={3} container direction="column">
                        <div className="TThead">Start Date</div>
                        <Labelbox type="datepicker"></Labelbox>
                    </Grid>
                    <Grid item xs={3} container direction="column">
                        <div className="TThead">End Month</div>
                        <Labelbox type="datepicker"></Labelbox>
                    </Grid>
                </Grid>

                <div className="checklistAssignBtn">
                    <CustomButton btnName={"Save"} custombtnCSS="custombtn" btnCustomColor="customPrimary" onBtnClick={() => (!saveRights||saveRights.display_control&&saveRights.display_control==='N'?rightsNotification():'')}/>
                    <CustomButton btnName={"Cancel"} custombtnCSS="custombtn" />
                </div>

            </div>
        </div>
    )
}
const mapStateToProps = (state) =>
    ({
        UserPermission: state.UserPermissionReducer.getUserPermission,
    });
export default connect(mapStateToProps) (CheckListAssign);