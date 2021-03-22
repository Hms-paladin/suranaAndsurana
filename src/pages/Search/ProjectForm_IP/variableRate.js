import react from 'react';
import './projectFormcreate.scss';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../../helpers/labelbox/labelbox";
import CustomButton from "../../../component/Butttons/button";

function VariableRate() {
    return (
        <div className="VariablerateContainer">
            <div className="variablerateTitle">Project Namel - Variable Rate</div>
            <div className="variableRateFields">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={4} >
                        <Labelbox type="select"
                            placeholder={"Activity"}
                        />
                    </Grid>
                    <Grid item xs={4} >
                        <Labelbox type="select"
                            placeholder={"Sub Activity"}
                        />
                    </Grid>
                    <Grid item xs={4} >
                        <Labelbox type="select"
                            placeholder={"Range of Project Cost"}
                        />
                    </Grid>
                    <Grid item xs={4} >
                        <Labelbox type="select"
                            placeholder={"court"}
                        />
                    </Grid>
                    <Grid item xs={4} >
                        <Labelbox type="text"
                            placeholder={"Lower Limit"}
                        />
                    </Grid>
                    <Grid item xs={4} >
                        <Labelbox type="text"
                            placeholder={" Upper Limit"}
                        />
                    </Grid>
                    <Grid item xs={4} >
                        <Labelbox type="select"
                            placeholder={"Unit of Measurement"}
                        />
                    </Grid>
                    <Grid item xs={4} >
                        <Labelbox type="select"
                            placeholder={"Designation"}
                        />
                    </Grid>
                    <Grid item xs={4} >
                        <Labelbox type="number"
                            placeholder={" Amount"}
                        />
                    </Grid>
                    

                </Grid>
            </div>
        </div>
    )
}

export default VariableRate;