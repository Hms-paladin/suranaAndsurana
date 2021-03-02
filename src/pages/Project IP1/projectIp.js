import react from 'react';
import './projectIp.scss';
import Grid from '@material-ui/core/Grid';
import Tabs from '../../component/Tabs/tabs';
import Labelbox from "../../helpers/labelbox/labelbox";
import { TableContainer } from '@material-ui/core';
import CustomButton from '../../component/Butttons/button';



function ProjectIp() {

    const TableContainer = () => {
        return (
            <div className="tradeMarkContainer">
               
                    <Grid item xs={12} container direction="row" spacing={1} >
                        <Grid item xs={4} container direction="column" spacing={2} className="projectIp" >
                            <Grid item xs={12} container direction="row" spacing={1}>
                                <Grid item xs={4} >
                                    <Labelbox type="select"
                                        placeholder={" Status"} />
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        placeholder={" Mark"} />
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        placeholder={" Project Type"} />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} >
                                <Labelbox type="text"
                                    placeholder={" Goods and Description"} />
                            </Grid>
                            <Grid item xs={12} >
                                <Labelbox type="text"
                                    placeholder={" Internal Status"} />
                            </Grid>
                            <Grid item xs={12} >
                                <Labelbox type="text"
                                    placeholder={" Amendment"} />
                            </Grid>
                            <Grid item xs={12} >
                                <Labelbox type="text"
                                    placeholder={" Priority Details"} />
                            </Grid>
                            <Grid item xs={12} >
                                <Labelbox type="select"
                                    placeholder={" POA"} />
                            </Grid>
                            
                        </Grid>
                        <Grid item xs={4} container direction="column" spacing={2}>
                            <Grid item xs={12} container direction="row" spacing={1}>
                                <Grid item xs={6} >
                                    <Labelbox type="text"
                                        placeholder={" Application Number "} />
                                </Grid>
                                <Grid item xs={6} >
                                    <Labelbox type="datepicker"
                                        placeholder={" Application Date "} />
                                </Grid>

                            </Grid>
                            <Grid item xs={12} container direction="row" spacing={1}>
                                <Grid item xs={6} >
                                    <Labelbox type="select"
                                        placeholder={" Usage Details "} />
                                </Grid>
                                <Grid item xs={6} >
                                    <Labelbox type="datepicker"
                                        placeholder={" Used From Date "} />
                                </Grid>

                            </Grid>

                            <Grid item xs={12} >
                                <Labelbox type="text"
                                    placeholder={" Allotment"} />
                            </Grid>
                            <Grid item xs={12} >
                                <Labelbox type="text"
                                    placeholder={" Order"} />
                            </Grid>
                            <Grid item xs={12} container direction="row" spacing={1}>
                                <Grid item xs={6} >
                                    <Labelbox type="text"
                                        placeholder={" Usage Details "} />
                                </Grid>
                                <Grid item xs={6} >
                                    <Labelbox type="datepicker"
                                        placeholder={" Used From Date "} />
                                </Grid>

                            </Grid>
                            <Grid item xs={12} >
                                <Labelbox type="datepicker"
                                    placeholder={" Certificate Date"} />
                            </Grid>
                            <Grid item xs={12} container justify="center" >
                                <CustomButton btnName={"save"} btnCustomColor="customPrimary" />
                                <CustomButton btnName={"cancel"} />

                            </Grid>

                        </Grid>

                        <Grid item xs={4} container direction="column" spacing={2}>

                            <Grid item xs={12} >
                                <Labelbox type="select"
                                    placeholder={" Class"} />
                            </Grid>
                            <Grid item xs={12} >
                                <Labelbox type="text"
                                    placeholder={" coments"} />
                            </Grid>
                            <Grid item xs={12} >
                                <Labelbox type="text"
                                    placeholder={" IP India Status"} />
                            </Grid>
                            <Grid item xs={12} >
                                <Labelbox type="text"
                                    placeholder={" Restrictions"} />
                            </Grid>
                            <Grid item xs={12} >
                                <Labelbox type="text"
                                    placeholder={" Restrictions"} />
                            </Grid>
                            <Grid item xs={12} >
                                <Labelbox type="text"
                                    placeholder={" Restrictions"} />
                            </Grid>
                            <Grid item xs={12} >
                            <Labelbox type="text"
                                placeholder={" Next Renewal Date"} />
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
                            placeholder={"client Name *"}

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
                        placeholder={"Project Sub type *"}

                    />
                </Grid>
                <Grid item xs={3}>
                    <Labelbox type="select"
                        placeholder={"Application"}

                    />
                </Grid>
                <Grid item xs={3} >
                    <Labelbox type="select"
                        placeholder={"India Filling"} />
                </Grid>
                <Grid item xs={3} >
                    <Labelbox type="select"
                        placeholder={" Billable Type *"} />
                </Grid>


            </Grid>
            <Grid item xs={12} container spacing={4}>
                <Grid item xs={3}>
                    <Labelbox type="select"
                        placeholder={"Project Sub type *"}

                    />
                </Grid>
                <Grid item xs={3}>
                    <Labelbox type="select"
                        placeholder={"Application"}

                    />
                </Grid>
                <Grid item xs={6}>
                    <Labelbox type="textarea"
                        placeholder={"Application"}
                        rows={4}
                    />
                </Grid>



            </Grid>
            <Tabs tabHeading="Intellectual Property" tabContent={<Tabs className="tabs" tabHeading="Trade Mark" tabContent={TableContainer()} keys={1} />} >



            </Tabs>

        </div>
    )
}
export default ProjectIp;