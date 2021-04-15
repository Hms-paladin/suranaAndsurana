import react, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../helpers/labelbox/labelbox';
import CustomButton from '../../component/Butttons/button';
import { Checkbox } from 'antd'
import './severance.scss';

function ResignationApproveval(props) {
    const [modeltitles, setModeltitles] = useState()

    useEffect(() => {
        setModeltitles(props.modelTitles)

    }, [props.modelTitles])


    return (
        <div>
            <div className="severancemodelsContainer">
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
                {modeltitles === "Resignation Approval" &&
                    <div>
                        <div>Date of Resignation</div>
                        <div className="severanceData">22-May-2021</div>
                    </div>
                }
                {(modeltitles === "HR Noc" || modeltitles === "IT Noc" || modeltitles === "Admin Noc") &&
                    <div>
                        <div>Noc</div>
                        <div><Checkbox /></div>
                    </div>}
            </div>



            { modeltitles === "Resignation Approval" && <div className="ResigContent">
                <Grid item xs={12} container direction="row" spacing={3}>

                    <Grid item xs={6}>
                        <div className="appraisalFieldheading"> Resignation accepted on</div>
                        <div>
                            <Labelbox type="datepicker" />
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="appraisalFieldheading"> Proposed date of relieving</div>
                        <div>
                            <Labelbox type="datepicker" />
                        </div>
                    </Grid>
                </Grid>
                <div className="appraisalBtn">
                    <CustomButton btnName={"Reject"} btnCustomColor="customPrimary" custombtnCSS="custom_save" />
                    <CustomButton btnName={"Approve"} btnCustomColor="customPrimary" custombtnCSS="custom_save" />
                </div>

            </div>}
            {(modeltitles === "HR Noc" || modeltitles === "IT Noc" || modeltitles === "Admin Noc") && <div className="appraisalBtn">
                <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save" />
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_save" />
            </div>}


            { modeltitles === "Final Relieving" &&
                <>
                    <div className="severancemodelsContainer">
                        <div>
                            <div>Date of resignation</div>
                            <div className="severanceData">12-May-2021</div>
                        </div>
                        <div>
                            <div>Resignation accepted on</div>
                            <div className="severanceData">12-May-2021</div>
                        </div>
                        <div>
                            <div>Proposed date for relieving</div>
                            <div className="severanceData">12-May-2021</div>
                        </div>
                    </div>
                    <div className="severancemodelsContainer">
                        <div>
                            <div>IT Date of NOC</div>
                            <div className="severanceData">12-May-2021</div>
                        </div>
                        <div>
                            <div>HR Date of NOC</div>
                            <div className="severanceData">12-May-2021</div>
                        </div>
                        <div>
                            <div>HR Date of NOC</div>
                            <div className="severanceData">12-May-2021</div>
                        </div>
                    </div>

                    <div className="finalmodeldate">
                        <div className="appraisalFieldheading"> Actual Date of relieving</div>
                        <div>
                            <Labelbox type="datepicker" />
                        </div>
                    </div>

                    <div className="appraisalBtn">

                        <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save" />
                        <CustomButton btnName={"Cancel"} custombtnCSS="custom_save" />
                    </div>

                </>
            }


        </div >
    )
}

export default ResignationApproveval;