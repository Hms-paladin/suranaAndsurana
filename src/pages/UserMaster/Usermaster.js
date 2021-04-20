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


  const [TableName,setTableName]=useState({
    tablename: {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
  })
 
  function checkValidation(data, key, multipleId) {
    console.log(data,"onchangeValue")
    var errorcheck = ValidationLibrary.checkValidation(
      data,
      TableName[key].validation
    );
    let dynObj = {
      value: data,
      error: !errorcheck.state,
      errmsg: errorcheck.msg,
      validation: TableName[key].validation,
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

    setTableName((prevState) => ({
      ...prevState,
      [key]: dynObj,
    }));

  
  }
 
  return (
    <div className="user_master_parent">
      <div className="user_master_h">User Master</div>
    <Grid container spacing={2} className="user_master_grid">
 
        
          

        {/* groupname */}
    
          <div style={{display:"flex",margin: "20px 0px 20px 0px"}}>

          <Labelbox type="select" placeholder={"Table Name"}
           changeData={(data) => checkValidation(data, "tablename")}
           value={TableName.tablename.value}
           error={TableName.tablename.error}
           errmsg={TableName.tablename.errmsg}
           dropdown={[{id:"1",value:"Group Name"},{id:"2",value:"Status"},{id:"3",value:"Class"},{id:"4",value:"CheckList"}
           ,{id:"5",value:"SubStage"}]}
          />
          
           {/* group name */}
           {TableName.tablename.value === "1" &&
          <Labelbox type="text" placeholder={"Enter Group Name"}
          />
          }

          {TableName.tablename.value === "2" &&
           <div className="table_cont_change">
          <Labelbox type="select" placeholder={"Status Type"}
          />
           <Labelbox type="text" placeholder={"Enter Status Name"}
           />       
        </div>
          }
            {TableName.tablename.value === "3" &&
          <div className="table_cont_change">
          <Labelbox type="select" placeholder={"Class Type"}
          />
       
          
           <Labelbox type="text" placeholder={"Enter Class Name"}
           />
       
        
          <div><Labelbox type="textarea" placeholder={"Enter Description"}/></div>
          
        
          
        
         
            </div>
          
          }
         
         {TableName.tablename.value === "4" &&
           <div className="table_cont_change">
          <Labelbox type="select" placeholder={"Project Type"}
          />
      
           <Labelbox type="text" placeholder={"Enter CheckList Name"}
           />
        
        
            </div>
          
          }
             {TableName.tablename.value === "5" &&
           
         <div className="table_cont_change">
          <Labelbox type="select" placeholder={"Stage"}
          />

           <Labelbox type="text" placeholder={"Enter Sub Stage Name"}
           />
            </div>
          }

      <div>
       {TableName.tablename.value >0&&<img src={PlusIcon} className="plus_icon_user" />}

       </div>
         
       </div>
          
        
      
        

         
       
      </Grid>

      <div className="rate_enhanced_table">
     {TableName.tablename.value==="1"&&<EnhancedTable headCells={header}
          rows={""}
           aligncss/>}


{TableName.tablename.value==="2"&&<EnhancedTable headCells={status}
          rows={""}
           aligncss/>}

           {TableName.tablename.value==="3"&&<EnhancedTable headCells={Class}
          rows={""}
           aligncss/>}

{TableName.tablename.value==="4"&&<EnhancedTable headCells={CheckList}
          rows={""}
           aligncss/>}
           
{TableName.tablename.value==="5"&&<EnhancedTable headCells={subStage}
          rows={""}
           aligncss/>}
      </div>
      
      
   
        
        
    </div>
  )
}


export default UserMaster;