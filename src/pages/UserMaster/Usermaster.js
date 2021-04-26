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
import {get_Tablenames,Common_insert_text,InsertClass,InsertSubStage} from '../../actions/UserMasterAction'
import {getClass,getStageList} from '../../actions/MasterDropdowns'
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
  const  skills = [
    { id: 'skills', label: 'Skills Name' },
    { id: 'edit', label: 'Edit' },
  ]; 
  const  header3 = [
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

    setUserMaster((prevState) => ({
      ...prevState,
      [key]: dynObj,
    }));

  
  }
  const [UserGroupsList, setUserGroupsList] = useState([])
  const [table_name_value,settable_name_value]=useState([])
  const [isLoaded, setIsLoaded] = useState(true);
  useEffect(() => {
    dispatch(get_Tablenames());
    dispatch(getClass())
    dispatch(getStageList())
  }, [props]);
  useEffect(() => {

    if (isLoaded) {

      var groupList = [];
      var groupList2=[]
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
     
      groupList.push(subStage);
      
      groupList2.push(CheckList);
      
      setUserGroupsList({ groupList,groupList2})
     

    setIsLoaded(false);
  }
  var length=Object.keys(UserGroupsList).length;
      
  let table_value_data=[]
    let table_data = [];
    let class_type_data=[]
    let stage_list=[]
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
    settablevalues({ table_data,class_type_data,stage_list});   
    settable_name_value(tablevalues.table_data)
   console.log(table_name_value,"ttt")
  }, [props.table_name,UserMaster]);
  //  insert approve
  function Submit() {
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

    if(UserMaster.tablename.value === 21)
    {
    dispatch(
      InsertClass(UserMaster)).then(() => {
      handleCancel()
    });
    }
//   else if(UserMaster.tablename.value === 26){
//     dispatch(
//       InsertClass(UserMaster)).then(() => {
//       handleCancel()
//     });
// }
  
    // {UserMaster.tablename.value === 21?dispatch(
    //   Common_insert_text(
    //     props.table_name
    //   )
    // ).then(() => {
    //   handleCancel()
   
    // }):""}
  
      // dispatch(Common_insert_text(props.table_name) ).then(() => {
      //   handleCancel();
      // });
      
    setUserMaster((prevState) => ({
      ...prevState,
    }));
  }

const handleCancel = () => {
    let From_key = ["groupname", "skill_name","class_name","class_type","description"];

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
           {UserMaster?.tablename?.value === 3 && UserMaster?.tablename?.value !== "" &&
          <Labelbox type="text" placeholder={"Enter Group Name"}
          changeData={(data) => checkValidation(data, "groupname")}
          value={UserMaster.groupname.value}
          error={UserMaster.groupname.error}
          errmsg={UserMaster.groupname.errmsg}
          />
          }
         {/* status */}
          {UserMaster.tablename.value === 4 && UserMaster?.tablename?.value !== "" &&
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
        <Labelbox type="select" placeholder={"Enter Institute Name"}
         changeData={(data) => checkValidation(data, "institute")}
         value={UserMaster.institute.value}
         error={UserMaster.institute.error}
         errmsg={UserMaster.institute.errmsg}
        />
        }
        
               {/* Capability */}
               {UserMaster.tablename.value === 13 &&
        <Labelbox type="select" placeholder={"Enter Capability Name"}
         changeData={(data) => checkValidation(data, "capability")}
         value={UserMaster.capability.value}
         error={UserMaster.capability.error}
         errmsg={UserMaster.capability.errmsg}
        />
        }
           {/* Talents */}
           {UserMaster.tablename.value === 14 &&
        <Labelbox type="select" placeholder={"Enter Talents Name"}
         changeData={(data) => checkValidation(data, "talents")}
         value={UserMaster.talents.value}
         error={UserMaster.talents.error}
         errmsg={UserMaster.talents.errmsg}
        />
        }

              {/* Type of resource */}
              {UserMaster.tablename.value === 15 &&
        <Labelbox type="select" placeholder={"Enter Type of resource Name"}
         changeData={(data) => checkValidation(data, "resourse")}
         value={UserMaster.resourse.value}
         error={UserMaster.resourse.error}
         errmsg={UserMaster.resourse.errmsg}
        />
        }

          {/* Designation  */}
          {UserMaster.tablename.value === 16 &&
        <Labelbox type="select" placeholder={"Enter Designation  Name"}
         changeData={(data) => checkValidation(data, "designation")}
         value={UserMaster.designation.value}
         error={UserMaster.designation.error}
         errmsg={UserMaster.designation.errmsg}
        />
        }

            {/* Question  */}
            {UserMaster.tablename.value === 17 &&
        <Labelbox type="select" placeholder={"Enter Question  Name"}
         changeData={(data) => checkValidation(data, "question")}
         value={UserMaster.question.value}
         error={UserMaster.question.error}
         errmsg={UserMaster.question.errmsg}
        />
        }
        

           {/* Department  */}
           {UserMaster.tablename.value === 18 &&
        <Labelbox type="select" placeholder={"Enter Department  Name"}
         changeData={(data) => checkValidation(data, "department")}
         value={UserMaster.department.value}
         error={UserMaster.department.error}
         errmsg={UserMaster.department.errmsg}
        />
        }
        
           {/* Activity  */}
           {UserMaster.tablename.value === 19 &&
        <Labelbox type="select" placeholder={"Enter Activity  Name"}
         changeData={(data) => checkValidation(data, "activity")}
         value={UserMaster.activity.value}
         error={UserMaster.activity.error}
         errmsg={UserMaster.activity.errmsg}
        />
        }

             {/* sub Activity  */}
             {UserMaster.tablename.value === 20 &&
        <Labelbox type="select" placeholder={"Enter Sub Activity  Name"}
         changeData={(data) => checkValidation(data, "sub_activity")}
         value={UserMaster.sub_activity.value}
         error={UserMaster.sub_activity.error}
         errmsg={UserMaster.sub_activity.errmsg}
        />
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
        <Labelbox type="select" placeholder={"Enter Mark Name"}
         changeData={(data) => checkValidation(data, "mark")}
         value={UserMaster.mark.value}
         error={UserMaster.mark.error}
         errmsg={UserMaster.mark.errmsg}
        />
        }
        
               {/* Court  */}
               {UserMaster.tablename.value === 23 &&
        <Labelbox type="select" placeholder={"Enter Court Name"}
         changeData={(data) => checkValidation(data, "court")}
         value={UserMaster.court.value}
         error={UserMaster.court.error}
         errmsg={UserMaster.court.errmsg}
        />
        }

              {/* Range  */}
              {UserMaster.tablename.value === 24 &&
        <Labelbox type="select" placeholder={"Enter Range Name"}
         changeData={(data) => checkValidation(data, "range")}
         value={UserMaster.range.value}
         error={UserMaster.range.error}
         errmsg={UserMaster.range.errmsg}
        />
        }

        
        
             {/* Stage  */}
             {UserMaster.tablename.value === 25 &&
        <Labelbox type="select" placeholder={"Enter Stage Name"}
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
        <Labelbox type="select" placeholder={"Enter Case Type Name"}
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
       {UserMaster.tablename.value >=3&&<img src={PlusIcon} onClick={Submit} className="plus_icon_user" />}

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

   {UserMaster.tablename.value===4&&<EnhancedTable headCells={skills}
          rows={""}
           aligncss="aligncss"/>}
            

           {UserMaster.tablename.value===5&&<EnhancedTable headCells={header3}
          rows={""}
           aligncss="aligncss"/>}

{UserMaster.tablename.value===29&&<EnhancedTable headCells={CheckList}
          rows={""}
           aligncss="aligncss"/>}
           
{UserMaster.tablename.value===26&&<EnhancedTable headCells={subStage}
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
    stage:state.getOptions.getStageList
  }
);

export default connect(mapStateToProps)(UserMaster);

