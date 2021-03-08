import react, { useState } from 'react';
import './timesheets.scss';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../../helpers/labelbox/labelbox';
import CustomButton from '../../../component/Butttons/button';

function TimeSheetStartModel(props) {
    const [test, setTest] = useState(false)

    return (
        <div className="timeSheetStartContainer">
            <Grid item xs={12} container direction="row" spacing={3}>
                <Grid item xs={4} container direction="column" spacing={1}>
                    <Grid item xs={12}>IP Project</Grid>
                    <Grid item xs={12}>Operational</Grid>
                    <Grid item xs={12}>Priority</Grid>
                    {/* <Grid item xs={9}>
                        <Labelbox type="datepicker"
                            placeholder={" Deadline "}
                             />
                    </Grid> */}

                </Grid>
                <Grid item xs={4} container direction="column" spacing={1}>
                    <Grid item xs={12}>Project Name </Grid>
                    <Grid item xs={12}>First Cut Draft</Grid>
                    <Grid item xs={12}>Tag</Grid>

                </Grid>
                <Grid item xs={4} container direction="column" spacing={1}>
                    <Grid item xs={12}>Johnson & Johnson</Grid>
                    <Grid item xs={12}>Assign To</Grid>
                    <Grid item xs={12}>Description</Grid>

                </Grid>

            </Grid>
            <div className="timeSheetDatesFormat">
                <Grid item xs={12} container direction="row" spacing={5}>

                    <Grid item xs={5} container direction="row" justify="center" spacing={4}>
                        <Grid item xs={6}>(5-Mar-2021)</Grid>
                        <Grid item xs={6}>3.20 PM</Grid>

                    </Grid>
                    <Grid item xs={7} container direction="row" spacing={5}>

                        <Grid item xs={6}>
                            <Labelbox type="datepicker"
                                placeholder={" Deadline "}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Labelbox type="timepicker"
                                placeholder={" Deadline "}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <div className="customiseButton">
                <CustomButton btnName={"CANCEL"} custombtnCSS="timeSheetButtons" />
                <CustomButton btnName={"STOP"} btnCustomColor="customPrimary" custombtnCSS="timeSheetButtons" />

            </div>

        </div>

    )
}
export default TimeSheetStartModel;