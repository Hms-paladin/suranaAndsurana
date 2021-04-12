import react, { useState, useEffect } from 'react';
import './projectModel.scss';
import Labelbox from "../../../helpers/labelbox/labelbox";
import Grid from '@material-ui/core/Grid';
import CustomButton from '../../../component/Butttons/button';
import { apiurl } from "../../../utils/baseUrl";
import { connect, useDispatch } from "react-redux";
import { getActivity,getPriorityList,getTagList,inserTask,getAssignedTo,getLocation } from "../../../actions/projectTaskAction";
import Axios from "axios";
import ValidationLibrary from "../../../helpers/validationfunction";
import { InesertResume } from "../../../actions/ResumeAction";
function ProjectTaskModel(props) {
    
    const dispatch = useDispatch();
    const [projectSubActivity, setprojectSubActivity] = useState({});
    const [activityList, setactivityList] = useState({})
    const [priorityList, setpriorityList] = useState({})
    const [taggList, settaggList] = useState({})
    const [assignedToLists, setassignedToLists] = useState({}) 
    const [locationslList, setlocationslList] = useState({})

    const [InsertTaskForm, setInsertTaskForm] = useState({
        activity: {
          value: "",
          //validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        }, 
        subActivity: {
          value: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        },
        location: {
          value: "",
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
        description: {
          value: "",
          valueById: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        }
    });

    const handleCancel = () => {
      let From_key = [
        "activity",
        "subActivity",
        "location",
        "fromDate",
        "toDate",
        "assignTo",
        "tag",
        "priority",
        "description"
      ];
  
      From_key.map((data) => {
        try {
          InsertTaskForm[data].value = "";
          console.log("mapping", InsertTaskForm[data].value);
        } catch (error) {
          throw error;
        }
      });
      setInsertTaskForm((prevState) => ({
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


    const [ProjectTask_Model, setResumeFrom] = useState({

        startdate: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        enddate: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        description: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },




    })

    function onSubmit() {
        var mainvalue = {};
        var targetkeys = Object.keys(ProjectTask_Model);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                ProjectTask_Model[targetkeys[i]].value,
                ProjectTask_Model[targetkeys[i]].validation
            );
            ProjectTask_Model[targetkeys[i]].error = !errorcheck.state;
            ProjectTask_Model[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = ProjectTask_Model[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter(
            (obj) => ProjectTask_Model[obj].error == true
        );
        console.log(filtererr.length);
        if (filtererr.length > 0) {
            // setResumeFrom({ error: true });
        } else {
            // setResumeFrom({ error: false });

            dispatch(InesertResume(ProjectTask_Model)).then(() => {
                handleCancel()
            })
        }

        setResumeFrom(prevState => ({
            ...prevState
        }));
    };

    
    function checkValidation(data, key, multipleId) {

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            ProjectTask_Model[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: ProjectTask_Model[key].validation
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

        setResumeFrom(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));

    };
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

    let locationData = []
    props.locationList.map((data) =>
    locationData.push({ value: data.location,
        id: data.location_id })
    )
    setlocationslList({ locationData })

    let assignedToData = []
    props.assignToList.map((data) =>
    assignedToData.push({ value: data.name,
        id: data.emp_id })
    )
    setassignedToLists({ assignedToData })

   
     

      }, [
        props.activitysList,props.prioritysList,props.tagsList,props.locationList,props.assignToList
      ]);

      function fnLoadSubActivity(data, key) {
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
      }

      function onSubmit(){
          var data ={
            "project_id":"71",
            "activiity_id":InsertTaskForm.activity.value,
            "sub_activity_id":InsertTaskForm.subActivity.value,
            "assignee_id":InsertTaskForm.assignTo.value,
            "start_date":InsertTaskForm.fromDate.value,
            "end_date":InsertTaskForm.toDate.value,
            "assigned_by":localStorage.getItem("empId"),
            "priority":InsertTaskForm.priority.value,
            "description":InsertTaskForm.description.value,
            "tag":InsertTaskForm.tag.value
        }

        dispatch(inserTask(data)).then((response) => {
          handleCancel();
        })

      }

      function checkValidation(data, key, multipleId) {
        var errorcheck = ValidationLibrary.checkValidation(
          data,
          InsertTaskForm[key].validation
        );
        let dynObj = {
          value: data,
          error: !errorcheck.state,
          errmsg: errorcheck.msg,
          validation: InsertTaskForm[key].validation,
        };
    
        // only for multi select (start)
    
        let multipleIdList = [];
    
        if (multipleId) {
          multipleId.map((item) => {
            for (let i = 0; i < data.length; i++) {
              if (data[i] === item.value) {
                multipleIdList.push(item.id);
              }
            }
          });
          dynObj.valueById = multipleIdList.toString();
        }
        // (end)
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
        setInsertTaskForm((prevState) => ({
          ...prevState,
          [key]: dynObj,
        }));
      }
    return (
        <div className="projectTaskModel">

            <Grid item xs={12} container direction="row" justify="center" alignItems="center" spacing={1} className="projectTasktitle">
                <Grid item xs={4} container justify="center" alignItems="center"> IP Project</Grid>
                <Grid item xs={4} container justify="center" alignItems="center">Project Name</Grid>
                <Grid item xs={4} container justify="center" alignItems="center">Johnson & Johnson</Grid>

            </Grid>

            <div className="activityTask">
                <Grid item xs={7} >
                    <Labelbox type="select"
                    dropdown={activityList.activityTypeData}
                    changeData={(data) => checkValidation(data, "activity")}
                    //changeData={(data) => fnLoadSubActivity(data, "activity")}
                        placeholder={"Activity"} 
                        value={InsertTaskForm.activity.value}
                        error={InsertTaskForm.activity.error}
                        errmsg={InsertTaskForm.activity.errmsg}
                        />
                </Grid>
            </div>
            <div className="activityTask">
                <Grid item xs={7} >
                    <Labelbox type="select"
            dropdown={projectSubActivity.projectSubActivitydata}
            changeData={(data) => checkValidation(data, "subActivity")}
                        placeholder={"Sub Activity"} 
                        value={InsertTaskForm.subActivity.value}
                        error={InsertTaskForm.subActivity.error}
                    errmsg={InsertTaskForm.subActivity.errmsg} />
                </Grid>
            </div>
            <div className="activityTask">
                <Grid item xs={7} >
                    <Labelbox type="select" value={InsertTaskForm.location.value}
                    error={InsertTaskForm.location.error}
                    errmsg={InsertTaskForm.location.errmsg}
                     dropdown={locationslList.locationData}
                    changeData={(data) => checkValidation(data, "location")}
                        placeholder={"Location"} />
                </Grid>
            </div>
            <div className="projectTaskDatealign">
                <Grid container spacing={3}>
                    <Grid item xs={4} >
                        <Labelbox type="datepicker" 
                            placeholder={"Start Date"}
                            changeData={(data) => checkValidation(data, "fromDate")}
                            value={InsertTaskForm.fromDate.value}
                            error={InsertTaskForm.fromDate.error}
                            errmsg={InsertTaskForm.fromDate.errmsg}

                        />
                    </Grid>
                    <Grid item xs={4} >
                        <Labelbox type="datepicker" 
                        changeData={(data) => checkValidation(data, "toDate")}
                            placeholder={" End Date"}
                            value={InsertTaskForm.toDate.value}
                            error={InsertTaskForm.toDate.error}
                            errmsg={InsertTaskForm.toDate.errmsg}

                        />
                    </Grid>
                    <Grid item xs={4} >
                        <Labelbox type="select" 
                        value={InsertTaskForm.assignTo.value}
                        error={InsertTaskForm.assignTo.error}
                        errmsg={InsertTaskForm.assignTo.errmsg}
                     dropdown={assignedToLists.assignedToData}
                        changeData={(data) => checkValidation(data, "assignTo")}
                            placeholder={"Assign To"} />
                    </Grid>

                </Grid>
            </div>
            <div className="projectTaskDatealign">
                <Grid container spacing={3}>
                    <Grid item xs={7}>
                        <div className="projectTaskCmd">
                            <Labelbox type="textarea"
                                placeholder={"Description"} 
                                changeData={(data) => checkValidation(data, "description")}
                                value={InsertTaskForm.description.value}
                        error={InsertTaskForm.description.error}
                        errmsg={InsertTaskForm.description.errmsg}
                                />
                        </div>
                    </Grid>

                    <Grid item xs={5} >
                        <Grid item xs={12} >
                            <Labelbox type="select" value={InsertTaskForm.tag.value}
changeData={(data) => checkValidation(data, "tag")}
    dropdown={taggList.tagTypeData}
                                placeholder={"Tag"} />
                        </Grid>

                        <Grid item xs={12} >
                            <Labelbox type="select" 
    dropdown={priorityList.priorityTypeData}
    changeData={(data) => checkValidation(data, "priority")}
                                placeholder={"Priority"}  
                        value={InsertTaskForm.priority.value}
                                />
                        </Grid>

                    </Grid>
                </Grid>
            </div>
            <div className="projectTaskModelButtons">
                <CustomButton btnName={"CANCEL"} custombtnCSS={"projectTaskGo"}  onBtnClick={handleCancel}  />
                <CustomButton btnName={"SAVE"} btnCustomColor="customPrimary" onBtnClick={onSubmit} custombtnCSS={"projectTaskGo"} />

            </div>



        </div>
    )
}

const mapStateToProps = (state) =>
// console.log(state.getOptions.getProcessType, "getProcessType")
({
    
    activitysList: state.projectTasksReducer.getActivityList || [],
    prioritysList: state.projectTasksReducer.prioritysList || [],
    tagsList: state.projectTasksReducer.tagsList || [],
    assignToList: state.projectTasksReducer.assignToLists || [],
    locationList: state.projectTasksReducer.locationLists || [],
});

export default connect(mapStateToProps)(ProjectTaskModel);
