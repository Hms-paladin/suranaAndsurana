import react, { useState, useEffect } from "react";
import './projectTask.scss'
import Grid from '@material-ui/core/Grid';
import { Radio } from 'antd';
import Labelbox from "../../helpers/labelbox/labelbox";
import { Button, Checkbox } from '@material-ui/core';
import EnhancedTable from "../../component/DynTable/table";
import CustomButton from '../../component/Butttons/button';
import DynModel from '../../component/Model/model';
import LabelBox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from "../../helpers/validationfunction";
import { connect, useDispatch } from "react-redux";
import { getActivity } from "../../actions/projectTaskAction";


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
    const dispatch = useDispatch();
    const [value, setValue] = useState(2);
    const [modelOpen, setModelOpen] = useState(false)
    const [taskModelOpen, setTaskModelOpen] = useState(false)

    const [resumeGetList, setGetList] = useState({})

    const [adhoc_Form, setadhoc_Form] = useState({
        task_description: {
            value: "",
            validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
            error: null,
            errmsg: null,
        },
        start_date: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        end_date: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        tag: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        assigned_task: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },

    })

    useEffect(() => {
        dispatch(getActivity());
    }, []);

    function checkValidation(data, key, multipleId) {

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            adhoc_Form[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: adhoc_Form[key].validation
        }

        // only for multi select (start)

        let multipleIdList = []

        if (multipleId) {
            multipleId.map((item) => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i] === item.value) {
                        multipleIdList.push(item.id)
                    }
                }
            })
            dynObj.valueById = multipleIdList.toString()
        }
        // (end)

        setadhoc_Form(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));
        // var filtererr = targetkeys.filter(
        //     (obj) =>
        //         adhoc_Form[obj].error == true ||
        //         adhoc_Form[obj].error == null
        // );
        // if (filtererr.length > 0) {
        //     setadhoc_Form({ error: true, errordummy: false });
        // } else {
        //     setadhoc_Form({ error: false });
        // }
    };

    function adhocSubmit() {
        var mainvalue = {};
        var targetkeys = Object.keys(adhoc_Form);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                adhoc_Form[targetkeys[i]].value,
                adhoc_Form[targetkeys[i]].validation
            );
            adhoc_Form[targetkeys[i]].error = !errorcheck.state;
            adhoc_Form[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = adhoc_Form[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter(
            (obj) => adhoc_Form[obj].error == true
        );

        if (filtererr.length > 0) {
            // setadhoc_Form({ error: true });
        } else {
            // setadhoc_Form({ error: false });

        }

        setadhoc_Form(prevState => ({
            ...prevState
        }));
    };





    const [createproject_Form, setcreateproject_Form] = useState({
        task_description: {
            value: "",
            validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
            error: null,
            errmsg: null,
        },
        start_date_pro: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        end_date_pro: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        assigned_to: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        description: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        priorty: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        tag_pro: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        activity: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        sub_activity: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },

    })

    function checkValidation(data, key, multipleId) {

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            createproject_Form[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: createproject_Form[key].validation
        }

        // only for multi select (start)

        let multipleIdList = []

        if (multipleId) {
            multipleId.map((item) => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i] === item.value) {
                        multipleIdList.push(item.id)
                    }
                }
            })
            dynObj.valueById = multipleIdList.toString()
        }
        // (end)

        setcreateproject_Form(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));
        // var filtererr = targetkeys.filter(
        //     (obj) =>
        //         createproject_Form[obj].error == true ||
        //         createproject_Form[obj].error == null
        // );
        // if (filtererr.length > 0) {
        //     setcreateproject_Form({ error: true, errordummy: false });
        // } else {
        //     setcreateproject_Form({ error: false });
        // }
    };

    function ProjectSubmit() {
        var mainvalue = {};
        var targetkeys = Object.keys(createproject_Form);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                createproject_Form[targetkeys[i]].value,
                createproject_Form[targetkeys[i]].validation
            );
            createproject_Form[targetkeys[i]].error = !errorcheck.state;
            createproject_Form[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = createproject_Form[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter(
            (obj) => createproject_Form[obj].error == true
        );

        if (filtererr.length > 0) {
            // setcreateproject_Form({ error: true });
        } else {
            // setcreateproject_Form({ error: false });

        }

        setcreateproject_Form(prevState => ({
            ...prevState
        }));
    };


    const rows = [
        { projectType: "Field 1", projectName: 'Field 2', clientType: "Field 3", clientName: "Field 4", billingType: "Fiedl 5", reversed1: "field 6", reversed2: "field 7", reversed3: "field 8", reversed4: "field 9" },
        { projectType: "Field 2", projectName: 'Field 2', clientType: "Field 3", clientName: "Field 4", billingType: "Fiedl 5", reversed1: "field 6", reversed2: "field 7", reversed3: "field 8", reversed4: "field 9" },
        { projectType: "Field 3", projectName: 'Field 2', clientType: "Field 3", clientName: "Field 4", billingType: "Fiedl 5", reversed1: "field 6", reversed2: "field 7", reversed3: "field 8", reversed4: "field 9" },
        { projectType: "Field 1", projectName: 'Field 2', clientType: "Field 3", clientName: "Field 4", billingType: "Fiedl 5", reversed1: "field 6", reversed2: "field 7", reversed3: "field 8", reversed4: "field 9" },
        { projectType: "Field 2", projectName: 'Field 2', clientType: "Field 3", clientName: "Field 4", billingType: "Fiedl 5", reversed1: "field 6", reversed2: "field 7", reversed3: "field 8", reversed4: "field 9" },
        { projectType: "Field 3", projectName: 'Field 2', clientType: "Field 3", clientName: "Field 4", billingType: "Fiedl 5", reversed1: "field 6", reversed2: "field 7", reversed3: "field 8", reversed4: "field 9" },
    ];


    const onChange = e => {

        setValue(e.target.value);
    }

    const modelContent = () => {
        return (
            "test"
        )
    }

    // const projectTaskModelContent = () => {
    //     return (
    //         <div className="projectTaskModel">

    //             <Grid item xs={12} className="projectTaskHeader" container justify="center" style={{ margin: "auto" }}>
    //                 <Grid item xs={12} container direction="row" justify="center" alignItems="center" spacing={1} className="projectTasktitle">
    //                     <Grid item xs={4} container justify="center" alignItems="center"> IP Project</Grid>
    //                     <Grid item xs={4} container justify="center" alignItems="center">Project Name</Grid>
    //                     <Grid item xs={4} container justify="center" alignItems="center">Johnson & Johnson</Grid>
    //                 </Grid>


    //             </Grid>
    //             <div className="activityTask">
    //                 <Grid item xs={7} >
    //                     <Labelbox type="select"
    //                         placeholder={"Activity"}
    //                         changeData={(data) => checkValidation(data, "activity")}
    //                         value={createproject_Form.activity.value}
    //                         error={createproject_Form.activity.error}
    //                         errmsg={createproject_Form.activity.errmsg}
    //                     />
    //                 </Grid>
    //             </div>
    //             <div className="activityTask">
    //                 <Grid item xs={7} >
    //                     <Labelbox type="select"
    //                         placeholder={"Sub Activity"} 
    //                         changeData={(data) => checkValidation(data, "sub_activity")}
    //                         value={createproject_Form.sub_activity.value}
    //                         error={createproject_Form.sub_activity.error}
    //                         errmsg={createproject_Form.sub_activity.errmsg}
    //                  />
    //                 </Grid>
    //             </div>
    //             <div className="projectTaskDatealign">
    //                 <Grid container spacing={3}>
    //                     <Grid item xs={4} >
    //                         <Labelbox type="datepicker"
    //                             placeholder={"Start Date"}
    //                             changeData={(data) => checkValidation(data, "start_date_pro")}
    //                             value={createproject_Form.start_date_pro.value}
    //                             error={createproject_Form.start_date_pro.error}
    //                             errmsg={createproject_Form.start_date_pro.errmsg}  
    //                         />
    //                     </Grid>
    //                     <Grid item xs={4} >
    //                         <Labelbox type="datepicker"
    //                             placeholder={" End Date"}
    //                             changeData={(data) => checkValidation(data, "end_date_pro")}
    //                             value={createproject_Form.end_date_pro.value}
    //                             error={createproject_Form.end_date_pro.error}
    //                             errmsg={createproject_Form.end_date_pro.errmsg}   
    //                         />
    //                     </Grid>
    //                     <Grid item xs={3} >
    //                         <Labelbox type="select"
    //                             placeholder={"Assign To"}
    //                             changeData={(data) => checkValidation(data, "assigned_to")}
    //                             value={createproject_Form.assigned_to.value}
    //                             error={createproject_Form.assigned_to.error}
    //                             errmsg={createproject_Form.assigned_to.errmsg}
    //  />
    //                     </Grid>

    //                 </Grid>
    //             </div>
    //             <div className="projectTaskDatealign">
    //                 <Grid container spacing={3}>
    //                     <Grid item xs={7}>
    //                     <Grid item xs={12} >
    //                         <Labelbox type="textarea"
    //                             placeholder={"Description"}
    //                             changeData={(data) => checkValidation(data, "description")}
    //                             value={createproject_Form.description.value}
    //                             error={createproject_Form.description.error}
    //                             errmsg={createproject_Form.description.errmsg}
    //                        />
    //                     </Grid>

    //                     </Grid>

    //                     <Grid item xs={4}>
    //                     <Grid item xs={12} >
    //                         <Labelbox type="select"
    //                             placeholder={"Priority"} 
    //                             changeData={(data) => checkValidation(data, "priorty")}
    //                             value={createproject_Form.priorty.value}
    //                             error={createproject_Form.priorty.error}
    //                             errmsg={createproject_Form.priorty.errmsg}
    //                         />
    //                     </Grid>
    //                     <Grid item xs={12} >
    //                         <Labelbox type="select"
    //                             placeholder={"Tag"} 
    //                             changeData={(data) => checkValidation(data, "tag_pro")}
    //                             value={createproject_Form.tag_pro.value}
    //                             error={createproject_Form.tag_pro.error}
    //                             errmsg={createproject_Form.tag_pro.errmsg}
    //                           />
    //                     </Grid>
    //                     </Grid>
    //                 </Grid>
    //             </div>
    //             <div className="projectTaskModelButtons">
    //                 <CustomButton btnName={"CANCEL"}  custombtnCSS={"projectTaskGo"} />
    //                 <CustomButton btnName={"SAVE"} btnCustomColor="customPrimary" custombtnCSS={"projectTaskGo"}onBtnClick={() => setTaskModelOpen(true)} custombtnCSS={"projectTaskButtons"} onBtnClick={ProjectSubmit} />

    //             </div>
    //         </div>
    //     )

    // }


    const projectTaskModelContent = () => {
        return (
            <div className="projectTaskModel">

                <Grid item xs={12} className="projectTaskHeader" container >
                    <Grid item xs={12} container spacing={2} className="projectTasktitle">
                        <Grid item xs={4} > IP Project</Grid>
                        <Grid item xs={4} >Project Name</Grid>
                        <Grid item xs={4} >Johnson & Johnson</Grid>
                    </Grid>
                    <Grid item xs={12} container spacing={2} className="projectTasktitle">
                        <Grid item xs={4}> Operational</Grid>
                        <Grid item xs={4}>First Cut Draft</Grid>
                        <Grid item xs={4}>Assign To</Grid>
                    </Grid>


                </Grid>
                {/* <div className="activityTask">
                    <Grid item xs={6} >
                        <Labelbox type="select"
                            placeholder={"Activity"}
                            changeData={(data) => checkValidation(data, "activity")}
                            value={createproject_Form.activity.value}
                            error={createproject_Form.activity.error}
                            errmsg={createproject_Form.activity.errmsg}
                        />
                    </Grid>
                </div> */}
                {/* <div className="activityTask">
                    <Grid item xs={} >
                        <Labelbox type="select"
                            placeholder={"Sub Activity"} 
                            changeData={(data) => checkValidation(data, "sub_activity")}
                            value={createproject_Form.sub_activity.value}
                            error={createproject_Form.sub_activity.error}
                            errmsg={createproject_Form.sub_activity.errmsg}
                     />
                    </Grid>
                </div> */}
                <div className="ddd">
                    <Grid container spacing={2}>
                        <Grid item xs={6} >
                            <Labelbox type="select"
                                placeholder={"Expense Type"}
                                changeData={(data) => checkValidation(data, "expense_type")}
                            // value={createproject_Form.start_date_pro.value}
                            // error={createproject_Form.start_date_pro.error}
                            // errmsg={createproject_Form.start_date_pro.errmsg}  
                            />
                        </Grid>
                        <Grid item xs={6} >
                            <Labelbox type="text"
                                placeholder={"Amount"}
                                changeData={(data) => checkValidation(data, "amount")}
                            // value={createproject_Form.start_date_pro.value}
                            // error={createproject_Form.start_date_pro.error}
                            // errmsg={createproject_Form.start_date_pro.errmsg}  
                            />
                        </Grid>
                        <Grid item xs={6} >
                            <Labelbox type="select"
                                placeholder={"Mode Of Payment "}
                                changeData={(data) => checkValidation(data, "mode_payment")}
                            // value={createproject_Form.start_date_pro.value}
                            // error={createproject_Form.start_date_pro.error}
                            // errmsg={createproject_Form.start_date_pro.errmsg}  
                            />
                        </Grid>
                        <Grid item xs={6} >
                            <span className="bill_align"> BILL</span>
                            <Checkbox className="checkbox_clr" />
                            <input type="file" />
                        </Grid>

                        <Grid item xs={12} >
                            <Labelbox type="textarea"
                                placeholder={"Description"}
                            // changeData={(data) => checkValidation(data, "description")}
                            // value={createproject_Form.description.value}
                            // error={createproject_Form.description.error}
                            // errmsg={createproject_Form.description.errmsg}
                            />
                        </Grid>


                    </Grid>
                </div>

                <div className="projectTaskModelButtons" >
                    {/* <CustomButton btnName={"CANCEL"}  custombtnCSS={"projectTaskGo"} /> */}
                    <CustomButton btnName={"SAVE"} btnCustomColor="customPrimary" custombtnCSS={"projectTaskGo"} onBtnClick={() => setTaskModelOpen(true)} custombtnCSS={"projectTaskButtons"} onBtnClick={ProjectSubmit} />

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
                            placeholder={"Client  type"} />
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

                <CustomButton btnName={"Create Project Task"} btnCustomColor="customPrimary" onBtnClick={() => setTaskModelOpen(true)} />
                {/* <DynModel modelTitle={"Project Task"} handleChangeModel={taskModelOpen} handleChangeCloseModel={(bln) => setTaskModelOpen(bln)} content={projectTaskModelContent()} modalchanges="modalchangestask" /> */}
                <DynModel modelTitle={"OPE"} handleChangeModel={taskModelOpen} handleChangeCloseModel={(bln) => setTaskModelOpen(bln)} content={projectTaskModelContent()} modalchanges="modalchangestask" />


            </div>

        </div>

    )
}
export default ProjectTask;


