import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from '../../component/Butttons/button';
import EnhancedTable from '../../component/DynTable/table';
import PlusIcon from "../../images/plusIcon.svg";
import Edit from "../../images/pencil.svg";
import './Usermaster.scss'
import ValidationLibrary from "../../helpers/validationfunction";
const UserMaster = (props) => {
  const header = [
    // { id: 'table_name', label: 'Table Name' },
    { id: 'groupname', label: 'Group Name' },
    { id: 'edit', label: 'Edit' },
  ];
  const status = [
    { id: 'status', label: 'Status' },
    { id: 'type', label: 'Status Type' },
    { id: 'edit', label: 'Edit' },
  ];
  const Class = [
    { id: 'class', label: 'Class Type' },
    { id: 'type', label: 'Class Name' },
    { id: 'des', label: 'Class Description' },
    { id: 'edit', label: 'Edit' },
  ];
  const CheckList = [
    { id: 'class', label: 'Project Type' },
    { id: 'type', label: 'Check List' },
    { id: 'edit', label: 'Edit' },
  ];
  const subStage = [
    { id: 'class', label: 'Stage' },
    { id: 'type', label: 'Sub Stage' },
    { id: 'edit', label: 'Edit' },
  ];


  const [UserMaster,setUserMaster]=useState({
    tablename: {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
      groupname:{
          value:"",
          validation:[{name:"required"}],
          error:null,
          errmsg:null,
      },
      status_type:{
        value:"",
        validation:[{name:"required"}],
        error:null,
        errmsg:null,
    },
    status_name:{
        value:"",
        validation:[{name:"required"}],
        error:null,
        errmsg:null,
    },
    class_type:{
        value:"",
        validation:[{name:"required"}],
        error:null,
        errmsg:null,
    },
    project_type:{
        value:"",
        validation:[{name:"required"}],
        error:null,
        errmsg:null,
    },
    class_name:{
        value:"",
        validation:[{name:"required"}],
        error:null,
        errmsg:null,
    },
    description:{
        value:"",
        validation:[{name:"required"}],
        error:null,
        errmsg:null,
    },
    checklist_name:{
        value:"",
        validation:[{name:"required"}],
        error:null,
        errmsg:null,
    },
    stage:{
        value:"",
        validation:[{name:"required"}],
        error:null,
        errmsg:null,
    },
    sub_stage:{
        value:"",
        validation:[{name:"required"}],
        error:null,
        errmsg:null,
    }
  })
 
  function checkValidation(data, key, multipleId) {
    console.log(data,"onchangeValue")
    var errorcheck = ValidationLibrary.checkValidation(
      data,
      UserMaster[key].validation
    );
    let dynObj = {
      value: data,
      error: !errorcheck.state,
      errmsg: errorcheck.msg,
      validation: UserMaster[key].validation,
    };
   

    let multipleIdList = [];

    if (multipleId) {
      multipleId.map((item) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i] === item.value) {
            multipleIdList.push(item.id);
          }
        }
      });
      dynObj.valueById = multipleIdList.toString();
    }
    // (end)

    setUserMaster((prevState) => ({
      ...prevState,
      [key]: dynObj,
    }));

  
  }
  useEffect(()=>{

  })
 
  return (
    <div className="user_master_parent">
      <div className="user_master_h">User Master</div>
    <Grid container spacing={2} className="user_master_grid">
 
        
          

        {/* groupname */}
    
          <div style={{display:"flex",margin: "20px 0px 20px 0px"}}>

          <Labelbox type="select" placeholder={"Table Name"}
           changeData={(data) => checkValidation(data, "tablename")}
           value={UserMaster.tablename.value}
           error={UserMaster.tablename.error}
           errmsg={UserMaster.tablename.errmsg}
           dropdown={[{id:"1",value:"Group Name"},{id:"2",value:"Status"},{id:"3",value:"Class"},{id:"4",value:"CheckList"}
           ,{id:"5",value:"SubStage"}]}
          />
          
           {/* group name */}
           {UserMaster.tablename.value === "1" &&
          <Labelbox type="text" placeholder={"Enter Group Name"}
          changeData={(data) => checkValidation(data, "groupname")}
          value={UserMaster.groupname.value}
          error={UserMaster.groupname.error}
          errmsg={UserMaster.groupname.errmsg}
          />
          }
         {/* status */}
          {UserMaster.tablename.value === "2" &&
           <div className="table_cont_change">
          <Labelbox type="select" placeholder={"Status Type"}
           changeData={(data) => checkValidation(data, "status_type")}
           value={UserMaster.groupname.value}
           error={UserMaster.groupname.error}
           errmsg={UserMaster.groupname.errmsg}
          />
           <Labelbox type="text" placeholder={"Enter Status Name"}
            changeData={(data) => checkValidation(data, "status_name")}
            value={UserMaster.status_name.value}
            error={UserMaster.status_name.error}
            errmsg={UserMaster.status_name.errmsg}
           />       
        </div>
          }
          {/* class type */}
            {UserMaster.tablename.value === "3" &&
          <div className="table_cont_change">
          <Labelbox type="select" placeholder={"Class Type"}
           changeData={(data) => checkValidation(data, "class_type")}
           value={UserMaster.class_type.value}
           error={UserMaster.class_type.error}
           errmsg={UserMaster.class_type.errmsg}
          />
           <Labelbox type="text" placeholder={"Enter Class Name"}
            changeData={(data) => checkValidation(data, "class_name")}
            value={UserMaster.class_name.value}
            error={UserMaster.class_name.error}
            errmsg={UserMaster.class_name.errmsg}
           />
          <div className="des_crip">
              <Labelbox type="textarea" placeholder={"Enter Description"}
                  changeData={(data) => checkValidation(data, "description")}
                  value={UserMaster.description.value}
                  error={UserMaster.description.error}
                  errmsg={UserMaster.description.errmsg}
           />
           </div>
            </div>
          
          }

         {/* checklist */}
         {UserMaster.tablename.value === "4" &&
           <div className="table_cont_change">
          <Labelbox type="select" placeholder={"Project Type"}
            changeData={(data) => checkValidation(data, "project_type")}
            value={UserMaster.project_type.value}
            error={UserMaster.project_type.error}
            errmsg={UserMaster.project_type.errmsg}
          />
      
           <Labelbox type="text" placeholder={"Enter CheckList Name"}
            changeData={(data) => checkValidation(data, "checklist_name")}
            value={UserMaster.checklist_name.value}
            error={UserMaster.checklist_name.error}
            errmsg={UserMaster.checklist_name.errmsg}
           />
         </div>
          
          }
             {UserMaster.tablename.value === "5" &&
           
         <div className="table_cont_change">
          <Labelbox type="select" placeholder={"Stage"}
            changeData={(data) => checkValidation(data, "stage")}
            value={UserMaster.stage.value}
            error={UserMaster.stage.error}
            errmsg={UserMaster.stage.errmsg}
          />

           <Labelbox type="text" placeholder={"Enter Sub Stage Name"}
             changeData={(data) => checkValidation(data, "sub_stage")}
             value={UserMaster.sub_stage.value}
             error={UserMaster.sub_stage.error}
             errmsg={UserMaster.sub_stage.errmsg}
           />
            </div>
          }

      <div>
       {UserMaster.tablename.value >0&&<img src={PlusIcon} className="plus_icon_user" />}

       </div>
         
       </div>
          
        
      
        

         
       
      </Grid>

      <div className="rate_enhanced_table">
     {UserMaster.tablename.value==="1"&&<EnhancedTable headCells={header}
          rows={""}
           aligncss="aligncss"/>}


{UserMaster.tablename.value==="2"&&<EnhancedTable headCells={status}
          rows={""}
           aligncss="aligncss"/>}

           {UserMaster.tablename.value==="3"&&<EnhancedTable headCells={Class}
          rows={""}
           aligncss="aligncss"/>}

{UserMaster.tablename.value==="4"&&<EnhancedTable headCells={CheckList}
          rows={""}
           aligncss="aligncss"/>}
           
{UserMaster.tablename.value==="5"&&<EnhancedTable headCells={subStage}
          rows={""}
           aligncss="aligncss"/>}
      </div>
      
      
   
        
        
    </div>
  )
}


export default UserMaster;