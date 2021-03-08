import react from 'react';
import './projectFormcreate.scss';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../../helpers/labelbox/labelbox";
import CustomButton from "../../../component/Butttons/button";



function projectFormCreate() {
    return (
        <div>
            <Grid item xs={12} className="projectFormTitle">Project Form</Grid>
            <div className="projectFormContent">
                <Grid item xs={12} container direction="row" justify="center" spacing={7}>
                    <Grid item xs={6} container direction="column" spacing={2}>
                        <Grid item xs={12} >
                            <Labelbox type="select"
                                placeholder={"Client"}


                            />
                        </Grid>
                        <Grid item xs={12} >
                            <Labelbox type="select"
                                placeholder={"Project Type "}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Labelbox type="select"
                                placeholder={"Process Type "}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Labelbox type="select"
                                placeholder={"Billable Type "}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Labelbox type="select"
                                placeholder={"Counsel"}
                            />
                        </Grid>


                    </Grid>
                    <Grid item xs={6} container direction="column" spacing={2} >
                        <Grid item xs={12}>
                            <Labelbox type="text"
                                placeholder={"Project Name "}


                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Labelbox type="select"
                                placeholder={"Project Sub Type "}


                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Labelbox type="select"
                                placeholder={"Filling Type "}


                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Labelbox type="select"
                                placeholder={"HOD/Attorney "}


                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Labelbox type="textarea"
                                placeholder={"Comments"}
                            />
                        </Grid>


                    </Grid>

                </Grid>


            </div>
            <div className="customFormbtn">
                <CustomButton btnName={"SAVE "} btnCustomColor="customPrimary" custombtnCSS={"btnProjectForm"} />
                <CustomButton btnName={"CANCEL "} custombtnCSS={"btnProjectForm"} />

            </div>
        </div>
    )
}
export default projectFormCreate;