import react, { useState } from 'react';
import CustomButton from "../../component/Butttons/button";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import './usermanagement.scss';
function UserMasterModal(){
    return(
        <div>
        <div className="groupame">
        <Grid item xs={12} container direction="column" spacing={4}>
            <div>Group Name</div>
            <Labelbox type="text"/>
        </Grid>
        </div>
        <div className="groupbtn">
        <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel"  />
        <CustomButton btnName={"Create"} custombtnCSS="custom_cancel" btnCustomColor="customPrimary"/>
        </div>
    </div>
    )
}
export default UserMasterModal;