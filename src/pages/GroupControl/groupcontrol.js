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
import { apiurl } from "../../utils/baseUrl.js";
import axios from "axios";
import {
  getGroupControlList,editEmployeeGroup,editGroupControl,InsertGroupControlMaster,getGroupList,getControl,
} from "../../actions/UserGroupAction";
import { connect, useDispatch } from "react-redux";
import ValidationLibrary from "../../helpers/validationfunction";
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
  const [checkedGroups, setcheckedGroups] = useState([]);
  const [controls, setcontrols] = useState([])
  const [groups, setgroups] = useState([])
  useEffect(() => {
    dispatch(getGroupControlList());
    dispatch(getGroupList());
    dispatch(getControl());

  }, []);
  const [userForm, setuserForm]= useState({
    controls: {
      valueById:"",
      value: "",
      validation: [{ name: "required" }],
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
    
    
    var dets = props.getGroupControlLists;
    var groupList = [];
    for(let i=0; i< dets.length; i++){
      let o = JSON.parse(JSON.stringify(dets[i]));
      var listarray = {
        "group":dets[i].group_name,
        "control": dets[i].control,
       
        "edit": <img src={Edit} style={{cursor: 'pointer',width:19}} onClick={()=>onModealOpen(true,o)} />,
      }
      groupList.push(listarray);
        
        
    }
    setGroupControlList({ groupList })

    let groupsData = []
    props.groupLists.map((data) =>
    groupsData.push({
        value: data.group_name,
        id: data.group_id
      })
    )
    setgroups({ groupsData })

    let controlData = []
    props.controlList.map((data) =>
    controlData.push({
        value: data.control,
        id: data.screen_control_id
      })
    )
    setcontrols({ controlData })


  }, [props.getGroupControlLists,props.groupLists,props.controlList,
  ]);

  function onModealOpen(flg,obj){
    
    try {
    
      axios({
          method: 'POST',
          url: apiurl + 'get_group_control_details',
          data: {
              "group_id":obj.group_id
          }
      })
          .then((response) => {
            var groups = response.data.data ;
            for(let i=0; i< groups.length; i++ ){
              groups[i]['group_id'] =obj.group_id;
            }
            setcheckedGroups(groups);
              //dispatch({ type: GET_GROUP_EMP, payload: response.data.data })
              
          })
    
    } catch (err) {
      console.log("error", err);
    }
    setUsergroupmodel(flg,obj);
    
     }
     function handelCheck(event,data){
      console.log("mapping", data);
     let oo= checkedGroups;
     let d=[];
     for(var i=0;i < oo.length; i++){
       if(oo[i] && oo[i].screen_control_id == data.screen_control_id ){
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
     function submitGroup(){
      
      let obj={"control":[]}; 
      for(let i=0; i< checkedGroups.length; i++ ){
       let oo=checkedGroups[i];
       let pOb = {
         "group_id": oo.group_id,
         "screen_control_id": oo.screen_control_id,
         "is_checked": oo.is_checked,
          };
          obj.control.push(pOb);
      }
     

      dispatch(editGroupControl(obj));
      setUsergroupmodel(false);
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
        
      }else{
    //  var contr=[userForm.controls.value];
    //   contr.push()
    //   var data = {
        
    //   }
  
      dispatch(InsertGroupControlMaster(userForm)).then((response) => {
        handleCancel();
      })
  
    }
  }

    const handleCancel = () => {
      let From_key = [
        "controls",
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
      <div className="group_control">Group Control</div>
     
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
          <Labelbox type="select" placeholder={"Group"}
            
            dropdown={groups.groupsData}
            changeData={(data) => checkValidation(data, "group")}
            value={userForm.group.value}
            error={userForm.group.error}
            errmsg={userForm.group.errmsg}
           
            
          />
         
           </Grid>
          <Grid item xs={6}>
          <Labelbox type="select" placeholder={"Controls"}
            mode="multiple"
            dropdown={controls.controlData}
            changeData={(data) => checkValidation(data, "controls",controls.controlData)}
            value={userForm.controls.value}
            error={userForm.controls.error}
            errmsg={userForm.controls.errmsg}
            
          />
          </Grid>
        </Grid>
        <div style={{display: 'flex',justifyContent: 'flex-end',marginLeft: 15}}>
          <img src={PlusIcon} onClick={onSubmit} style={{cursor: 'pointer',width:19,marginTop: -23}}  />
          </div>
       
      </Grid>
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

              <div className="usergroupmodelDiv">
              {checkedGroups.length > 0 && checkedGroups.map((data) => {
                return (
             
                <div className="usergroupcheckboxDiv"><Checkbox  checked={data.is_checked} onClick={(event) => handelCheck(event,data)} name={data.screen_control_id} /> &nbsp;&nbsp;<label style={{color:'black'}}>{data.control}</label> </div>
            

)

})}  </div>
              <div className="customUsergroupbtn">
                <CustomButton
                  btnName={"Save"}
                  btnCustomColor="customPrimary"
                  custombtnCSS={"btnUsergroup"}
                  onBtnClick={()=>submitGroup()} //setUsergroupmodel(false)}
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
  groupLists: state.UserGroupReducer.groupLists || [],
  controlList: state.UserGroupReducer.getControl || [],
});

export default connect(mapStateToProps)(GroupControl);