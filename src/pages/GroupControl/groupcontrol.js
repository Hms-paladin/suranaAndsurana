import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from '../../component/Butttons/button';

import EnhancedTable from '../../component/DynTable/table';
import PlusIcon from "../../images/plusIcon.svg";
import DynModel from "../../component/Model/model";
import './groupcontrol.scss'
import { Checkbox } from 'antd';
import Edit from "../../images/pencil.svg";
import {
  getGroupControlList
} from "../../actions/UserGroupAction";
import { connect, useDispatch } from "react-redux";
const GroupControl = (props) => {
  const header = [
    // { id: 'table_name', label: 'Table Name' },
    { id: 'group', label: 'Group' },
    { id: 'control', label: 'Control' },

    { id: 'edit', label: 'Edit' },
  ];
  const dispatch = useDispatch();
  const [GroupControlList, setGroupControlList] = useState([])
  // const [groupcontrol, setGroupcontrolmodel] = useState(false);
  const [usergroupmodel, setUsergroupmodel] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    dispatch(getGroupControlList());

  }, []);

  useEffect(() => {
    
    
    var dets = props.getGroupControlLists;
    var groupList = [];
    for(var i=0; i< dets.length; i++){
      var listarray = {
        "control": dets[i].control,
        "group":dets[i].group_name,
        "edit": <img src={Edit} style={{cursor: 'pointer',width:19}} onClick={()=>setUsergroupmodel(true)} />,
      }
      groupList.push(listarray);
        
        
    }
    setGroupControlList({ groupList })

  }, [props.groupLists
  ]);
 /* useEffect(() => {

    if (isLoaded) {

      var groupList = [];

      var listarray = {
        "control": <div className="tooltip">
          Resume - Create Resume ,Project - Go,...
          <span className="tooltiptext">Resume - Create Resume ,Project - Go,Project - Adhoc Task</span>
        </div>,
        "group": "Interviewer",
        "edit": <img src={Edit} style={{ cursor: 'pointer', width: 19 }} />,
      }
      groupList.push(listarray);
      listarray = {
        "control": "Project - Create Project ,Project - Go,Project - Adhoc Task",
        "group": "Project Creation",
        "edit": <img src={Edit} style={{ cursor: 'pointer', width: 19 }} />,
      }
      groupList.push(listarray);

      setGroupControlList({ groupList })

      setIsLoaded(false);
    }

  }) */

  return (
    <div>
      <div className="group_control">Group Control</div>
      <div className="rate_enhanced_table">
        <EnhancedTable headCells={header}
          rows={GroupControlList.length == 0 ? GroupControlList : GroupControlList.groupList} />
      </div>
      <DynModel
          modelTitle={"Edit Group Membership"}
          handleChangeModel={usergroupmodel}
          handleChangeCloseModel={(bln) => setUsergroupmodel(bln)}
          content={
            <div className="successModel">

              <div> <label className="usergroup_label">Employee :&nbsp;Kaveri</label></div>
              <div className="usergroupmodelDiv">
                <div className="usergroupcheckboxDiv"><Checkbox  /> &nbsp;&nbsp;<label style={{color:'black'}}>Interview Approval</label> </div>
                <div  className="usergroupcheckboxDiv"> <Checkbox  />&nbsp;&nbsp;<label style={{color:'black'}}>Interviewer</label> </div>
                <div  className="usergroupcheckboxDiv"> <Checkbox  />&nbsp;&nbsp;<label style={{color:'black'}}>HR Assistant</label> </div>
              </div>
              <div className="customUsergroupbtn">
                <CustomButton
                  btnName={"Save"}
                  btnCustomColor="customPrimary"
                  custombtnCSS={"btnUsergroup"}
                  onBtnClick={()=>setUsergroupmodel(false)}
                />
                <CustomButton
                 btnName={"Cancel"} 
                 custombtnCSS={"btnUsergroup"}
                 onBtnClick={()=>setUsergroupmodel(false)}
                  />
              </div>
            </div>

          }
          width={400}
        />
      {/* <DynModel
        modelTitle={"Edit Group Membership"}
        handleChangeModel={groupcontrol}
        handleChangeCloseModel={(bln) => setGroupcontrolmodel(bln)}
        content={
          <div className="successModel">

            <div> <label className="usergroup_label">Employee :&nbsp;Kaveri</label></div>
            <div className="groupcontrolDiv">
              <div className="usergroupcheckboxDiv"><Checkbox /> &nbsp;&nbsp;<label style={{ color: 'black' }}>Interview Approval</label> </div>
              <div className="usergroupcheckboxDiv"> <Checkbox />&nbsp;&nbsp;<label style={{ color: 'black' }}>Interviewer</label> </div>
              <div className="usergroupcheckboxDiv"> <Checkbox />&nbsp;&nbsp;<label style={{ color: 'black' }}>HR Assistant</label> </div>
            </div>
            <div className="customUsergroupbtn">
              <CustomButton
                btnName={"Save"}
                btnCustomColor="customPrimary"
                custombtnCSS={"btnUsergroup"}
                onBtnClick={() => setGroupcontrolmodel(false)}
              />
              <CustomButton
                btnName={"test"}
                onBtnClick={() => setGroupcontrolmodel(false)}
              />
            </div>
          </div>

        }
        width={400}
      /> */}
    </div>
  )
}

const mapStateToProps = (state) =>
// console.log(state.getOptions.getProcessType, "getProcessType")
({

  getGroupControlLists: state.UserGroupReducer.getGroupControlLists || [],
});

export default connect(mapStateToProps)(GroupControl);
