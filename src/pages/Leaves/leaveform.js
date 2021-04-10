import react from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../helpers/labelbox/labelbox';
import CustomButton from '../../component/Butttons/button';
import EnhancedTable from '../../component/DynTable/table';
import Edit from "../../images/editable.svg";
import ValidationLibrary from "../../helpers/validationfunction";
import './leaveupdate.scss';

function LeaveForm() {
    return (
        <div>
            <div className="leaveMainHeader">Leave Form Screen</div>
            <div className="leaveFields">

                <Grid item xs={12} container direction="row" spacing={3}>
                    <Grid item xs={3}>
                        <div>Leave Type</div>
                        <div>
                            <Labelbox type="select"
                            // changeData={(data) =>
                            //     checkValidation(data, "timepickerfrom")
                            // }
                            // value={Leave_Update.timepickerfrom.value}
                            // error={Leave_Update.timepickerfrom.error}
                            // errmsg={Leave_Update.timepickerfrom.errmsg}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div>From Date</div>
                        <div>
                            <Labelbox type="datepicker"
                            // changeData={(data) =>
                            //     checkValidation(data, "timepickerto")
                            // }
                            // value={Leave_Update.timepickerto.value}
                            // error={Leave_Update.timepickerto.error}
                            // errmsg={Leave_Update.timepickerto.errmsg}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div>To Date</div>
                        <div>
                            <Labelbox type="datepicker"
                            // changeData={(data) =>
                            //     checkValidation(data, "timepickerto")
                            // }
                            // value={Leave_Update.timepickerto.value}
                            // error={Leave_Update.timepickerto.error}
                            // errmsg={Leave_Update.timepickerto.errmsg}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={3} container direction="row">
                        <Grid item xs={6}>

                            <div>Available balance</div>
                            <div>10 </div>
                        </Grid>
                        <Grid item xs={6}>

                            <div>No.of days</div>
                            <div>10 </div>
                        </Grid>
                    </Grid>
                    <Grid item xs={5}>
                        <div>Reason for leave</div>
                        <div className="reasonscmt">
                            <Labelbox type="textarea"
                            // changeData={(data) =>
                            //     checkValidation(data, "timepickerto")
                            // }
                            // value={Leave_Update.timepickerto.value}
                            // error={Leave_Update.timepickerto.error}
                            // errmsg={Leave_Update.timepickerto.errmsg}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={5}>
                        <div>Address</div>
                        <div className="reasonscmt">
                            <Labelbox type="textarea"
                            // changeData={(data) =>
                            //     checkValidation(data, "timepickerto")
                            // }
                            // value={Leave_Update.timepickerto.value}
                            // error={Leave_Update.timepickerto.error}
                            // errmsg={Leave_Update.timepickerto.errmsg}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={5}>
                        <div>Contact Person</div>
                        <div>
                            <Labelbox type="text"
                            // changeData={(data) =>
                            //     checkValidation(data, "timepickerto")
                            // }
                            // value={Leave_Update.timepickerto.value}
                            // error={Leave_Update.timepickerto.error}
                            // errmsg={Leave_Update.timepickerto.errmsg}
                            />
                        </div>
                    </Grid>
                </Grid>
            </div>

        </div>
    )
}
export default LeaveForm;
