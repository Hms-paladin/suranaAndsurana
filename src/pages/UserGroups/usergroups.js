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
  getEmployeeList,InsertUsergroupMaster,editEmployeeGroup,
} from "../../actions/UserGroupAction";
import { apiurl } from "../../utils/baseUrl.js";
import axios from "axios";
import { notification } from "antd";
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

  const [groupsListModel, setgroupsListModel] = useState([])

  const [employees, setemployees] = useState({})
  const [groups, setgroups] = useState({})

  const [empName, setempName] = useState("")
  const [checkedGroups, setcheckedGroups] = useState([])

  const [isLoaded, setIsLoaded] = useState(true);
  const [rights, setRights] = useState([])
  useEffect(() => {
    dispatch(getGroupList());
    dispatch(getEmployeeList());
    dispatch(getEmployeeGroupDetails());

  }, []);


  const [userForm, setuserForm]= useState({
    employee: {
      value: "",
      validation: [{"name":"required"}],
      error: null,
      errmsg: null,
    },
    group: {
      valueById:"",
      value: "",
      validation: [{"name":"required"}],
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
    for(let i=0; i< dets.length; i++){
     // var o = dets[i];
      let o = JSON.parse(JSON.stringify(dets[i]));
     
      let a = <img src={Edit} style={{cursor:  rights&&rights.display_control&&rights.display_control==="Y"?'pointer':'not-allowed',width:19}} onClick={ ()=>(rights&&rights.display_control&&rights.display_control==="Y"&&onModealOpen(true,o))} />
      let listarray = {
        "employee": dets[i].name,
        "group":dets[i].group_name,
        "process_type": a,
      }
      groupList.push(listarray);
        
         
    }
    setUserGroupsList({ groupList })

  }, [props.groupLists,
  props.employeeLists,props.employeeGroupDetLists
  ]);


 function onModealOpen(flg,obj){
console.log("");
setempName(obj.name);
try {

  axios({
      method: 'POST',
      url: apiurl + 'get_emp_group_details',
      data: {
          "emp_id":obj.emp_id
      }
  })
      .then((response) => {
        var groups = response.data.data ;
        for(var i=0;i < groups.length; i++){
          groups[i]['emp_id']=obj.emp_id;
        }
        setcheckedGroups(groups);
          //dispatch({ type: GET_GROUP_EMP, payload: response.data.data })
          
      })

} catch (err) {
  console.log("error", err);
}
setUsergroupmodel(flg,obj);

 }


  function onSubmit() {
    var mainvalue = {};
    var targetkeys = Object.keys(userForm);
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(
        userForm[targetkeys[i]].value,
        userForm[targetkeys[i]].validation
      );
      userForm[targetkeys[i]].error = !errorcheck.state;
      userForm[targetkeys[i]].errmsg = errorcheck.msg;
      mainvalue[targetkeys[i]] = userForm[targetkeys[i]].value;
    }
    var filtererr = targetkeys.filter((obj) => userForm[obj].error == true);
    console.log("checkuser",userForm)

    if (filtererr.length >0) {
    } else {
    var groups=[userForm.group.valueById];
    groups.push()
    var data = {
      "emp_id": userForm.employee.value,
      "group_id":groups,
    }

    dispatch(InsertUsergroupMaster(data)).then((response) => {
      handleCancel();
    })
  }

  }

  const handleCancel = () => {
    let From_key = [
      "employee",
      "group",
    ];

    From_key.map((data) => {
        userForm[data].value = "";
    });
    setuserForm((prevState) => ({
      ...prevState,
    }));
  };

  function submitGroup(){
      
    let obj={"group":[]}; 
    for(var i=0; i< checkedGroups.length; i++ ){
     let oo=checkedGroups[i];
     let pOb = {
       "group_id": oo.group_id,
       "emp_id": oo.emp_id,
       "is_checked": oo.is_checked,
        };
        obj.group.push(pOb);
    }
   

    dispatch(editEmployeeGroup(obj));
    setUsergroupmodel(false);
   }
   function handelCheck(event,data){
    console.log("mapping", data);
   let oo= checkedGroups;
   let d=[];
   for(var i=0;i < oo.length; i++){
     if(oo[i] && oo[i].group_id == data.group_id ){
       if(data.is_checked == 0){
        oo[i].is_checked =1;
        data.is_checked =1;
       }else{
        oo[i].is_checked =0;
        data.is_checked =0;
      }
      d.push(data);
    }else{
      d.push(oo[i]);
    }
  }

  setcheckedGroups(
    prevState => ({
        ...prevState,
    })
);


setcheckedGroups(d);
   }
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

   ///*****user permission**********/
useEffect(() => {
    if(props.UserPermission.length>0&&props.UserPermission){
       let data_res_id = props.UserPermission.find((val) => { 
       return (
           "User Group - Add" == val.control
       ) 
   })
   setRights(data_res_id)
   }
  
   }, [props.UserPermission]);
  
  
   function rightsNotification(){
    notification.success({
        message: "You are not Authorized. Please Contact Administrator",
    });
  }
  /////////////
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
            mode="multiple"
            dropdown={groups.groupsData}
            changeData={(data) => checkValidation(data, "group",groups.groupsData)}
            value={userForm.group.value}
            error={userForm.group.error}
            errmsg={userForm.group.errmsg}
           
            
          />
          </Grid>
        </Grid>
        <div style={{display: 'flex',justifyContent: 'flex-end',marginLeft: 15}}>
          <img src={PlusIcon} onClick={()=>rights&&rights.display_control&&rights.display_control==="Y"&&onSubmit()} style={{cursor: rights&&rights.display_control&&rights.display_control==="Y"?'pointer':'not-allowed',width:19,marginTop: -23}}  />
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

              <div> <label className="usergroup_label">Employee :&nbsp; {empName}</label></div>
              <div className="usergroupmodelDiv">
              {checkedGroups.length > 0 && checkedGroups.map((data) => {
                return (
             
                <div className="usergroupcheckboxDiv"><Checkbox  checked={data.is_checked} onClick={(event) => handelCheck(event,data)} name={data.group_id} /> &nbsp;&nbsp;<label style={{color:'black'}}>{data.group_name}</label> </div>
            

)

})}   </div>
              <div className="customUsergroupbtn">
                <CustomButton
                  btnName={"Save"}
                  btnCustomColor="customPrimary"
                  custombtnCSS={"btnUsergroup"}
                  // btnDisable={!saveRights||saveRights.display_control&&saveRights.display_control==='N'?true:false}
                  onBtnClick={()=>submitGroup()}
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
  getGroupsForEmp : state.UserGroupReducer.getGroupsForEmp || [],
  UserPermission: state.UserPermissionReducer.getUserPermission || [],
});

export default connect(mapStateToProps)(UserGroups);