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

function ProjectwiseTS(props) {
    const [searchRights, setSearchRights] = useState([])
    const { Panel } = Collapse;
    const { Option } = Select;
    // const ddl_empname = [
    //     {
    //         label: "Employee Name1",
    //         id: "1"
    //     },
    //     {
    //         label: "Employee Name2",
    //         id: "2"
    //     },
    //     {
    //         label: "Employee Name3",
    //         id: "3"
    //     }
    // ]
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

    return (
        <div>

            <div className="DRtitle">Project Wise Time sheet - {empname}</div>
            <div className="DayReportContainer">
                <Grid item xs={12} container direction="row" spacing={3}>
                    <Grid item xs={2} container direction="column" spacing={1}>
                        <div className="Reporthead">Employee Name</div>
                        <Labelbox type="select"></Labelbox>
                    </Grid>
                    <Grid item xs={2} container direction="column" spacing={1}>
                        <div className="Reporthead">Project type</div>
                        <Labelbox type="select"></Labelbox>
                    </Grid>
                    <Grid item xs={2} container direction="column" spacing={1}>
                        <div className="Reporthead">Project sub type</div>
                        <Labelbox type="select"></Labelbox>
                    </Grid>
                    <Grid item xs={2} container direction="column" spacing={1}>
                        <div className="Reporthead">From date</div>
                        <Labelbox type="datepicker"></Labelbox>
                    </Grid>
                    <Grid item xs={2} container direction="column" spacing={1}>
                        <div className="Reporthead">To date</div>
                        <Labelbox type="datepicker"></Labelbox>
                    </Grid>
                    <Grid item xs={2} container direction="row" justify="center" alignItems="center">
                        <CustomButton btnName={"Search"}  btnDisable={!searchRights||searchRights.display_control&&searchRights.display_control==='N'?true:false} btnCustomColor="customPrimary" custombtnCSS="Reportbtnsearch" onBtnClick={''} />
                    </Grid>
                </Grid>
            </div>
            <div className="DRcollapsecss">
                <Collapse>
                    <Panel header="IP Project">
                        <Collapse>
                            <Panel header="Trademark - Johnson & Johnson">
                                <div><EnhancedTable headCells={headCells} rows={getRows} /></div>
                            </Panel>
                        </Collapse>
                        <Collapse>
                            <Panel header="Design">
                                <div><EnhancedTable headCells={headCells} rows={getDesignRows} /></div>
                            </Panel>
                        </Collapse>
                    </Panel>
                </Collapse>
            </div>
        </div>
    )
}
const mapStateToProps = (state) =>
({
    UserPermission: state.UserPermissionReducer.getUserPermission,
    GetSeverance:state.ExitSeverance.GetSeverance
});
export default connect(mapStateToProps) (ProjectwiseTS);