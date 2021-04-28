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
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from "../../helpers/validationfunction";

const StageMonitor = (props) => {

  const header = [
    // { id: 'table_name', label: 'Table Name' },
    { id: 'stages', label: 'Stages' },
    { id: 'subStage', label: 'Sub Stages' },
    { id: 'compDate', label: 'Compliance Date' },
    { id: 'actDate', label: 'Actual Date' },
    { id: 'statusImg', label: '' },
  ];
  const [projectDetails, setProjectDetails] = useState({})
  const [idDetails, setidDetails] = useState({})
  const [stageList, setStageList] = useState([]);
  const dispatch = useDispatch();
  const [updateParam, setupdateParam] = useState({

    compDate: {
        value: "2021-04-28",
        validation: [],
        error: null,
        errmsg: null,
    },
    stagelistid: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
  }
  })

  function checkValidation(data, key, multipleId) {
    var errorcheck = ValidationLibrary.checkValidation(
      data,
      updateParam[key].validation
    );
    let dynObj = {
      value: data,
      error: !errorcheck.state,
      errmsg: errorcheck.msg,
      validation: updateParam[key].validation
    }
    setupdateParam(prevState => ({
      ...prevState,
      [key]: dynObj,
    }));

    updateParam[key].value=data;
  };

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
    props.stageList.map((data) =>{
    let b = true;
    if(b && (data.actual_date ==true)){
      b= false;
      let key ='stagelistid';
      let obj = {
        value: data.stage_list_id,
        validation: [],
      error: null,
      errmsg: null,
      }
      setupdateParam(prevState => ({
        ...prevState,
        [key]: obj,
      }));
    StageListData.push({ stage: data.stage,
    substage: data.sub_stage,compliancedate: data.compliance_date,actualdate: <Labelbox type='datepicker' placeholder={'Actual Date'} 
    changeData={(data)  => checkValidation(data, 'compDate')} 
    value={updateParam.compDate.value} error={updateParam.compDate.error}
     errmsg={updateParam.compDate.errmsg}/>,statusImg: data.statusImg});
  }else{
    StageListData.push({ stage: data.stage,
      substage: data.sub_stage,compliancedate: data.compliance_date,actualdate: data.actual_date,statusImg: data.statusImg})
  }
}
)
setStageList({ StageListData })

  }, [props.stageList,props.ProjectDetails,]);


  function SubmitFunction() {
    dispatch(insertStageMaonitor(updateParam));
  }

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
          onBtnClick={SubmitFunction}
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