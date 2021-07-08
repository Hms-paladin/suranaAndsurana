import react, { useState, useEffect } from 'react';
import '../ProjectTask/projectTask.scss';
import Grid from '@material-ui/core/Grid';
import { Radio } from 'antd';
import Labelbox from "../../helpers/labelbox/labelbox";
import { Button, Checkbox } from '@material-ui/core';
import EnhancedTable from "../../component/DynTable/table";
import CustomButton from '../../component/Butttons/button';
import DynModel from '../../component/Model/model';
import LabelBox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from "../../helpers/validationfunction";
import { getTagList, insertAdhocTask, getAssignedTo } from "../../actions/projectTaskAction";
import { connect, useDispatch } from "react-redux";

function AdhocTaskModal(props) {
    const dispatch = useDispatch();
    const [taggList, settaggList] = useState({})
    const [assignedToLists, setassignedToLists] = useState({})
    const [adhoc_Form, setadhoc_Form] = useState({
        task_description: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        start_date: {
            value: new Date(),
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
        dispatch(getTagList());
        dispatch(getAssignedTo());

    }, []);

    useEffect(() => {
        let tagTypeData = []
        props.tagsList.map((data) =>
            tagTypeData.push({
                value: data.status,
                id: data.status_id
            })
        )
        settaggList({ tagTypeData })

        let assignedToData = []
        props.assignToList.map((data) =>
            assignedToData.push({
                value: data.name,
                id: data.emp_id
            })
        )
        setassignedToLists({ assignedToData })

    }, [
        props.tagsList, props.assignToList, props.insertAdhocTask
    ]);

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
        console.log(filtererr.length);
        if (filtererr.length > 0) {
            // setadhoc_Form({ error: true });
        } else {
            // setadhoc_Form({ error: false });

        }
        var dateFormat = require('dateformat');

var now = new Date();
var fromDateval= dateFormat(adhoc_Form.start_date.value, "yyyy-mm-dd")
var descVal = encodeURI(adhoc_Form.task_description.value)
descVal = descVal.replace(/%20/g, ' ');
        var data ={
            "start_date":fromDateval, //adhoc_Form.start_date.value,
            "end_date":adhoc_Form.end_date.value,
            "tag":adhoc_Form.tag.value,
            "assignee_id":adhoc_Form.assigned_task.value, 
            "assigned_by":localStorage.getItem("empId"),
            "description":descVal
        }
        dispatch(insertAdhocTask(data)).then((response) => {
            console.log("Insert");
            handleCancel();
        })
        setadhoc_Form(prevState => ({
            ...prevState
        }));
    };

    const handleCancel = () => {
        let From_key = [
            "task_description",
            "start_date",
            "end_date",
            "tag",
            "assigned_task"
        ];

        From_key.map((data) => {
            try {
                adhoc_Form[data].value = "";
                console.log("mapping", adhoc_Form[data].value);
            } catch (error) {
                throw error;
            }
        });
        setadhoc_Form((prevState) => ({
            ...prevState,
        }));
    };

    const [saveRights, setSaveRights] = useState([])

    ///***********user permission**********/
    useEffect(() => {
        if (props.UserPermission.length > 0 && props.UserPermission) {
            let data_res_id = props.UserPermission.find((val) => {
                return (
                    "Adhoc Task - Save" == val.control
                )
            })
            setSaveRights(data_res_id)


        }

    }, [props.UserPermission]);
    ////////
    return (
        <div className="adhoc_container" style={{ backgroundColor: "white", borderRadius: "5px", padding: "15px" }}>
            <div style={{ fontWeight: "600", fontSize: "20px", paddingBottom: "10px" }}>Adhoc Task</div>
            <div className="AdhocTask">
                <Grid item xs={10} >
                    <LabelBox type="text"
                        placeholder={"Task Description"}
                        changeData={(data) => checkValidation(data, "task_description")}
                        value={adhoc_Form.task_description.value}
                        error={adhoc_Form.task_description.error}
                        errmsg={adhoc_Form.task_description.errmsg}
                    />
                </Grid>
            </div>
            <Grid container spacing={3}>
                <Grid item xs={5} >
                    <Labelbox type="datepicker"
                        placeholder={"Start Date"}
                        changeData={(data) => checkValidation(data, "start_date")}
                        minDate={new Date()}
                        value={adhoc_Form.start_date.value}
                        error={adhoc_Form.start_date.error}
                        errmsg={adhoc_Form.start_date.errmsg}

                    />
                </Grid>
                <Grid item xs={5} >
                    <Labelbox type="datepicker"
                        placeholder={" End Date"}
                        changeData={(data) => checkValidation(data, "end_date")}
                        minDate={adhoc_Form.start_date.value}
                        value={adhoc_Form.end_date.value}
                        error={adhoc_Form.end_date.error}
                        errmsg={adhoc_Form.end_date.errmsg}

                    />
                </Grid>

            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={5} >
                    <Labelbox type="select"
                        placeholder={"Tag"}
                        dropdown={taggList.tagTypeData}
                        changeData={(data) => checkValidation(data, "tag")}
                        value={adhoc_Form.tag.value}
                        error={adhoc_Form.tag.error}
                        errmsg={adhoc_Form.tag.errmsg}
                    />
                </Grid>

                <Grid item xs={5} >
                    <Labelbox type="select"
                        placeholder={"Assigned To"}
                        dropdown={assignedToLists.assignedToData}
                        changeData={(data) => checkValidation(data, "assigned_task")}
                        value={adhoc_Form.assigned_task.value}
                        error={adhoc_Form.assigned_task.error}
                        errmsg={adhoc_Form.assigned_task.errmsg}
                    />
                </Grid>


            </Grid>
            <div className="adhocModelButtons">
                <CustomButton btnName={"CANCEL"} custombtnCSS={"projectTaskGo"} onBtnClick={handleCancel} />
                <CustomButton btnName={"SAVE"} btnCustomColor="customPrimary" btnDisable={!saveRights || saveRights.display_control && saveRights.display_control === 'N' ? true : false} custombtnCSS={"projectTaskGo"} onBtnClick={adhocSubmit} />

            </div>


        </div>

    )
}

const mapStateToProps = (state) =>
// console.log(state.getOptions.getProcessType, "getProcessType")
({

    tagsList: state.projectTasksReducer.tagsList || [],
    assignToList: state.projectTasksReducer.assignToLists || [],
    UserPermission: state.UserPermissionReducer.getUserPermission,
});

export default connect(mapStateToProps)(AdhocTaskModal);
