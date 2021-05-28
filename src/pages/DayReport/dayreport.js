import React,{useState,useEffect}from 'react'
import { useDispatch, connect } from "react-redux";
import CustomButton from "../../component/Butttons/button";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import EnhancedTable from '../../component/DynTable/table';
import { useParams, Link } from 'react-router-dom';
import { Collapse } from 'antd';
import './dayreport.scss'

function DayReport(props) {
    const { Panel } = Collapse;
     const [saveRights, setSaveRights] = useState([])

     ///***********user permission**********/
    useEffect(() => {
    if(props.UserPermission.length>0&&props.UserPermission){
       let  data_res_id = props.UserPermission.find((val) => { 
        return (
            "Day Report - Save" == val.control 
        ) 
       })
       setSaveRights(data_res_id)
    
       
    }
    
    }, [props.UserPermission]);
    ////////

    const headCells = [
        { id: "actitvity", label: "Activity" },
        { id: "subactivity", label: "Sub-Activity" },
        { id: "completion", label: "Completion" },
        { id: "by", label: "By" },
        { id: "tag", label: "Tag" }
    ];
    const getRows = [
        { activity: <Link to=""><div className="ProjectTaskId">Application Filing</div></Link>, subactivity: "Sub-activity 1", completion: "On-time", by: "Joshua", tag: "Acheivement" },
        { activity: <Link to=""><div className="ProjectTaskId">Hearing</div></Link>, subactivity: "Non-Effective", completion: "On-time", by: "Hementh", tag: " " },
    ];
    const getDesignRows=[
        { activity: <Link to=""><div className="ProjectTaskId">Application Filing</div></Link>, subactivity: "Sub-activity 1", completion: "Delayed", by: "Rajesh", tag: "Knowlegde Management" }
    ];
    return (
        <div>
            <div className="DRtitle">Day Report</div>
            <div className="DayReportContainer">
                <Grid item xs={12} container direction="row" spacing={3}>
                    <Grid item xs={3} container direction="column" spacing={1}>
                        <div className="Reporthead">Date of Report</div>
                        <Labelbox type="datepicker"></Labelbox>
                    </Grid>
                    <Grid item xs={3} container direction="column" spacing={1}>
                        <div className="Reporthead">Employee</div>
                        <Labelbox type="select"></Labelbox>
                    </Grid>
                    <Grid item xs={3} container direction="column" spacing={1}>
                        <div className="Reporthead">Department</div>
                        <Labelbox type="select"></Labelbox>
                    </Grid>
                    <Grid item xs={2} container direction="row" justify="center" alignItems="center">
                        <CustomButton btnName={"Search"} btnCustomColor="customPrimary"  btnDisable={!saveRights||saveRights.display_control&&saveRights.display_control==='N'?true:false} custombtnCSS="Reportbtnsearch" onBtnClick="" />
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
});
export default connect(mapStateToProps) (DayReport);