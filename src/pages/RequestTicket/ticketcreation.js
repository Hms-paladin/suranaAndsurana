import react from 'react';
import CustomButton from "../../component/Butttons/button";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import './ticketcreation.scss';


function TicketCreation() {
    return (
        <div >
            <div className="Titlediv">Recruitment Request Tickets</div>
            <div className="ticketContainer">
                <div className="ticketGrid">
                    <Grid item xs={12} container direction="row" spacing={1}>
                        <Grid item xs={3} >
                            <Labelbox type="select" placeholder="Department" />
                        </Grid>
                        <Grid item xs={3}>
                            <Labelbox type="select" placeholder="Designation" />
                        </Grid>
                    </Grid>
                </div>
                <div className="ticketGrid">
                    <Grid item xs={12} container direction="row" spacing={1}>
                        <Grid item xs={3} >
                            <Labelbox type="text" placeholder="No. of Positions" />
                        </Grid>
                        <Grid item xs={3} >
                            <Labelbox type="datepicker" placeholder="Required by" />
                        </Grid>
                        <Grid item xs={3} >
                            <Labelbox type="select" placeholder="Qualification" />
                        </Grid>
                        <Grid item xs={3} >
                        <Labelbox type="text" placeholder="Experience" />
                        </Grid>
                        <Grid item xs={3} >
                            <Labelbox type="select" placeholder="Language" />
                        </Grid>
                        <Grid item xs={3} >
                            <Labelbox type="select" placeholder="State" />
                        </Grid>
                        <Grid item xs={3} >
                            <Labelbox type="text" placeholder="Age Limit" />
                        </Grid>
                    </Grid>
                </div>
                <div className="ticketGrid">
                    <Grid item xs={12} container direction="column" spacing={1}>
                        <Grid item xs={3} >
                            <Labelbox type="select" placeholder="Skills" />
                        </Grid>
                        <Grid item xs={3} >
                            <Labelbox type="select" placeholder="Traits" />
                        </Grid>
                        <Grid item xs={3} >
                            <Labelbox type="select" placeholder="Certifications" />
                        </Grid>
                        <Grid item xs={3} >
                            <Labelbox type="select" placeholder="Specialization" />
                        </Grid>
                        <Grid item xs={3} >
                            <Labelbox type="select" placeholder="Capablities" />
                        </Grid>
                        <Grid item xs={3} >
                            <Labelbox type="select" placeholder="Talents" />
                        </Grid>
                    </Grid>
                </div>
                <div className="ticketbtn">
                <CustomButton btnName={"Save as Template"} btnCustomColor="customPrimary" custombtnCSS="btntemplate" />
                <CustomButton btnName={"Save"} custombtnCSS="custom_cancel" btnCustomColor="customPrimary" />
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" />
                </div>
                {/* <Grid item xs={12} container direction="row" justify="flex-end" spacing={1}>
                    <Grid item xs={4} >
                        <CustomButton btnName={"Save as template"} btnCustomColor="customPrimary" custombtnCSS="btntemplate" />
                    </Grid>
                    <Grid item xs={4} >
                        <CustomButton btnName={"Save"} custombtnCSS="custom_cancel" btnCustomColor="customPrimary" />
                    </Grid>
                    <Grid item xs={4} >
                        <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" />
                    </Grid>
                </Grid> */}
            </div >
        </div >
    )
}

export default TicketCreation;