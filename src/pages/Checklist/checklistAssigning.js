import react from "react";
import Labelbox from '../../helpers/labelbox/labelbox';
import CustomButton from '../../component/Butttons/button';
import Grid from "@material-ui/core/Grid";

import './checklists.scss'

function checkListAssign() {
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
                    <CustomButton btnName={"Save"} custombtnCSS="custombtn" btnCustomColor="customPrimary" />
                    <CustomButton btnName={"Cancel"} custombtnCSS="custombtn" />
                </div>

            </div>
        </div>
    )
}

export default checkListAssign;