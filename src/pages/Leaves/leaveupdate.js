import react from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../helpers/labelbox/labelbox';
import CustomButton from '../../component/Butttons/button';
import './leaveupdate.scss';

function LeaveUpdate(){
    return(
        <div>
            <div className="leaveMainHeader">Leave Balance Update</div>
            <div className="leaveFields">
                <Grid item xs={12} container direction="row" spacing={3}>
                    <Grid item xs={3}>
                        <div>From</div>
                        <div>
                            <Labelbox type="datepicker" />
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div>To</div>
                        <div>
                            <Labelbox type="datepicker" />
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div>Employee Id</div>
                        <div>
                            <Labelbox type="text" />
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div>Name</div>
                        <div>
                            Rajesh
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div>Leave type</div>
                        <div>
                            <Labelbox type="timepicker" />
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div>Add No.of Days</div>
                        <div>
                            <Labelbox type="text" />
                        </div>
                    </Grid>


                </Grid>

            </div>
        </div>
    )
}
export default LeaveUpdate;