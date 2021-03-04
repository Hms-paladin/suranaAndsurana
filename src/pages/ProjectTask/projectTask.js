import react, { useState } from 'react';
import './projectTask.scss'
import Grid from '@material-ui/core/Grid';
import { Radio } from 'antd';
import Labelbox from "../../helpers/labelbox/labelbox";
import { Button } from '@material-ui/core';
import EnhancedTable from "../../component/DynTable/table";
import CustomButton from '../../component/Butttons/button';
import DynModel from '../../component/Model/model';
import LabelBox from '../../helpers/labelbox/labelbox';



const headCells = [
    { id: 'projectType', label: 'Project Type' },
    { id: 'projectName', label: 'Project Name' },
    { id: 'clientType', label: 'Client Type' },
    { id: 'clientName', label: 'Client Name' },
    { id: 'billingType', label: 'Billing Type' },
    { id: 'reversed1', label: 'Reversed' },
    { id: 'reversed2', label: 'Reversed' },
    { id: 'reversed3', label: 'Reversed' },
    { id: 'reversed4', label: 'Reversed' }


];




function ProjectTask() {
    const [value, setValue] = useState(2);
    const [modelOpen, setModelOpen] = useState(false)
    const [taskModelOpen, setTaskModelOpen] = useState(false)


    const rows = [
        {  projectType: "Field 1", projectName: 'Field 2', clientType: "Field 3", clientName: "Field 4", billingType: "Fiedl 5", reversed1: "field 6", reversed2: "field 7", reversed3: "field 8", reversed4: "field 9" },
        {  projectType: "Field 2", projectName: 'Field 2', clientType: "Field 3", clientName: "Field 4", billingType: "Fiedl 5", reversed1: "field 6", reversed2: "field 7", reversed3: "field 8", reversed4: "field 9" },
        {  projectType: "Field 3", projectName: 'Field 2', clientType: "Field 3", clientName: "Field 4", billingType: "Fiedl 5", reversed1: "field 6", reversed2: "field 7", reversed3: "field 8", reversed4: "field 9" },
        {  projectType: "Field 1", projectName: 'Field 2', clientType: "Field 3", clientName: "Field 4", billingType: "Fiedl 5", reversed1: "field 6", reversed2: "field 7", reversed3: "field 8", reversed4: "field 9" },
        {  projectType: "Field 2", projectName: 'Field 2', clientType: "Field 3", clientName: "Field 4", billingType: "Fiedl 5", reversed1: "field 6", reversed2: "field 7", reversed3: "field 8", reversed4: "field 9" },
        {  projectType: "Field 3", projectName: 'Field 2', clientType: "Field 3", clientName: "Field 4", billingType: "Fiedl 5", reversed1: "field 6", reversed2: "field 7", reversed3: "field 8", reversed4: "field 9" },
    ];


    const onChange = e => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    }

    const modelContent = () => {
        return (
            <div >

                <div className="AdhocTask">
                    <Grid item xs={10} >
                        <LabelBox type="select"
                            placeholder={"Task Description"} />
                    </Grid>
                </div>
                <Grid container spacing={3}>
                    <Grid item xs={5} >
                        <Labelbox type="datepicker"
                            placeholder={"Start Date"}

                        />
                    </Grid>
                    <Grid item xs={5} >
                        <Labelbox type="datepicker"
                            placeholder={" End Date"}

                        />
                    </Grid>

                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={5} >
                        <Labelbox type="select"
                            placeholder={"Tag"} />
                    </Grid>

                    <Grid item xs={5} >
                        <Labelbox type="select"
                            placeholder={"Priority"} />
                    </Grid>


                </Grid>
                <div className="adhocModelButtons">
                    <CustomButton btnName={"CANCEL"}  custombtnCSS={"projectTaskGo"} />
                    <CustomButton btnName={"SAVE"} btnCustomColor="customPrimary" custombtnCSS={"projectTaskGo"} />

                </div>


            </div>
        )
    }

    const projectTaskModelContent = () => {
        return (
            <div className="projectTaskModel">

                <Grid item xs={12} className="projectTaskHeader" container justify="center" style={{ margin: "auto" }}>
                    <Grid item xs={12} container direction="row" justify="center" alignItems="center" spacing={1} className="projectTasktitle">
                        <Grid item xs={2} container justify="center" alignItems="center">Project type</Grid>
                        <Grid item xs={2} container justify="center" alignItems="center">Project Name</Grid>
                        <Grid item xs={2} container justify="center" alignItems="center">Client type</Grid>
                        <Grid item xs={2} container justify="center" alignItems="center">Client Name</Grid>
                        <Grid item xs={4} container justify="center" alignItems="center">Billing type</Grid>
                    </Grid>
                    <Grid item xs={12} container direction="row" justify="center" alignItems="center" spacing={1} className="projectTasdata">
                        <Grid item xs={2} container justify="center" alignItems="center">Project type</Grid>
                        <Grid item xs={2} container justify="center" alignItems="center">Project Name</Grid>
                        <Grid item xs={2} container justify="center" alignItems="center">Client type</Grid>
                        <Grid item xs={2} container justify="center" alignItems="center">Client Name</Grid>
                        <Grid item xs={4} container justify="center" alignItems="center">Billing type</Grid>
                    </Grid>

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

                    </Grid>
                </div>
                <div className="projectTaskDatealign">
                    <Grid container spacing={3}>
                        <Grid item xs={3} >
                            <Labelbox type="select"
                                placeholder={"Tag"} />
                        </Grid>

                        <Grid item xs={3} >
                            <Labelbox type="select"
                                placeholder={"Priority"} />
                        </Grid>
                        <Grid item xs={3} >
                            <Labelbox type="select"
                                placeholder={"Assign To"} />
                        </Grid>

                    </Grid>
                </div>
                <div className="projectTaskModelButtons">
                    <CustomButton btnName={"CANCEL"}  custombtnCSS={"projectTaskGo"} />
                    <CustomButton btnName={"SAVE"} btnCustomColor="customPrimary" custombtnCSS={"projectTaskGo"} />

                </div>



            </div>
        )

    }

    return (
        <div>
            <div className="radioBoxContainer">
                <Radio.Group onChange={onChange} value={value}>
                    <Radio value={1}>Resume</Radio>
                    <Radio value={2}>Project</Radio>
                    <Radio value={3}>HR</Radio>
                    <Radio value={4}>Label 4</Radio>
                    <Radio value={5}>Label 5</Radio>
                    <Radio value={6}>Label 6</Radio>
                </Radio.Group>
            </div>


            <div className="taskContainer">
                <Grid container spacing={2} justify="center">
                    <Grid item xs={2} >
                        <Labelbox type="select"
                            placeholder={"Client type"} />
                    </Grid>
                    <Grid item xs={2} >
                        <Labelbox type="select"
                            placeholder={"Client"} />
                    </Grid>
                    <Grid item xs={2} >
                        <Labelbox type="select"
                            placeholder={"Project type"} />
                    </Grid>
                    <Grid item xs={2} >
                        <Labelbox type="select"
                            placeholder={"Project Name"} />
                    </Grid>
                    <Grid item xs={2} >
                        <Labelbox type="select"
                            placeholder={"Billing type"} />
                    </Grid>
                    <Grid item xs={2} container justify="center">
                        <CustomButton btnName={"Go"} btnCustomColor="customPrimary" custombtnCSS={"projectTaskGo"} />
                    </Grid>


                </Grid>
            </div>


            <EnhancedTable headCells={headCells} rows={rows} />
            <div className="projectButtonContainer">

                {/* Adhoc Model */}

                <CustomButton btnName={"Create AddHoc Task"} btnCustomColor="customPrimary" onBtnClick={() => setModelOpen(true)} custombtnCSS={"projectTaskButtons"} />
                <DynModel modelTitle={"Adhoc Task"} handleChangeModel={modelOpen} handleChangeCloseModel={(bln) => setModelOpen(bln)} content={modelContent()} />

                {/* Project Task Model */}

                <CustomButton btnName={"Create Project Task"} btnCustomColor="customPrimary" onBtnClick={() => setTaskModelOpen(true)} custombtnCSS={"projectTaskButtons"} />
                <DynModel modelTitle={"Project Task"} handleChangeModel={taskModelOpen} handleChangeCloseModel={(bln) => setTaskModelOpen(bln)} content={projectTaskModelContent()} modalchanges="modalchangestask" />

            </div>

        </div>

    )
}
export default ProjectTask;


