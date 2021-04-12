import react, { useEffect, useState } from 'react';
import './timesheets.scss';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../../helpers/labelbox/labelbox';
import CustomButton from '../../../component/Butttons/button';
import ValidationLibrary from "../../../helpers/validationfunction";
import { useDispatch, connect } from "react-redux";
import { getActivity,getPriorityList,getTagList,inserTask,getAssignedTo,getLocation } from "../../../actions/projectTaskAction";
import Axios from "axios";
import { apiurl } from "../../../utils/baseUrl";
import dateFormat from 'dateformat';


function TimeSheetStartModel(props) {
    const [changeStop, setChangeStop] = useState(true)
    const dispatch = useDispatch();
    const [projectSubActivity, setprojectSubActivity] = useState({});
    const [activityList, setactivityList] = useState({})
    const [priorityList, setpriorityList] = useState({})
    const [taggList, settaggList] = useState({})
    const [assignedToLists, setassignedToLists] = useState({}) 
    const [timeSheetForm, settimeSheetForm] = useState({
        startTime: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        activity: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        subActivity: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        assignTo: {
          value: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        },
        tag: {
          value: "",
          valueById: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        },
        priority: {
          value: "",
          valueById: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        },
        fromDate: {
          value: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        },
        toDate: {
          value: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        },
        description: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
          }

    })

    const handleCancel = () => {
        let From_key = [
          "activity",
          "subActivity",
          "fromDate",
          "toDate",
          "assignTo",
          "tag",
          "priority",
          "startTime","description"
        ];
    
        From_key.map((data) => {
          try {
            timeSheetForm[data].value = "";
            console.log("mapping", timeSheetForm[data].value);
          } catch (error) {
            throw error;
          }
        });
        settimeSheetForm((prevState) => ({
          ...prevState,
        }));
      };

    useEffect(() => {
        dispatch(getActivity());
       dispatch(getTagList());
        dispatch(getPriorityList());
        dispatch(getAssignedTo());
        dispatch(getLocation()); 
        
      }, []);

    useEffect(() => {
        let activityTypeData = []
    props.activitysList.map((data) =>
    activityTypeData.push({ value: data.activity,
        id: data.activity_id })
    )
    setactivityList({ activityTypeData })


    let priorityTypeData = []
    props.prioritysList.map((data) =>
    priorityTypeData.push({ value: data.status,
        id: data.status_id })
    )
    setpriorityList({ priorityTypeData })

    let tagTypeData = []
    props.tagsList.map((data) =>
    tagTypeData.push({ value: data.status,
        id: data.status_id })
    )
    settaggList({ tagTypeData })


    let assignedToData = []
    props.assignToList.map((data) =>
    assignedToData.push({ value: data.name,
        id: data.emp_id })
    )
    setassignedToLists({ assignedToData })


    }, [props.activitysList,props.prioritysList,props.tagsList,props.locationList,props.assignToList])


    const submitstop = () => {
        var data ={
            "project_id":"71",
            "activiity_id":timeSheetForm.activity.value,
            "sub_activity_id":timeSheetForm.subActivity.value,
            "assignee_id":timeSheetForm.assignTo.value,
            "start_date":timeSheetForm.fromDate.value,
            "end_date":timeSheetForm.toDate.value,
            "assigned_by":localStorage.getItem("empId"),
            "priority":timeSheetForm.priority.value,
            "description":timeSheetForm.description.value,
            "tag":timeSheetForm.tag.value
        }
        var timesheetData = {
            "emp_id":localStorage.getItem("empId"),
            "task_id":"111",
            "start_date":timeSheetForm.fromDate.value,
            "start_time":dateFormat(timeSheetForm.startTime.value != undefined ? timeSheetForm.startTime.value : new Date(), "hh:MM:ss"),
            "comment":timeSheetForm.description.value,
            "created_by":localStorage.getItem("empId"),
        }
       
            dispatch(inserTask(data,timesheetData)).then((response) => {
                handleCancel();
                setChangeStop(false)
              })
        

    }
    const submitstart = () => {
        
                setChangeStop(true)
            
        
    }


    function checkValidation(data, key) {
        console.log(data, key, "dataValue")

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            timeSheetForm[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: timeSheetForm[key].validation,
        };

        //Process type

            if (key == "activity") {
                // Sub Activity
                Axios({
                  method: "POST",
                  url: apiurl + "get_sub_activity",
                  data: {
                    activity_id: data,
                  },
                }).then((response) => {
                  let projectSubActivitydata = [];
                  response.data.data.map((data) =>
                    projectSubActivitydata.push({
                      value: data.sub_activity,
                      id: data.sub_activity_id,
                    })
                  );
                  setprojectSubActivity({ projectSubActivitydata });
                });
              
        }

        settimeSheetForm((prevState) => ({
            ...prevState,
            [key]: dynObj,
        }));
    }

    


    function onSubmit() {
        var mainvalue = {};
        var targetkeys = Object.keys(timeSheetForm);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                timeSheetForm[targetkeys[i]].value,
                timeSheetForm[targetkeys[i]].validation
            );
            timeSheetForm[targetkeys[i]].error = !errorcheck.state;
            timeSheetForm[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = timeSheetForm[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter((obj) => timeSheetForm[obj].error == true);
        
       
        if (filtererr.length > 0) {
        } else{
        }

        settimeSheetForm((prevState) => ({
            ...prevState,
        }));
    }


    return (
        <div className="timeSheetStartContainer">
            {changeStop ?
                <div>
                    <Grid item xs={12} container direction="row" spacing={3}>
                        <Grid item xs={4}>IP Project</Grid>

                        <Grid item xs={4}>Project Name</Grid>

                        <Grid item xs={4}>Johnson & Johnson </Grid>
                        <Grid item xs={4}>
                            <Labelbox type="select"
                                placeholder={"Activity"}
                                dropdown={activityList.activityTypeData}
                                changeData={(data) =>
                                    checkValidation(data, "activity")
                                }
                                value={timeSheetForm.activity.value}
                                error={timeSheetForm.activity.error}
                                errmsg={timeSheetForm.activity.errmsg}

                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Labelbox type="select"
                                placeholder={"sub Activity"}
                                dropdown={projectSubActivity.projectSubActivitydata}
                                changeData={(data) =>
                                    checkValidation(data, "subActivity")
                                }
                                value={timeSheetForm.subActivity.value}
                                error={timeSheetForm.subActivity.error}
                                errmsg={timeSheetForm.subActivity.errmsg}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Labelbox type="select"
                                placeholder={"Assign To"}
                                value={timeSheetForm.assignTo.value}
                        error={timeSheetForm.assignTo.error}
                        errmsg={timeSheetForm.assignTo.errmsg}
                     dropdown={assignedToLists.assignedToData}
                        changeData={(data) => checkValidation(data, "assignTo")}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <Labelbox type="select"
                                placeholder={"Priority"}

    dropdown={priorityList.priorityTypeData}
    changeData={(data) => checkValidation(data, "priority")}
                                placeholder={"Priority"}  
                        value={timeSheetForm.priority.value}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Labelbox type="select"
                                placeholder={"Tag"}
                                value={timeSheetForm.tag.value}
changeData={(data) => checkValidation(data, "tag")}
    dropdown={taggList.tagTypeData}
                            /></Grid>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={3}>
                            <Labelbox type="datepicker"

changeData={(data) => checkValidation(data, "fromDate")}
value={timeSheetForm.fromDate.value}
error={timeSheetForm.fromDate.error}
errmsg={timeSheetForm.fromDate.errmsg}
                                placeholder={" Deadline "}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Labelbox type="timepicker"
                                placeholder={"Deadline"}
                                changeData={(data) =>
                                    checkValidation(data, "startTime")
                                }
                                value={timeSheetForm.startTime.value}
                                error={timeSheetForm.startTime.error}
                                errmsg={timeSheetForm.startTime.errmsg}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Labelbox type="datepicker"
                             changeData={(data) => checkValidation(data, "toDate")}
                             placeholder={" End Date"}
                             value={timeSheetForm.toDate.value}
                             error={timeSheetForm.toDate.error}
                             errmsg={timeSheetForm.toDate.errmsg}
                               
                            />
                        </Grid>
                        <Grid item xs={3}>
                            End Time
                            </Grid>

                    </Grid>
                    <div className="timeSheetComments">
                        <Labelbox type="textarea" placeholder={"comments"} 
                        changeData={(data) => checkValidation(data, "description")}
                        value={timeSheetForm.description.value}
                error={timeSheetForm.description.error}
                errmsg={timeSheetForm.description.errmsg}/>
                    </div>
                    <div className="customiseButton">
                        <CustomButton btnName={"CANCEL"} custombtnCSS="timeSheetButtons" />
                        <CustomButton btnName={"Start"} btnCustomColor="customPrimary" custombtnCSS="timeSheetButtons" onBtnClick={submitstop} />
                        {/* <CustomButton btnName={"START"} btnCustomColor="customPrimary" custombtnCSS="timeSheetButtons" onBtnclick={props.changeStop}/> */}

                    </div>
                </div>
                :
                <div>
                    <Grid item xs={12} container direction="row" spacing={3}>
                        <Grid item xs={4}>IP Project</Grid>

                        <Grid item xs={4}>Project Name</Grid>

                        <Grid item xs={4}>Johnson & Johnson </Grid>
                        <Grid item xs={4}>
                            <Labelbox type="select"
                                placeholder={"Activity"}
                                dropdown={activityList.activityTypeData}
                                changeData={(data) =>
                                    checkValidation(data, "activity")
                                }
                                value={timeSheetForm.activity.value}
                                error={timeSheetForm.activity.error}
                                errmsg={timeSheetForm.activity.errmsg}

                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Labelbox type="select"
                             dropdown={projectSubActivity.projectSubActivitydata}
                                placeholder={"sub Activity"}
                                changeData={(data) =>
                                    checkValidation(data, "subActivity")
                                }
                                value={timeSheetForm.subActivity.value}
                        error={timeSheetForm.subActivity.error}
                    errmsg={timeSheetForm.subActivity.errmsg}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Labelbox type="select"
                                placeholder={"Assign To"}
                        value={timeSheetForm.assignTo.value}
                        error={timeSheetForm.assignTo.error}
                        errmsg={timeSheetForm.assignTo.errmsg}
                     dropdown={assignedToLists.assignedToData}
                        changeData={(data) => checkValidation(data, "assignTo")}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <Labelbox type="select"
                                placeholder={"Priority"}

    dropdown={priorityList.priorityTypeData}
    changeData={(data) => checkValidation(data, "priority")}
                                placeholder={"Priority"}  
                        value={timeSheetForm.priority.value}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Labelbox type="select"
                                placeholder={"Tag"}
                                value={timeSheetForm.tag.value}
changeData={(data) => checkValidation(data, "tag")}
    dropdown={taggList.tagTypeData}
                            /></Grid>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={3}>
                            <Labelbox type="datepicker"
                                placeholder={" Deadline "}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Labelbox type="timepicker"
                                placeholder={"Deadline"}
                                changeData={(data) =>
                                    checkValidation(data, "startTime")
                                }
                                value={timeSheetForm.startTime.value}
                                error={timeSheetForm.startTime.error}
                                errmsg={timeSheetForm.startTime.errmsg}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Labelbox type="datepicker"
                                placeholder={" Deadline "}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            End Time
                            </Grid>

                    </Grid>
                    <div className="timeSheetComments">
                        <Labelbox type="textarea" placeholder={"comments"}
                        changeData={(data) => checkValidation(data, "description")}
                        value={timeSheetForm.description.value}
                error={timeSheetForm.description.error}
                errmsg={timeSheetForm.description.errmsg} />
                    </div>
                    <div className="customiseButton">
                        <CustomButton btnName={"CANCEL"} custombtnCSS="timeSheetButtons" onBtnClick={handleCancel}  />
                        <CustomButton btnName={"STOP"} btnCustomColor="customPrimary" custombtnCSS="timeSheetButtons" onBtnclick={submitstart} />
                    </div>
                  
                </div>
            }

        </div>

    )
}

const mapStateToProps = (state) =>
({
    
    activitysList: state.projectTasksReducer.getActivityList || [],
    prioritysList: state.projectTasksReducer.prioritysList || [],
    tagsList: state.projectTasksReducer.tagsList || [],
    assignToList: state.projectTasksReducer.assignToLists || [],
    locationList: state.projectTasksReducer.locationLists || [],
});

export default connect(mapStateToProps)(TimeSheetStartModel);