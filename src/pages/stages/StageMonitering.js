import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { useDispatch, connect } from "react-redux";
import './StageMonitering.scss'
import CustomButton from '../../component/Butttons/button';
import EnhancedTable from '../../component/DynTable/table';
import Calender from "../../images/calender.svg";
import Like from "../../images/like.svg";
import Unlike from "../../images/unlike.svg";
import More from "../../images/more.svg";
import {getStageMonitor,insertStageMaonitor} from "../../actions/StageMonotorrAction";
import { useParams } from "react-router-dom";
import { getProjectDetails } from "../../actions/ProjectFillingFinalAction";  
const StageMonitor = (props) => {

  const header = [
    // { id: 'table_name', label: 'Table Name' },
    { id: 'stages', label: 'Stages' },
    { id: 'subStage', label: 'Sub Stages' },
    { id: 'compDate', label: 'Compliance Date' },
    { id: 'actDate', label: 'Actual Date' },
  ];
  const [projectDetails, setProjectDetails] = useState({})
  const [idDetails, setidDetails] = useState({})
  const [stageList, setStageList] = useState([]);
  const dispatch = useDispatch();
  let { rowId } = useParams();
  useEffect(() => {
    
    dispatch(getProjectDetails(rowId))
    dispatch(getStageMonitor(props.ProjectDetails))
   // dispatch(insertStageMaonitor());
   
    
    
  }, []);

  useEffect(() => {
    setProjectDetails(props.ProjectDetails);
    props.ProjectDetails.length > 0 && setidDetails({
        project_id:props.ProjectDetails[0].project_id,
        client_id:props.ProjectDetails[0].client_id,
    })
    
    let StageListData = []
    props.stageList.map((data) =>
    StageListData.push({ stage: data.stage,
    substage: data.sub_stage,actualdate: data.actual_date,compliancedate: data.compliance_date})
)
setStageList({ StageListData })

  }, [props.stageList,props.ProjectDetails,]);


  return (
    <div>
      <Grid container spacing={2} className="ratemaster_firstgrid">
      <EnhancedTable headCells={header}
          rows={stageList.length == 0 ? stageList : stageList.StageListData} />
      </Grid>
      <div className="customstagemonitorbtn">
        <CustomButton
          btnName={"Save"}
          btnCustomColor="customPrimary"
          custombtnCSS={"btnstagemonitor"}

        />
        <CustomButton
          btnName={"Cancel"}
          custombtnCSS={"btnstagemonitor"}

        />
      </div>
    </div>
  )
}

const mapStateToProps = (state) =>

({
    
     stageList: state.StageMonotorReducer.getStageMonitor || [],
     ProjectDetails: state.ProjectFillingFinalReducer.getProjectDetails || [],
    
});

export default connect(mapStateToProps)(StageMonitor);