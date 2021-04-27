import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from '../../component/Butttons/button';

import EnhancedTable from '../../component/DynTable/table';
import PlusIcon from "../../images/plusIcon.svg";
import DynModel from "../../component/Model/model";
import './usergroups.scss'
import { Checkbox } from 'antd';
import Edit from "../../images/pencil.svg";

const UserGroups = (props) => {
  const header = [
    // { id: 'table_name', label: 'Table Name' },
    { id: 'employee', label: 'Employee' },
    { id: 'group', label: 'Group' },
    { id: 'edit', label: 'Edit' },
  ];

  const [UserGroupsList, setUserGroupsList] = useState([])
  const [usergroupmodel, setUsergroupmodel] = useState(false);

  const [isLoaded, setIsLoaded] = useState(true);
  useEffect(() => {

    if (isLoaded) {

        var groupList = [];

        var listarray = {
          "employee": "Kaveri",
          "group":"Interviewer,Employee",
          "process_type": "<img src={Edit} style={{cursor: 'pointer',width:19}} onClick={()=>setUsergroupmodel(true)} />",
        }
        groupList.push(listarray);
        listarray = {
          "employee": "Pradish",
          "group": "Interviewer,Employee",
          "process_type": <img src={Edit} style={{cursor: 'pointer',width:19}} onClick={()=>setUsergroupmodel(true)} />,
        }
        groupList.push(listarray);
        
        setUserGroupsList({ groupList })

      setIsLoaded(false);
    }

  })


  function checkValidation(data, key, multipleId) {

    if (data && key  == "group") {

     console.log("group")
    }
    if (data && key  == "employee") {

      console.log("employee")
     }


  }

 
  return (
    <div>
      <div className="user_groups">User Groups</div>
    <Grid container spacing={2} className="ratemaster_firstgrid">
        <Grid
          item
          xs={7}
          container
          direction="row"
          className="spaceBtGrid"
          alignItems="center"
        >
          <Grid item xs={6}>
          <Labelbox type="select" placeholder={"Employee"}
           
            dropdown=""
            changeData={(data) => checkValidation(data, "employee")}
            
          />
           </Grid>
          <Grid item xs={6}>
          <Labelbox type="select" placeholder={"Group"}
            
            changeData={(data) => checkValidation(data, "group")}
            dropdown=""
            
          />
          </Grid>
        </Grid>
        <div style={{display: 'flex',justifyContent: 'flex-end',marginLeft: 15}}>
          <img src={PlusIcon} style={{cursor: 'pointer',width:19,marginTop: -23}}  />
          </div>
       
      </Grid>

      <div className="rate_enhanced_table">
        <EnhancedTable headCells={header}
          rows={UserGroupsList.length == 0 ? UserGroupsList : UserGroupsList.groupList} />
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
    </div>
  )
}


export default (UserGroups);