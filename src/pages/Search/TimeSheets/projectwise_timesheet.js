import react, { useState,useEffect } from 'react';
import CustomButton from "../../../component/Butttons/button";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../../helpers/labelbox/labelbox";
import EnhancedTable from '../../../component/DynTable/table';
import { useParams, Link } from 'react-router-dom';
import { Collapse } from 'antd';
import { Select } from 'antd';
import './timesheets.scss'
import { useDispatch, connect } from "react-redux";
import { notification } from "antd";
import ValidationLibrary from "../../../helpers/validationfunction";
import { getEmployeeList,getProjectType,getProjectSubType} from '../../../actions/MasterDropdowns'
import { getProjectWise_TimeSheet } from '../../../actions/TimeSheetAction'
function ProjectwiseTS(props) {
    const [searchRights, setSearchRights] = useState([])
    const { Panel } = Collapse;
    const { Option } = Select;
    let dispatch=useDispatch()
    const [projectList,setprojectList]=useState([])
    const [openPanel,setopenPanel]=useState(0)
    const [projectSearch, setprojectSearch] = useState({
        emp_name: {
          value: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        },
        project_type: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
          },
          project_subtype: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
          },
          from_date: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
          },
          to_date: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
          },
    })
    function checkValidation(data, key) {
        if(key==="project_type"){
            dispatch(getProjectSubType(data))
        }
        var errorcheck = ValidationLibrary.checkValidation(
          data,
          projectSearch[key].validation
        );
        let dynObj = {
          value: data,
          error: !errorcheck.state,
          errmsg: errorcheck.msg,
          validation: projectSearch[key].validation
        }
        setprojectSearch(prevState => ({
          ...prevState,
          [key]: dynObj,
        }));
    
      };
    
    const empname = "Employee Name";
    const headCells = [
        { id: "actitvity", label: "Activity" },
        { id: "subactivity", label: "Sub Activity" },
        { id: "startdate", label: "Start date" },
        { id: "planned_sd", label: "Planned start date" },
        { id: "planned_ed", label: "Planned end date" },
        { id: "actualstart", label: "Actual start (date/time)" },
        { id: "actualend", label: "Actual end (date/time)" },
        { id: "tothours", label: "Total hours" }
    ];
    const getRows = [
        { activity: <Link to=""><div className="ProjectTaskId">Application Filing</div></Link>, subactivity: "Sub-activity 1", startdate: "11-05-2021", planned_sd: "10-05-2021", planned_ed: "15-05-2021", actualstart: "12-05-2021/9:00", actualend: "13-05-2021/9:00", tothours: "23hr" },
        { activity: <Link to=""><div className="ProjectTaskId">Hearing</div></Link>, subactivity: "Non-Effective", startdate: "11-05-2021", planned_sd: "10-05-2021", planned_ed: "15-05-2021", actualstart: "12-05-2021/9:00", actualend: "13-05-2021/9:00", tothours: "22hr" },
    ];
    const getDesignRows = [
        { activity: <Link to=""><div className="ProjectTaskId">Application Filing</div></Link>, subactivity: "Sub-activity 1", startdate: "11-05-2021", planned_sd: "10-05-2021", planned_ed: "15-05-2021", actualstart: "12-05-2021/9:00", actualend: "13-05-2021/9:00", tothours: "23hr" },
    ];
    useEffect(() => {
        dispatch(getEmployeeList())
        dispatch(getProjectType())
        dispatch(getProjectSubType())
        dispatch(getProjectWise_TimeSheet(projectSearch))
    },[])
    useEffect(()=>{
        let ProjectDetails=[]
        props.Project_TimeSheet.map((data)=>{

        })
    },[props.Project_TimeSheet])
    useEffect(() => {
        let employeeName=[]
        let Project_type=[]
        let Project_Sub_type=[]
        props.EmployeeList.map((data)=>{
            employeeName.push({id:data.emp_id,value:data.name})
        })
        props.ProjectType.map((data)=>{
            Project_type.push({id:data.project_type_id,value:data.project_type})
        })
        props.SubProjectType.map((data)=>{
            Project_Sub_type.push({id:data.sub_project_type_id,value:data.sub_project_type})
        })
        setprojectList({employeeName,Project_type,Project_Sub_type})
    },[props.EmployeeList,props.ProjectType,props.SubProjectType])
    ///***********user permission**********/
   useEffect(() => {
   if(props.UserPermission.length>0&&props.UserPermission){
      let  data_res_id = props.UserPermission.find((val) => { 
       return (
           "Timesheet - Search" == val.control 
       ) 
      })
      setSearchRights(data_res_id)
 
   }
   
   }, [props.UserPermission]);
   ////////
  const SearchData=()=>{
      dispatch(getProjectWise_TimeSheet(projectSearch))
  }
    return (
        <div>

            <div className="DRtitle">Project Wise Time Sheet - {empname}</div>
            <div className="DayReportContainer">
                <Grid item xs={12} container direction="row" spacing={3}>
                    <Grid item xs={2} container direction="column" spacing={1}>
                        <div className="Reporthead">Employee Name</div>
                        <Labelbox type="select"
                         dropdown={projectList.employeeName}
                         changeData={(data) => checkValidation(data, "emp_name")}
                         value={projectSearch.emp_name.value}
                         error={projectSearch.emp_name.error}
                         errmsg={projectSearch.emp_name.errmsg}
                        />
                    </Grid>
                    <Grid item xs={2} container direction="column" spacing={1}>
                        <div className="Reporthead">Project Type</div>
                        <Labelbox type="select"
                        dropdown={projectList.Project_type}
                         changeData={(data) => checkValidation(data, "project_type")}
                         value={projectSearch.project_type.value}
                         error={projectSearch.project_type.error}
                         errmsg={projectSearch.project_type.errmsg}
                        />
                    </Grid>
                    <Grid item xs={2} container direction="column" spacing={1}>
                        <div className="Reporthead">Project Sub Type</div>
                        <Labelbox type="select"
                           dropdown={projectList.Project_Sub_type}
                           changeData={(data) => checkValidation(data, "project_subtype")}
                           value={projectSearch.project_subtype.value}
                           error={projectSearch.project_subtype.error}
                           errmsg={projectSearch.project_subtype.errmsg}
                        />
                    </Grid>
                    <Grid item xs={2} container direction="column" spacing={1}>
                        <div className="Reporthead">From Date</div>
                        <Labelbox type="datepicker"
                        changeData={(data) => checkValidation(data, "from_date")}
                        value={projectSearch.from_date.value}
                        error={projectSearch.from_date.error}
                        errmsg={projectSearch.from_date.errmsg}
                        />
                    </Grid>
                    <Grid item xs={2} container direction="column" spacing={1}>
                        <div className="Reporthead">To Date</div>
                        <Labelbox type="datepicker"
                          changeData={(data) => checkValidation(data, "to_date")}
                          value={projectSearch.to_date.value}
                          error={projectSearch.to_date.error}
                          errmsg={projectSearch.to_date.errmsg}
                        />
                    </Grid>
                    <Grid item xs={2} container direction="row" justify="center" alignItems="center">
                        <CustomButton btnName={"Search"}  btnDisable={!searchRights||searchRights.display_control&&searchRights.display_control==='N'?true:false} btnCustomColor="customPrimary" custombtnCSS="Reportbtnsearch" onBtnClick={SearchData} />
                    </Grid>
                </Grid>
            </div>
            <div className="DRcollapsecss">
            {props.Project_TimeSheet.map((data)=>
                <Collapse activeKey={openPanel}>
                    <Panel header={data.project_type}>
                    {data.project_details.map((data)=>
                        <Collapse>
                            <Panel header={data.sub_project_type}>
                                <EnhancedTable headCells={headCells} rows={getRows} />
                            </Panel>
                        </Collapse>
                        )}
                        {/* <Collapse>
                            <Panel header="Design">
                                <div><EnhancedTable headCells={headCells} rows={getDesignRows} /></div>
                            </Panel>
                        </Collapse> */}
                    </Panel>
                </Collapse>
            )}
            </div>
        </div>
    )
}
const mapStateToProps = (state) =>
({
    UserPermission: state.UserPermissionReducer.getUserPermission,
    GetSeverance:state.ExitSeverance.GetSeverance,
    EmployeeList: state.getOptions.getEmployeeList,
    ProjectType: state.getOptions.getProjectType,
    SubProjectType:state.getOptions.getProjectSubType,
    Project_TimeSheet:state.getTaskList.ProjectWise_TimeSheet
});
export default connect(mapStateToProps) (ProjectwiseTS);