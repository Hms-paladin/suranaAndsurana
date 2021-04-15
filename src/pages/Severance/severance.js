import react, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../helpers/labelbox/labelbox';
import CustomButton from '../../component/Butttons/button';
import './severance.scss';

function Severance() {
    return (
        <div>
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
                            <div className="appraisalFieldheading"> Area of Developement</div>
                            <div>
                                <Labelbox type="select"
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
                                <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save" />
                                <CustomButton btnName={"Cancel"} custombtnCSS="custom_save" />
                            </div>

                        </Grid>
                    </Grid>

                </div>
            </div>

        </div>
    )
}

export default Severance;
