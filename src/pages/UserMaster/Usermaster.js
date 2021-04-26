import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from '../../component/Butttons/button';
import EnhancedTable from '../../component/DynTable/table';
import PlusIcon from "../../images/plusIcon.svg";
import Edit from "../../images/pencil.svg";
import './Usermaster.scss'
import {connect,useDispatch} from 'react-redux'
import ValidationLibrary from "../../helpers/validationfunction";
import {get_Tablenames,Common_insert_text,InsertClass,InsertSubActivity,InsertCheckList, InsertSubstage,InsertStatus} from '../../actions/UserMasterAction'
import {getClass,getStageList,getActivity,getProjectType,UsergetStatus} from '../../actions/MasterDropdowns'
const UserMaster = (props) => {
  const header1 = [
    // { id: 'table_name', label: 'Table Name' },
    { id: 'groupname', label: 'Group Name' },
    { id: 'edit', label: 'Edit' },
  ];
  const  header2 = [
    { id: 'status', label: 'Status' },
    { id: 'type', label: 'Status Type' },
    { id: 'edit', label: 'Edit' },
  ]; 
  const  header3 = [
    { id: 'skills', label: 'Skills Name' },
    { id: 'edit', label: 'Edit' },
  ]; 
  const  header4 = [
    { id: 'traits', label: 'Traits Name' },
    { id: 'edit', label: 'Edit' },
  ]; 
  const  header5 = [
    { id: 'cer', label: 'Certification Name' },
    { id: 'edit', label: 'Edit' },
  ]; 
  const  header6 = [
    { id: 'specification', label: 'Specification Name' },
    { id: 'edit', label: 'Edit' },
  ]; 
  const  header7 = [
    { id: 'qualificayion', label: 'Qualification Name' },
    { id: 'edit', label: 'Edit' },
  ]; 
  const  header8 = [
    { id: 'industry', label: 'Industry Name' },
    { id: 'edit', label: 'Edit' },
  ]; 
  const  header9 = [
    { id: 'institute', label: 'Institute Name'},
    { id: 'edit', label: 'Edit' },
  ]; 
  const  header10 = [
    { id: 'Capalitity', label: 'Capalitity Name' },
    { id: 'edit', label: 'Edit' },
  ]; 
  const  header11 = [
    { id: 'talents', label: 'Talents Name' },
    { id: 'edit', label: 'Edit' },
  ]; 
  const  header12 = [
    { id: 'resource', label: 'Type of Resource' },
    { id: 'edit', label: 'Edit' },
  ]; 
  const  header13 = [
    { id: 'desgination', label: 'Designation Name' },
    { id: 'edit', label: 'Edit' },
  ];
  const  header14 = [
    { id: 'question', label: 'Question Name' },
    { id: 'edit', label: 'Edit' },
  ];
  const  header15 = [
    { id: 'department', label: 'Department Name' },
    { id: 'edit', label: 'Edit' },
  ];
  const  header16 = [
    { id: 'activity', label: 'Activity Name' },
    { id: 'edit', label: 'Edit' },
  ];
  const  header17 = [
    { id: 'activity', label: 'Activity' },
    { id: 'activity', label: 'Activity Name' },
    { id: 'edit', label: 'Edit' },
  ];
  const  header18 = [
    { id: 'class', label: 'Class Type' },
    { id: 'type', label: 'Class Name' },
    { id: 'des', label: 'Class Description' },
    { id: 'edit', label: 'Edit' },
  ];
  const  header19 = [
    { id: 'mark', label: 'Mark Name' },
    { id: 'edit', label: 'Edit' },
  ];
  const  header20 = [
    { id: 'court', label: 'Court Name' },
    { id: 'edit', label: 'Edit' },
  ];
  const  header21 = [
    { id: 'range', label: 'Range Name' },
    { id: 'edit', label: 'Edit' },
  ];
  const  header22 = [
    { id: 'stage', label: 'Stage Name' },
    { id: 'edit', label: 'Edit' },
  ];
  const header25 = [
    { id: 'class', label: 'Project Type' },
    { id: 'type', label: 'Check List' },
    { id: 'edit', label: 'Edit' },
  ];
  const header23 = [
    { id: 'class', label: 'Stage' },
    { id: 'type', label: 'Sub Stage Name' },
    { id: 'edit', label: 'Edit' },
  ];
  const  header24 = [
    { id: 'case', label: 'Case Type Name' },
    { id: 'edit', label: 'Edit' },
  ];

  const dispatch = useDispatch();
  const [tableHeaderMaster,setTableHeaderMaster]=useState({
    'header1':[
      // { id: 'table_name', label: 'Table Name' },
      { id: 'groupname', label: 'Group Name' },
      { id: 'edit', label: 'Edit' },
    ],
  'header2':[
      { id: 'status', label: 'Status' },
      { id: 'type', label: 'Status Type' },
      { id: 'edit', label: 'Edit' },
    ]
  })
  const [userTableHeader,setUserTableHeader]=useState([])
  const [getTablename,setgetTablename]=useState([])
  const [tablevalues,settablevalues]=useState([])
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
    sub_stage:{
        value:"",
        validation:[{name:"required"}],
        error:null,
        errmsg:null,
    },
    skill_name:{
      value:"",
      validation:[{name:"required"}],
      error:null,
      errmsg:null,
  },
  traits_name:{
    value:"",
    validation:[{name:"required"}],
    error:null,
    errmsg:null,
  },
  specialization_name:{
    value:"",
    validation:[{name:"required"}],
    error:null,
    errmsg:null,
  },
  certification_name:{
    value:"",
    validation:[{name:"required"}],
    error:null,
    errmsg:null,
  },
  qualification_name:{
    value:"",
    validation:[{name:"required"}],
    error:null,
    errmsg:null,
  },
  industry:{
    value:"",
    validation:[{name:"required"}],
    error:null,
    errmsg:null,
  },
  institute:{
    value:"",
    validation:[{name:"required"}],
    error:null,
    errmsg:null,
  },
  capability:{
    value:"",
    validation:[{name:"required"}],
    error:null,
    errmsg:null,
  },
  talents:{
    value:"",
    validation:[{name:"required"}],
    error:null,
    errmsg:null,
  },
  resourse:{
    value:"",
    validation:[{name:"required"}],
    error:null,
    errmsg:null,
  },
  designation:{
    value:"",
    validation:[{name:"required"}],
    error:null,
    errmsg:null,
  },
  question:{
    value:"",
    validation:[{name:"required"}],
    error:null,
    errmsg:null,
  },
  department:{
    value:"",
    validation:[{name:"required"}],
    error:null,
    errmsg:null,
  },
  activity:{
    value:"",
    validation:[{name:"required"}],
    error:null,
    errmsg:null,
  },
  sub_activity:{
    value:"",
    validation:[{name:"required"}],
    error:null,
    errmsg:null,
  },
  mark:{
    value:"",
    validation:[{name:"required"}],
    error:null,
    errmsg:null,
  },
  court:{
    value:"",
    validation:[{name:"required"}],
    error:null,
    errmsg:null,
  },
  range:{
    value:"",
    validation:[{name:"required"}],
    error:null,
    errmsg:null,
  },
  stage_dropdown:{
    value:"",
    validation:[{name:"required"}],
    error:null,
    errmsg:null,
  },
  stage_name:{
    value:"",
    validation:[{name:"required"}],
    error:null,
    errmsg:null,
  },
  case_type:{
    value:"",
    validation:[{name:"required"}],
    error:null,
    errmsg:null,
  },
  activity_drop:{
    value:"",
    validation:[{name:"required"}],
    error:null,
    errmsg:null,
  }





  })
 
  function checkValidation(data, key, multipleId) {
    console.log(data,key,"tablename")
    // if(key === 'tablename'){
    //   // setUserTableHeader(tableHeaderMaster[`header${data}`])
    //   settableid(data)
    // }
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
    if(key==="tablename"){
            
      let value = [];
      if(props.table_name.length>0){
      props.table_name.map((data) => value.push(data));

      for (var m = 0; m < value.length; m++) {
          if(value[m].table_names===data){
              settable_name_value(value[m].table_names)
            
          }
         
      }
     
  }
  }

    setUserMaster((prevState) => ({
      ...prevState,
      [key]: dynObj,
    }));

     console.log(table_name_value,"divya")
    
  }
  const [UserGroupsList, setUserGroupsList] = useState([])
  const [table_name_value,settable_name_value]=useState([])
  useEffect(() => {
    dispatch(get_Tablenames());
    dispatch(getClass())
    dispatch(getStageList())
    dispatch(getActivity())
    dispatch(getProjectType())
    dispatch(UsergetStatus())
  }, [props]);
  useEffect(() => {

   

      var groupList = [];
      var groupList2=[]
      const CheckList = [
        { id: 'class', label: 'Project Type' },
        { id: 'type', label: 'Check List' },
        { id: 'edit', label: 'Edit' },
      ];
      const subStage = [
        { id: 'class', label: 'Stage' },
        { id: 'type', label: 'Sub Stage Name'},
        { id: 'edit', label: 'Edit' },
      ];
     
      groupList.push(subStage);
      
      groupList2.push(CheckList);
      
      setUserGroupsList({ groupList,groupList2})
     

   
  var length=Object.keys(UserGroupsList).length;
      
  let table_value_data=[]
    let table_data = [];
    let class_type_data=[]
    let stage_list=[]
    let activity_list=[]
    let ProjectType=[]
    let get_status_type=[]
    props.table_name.map((data, index) =>
    {
      return(
    table_data.push({ value: data.display_name, id: data.table_id,t_name:data.table_names }),
    table_value_data.push({t_name:data.table_names})
      )
    }
    );
   
    // class_type
    props.class_type.map((data,index)=>{
      class_type_data.push({id:data.class_id,value:data.class})
    })
    props.stage.map((data,index)=>{
      stage_list.push({id:data.stage_id,value:data.stage})
    })
    props.activity.map((data,index)=>{
      activity_list.push({id:data.activity_id,value:data.activity})
    })
    props.project_type_value.map((data,index)=>{
      ProjectType.push({id:data.project_type_id,value:data.project_type})
    })
    props.Status.map((data,index)=>{
      get_status_type.push({id:index,value:data.status_type})
    })
    settablevalues({ table_data,class_type_data,stage_list,activity_list,ProjectType,get_status_type});   
    settable_name_value(tablevalues.table_data)
   console.log(table_name_value,"ttt")
  }, [props.table_name,UserMaster]);
  //  insert approve
  function Submit(data) {
    var mainvalue = {};
    var targetkeys = Object.keys(UserMaster);
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(
        UserMaster[targetkeys[i]].value,
        UserMaster[targetkeys[i]].validation
      );
      UserMaster[targetkeys[i]].error = !errorcheck.state;
      UserMaster[targetkeys[i]].errmsg = errorcheck.msg;
      mainvalue[targetkeys[i]] = UserMaster[targetkeys[i]].value;
    }
    var filtererr = targetkeys.filter((obj) => UserMaster[obj].error == true);
    console.log(filtererr,"length");
   
    if (filtererr.length>0) {
     
    }

    if(data === 21)
    {
    dispatch(
      InsertClass(UserMaster)).then(() => {
      handleCancel()
    });
    }
    else if(data === 20)
    {
      alert("hai")
    dispatch(
      InsertSubActivity(UserMaster)).then(() => {
      // handleCancel()
    });
    }
 
    else if(data === 29)
    {
    dispatch(
      InsertCheckList(UserMaster)).then(() => {
      // handleCancel()
    });
    }
    else if (data===3)
    {
        dispatch(
          Common_insert_text(table_name_value,UserMaster)).then(() => {
          // handleCancel()
        });
        
    }
    else if (data===26)
    {
  
        dispatch(
          InsertSubstage(UserMaster)).then(() => {
          // handleCancel()
        });
        
    }
    else if (data===4)
    {
  
        dispatch(
          InsertStatus(UserMaster)).then(() => {
          // handleCancel()
        });
        
    }

  

  
     
      
    setUserMaster((prevState) => ({
      ...prevState,
    }));
  }

const handleCancel = () => {
    let From_key = ["groupname", "skill_name","class_name","class_type","description","acticity","activity_drop","project_type","checklist_name"];

    From_key.map((data) => {
      UserMaster[data].value = "";
    });
    setUserMaster((prevState) => ({
      ...prevState,
    }));
  };
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
          //  dropdown={[{id:"1",value:"Group Name"},{id:"2",value:"Status"},{id:"3",value:"Class"},{id:"4",value:"CheckList"}
          //  ,{id:"5",value:"SubStage"}]}
          dropdown={tablevalues.table_data}
          />
          
           {/* group name */}
           {UserMaster?.tablename?.value === 3  &&
          <Labelbox type="text" placeholder={"Enter Group Name"}
          changeData={(data) => checkValidation(data, "groupname")}
          value={UserMaster.groupname.value}
          error={UserMaster.groupname.error}
          errmsg={UserMaster.groupname.errmsg}
          />
          }
         {/* status */}
          {UserMaster.tablename.value === 4  &&
           <div className="table_cont_change">
          <Labelbox type="select" placeholder={"Status Type"}
           dropdown={tablevalues.get_status_type}
           changeData={(data) => checkValidation(data, "status_type")}
           value={UserMaster.status_type.value}
           error={UserMaster.status_type.error}
           errmsg={UserMaster.status_type.errmsg}
          />
           <Labelbox type="text" placeholder={"Enter Status Name"}
           
            changeData={(data) => checkValidation(data, "status_name")}
            value={UserMaster.status_name.value}
            error={UserMaster.status_name.error}
            errmsg={UserMaster.status_name.errmsg}
           />       
        </div>
          }
          {/* skills */}
          {UserMaster.tablename.value === 5 &&
        
          <Labelbox type="text" placeholder={"Enter Skills Name"}
           changeData={(data) => checkValidation(data, "skill_name")}
           value={UserMaster.skill_name.value}
           error={UserMaster.skill_name.error}
           errmsg={UserMaster.skill_name.errmsg}
          />
          }

               {/* Traits */}
               {UserMaster.tablename.value === 6 &&
        
        <Labelbox type="text" placeholder={"Enter Traits Name"}
         changeData={(data) => checkValidation(data, "traits_name")}
         value={UserMaster.traits_name.value}
         error={UserMaster.traits_name.error}
         errmsg={UserMaster.traits_name.errmsg}
        />
        }

             {/* certification */}
             {UserMaster.tablename.value === 7 &&
        
        <Labelbox type="text" placeholder={"Enter Certification Name"}
         changeData={(data) => checkValidation(data, "certification_name")}
         value={UserMaster.certification_name.value}
         error={UserMaster.certification_name.error}
         errmsg={UserMaster.certification_name.errmsg}
        />
        }
             {/* Traits */}
             {UserMaster.tablename.value === 8 &&
        <Labelbox type="text" placeholder={"Enter Specialization Name"}
         changeData={(data) => checkValidation(data, "specialization_name")}
         value={UserMaster.specialization_name.value}
         error={UserMaster.specialization_name.error}
         errmsg={UserMaster.specialization_name.errmsg}
        />
        }

            {/* Qualification */}
            {UserMaster.tablename.value === 9 &&
        <Labelbox type="text" placeholder={"Enter Qualification Name"}
         changeData={(data) => checkValidation(data, "qualification_name")}
         value={UserMaster.qualification_name.value}
         error={UserMaster.qualification_name.error}
         errmsg={UserMaster.qualification_name.errmsg}
        />
        }

          {/* Industry */}
          {UserMaster.tablename.value === 11 &&
        <Labelbox type="text" placeholder={"Enter Industry Name"}
         changeData={(data) => checkValidation(data, "industry")}
         value={UserMaster.industry.value}
         error={UserMaster.industry.error}
         errmsg={UserMaster.industry.errmsg}
        />
        }
           {/* Institute */}
           {UserMaster.tablename.value === 12 &&
        <Labelbox type="text" placeholder={"Enter Institute Name"}
         changeData={(data) => checkValidation(data, "institute")}
         value={UserMaster.institute.value}
         error={UserMaster.institute.error}
         errmsg={UserMaster.institute.errmsg}
        />
        }
        
               {/* Capability */}
               {UserMaster.tablename.value === 13 &&
        <Labelbox type="text" placeholder={"Enter Capability Name"}
         changeData={(data) => checkValidation(data, "capability")}
         value={UserMaster.capability.value}
         error={UserMaster.capability.error}
         errmsg={UserMaster.capability.errmsg}
        />
        }
           {/* Talents */}
           {UserMaster.tablename.value === 14 &&
        <Labelbox type="text" placeholder={"Enter Talents Name"}
         changeData={(data) => checkValidation(data, "talents")}
         value={UserMaster.talents.value}
         error={UserMaster.talents.error}
         errmsg={UserMaster.talents.errmsg}
        />
        }

              {/* Type of resource */}
              {UserMaster.tablename.value === 15 &&
        <Labelbox type="text" placeholder={"Enter Type of resource Name"}
         changeData={(data) => checkValidation(data, "resourse")}
         value={UserMaster.resourse.value}
         error={UserMaster.resourse.error}
         errmsg={UserMaster.resourse.errmsg}
        />
        }

          {/* Designation  */}
          {UserMaster.tablename.value === 16 &&
        <Labelbox type="text" placeholder={"Enter Designation  Name"}
         changeData={(data) => checkValidation(data, "designation")}
         value={UserMaster.designation.value}
         error={UserMaster.designation.error}
         errmsg={UserMaster.designation.errmsg}
        />
        }

            {/* Question  */}
            {UserMaster.tablename.value === 17 &&
        <Labelbox type="text" placeholder={"Enter Question  Name"}
         changeData={(data) => checkValidation(data, "question")}
         value={UserMaster.question.value}
         error={UserMaster.question.error}
         errmsg={UserMaster.question.errmsg}
        />
        }
        

           {/* Department  */}
           {UserMaster.tablename.value === 18 &&
        <Labelbox type="text" placeholder={"Enter Department  Name"}
         changeData={(data) => checkValidation(data, "department")}
         value={UserMaster.department.value}
         error={UserMaster.department.error}
         errmsg={UserMaster.department.errmsg}
        />
        }
        
           {/* Activity  */}
           {UserMaster.tablename.value === 19 &&
        <Labelbox type="text" placeholder={"Enter Activity  Name"}
         changeData={(data) => checkValidation(data, "activity")}
         value={UserMaster.activity.value}
         error={UserMaster.activity.error}
         errmsg={UserMaster.activity.errmsg}
        />
        }

             {/* sub Activity  */}
             {UserMaster.tablename.value === 20 &&
              <div className="table_cont_change">
              <Labelbox type="select" placeholder={"Activity"}
         changeData={(data) => checkValidation(data, "activity_drop")}
         dropdown={tablevalues.activity_list}
         value={UserMaster.activity_drop.value}
         error={UserMaster.activity_drop.error}
         errmsg={UserMaster.activity_drop.errmsg}
        />
        <Labelbox type="text" placeholder={"Enter Sub Activity  Name"}
         changeData={(data) => checkValidation(data, "sub_activity")}
         value={UserMaster.sub_activity.value}
         error={UserMaster.sub_activity.error}
         errmsg={UserMaster.sub_activity.errmsg}
        />
        </div>
        }

    
          {/* class type */}
            {UserMaster.tablename.value === 21 &&
          <div className="table_cont_change">
          <Labelbox type="select" placeholder={"Class Type"}
           changeData={(data) => checkValidation(data, "class_type")}
           dropdown={tablevalues.class_type_data}
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

                 {/* Mark  */}
                 {UserMaster.tablename.value === 22 &&
        <Labelbox type="text" placeholder={"Enter Mark Name"}
         changeData={(data) => checkValidation(data, "mark")}
         value={UserMaster.mark.value}
         error={UserMaster.mark.error}
         errmsg={UserMaster.mark.errmsg}
        />
        }
        
               {/* Court  */}
               {UserMaster.tablename.value === 23 &&
        <Labelbox type="text" placeholder={"Enter Court Name"}
         changeData={(data) => checkValidation(data, "court")}
         value={UserMaster.court.value}
         error={UserMaster.court.error}
         errmsg={UserMaster.court.errmsg}
        />
        }

              {/* Range  */}
              {UserMaster.tablename.value === 24 &&
        <Labelbox type="text" placeholder={"Enter Range Name"}
         changeData={(data) => checkValidation(data, "range")}
         value={UserMaster.range.value}
         error={UserMaster.range.error}
         errmsg={UserMaster.range.errmsg}
        />
        }

        
        
             {/* Stage  */}
             {UserMaster.tablename.value === 25 &&
        <Labelbox type="text" placeholder={"Enter Stage Name"}
         changeData={(data) => checkValidation(data, "stage_name")}
         value={UserMaster.stage_name.value}
         error={UserMaster.stage_name.error}
         errmsg={UserMaster.stage_name.errmsg}
        />
        }
        
         {/* substage */}
         {UserMaster.tablename.value === 26 &&
           
           <div className="table_cont_change">
            <Labelbox type="select" placeholder={" Stage"}
              dropdown={tablevalues.stage_list}
              changeData={(data) => checkValidation(data, "stage_dropdown")}
              value={UserMaster.stage_dropdown.value}
              error={UserMaster.stage_dropdown.error}
              errmsg={UserMaster.stage_dropdown.errmsg}
            />
  
             <Labelbox type="text" placeholder={"Enter Sub Stage Name"}
               changeData={(data) => checkValidation(data, "sub_stage")}
               value={UserMaster.sub_stage.value}
               error={UserMaster.sub_stage.error}
               errmsg={UserMaster.sub_stage.errmsg}
             />
              </div>
            }

                  {/* Case Type  */}
                  {UserMaster.tablename.value === 28 &&
        <Labelbox type="text" placeholder={"Enter Case Type Name"}
         changeData={(data) => checkValidation(data, "case_type")}
         value={UserMaster.case_type.value}
         error={UserMaster.case_type.error}
         errmsg={UserMaster.case_type.errmsg}
        />
        }

         {/* checklist */}
         {UserMaster.tablename.value === 29 &&
           <div className="table_cont_change">
          <Labelbox type="select" placeholder={"Project Type"}
             dropdown={tablevalues.ProjectType}
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
         

      <div>
       {UserMaster.tablename.value >=3&&<img src={PlusIcon} onClick={()=>Submit(UserMaster.tablename.value)} className="plus_icon_user" />}

       </div>
         
       </div>
          
        
      
        

         
       
      </Grid>

      <div className="rate_enhanced_table">
      {/* <EnhancedTable headCells={header1}
          rows={""}
           aligncss="aligncss"/> */}


 {UserMaster.tablename.value===3&&<EnhancedTable headCells={header1}
          rows={""}
           aligncss="aligncss"/>}

   {UserMaster.tablename.value===4&&<EnhancedTable headCells={header2}
          rows={""}
           aligncss="aligncss"/>}
              {UserMaster.tablename.value===5&&<EnhancedTable headCells={header3}
          rows={""}
           aligncss="aligncss"/>}
              {UserMaster.tablename.value===6&&<EnhancedTable headCells={header4}
          rows={""}
           aligncss="aligncss"/>}
              {UserMaster.tablename.value===7&&<EnhancedTable headCells={header5}
          rows={""}
           aligncss="aligncss"/>}
                {UserMaster.tablename.value===8&&<EnhancedTable headCells={header6}
          rows={""}
           aligncss="aligncss"/>}
                {UserMaster.tablename.value===9&&<EnhancedTable headCells={header7}
          rows={""}
           aligncss="aligncss"/>}
                {UserMaster.tablename.value===11&&<EnhancedTable headCells={header8}
          rows={""}
           aligncss="aligncss"/>}
                {UserMaster.tablename.value===12&&<EnhancedTable headCells={header9}
          rows={""}
           aligncss="aligncss"/>}
                 {UserMaster.tablename.value===13&&<EnhancedTable headCells={header10}
          rows={""}
           aligncss="aligncss"/>}
                  {UserMaster.tablename.value===14&&<EnhancedTable headCells={header11}
          rows={""}
           aligncss="aligncss"/>}
                  {UserMaster.tablename.value===15&&<EnhancedTable headCells={header12}
          rows={""}
           aligncss="aligncss"/>}
                  {UserMaster.tablename.value===16&&<EnhancedTable headCells={header13}
          rows={""}
           aligncss="aligncss"/>}
                  {UserMaster.tablename.value===17&&<EnhancedTable headCells={header14}
          rows={""}
           aligncss="aligncss"/>}
                  {UserMaster.tablename.value===18&&<EnhancedTable headCells={header15}
          rows={""}
           aligncss="aligncss"/>}
                  {UserMaster.tablename.value===19&&<EnhancedTable headCells={header16}
          rows={""}
           aligncss="aligncss"/>}
                  {UserMaster.tablename.value===20&&<EnhancedTable headCells={header17}
          rows={""}
           aligncss="aligncss"/>}
               {UserMaster.tablename.value===21&&<EnhancedTable headCells={header18}
          rows={""}
           aligncss="aligncss"/>}
               {UserMaster.tablename.value===22&&<EnhancedTable headCells={header19}
          rows={""}
           aligncss="aligncss"/>}
               {UserMaster.tablename.value===23&&<EnhancedTable headCells={header20}
          rows={""}
           aligncss="aligncss"/>}
               {UserMaster.tablename.value===24&&<EnhancedTable headCells={header21}
          rows={""}
           aligncss="aligncss"/>}
                  {UserMaster.tablename.value===25&&<EnhancedTable headCells={header22}
          rows={""}
           aligncss="aligncss"/>}
                  {UserMaster.tablename.value===26&&<EnhancedTable headCells={header23}
          rows={""}
           aligncss="aligncss"/>}
                  {UserMaster.tablename.value===27&&<EnhancedTable headCells={header25}
          rows={""}
           aligncss="aligncss"/>}
                  {UserMaster.tablename.value===28&&<EnhancedTable headCells={header24}
          rows={""}
           aligncss="aligncss"/>}

      </div>
      
      
   
        
        
    </div>
  )
}

const mapStateToProps = (state) => (
  {
    table_name: state.UserMasterReducer.TableNamedropdownData,
    class_type:state.getOptions.getClass,
    stage:state.getOptions.getStageList,
    activity:state.getOptions.getActivity,
    project_type_value:state.getOptions.getProjectType,
    Status:state.getOptions.getUserStatus
  }
);

export default connect(mapStateToProps)(UserMaster);

