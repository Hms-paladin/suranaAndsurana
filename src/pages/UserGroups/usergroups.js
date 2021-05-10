import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from '../../component/Butttons/button';
import { connect, useDispatch } from "react-redux";
import EnhancedTable from '../../component/DynTable/table';
import PlusIcon from "../../images/plusIcon.svg";
import DynModel from "../../component/Model/model";
import './usergroups.scss'
import { Checkbox } from 'antd';
import ValidationLibrary from "../../helpers/validationfunction";
import Edit from "../../images/pencil.svg";
import {
  getGroupList,getEmployeeGroupDetails,
  getEmployeeList,InsertUsergroupMaster,
} from "../../actions/UserGroupAction";

const UserGroups = (props) => {
  const dispatch = useDispatch();
  const header = [
    // { id: 'table_name', label: 'Table Name' },
    { id: 'employee', label: 'Employee' },
    { id: 'group', label: 'Group' },
    { id: 'edit', label: 'Edit' },
  ];

  
  const [UserGroupsList, setUserGroupsList] = useState([])
  const [usergroupmodel, setUsergroupmodel] = useState(false);

  const [employees, setemployees] = useState({})
  const [groups, setgroups] = useState({})

  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    dispatch(getGroupList());
    dispatch(getEmployeeList());
    dispatch(getEmployeeGroupDetails());

  }, []);


  const [userForm, setuserForm]= useState({
    employee: {
      value: "",
      //validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    group: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    }
  });

  useEffect(() => {
    
    let groupsData = []
    props.groupLists.map((data) =>
    groupsData.push({
        value: data.group_name,
        id: data.group_id
      })
    )
    setgroups({ groupsData })

    let empsData = []
    props.employeeLists.map((data) =>
    empsData.push({
        value: data.name,
        id: data.emp_id
      })
    )
    setemployees({ empsData })

    var dets = props.employeeGroupDetLists;
    var groupList = [];
    for(var i=0; i< dets.length; i++){
      var listarray = {
        "employee": dets[i].name,
        "group":dets[i].group_name,
        "process_type": <img src={Edit} style={{cursor: 'pointer',width:19}} onClick={()=>setUsergroupmodel(true)} />,
      }
      groupList.push(listarray);
        
        
    }
    setUserGroupsList({ groupList })

  }, [props.groupLists,
  props.employeeLists,props.employeeGroupDetLists
  ]);
/*
  useEffect(() => {

    if (isLoaded) {

        var groupList = [];

        var listarray = {
          "employee": "Kaveri",
          "group":"Interviewer,Employee",
          "process_type": <img src={Edit} style={{cursor: 'pointer',width:19}} onClick={()=>setUsergroupmodel(true)} />,
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
*/
  function onSubmit() {
    var groups=[userForm.group.value];
    groups.push()
    var data = {
      "emp_id": userForm.employee.value,
      "group_id": groups,
    }

    dispatch(InsertUsergroupMaster(data)).then((response) => {
      handleCancel();
    })

  }

  const handleCancel = () => {
    let From_key = [
      "employee",
      "group",
    ];

    From_key.map((data) => {
      try {
        userForm[data].value = "";
        console.log("mapping", userForm[data].value);
      } catch (error) {
        throw error;
      }
    });
    setuserForm((prevState) => ({
      ...prevState,
    }));
  };
  function checkValidation(data, key, multipleId) {

    var errorcheck = ValidationLibrary.checkValidation(
      data,
      userForm[key].validation
    );
    let dynObj = {
      value: data,
      error: !errorcheck.state,
      errmsg: errorcheck.msg,
      validation: userForm[key].validation
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

    setuserForm(prevState => ({
      ...prevState,
      [key]: dynObj,
    }));

  };

 
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
           
            dropdown={employees.empsData}
            changeData={(data) => checkValidation(data, "employee")}
            value={userForm.employee.value}
            error={userForm.employee.error}
            errmsg={userForm.employee.errmsg}
            
          />
           </Grid>
          <Grid item xs={6}>
          <Labelbox type="select" placeholder={"Group"}
            
            dropdown={groups.groupsData}
            changeData={(data) => checkValidation(data, "group")}
            value={userForm.group.value}
            error={userForm.group.error}
            errmsg={userForm.group.errmsg}
           
            
          />
          </Grid>
        </Grid>
        <div style={{display: 'flex',justifyContent: 'flex-end',marginLeft: 15}}>
          <img src={PlusIcon} onClick={onSubmit} style={{cursor: 'pointer',width:19,marginTop: -23}}  />
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

const mapStateToProps = (state) =>
// console.log(state.getOptions.getProcessType, "getProcessType")
({

  groupLists: state.UserGroupReducer.groupLists || [],
  employeeLists: state.UserGroupReducer.employeeLists || [],
  employeeGroupDetLists : state.UserGroupReducer.employeeGroupDetLists || [],
});

export default connect(mapStateToProps)(UserGroups);