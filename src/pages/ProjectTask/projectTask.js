import react, { useState } from 'react';
import './projectTask.scss'
import Grid from '@material-ui/core/Grid';
import { Radio } from 'antd';
import Labelbox from "../../helpers/labelbox/labelbox";
import { Button } from '@material-ui/core';
import EnhancedTable from "../../component/DynTable/table";
import CustomButton from '../../component/Butttons/button'
import DynModel from '../../component/Model/model';
import LabelBox from '../../helpers/labelbox/labelbox';



const headCells = [
    { id: 'projectType', label: 'ProjectType' },
    { id: 'projectName', label: 'ProjectName' },
    { id: 'clientType', label: 'ClientType' },
    { id: 'clientName', label: 'ClientName' },
    { id: 'billingType', label: 'BillingType' },
    { id: 'reversed1', label: 'Reversed' },
    { id: 'reversed2', label: 'Reversed' },
    { id: 'reversed3', label: 'Reversed' },
    { id: 'reversed4', label: 'Reversed' }


];




function ProjectTask() {
    const [value, setValue] = useState(2);
    const [modelOpen, setModelOpen] = useState(false)


    const rows = [
        { projectType: "Field 1", projectName: 'Field 2', clientType: "Field 3", clientName: "Field 4", billingType: "Fiedl 5", reversed1: "field 6", reversed2: "field 7", reversed3: "field 8", reversed4: "field 9" },
        { projectType: "Field 2", projectName: 'Field 2', clientType: "Field 3", clientName: "Field 4", billingType: "Fiedl 5", reversed1: "field 6", reversed2: "field 7", reversed3: "field 8", reversed4: "field 9" },
        { projectType: "Field 3", projectName: 'Field 2', clientType: "Field 3", clientName: "Field 4", billingType: "Fiedl 5", reversed1: "field 6", reversed2: "field 7", reversed3: "field 8", reversed4: "field 9" },
        { projectType: "Field 1", projectName: 'Field 2', clientType: "Field 3", clientName: "Field 4", billingType: "Fiedl 5", reversed1: "field 6", reversed2: "field 7", reversed3: "field 8", reversed4: "field 9" },
        { projectType: "Field 2", projectName: 'Field 2', clientType: "Field 3", clientName: "Field 4", billingType: "Fiedl 5", reversed1: "field 6", reversed2: "field 7", reversed3: "field 8", reversed4: "field 9" },
        { projectType: "Field 3", projectName: 'Field 2', clientType: "Field 3", clientName: "Field 4", billingType: "Fiedl 5", reversed1: "field 6", reversed2: "field 7", reversed3: "field 8", reversed4: "field 9" },
    ];


    const onChange = e => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    }

    const modelContent = () =>{
        return(
            <>
            <Grid item xs={10} >
                <LabelBox type="select"
                    placeholder={"Task Description"} />
            </Grid>
            <Grid item xs={10}>
                <Grid item xs={5} >
                    <LabelBox type="datepicker"
                        placeholder={"Task Description"} />
                </Grid>
                <Grid item xs={5} >
                    <LabelBox type="datepicker"
                        placeholder={"Task Description"} />
                </Grid>

            </Grid>
            <Grid item xs={10}>
                <Grid item xs={5} >
                    <LabelBox type="select"
                        placeholder={"Task Description"} />
                </Grid>
                <Grid item xs={5} >
                    <LabelBox type="select"
                        placeholder={"Task Description"} />
                </Grid>

            </Grid>
            <Grid item xs={10}>
                <Grid item xs={5} >
                    <button>cancel</button>
                </Grid>
                <Grid item xs={5} >
                    <button>cancel</button>

                </Grid>

            </Grid>
            </>
        )
    }

    return (
        <div>
            <div className="searchflex1">
                <Radio.Group onChange={onChange} value={value}>
                    <Radio value={1}>Resume</Radio>
                    <Radio value={2}>Project</Radio>
                    <Radio value={3}>HR</Radio>
                    <Radio value={4}>Label 4</Radio>
                    <Radio value={5}>Label 5</Radio>
                    <Radio value={6}>Label 6</Radio>

                </Radio.Group>
            </div>

            <Grid item xs={11} style={{ margin: "auto" }}>
                <div className="taskContainer">
                    <Grid item xs={12} container direction="row" justify="center" alignItems="center" spacing={1}  >
                        <Grid item xs={2} >
                            <Labelbox type="select"
                                placeholder={"Client type"} />
                        </Grid>
                        <Grid item xs={2} >
                            <Labelbox type="select"
                                placeholder={"Client type"} />
                        </Grid>
                        <Grid item xs={2} >
                            <Labelbox type="select"
                                placeholder={"Client type"} />
                        </Grid>
                        <Grid item xs={2} >
                            <Labelbox type="select"
                                placeholder={"Client type"} />
                        </Grid>
                        <Grid item xs={2} >
                            <Labelbox type="select"
                                placeholder={"Client type"} />
                        </Grid>
                        <Grid item xs={2} >
                            <Button>go</Button>
                        </Grid>


                    </Grid>
                </div>
            </Grid>

            <EnhancedTable headCells={headCells} rows={rows} />
            <div className="projectButtonContainer">
                <CustomButton btnName={"Create AddHoc Task"} btnCustomColor="customPrimary" custombtnCSS={"projectTaskButtons"} />
                <CustomButton btnName={"Create Project Task"} btnCustomColor="customPrimary" onBtnClick={() => setModelOpen(true)} />
                <DynModel modelTitle={"Adhoc Task"} handleChangeModel={modelOpen} handleChangeCloseModel={(bln) => setModelOpen(bln)} content={modelContent()} >

                    welcome
                </DynModel>
            </div>

        </div>

    )
}
export default ProjectTask;



  // <div>
        //     <Grid item xs={10} style={{ margin: "auto" }}>
        //         <Grid item xs={12} className="projectTaskHeader" container justify="center" style={{ margin: "auto" }}>
        //             <Grid item xs={12} container direction="row" justify="center" alignItems="center" spacing={1} className="projectTasktitle">
        //                 <Grid item xs={2} container justify="center" alignItems="center">Project type</Grid>
        //                 <Grid item xs={2} container justify="center" alignItems="center">Project Name</Grid>
        //                 <Grid item xs={2} container justify="center" alignItems="center">Client type</Grid>
        //                 <Grid item xs={2} container justify="center" alignItems="center">Client Name</Grid>
        //                 <Grid item xs={4} container justify="center" alignItems="center">Billing type</Grid>
        //             </Grid>
        //             <Grid item xs={12} container direction="row" justify="center" alignItems="center" spacing={1} className="projectTasdata">
        //                 <Grid item xs={2} container justify="center" alignItems="center">Project type</Grid>
        //                 <Grid item xs={2} container justify="center" alignItems="center">Project Name</Grid>
        //                 <Grid item xs={2} container justify="center" alignItems="center">Client type</Grid>
        //                 <Grid item xs={2} container justify="center" alignItems="center">Client Name</Grid>
        //                 <Grid item xs={4} container justify="center" alignItems="center">Billing type</Grid>
        //             </Grid>

        //         </Grid>
        //         <Grid item xs={8} >
        //             <Labelbox type="select"
        //                 placeholder={"Activity"} />
        //         </Grid>
        //         <Grid item xs={8} >
        //             <Labelbox type="select"
        //                 placeholder={"Sub Activity"} />
        //         </Grid>
        //         <Grid item xs={4} >
        //             <Labelbox type="datepicker"
        //                 placeholder={"Date of Birth"}

        //             />
        //         </Grid>
        //         <Grid item xs={4} >
        //             <Labelbox type="datepicker"
        //                 placeholder={"Date of Birth"}

        //             />
        //         </Grid>
        //         <Grid item xs={3} >
        //             <Labelbox type="select"
        //                 placeholder={"Activity"} />
        //         </Grid>
        //         <Grid item xs={3} >
        //             <Labelbox type="select"
        //                 placeholder={"Activity"} />
        //         </Grid>
        //         <Grid item xs={3} >
        //             <Labelbox type="select"
        //                 placeholder={"Activity"} />
        //         </Grid>




        //     </Grid>

        // </div>