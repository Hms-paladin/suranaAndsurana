import react from 'react';
import './projectIp2.scss';
import Grid from '@material-ui/core/Grid';
import Tabs from '../../component/Tabs/tabs';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from '../../component/Butttons/button';


function ProjectIp2() {

    const projectInternationalContent = () => {
        return (
            <div className="tradeMarkContainer">
                <Grid item xs={12} container direction="row" spacing={1} >
                    <Grid item xs={4} container direction="column" spacing={2}  >
                        <Grid item xs={12} >
                            <Labelbox type="select"
                                placeholder={" Status"} />
                        </Grid>

                        <Grid item xs={12} >
                            <Labelbox type="select"
                                placeholder={" Our Refernce"} />
                        </Grid>
                        <Grid item xs={12} >
                            <Labelbox type="text"
                                placeholder={" Internal Status"} />
                        </Grid>
                        <Grid item xs={12} >
                            <Labelbox type="datepicker"
                                placeholder={" Amendment"} />
                        </Grid>
                        <Grid item xs={12} >
                            <Labelbox type="text"
                                placeholder={" Allotment"} />
                        </Grid>


                    </Grid>
                    <Grid item xs={4} container direction="column" spacing={2}>
                        

                        <Grid item xs={12} >
                            <Labelbox type="select"
                                placeholder={" Certificate Date"} />
                        </Grid>
                        <Grid item xs={12} >
                            <Labelbox type="select"
                                placeholder={" Class"} />
                        </Grid>
                        <Grid item xs={12} >
                            <Labelbox type="text"
                                placeholder={" Class"} />
                        </Grid>
                        <Grid item xs={12} >
                            <Labelbox type="select"
                                placeholder={" Class"} />
                        </Grid>
                        <Grid item xs={12} >
                            <Labelbox type="text"
                                placeholder={" Class"} />
                        </Grid>



                    </Grid>

                    <Grid item xs={4} container direction="column" spacing={2}>

                        <Grid item xs={12} >
                            <Labelbox type="select"
                                placeholder={" Class"} />
                        </Grid>
                        <Grid item xs={12} >
                            <Labelbox type="text"
                                placeholder={" Class"} />
                        </Grid>
                        <Grid item xs={12} >
                            <Labelbox type="text"
                                placeholder={" Class"} />
                        </Grid>
                        <Grid item xs={12} >
                            <Labelbox type="text"
                                placeholder={" Class"} />
                        </Grid>
                        <Grid item xs={12} container justify="center">
                        <CustomButton btnName={"save"} btnCustomColor="customPrimary" />
                                <CustomButton btnName={"cancel"} />

                        </Grid>


                    </Grid>



                </Grid>

            </div>
        )
    }
    return (
        <div>
            <Grid item xs={12} container spacing={4} >
                <Grid item xs={9} container spacing={4} >
                    <Grid item xs={6}>
                        <Labelbox type="text"
                            placeholder={"Project Name *"}

                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Labelbox type="text"
                            placeholder={"Company Name*"}

                        />
                    </Grid>
                </Grid>

                <Grid item xs={3}  >
                    <Grid item xs={12} >
                        <Labelbox type="select"
                            placeholder={" Project Type"} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} container spacing={4}>
                <Grid item xs={3}>
                    <Labelbox type="select"
                        placeholder={"Project  Sub Type *"}

                    />
                </Grid>
                <Grid item xs={3}>
                    <Labelbox type="select"
                        placeholder={"Application"}

                    />
                </Grid>
                <Grid item xs={3} >
                    <Labelbox type="select"
                        placeholder={"International Filing "} />
                </Grid>
                <Grid item xs={3} >
                    <Labelbox type="select"
                        placeholder={" Billable Type *"} />
                </Grid>


            </Grid>
            <Grid item xs={12} container spacing={4}>
                <Grid item xs={3}>
                    <Labelbox type="select"
                        placeholder={"HOD /Attorney"}

                    />
                </Grid>
                <Grid item xs={3}>
                    <Labelbox type="text"
                        placeholder={"Counsel"}

                    />
                </Grid>
                <Grid item xs={6}>
                    <Labelbox type="textarea"
                        placeholder={"Comments"}
                        rows={4}
                    />
                </Grid>
            </Grid>
            <Tabs tabHeading="Intellectual Property" tabContent={<Tabs className="tabs" tabHeading="Trade Mark" tabContent={projectInternationalContent()} keys={1} />} >



            </Tabs>
        </div>
    )
}

export default ProjectIp2;