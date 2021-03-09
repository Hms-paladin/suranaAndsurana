import react from 'react';
import './projectModel.scss';
import Labelbox from "../../../helpers/labelbox/labelbox";
import Grid from '@material-ui/core/Grid';
import CustomButton from '../../../component/Butttons/button';


function ProjectTaskModel() {
    return (
        <div className="projectTaskModel">

            <Grid item xs={12} container direction="row" justify="center" alignItems="center" spacing={1} className="projectTasktitle">
                <Grid item xs={4} container justify="center" alignItems="center"> IP Project</Grid>
                <Grid item xs={4} container justify="center" alignItems="center">Project Name</Grid>
                <Grid item xs={4} container justify="center" alignItems="center">Johnson & Johnson</Grid>

            </Grid>

            <div className="activityTask">
                <Grid item xs={7} >
                    <Labelbox type="select"
                        placeholder={"Activity"} />
                </Grid>
            </div>
            <div className="activityTask">
                <Grid item xs={7} >
                    <Labelbox type="select"
                        placeholder={"Sub Activity"} />
                </Grid>
            </div>
            <div className="projectTaskDatealign">
                <Grid container spacing={3}>
                    <Grid item xs={4} >
                        <Labelbox type="datepicker"
                            placeholder={"Start Date"}

                        />
                    </Grid>
                    <Grid item xs={4} >
                        <Labelbox type="datepicker"
                            placeholder={" End Date"}

                        />
                    </Grid>
                    <Grid item xs={4} >
                        <Labelbox type="select"
                            placeholder={"Assign To"} />
                    </Grid>

                </Grid>
            </div>
            <div className="projectTaskDatealign">
                <Grid container spacing={3}>
                    <Grid item xs={7}>
                        <Labelbox type="textarea"
                            placeholder={"Description"} />
                    </Grid>

                    <Grid item xs={5} >
                        <Grid item xs={12} >
                            <Labelbox type="select"
                                placeholder={"Tag"} />
                        </Grid>

                        <Grid item xs={12} >
                            <Labelbox type="select"
                                placeholder={"Priority"} />
                        </Grid>

                    </Grid>
                </Grid>
            </div>
            <div className="projectTaskModelButtons">
                <CustomButton btnName={"CANCEL"} custombtnCSS={"projectTaskGo"} />
                <CustomButton btnName={"SAVE"} btnCustomColor="customPrimary" custombtnCSS={"projectTaskGo"} />

            </div>



        </div>
    )
}

export default ProjectTaskModel;