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
    // { id: 'table_name', label: 'Table Name' },
    { id: 'status', label: 'Status' },
    { id: 'type', label: 'Status Type' },
    { id: 'edit', label: 'Edit' },
  ];
  const Class = [
    // { id: 'table_name', label: 'Table Name' },
    { id: 'class', label: 'Class Type' },
    { id: 'type', label: 'Class Name' },
    { id: 'des', label: 'Class Description' },
    { id: 'edit', label: 'Edit' },
  ];
  const CheckList = [
    // { id: 'table_name', label: 'Table Name' },
    { id: 'class', label: 'Project Type' },
    { id: 'type', label: 'Check List' },
    { id: 'edit', label: 'Edit' },
  ];
  const subStage = [
    // { id: 'table_name', label: 'Table Name' },
    { id: 'class', label: 'Stage' },
    { id: 'type', label: 'Sub Stage' },
    { id: 'edit', label: 'Edit' },
  ];

  const [UserGroupsList, setUserGroupsList] = useState([])
  const [usergroupmodel, setUsergroupmodel] = useState(false);

  const [isLoaded, setIsLoaded] = useState(true);
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
    
        <Grid  item xs={3} container direction="row" alignItems="center">
             <Grid item xs={12}>
          <Labelbox type="select" placeholder={"Table Name"}
           changeData={(data) => checkValidation(data, "tablename")}
           value={TableName.tablename.value}
           error={TableName.tablename.error}
           errmsg={TableName.tablename.errmsg}
           dropdown={[{id:"1",value:"Group Name"},{id:"2",value:"Status"},{id:"3",value:"Class"},{id:"4",value:"CheckList"},{id:"5",value:"SubStage"}]}
          />
           </Grid>
           </Grid>
           {TableName.tablename.value === "1" &&
               <Grid item xs={8} container direction="row" spacing={2}>
          <Grid item xs={4} className="items_align">
          <Labelbox type="text" placeholder={"Enter Group Name"}
          />
          </Grid>
          <Grid item xs={1} className="items_align">
        
            <img src={PlusIcon} style={{cursor: 'pointer'}}  />
            </Grid>
          </Grid>
          }
          {TableName.tablename.value === "2" &&
             <Grid item xs={8} container direction="row" spacing={2}>
          <Grid item xs={4} className="items_align">
          <Labelbox type="select" placeholder={"Status Type"}
          />
          </Grid>
           <Grid item xs={4} className="items_align">
           <Labelbox type="text" placeholder={"Enter Status Name"}
           />
           </Grid>
           <Grid item xs={1} className="items_align">
        
        <img src={PlusIcon} style={{cursor: 'pointer'}}  />
        </Grid>
           </Grid>
           
          
          }
            {TableName.tablename.value === "3" &&
             <Grid item xs={8} container direction="row" spacing={2}>
          <Grid item xs={3} className="items_align">
          <Labelbox type="select" placeholder={"Class Type"}
          />
          </Grid>
           <Grid item xs={3} className="items_align">
           <Labelbox type="text" placeholder={"Enter Class Name"}
           />
           </Grid>
           <Grid item xs={3} className="items_align_des">
          <Labelbox type="textarea" placeholder={"Enter Description"}/>
          
           </Grid>
           <Grid item xs={1} className="items_align">
        
            <img src={PlusIcon} style={{cursor: 'pointer',width:"20px"}}  />
           </Grid>
           </Grid>
           
          
          }
         
         {TableName.tablename.value === "4" &&
             <Grid item xs={8} container direction="row" spacing={2}>
          <Grid item xs={4} className="items_align">
          <Labelbox type="select" placeholder={"Project Type"}
          />
          </Grid>
           <Grid item xs={4} className="items_align">
           <Labelbox type="text" placeholder={"Enter CheckList Name"}
           />
           </Grid>
           
           <Grid item xs={1} className="items_align">
        
            <img src={PlusIcon} style={{cursor: 'pointer',width:"20px"}}  />
           </Grid>
           </Grid>
           
          
          }
             {TableName.tablename.value === "5" &&
             <Grid item xs={8} container direction="row" spacing={2}>
          <Grid item xs={4} className="items_align">
          <Labelbox type="select" placeholder={"Stage"}
          />
          </Grid>
           <Grid item xs={4} className="items_align">
           <Labelbox type="text" placeholder={"Enter Sub Stage Name"}
           />
           </Grid>
           
           <Grid item xs={1} className="items_align">
        
            <img src={PlusIcon} style={{cursor: 'pointer',width:"20px"}}  />
           </Grid>
           </Grid>
           
          
          }
         
       
          
        
       
        

         
       
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