import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from "../../component/Butttons/button";
import EnhancedTable from "../../component/DynTable/table";
import PlusIcon from "../../images/plusIcon.svg";
import Edit from "../../images/pencil.svg";
import "./Usermaster.scss";
import { connect, useDispatch } from "react-redux";
import ValidationLibrary from "../../helpers/validationfunction";
import Tooltip from "@material-ui/core/Tooltip";
import {
  get_Tablenames,
  getClass,
  Common_insert_text,
  InsertClass,
  InsertSubActivity,
  InsertCheckList,
  InsertSubstage,
  InsertStatus,
  UpdateSubstage,
  UpdateSubActivity,
  getControls,
  getLoactionsList
} from "../../actions/UserMasterAction";
import {
  getActivity,
  getProjectType,
  UsergetStatus,
  getCaseType,
} from "../../actions/MasterDropdowns";
import {
  getTableGroup,
  getTableStatus,
  getTableSkills,
  getTableTraits,
  getTableCertification,
  getTableSpecification,
  getTableQualification,
  getTableIndustry,
  getTableInsitute,
  getTableCapability,
  getTableTalents,
  getTableResource,
  getTableDesgination,
  getTableQuestion,
  getTableDepartment,
  getTableActivity,
  getTableCourt,
  getStageList,
  getSubStage,
  getTableClass,
  getSubActivity,
  getCheckList,
  Common_Update_text,
  getProjectCostRange,

} from "../../actions/UserMasterAction";

const UserMaster = (props) => {
  const header1 = [
    // { id: 'table_name', label: 'Table Name' },
    { id: "groupname", label: "Group Name" },
    { id: "", label: "Edit" },
  ];
  const header2 = [
    { id: "type", label: "Status Type" },
    { id: "statusname", label: "Status Name" },
    { id: "", label: "Edit" },
  ];
  const header3 = [
    { id: "skills", label: "Skills Name" },
    { id: "", label: "Edit" },
  ];
  const header4 = [
    { id: "traits", label: "Traits Name" },
    { id: "", label: "Edit" },
  ];
  const header5 = [
    { id: "certification", label: "Certification Name" },
    { id: "", label: "Edit" },
  ];
  const header6 = [
    { id: "specification", label: "Specification Name" },
    { id: "", label: "Edit" },
  ];
  const header7 = [
    { id: "qualification", label: "Qualification Name" },
    { id: "", label: "Edit" },
  ];
  const header8 = [
    { id: "industry", label: "Industry Name" },
    { id: "", label: "Edit" },
  ];
  const header9 = [
    { id: "institute", label: "Institute Name" },
    { id: "", label: "Edit" },
  ];
  const header10 = [
    { id: "Capalitity", label: "Capability Name" },
    { id: "", label: "Edit" },
  ];
  const header11 = [
    { id: "talents", label: "Talents Name" },
    { id: "", label: "Edit" },
  ];
  const header12 = [
    { id: "resource", label: "Type of Resource" },
    { id: "", label: "Edit" },
  ];
  const header13 = [
    { id: "desgination", label: "Designation Name" },
    { id: "", label: "Edit" },
  ];
  const header14 = [
    { id: "question", label: "Question Name" },
    { id: "", label: "Edit" },
  ];
  const header15 = [
    { id: "department", label: "Department Name" },
    { id: "", label: "Edit" },
  ];
  const header16 = [
    { id: "activity", label: "Activity Name" },
    { id: "", label: "Edit" },
  ];
  const header17 = [
    { id: "activity", label: "Activity" },
    { id: "activityname", label: "Sub Activity Name" },
    { id: "", label: "Edit" },
  ];
  const header18 = [
    { id: "class", label: "Class Type" },
    { id: "classname", label: "Class Name" },
    { id: "des", label: "Class Description" },
    { id: "", label: "Edit" },
  ];
  const header19 = [
    { id: "mark", label: "Mark Name" },
    { id: "", label: "Edit" },
  ];
  const header20 = [
    { id: "court", label: "Court Name" },
    { id: "", label: "Edit" },
  ];
  const header21 = [
    { id: "range", label: "Range Name" },
    { id: "", label: "Edit" },
  ];
  const header22 = [
    { id: "stage", label: "Stage Name" },
    { id: "", label: "Edit" },
  ];
  const header25 = [
    { id: "project_type", label: "Project Type" },
    { id: "checklist_name", label: "Check List" },
    { id: "", label: "Edit" },
  ];
  const header23 = [
    { id: "stage", label: "Stage" },
    { id: "sub_stage", label: "Sub Stage Name" },
    { id: "", label: "Edit" },
  ];
  const header24 = [
    { id: "case", label: "Case Type Name" },
    { id: "", label: "Edit" },
  ];
  const header26 = [
    { id: "control", label: "Control Name" },
    { id: "", label: "Edit" },
  ];
  const header27 = [
    { id: "office_Loaction", label: "Office Location Name" },
    { id: "", label: "Edit" },
  ];
  const dispatch = useDispatch();
  const [tableHeaderMaster, setTableHeaderMaster] = useState({
    header1: [
      // { id: 'table_name', label: 'Table Name' },
      { id: "groupname", label: "Group Name" },
      { id: " ", label: "Edit" },
    ],
    header2: [
      { id: "status", label: "Status" },
      { id: "type", label: "Status Type" },
      { id: " ", label: "Edit" },
    ],
  });
  const [userTableHeader, setUserTableHeader] = useState([]);
  const [getTablename, setgetTablename] = useState([]);
  const [substageId, setsubstageId] = useState([])
  const [tablevalues, settablevalues] = useState([]);
  const [Statusvalue, setStatusvalue] = useState("")
  const [UserMaster, setUserMaster] = useState({
    tablename: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    groupname: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    status_type: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    status_name: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    class_type: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    project_type: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    class_name: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    description: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    checklist_name: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    sub_stage: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    skill_name: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    traits_name: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    specialization_name: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    certification_name: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    qualification_name: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    industry: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    institute: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    capability: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    talents: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    resourse: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    designation: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    question: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    department: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    activity: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    sub_activity: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    mark: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    court: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    range: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    stage_dropdown: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    stage_name: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    case_type: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    activity_drop: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    control: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    office_Location: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    }
  });

  function checkValidation(data, key) {

    if (key === "stage_dropdown") {
      dispatch(getSubStage(data));
      setsubstageId(data)
    }
    if (key === "class_type") {
      dispatch(getTableClass(data));
    }
    if (data && key === "activity_drop") {
      dispatch(getSubActivity(data));
    }
    // if (key === "status_type") {
    //   dispatch(getTableStatus(data));
    // }
    if (data && key === "tablename") {
      handleCancel()
      var value = props.table_name.find((item) => {
        return item.table_id == data;

      });
      settable_name_value(value);

      if (data === 3) {
        validationHide()
        UserMaster.groupname.validation = [{ name: "required" }]
      }
      else if (data === 4) {
        validationHide()
        const From_key = ["status_type", "status_name"]
        From_key.map((data) => {
          UserMaster[data].validation.push({ name: "required" })
        });


      }
      else if (data === 5) {
        validationHide()
        UserMaster.skill_name.validation = [{ name: "required" }]


      } else if (data === 6) {
        validationHide()
        UserMaster.traits_name.validation.push({ name: "required" })

      }
      else if (data === 7) {
        validationHide()
        UserMaster.certification_name.validation.push({ name: "required" })
      }
      else if (data === 8) {
        validationHide()
        UserMaster.specialization_name.validation.push({ name: "required" })
      }
      else if (data === 9) {
        validationHide()
        UserMaster.qualification_name.validation.push({ name: "required" })
      }
      else if (data === 11) {
        validationHide()
        UserMaster.industry.validation.push({ name: "required" })
      }
      else if (data === 12) {
        validationHide()
        UserMaster.institute.validation.push({ name: "required" })

      }
      else if (data === 13) {
        validationHide()
        UserMaster.capability.validation.push({ name: "required" })
      }
      else if (data === 14) {
        validationHide()
        UserMaster.talents.validation.push({ name: "required" })
      }
      else if (data === 15) {
        validationHide()
        UserMaster.resourse.validation.push({ name: "required" })
      }
      else if (data === 16) {
        validationHide()
        UserMaster.designation.validation.push({ name: "required" })
      }
      else if (data === 17) {
        validationHide()
        UserMaster.question.validation.push({ name: "required" })
      }
      else if (data === 18) {
        validationHide()
        UserMaster.department.validation.push({ name: "required" })
      }
      else if (data === 19) {
        validationHide()
        UserMaster.activity.validation.push({ name: "required" })
      }
      else if (data === 20) {
        validationHide()
        const From_key = ["sub_activity", "activity_drop"]
        From_key.map((data) => {
          UserMaster[data].validation.push({ name: "required" })
        });
      }
      else if (data === 21) {
        validationHide()
        const From_key = ["class_name", "class_type", "description"]
        From_key.map((data) => {
          UserMaster[data].validation.push({ name: "required" })
        });
      }
      else if (data === 23) {
        validationHide()
        UserMaster.court.validation.push({ name: "required" })
      }
      else if (data === 24) {
        validationHide()
        UserMaster.range.validation.push({ name: "required" })
      }
      else if (data === 25) {
        validationHide()
        UserMaster.stage_name.validation.push({ name: "required" })
      }
      else if (data === 26) {
        validationHide()
        const From_key = ["sub_stage", "stage_dropdown"]
        From_key.map((data) => {
          UserMaster[data].validation.push({ name: "required" })
        });
      }
      else if (data === 28) {
        validationHide()
        UserMaster.case_type.validation.push({ name: "required" })
      }
      else if (data === 29) {
        validationHide()
        const From_key = ["project_type", "checklist_name"]
        From_key.map((data) => {
          UserMaster[data].validation.push({ name: "required" })
        });
      }
      else if (data === 30) {
        validationHide()
        UserMaster.control.validation.push({ name: "required" })
      }
      else if (data === 31) {
        validationHide()
        UserMaster.office_Location.validation.push({ name: "required" })
      }

    }
    if (key === "status_type") {
      UserMaster.status_name.value = ""
      var value = tablevalues.get_status_type.find((item) => {
        setEditvisible(false);
        return item.id == data;

      });
      setStatusvalue(value)
      console.log("status_type", value.id)
      dispatch(getTableStatus(value))
    }


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
    setUserMaster((prevState) => ({
      ...prevState,
      [key]: dynObj,
    }));
  }


  const [UserGroupsList, setUserGroupsList] = useState([]);
  const [table_name_value, settable_name_value] = useState([]);
  const [TableData, setTableData] = useState([]);
  const [SndTableData, setSndTableData] = useState([]);
  const [Editvisible, setEditvisible] = useState(false);
  const [EditStoreData, setEditStoreData] = useState([]);
  useEffect(() => {
    dispatch(get_Tablenames());
    dispatch(getClass());
    dispatch(getStageList());
    dispatch(getActivity());
    dispatch(getProjectType());
    dispatch(UsergetStatus());

    // tables api
    dispatch(getTableStatus());
    dispatch(getTableSkills());
    dispatch(getTableTraits());
    dispatch(getTableCertification());
    dispatch(getTableSpecification());
    dispatch(getTableQualification());
    dispatch(getTableIndustry());
    dispatch(getTableInsitute());
    dispatch(getTableCapability());
    dispatch(getTableTalents());
    dispatch(getTableResource());
    dispatch(getTableDesgination());
    dispatch(getTableQuestion());
    dispatch(getTableDepartment());
    dispatch(getTableActivity());
    dispatch(getTableCourt());
    dispatch(getProjectCostRange());
    dispatch(getCaseType());
    dispatch(getSubStage());
    dispatch(getTableClass());
    dispatch(getSubActivity());
    dispatch(getTableGroup(table_name_value.table_names));
    dispatch(getCheckList());
    dispatch(getControls())
    dispatch(getLoactionsList())
  }, []);

  useEffect(() => {
    var groupList = [];
    var groupList2 = [];
    const CheckList = [
      { id: "class", label: "Project Type" },
      { id: "type", label: "Check List" },
      { id: "edit", label: "Edit" },
    ];
    const subStage = [
      { id: "class", label: "Stage" },
      { id: "type", label: "Sub Stage Name" },
      { id: "edit", label: "Edit" },
    ];

    groupList.push(subStage);

    groupList2.push(CheckList);

    setUserGroupsList({ groupList, groupList2 });

    var length = Object.keys(UserGroupsList).length;

    let table_value_data = [];
    let table_data = [];
    let class_type_data = [];
    let stage_list = [];
    let activity_list = [];
    let ProjectType = [];
    let get_status_type = [];
    let question_data = [];
    props.table_name.map((data, index) => {
      return (
        table_data.push({
          value: data.display_name,
          id: data.table_id,
          t_name: data.table_names,
        }),
        table_value_data.push({ t_name: data.table_names })
      );
    });

    // class_type
    props.ClassDropdown.map((data, index) => {
      class_type_data.push({
        id: data.sub_project_type_id,
        value: data.sub_project_type,
      });
    });
    props.stage.map((data, index) => {
      stage_list.push({ id: data.stage_id, value: data.stage });
    });
    props.activity.map((data, index) => {
      activity_list.push({ id: data.activity_id, value: data.activity });
    });
    props.project_type_value.map((data, index) => {
      ProjectType.push({ id: data.project_type_id, value: data.project_type });
    });
    props.Status.map((data, index) => {
      get_status_type.push({ id: index + 1, value: data.status_type });
      // setStatusvalue.push(data)
    });
    settablevalues({
      table_data,
      class_type_data,
      stage_list,
      activity_list,
      ProjectType,
      get_status_type,
    });
    // table data
    let group_data = [];
    let skills_data = [];
    let get_table_status_data = [];
    let traits_data = [];
    let certification_data = [];
    let specification_data = [];
    let qualification_data = [];
    let insdustry_data = [];
    let institute_data = [];
    let capability_data = [];
    let talents_data = [];
    let resource_data = [];
    let desgination_data = [];
    let department_data = [];
    let activity_data = [];
    let court_data = [];
    let stage_data = [];
    let range_data = [];
    let case_type_data = [];
    let substage_data = [];
    let class_data = [];
    let sub_activity = [];
    let checklist_data = [];
    let control_data = [];
    let office_Location_data = [];
    props.GroupData.map((data) => {
      group_data.push({
        groupname: data.group_name,
        edit: (
          <img
            src={Edit}
            onClick={() => CommonEdit(data.group_id, data)}
            className="edit_p"
          />
        ),
      });
    });
    props.StatusTableData.map((data, index) => {
      get_table_status_data.push({
        type: data.status_type,
        statusname: data.status,
        edit: (
          <img
            src={Edit}
            onClick={() => EditStatus(data.status_id, data)}
            className="edit_p"
          />
        ),
      });
    });

    props.SkillsData.map((data, index) => {
      skills_data.push({
        skills: data.skill_name,
        edit: (
          <img
            src={Edit}
            className="edit_p"
            onClick={() => CommonEdit(data.skill_id, data)}
          />
        ),
      });
    });

    props.TraitsData.map((data, index) => {
      traits_data.push({
        traits: data.traits,
        edit: (
          <img
            src={Edit}
            className="edit_p"
            onClick={() => CommonEdit(data.traitTable, data)}
          />
        ),
      });
    });

    props.Certification.map((data, index) => {
      certification_data.push({
        certification: data.certification,
        edit: (
          <img
            src={Edit}
            className="edit_p"
            onClick={() => CommonEdit(data.certification_id, data)}
          />
        ),
      });
    });

    props.Specification_data.map((data, index) => {
      specification_data.push({
        specification: data.specilization,
        edit: (
          <img
            src={Edit}
            className="edit_p"
            onClick={() => CommonEdit(data.specialization_id, data)}
          />
        ),
      });
    });

    props.Qualification_data.map((data, index) => {
      qualification_data.push({
        qualification: data.qual_name,
        edit: (
          <img
            src={Edit}
            className="edit_p"
            onClick={() => CommonEdit(data.qualification_id, data)}
          />
        ),
      });
    });

    props.Industry.map((data, index) => {
      insdustry_data.push({
        industry: data.industry,
        edit: (
          <img
            src={Edit}
            className="edit_p"
            onClick={() => CommonEdit(data.industry_id, data)}
          />
        ),
      });
    });

    props.Institute.map((data, index) => {
      institute_data.push({
        institute: data.institute,
        edit: (
          <img
            src={Edit}
            className="edit_p"
            onClick={() => CommonEdit(data.institute_id, data)}
          />
        ),
      });
    });

    props.Capability.map((data, index) => {
      capability_data.push({
        capability: data.capability,
        edit: (
          <img
            src={Edit}
            className="edit_p"
            onClick={() => CommonEdit(data.capability_id, data)}
          />
        ),
      });
    });

    props.Talents.map((data, index) => {
      talents_data.push({
        talents: data.talent,
        edit: (
          <img
            src={Edit}
            className="edit_p"
            onClick={() => CommonEdit(data.talent_id, data)}
          />
        ),
      });
    });

    props.Resource.map((data, index) => {
      resource_data.push({
        resource: data.resource_type,
        edit: (
          <img
            src={Edit}
            className="edit_p"
            onClick={() => CommonEdit(data.resource_type_id, data)}
          />
        ),
      });
    });

    props.Designation.map((data, index) => {
      desgination_data.push({
        designation: data.designation,
        edit: (
          <img
            src={Edit}
            className="edit_p"
            onClick={() => CommonEdit(data.designation_id, data)}
          />
        ),
      });
    });

    props.Question.map((data, index) => {
      question_data.push({
        question: data.questions,
        edit: (
          <img
            src={Edit}
            className="edit_p"
            onClick={() => CommonEdit(data.question_id, data)}
          />
        ),
      });
    });

    props.Department.map((data, index) => {
      department_data.push({
        department: data.department,
        edit: (
          <img
            src={Edit}
            className="edit_p"
            onClick={() => CommonEdit(data.department_id, data)}
          />
        ),
      });
    });

    props.Activity.map((data, index) => {
      activity_data.push({
        activity: data.activity,
        edit: (
          <img
            src={Edit}
            className="edit_p"
            onClick={() => CommonEdit(data.activity_id, data)}
          />
        ),
      });
    });

    props.Court.map((data, index) => {
      court_data.push({
        court: data.location,
        edit: (
          <img
            src={Edit}
            className="edit_p"
            onClick={() => CommonEdit(data.location_id, data)}
          />
        ),
      });
    });

    props.stage.map((data, index) => {
      stage_data.push({
        stage: data.stage,
        edit: (
          <img
            src={Edit}
            className="edit_p"
            onClick={() => CommonEdit(data.stage_id, data)}
          />
        ),
      });
    });

    props.Range.map((data, index) => {
      range_data.push({
        range: data.range,
        edit: (
          <img
            src={Edit}
            className="edit_p"
            onClick={() => CommonEdit(data.range_id, data)}
          />
        ),
      });
    });

    props.CaseType.map((data, index) => {
      case_type_data.push({
        case: data.case_type,
        edit: (
          <img
            src={Edit}
            className="edit_p"
            onClick={() => CommonEdit(data.case_type_id, data)}
          />
        ),
      });
    });

    props.SubStage_data.map((data, index) => {
      substage_data.push({
        stage: data.stage,
        sub_stage: data.sub_stage,
        edit: (
          <img
            src={Edit}
            className="edit_p"
            onClick={() => EditSubStage(data.sub_stage_id, data)}
          />
        ),
      });
    });

    props.Class_Table_Data.map((data, index) => {
      class_data.push({
        class: data.sub_project_type,
        classname: data.class,
        des: data.class_description,
        edit: (
          <img
            src={Edit}
            className="edit_p"
            onClick={() => EditClass(data.class_id, data)}
          />
        ),
      });
    });

    props.SubActivity_Data.map((data, index) => {
      sub_activity.push({
        activity: data.activity,
        activityname: data.sub_activity,
        edit: (
          <img
            src={Edit}
            className="edit_p"
            onClick={() => EditSubActivity(data.proj_activity_id, data)}
          />
        ),
      });
    });

    props.CheckList_Data.map((data, index) => {
      checklist_data.push({
        project_type: data.project_type,
        checklist_name: data.check_list,
        edit: (
          <img
            src={Edit}
            className="edit_p"
            onClick={() => Editchecklist(data.check_list_id, data)}
          />
        ),
      });
    });
    props.getTableControl.map((data, index) => {
      control_data.push({
        control: data.control,
        edit: (
          <img
            src={Edit}
            className="edit_p"
            onClick={() => CommonEdit(data.screen_control_id, data)}
          />
        ),
      });
    });
    props.getLoactionsList.map((data, index) => {
      office_Location_data.push({
        officeLocation: data.office_location,
        edit: (
          <img
            src={Edit}
            className="edit_p"
            onClick={() => CommonEdit(data.office_location_id, data)}
          />
        ),
      });
    });

    setTableData({
      get_table_status_data,
      skills_data,
      traits_data,
      certification_data,
      specification_data,
      qualification_data,
      insdustry_data,
      institute_data,
      capability_data,
      talents_data,
      resource_data,
      desgination_data,
      question_data,
      department_data,
      activity_data,
      court_data,
      stage_data,
      range_data,
      case_type_data,
      substage_data,
      class_data,
      sub_activity,
      group_data,
      checklist_data,
      control_data,
      office_Location_data

    });


  }, [props, table_name_value.table_names]);
  console.log(props.stage, "satge")
  function Submit(data) {
    // alert(substageId)
    setStatusvalue((prevState) => ({
      ...prevState,
    }));
    setsubstageId((prevState) => ({
      ...prevState,
    }));

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
    if (filtererr.length > 0) {
    } else {
      if (data === 21) {
        dispatch(
          InsertClass(
            UserMaster,
            EditStoreData.ClassEdit,
            Editvisible,
            // props.Class_Table_Data.class_id,
            // Statusvalue,
            props.Class_Table_Data && props?.Class_Table_Data[0]?.class_type
          )
        ).then(() => {
          setEditvisible(false);
          handleCancel()
        });
      } else if (data === 20) {
        if (Editvisible) {
          dispatch(UpdateSubActivity(UserMaster, EditStoreData.SubActivityEdit, Editvisible, props.SubActivity_Data && props.SubActivity_Data[0].activity_id)).then(() => {
            setEditvisible(false);
            handleCancel()
          });
        }
        else {
          dispatch(InsertSubActivity(UserMaster, EditStoreData.SubActivityEdit, Editvisible, props.SubActivity_Data && props.SubActivity_Data[0].activity_id)).then(() => {
            setEditvisible(false);
            handleCancel()
          });
        }
      } else if (data === 29) {
        dispatch(
          InsertCheckList(UserMaster, EditStoreData.ChecklistEdit, Editvisible)
        ).then(() => {
          setEditvisible(false);
          handleCancel()
        });
      } else if (
        data === 3 ||
        data === 5 ||
        data === 6 ||
        data === 7 ||
        data === 8 ||
        data === 9 ||
        data === 11 ||
        data === 12 ||
        data === 13 ||
        data === 14 ||
        data === 15 ||
        data === 16 ||
        data === 17 ||
        data === 18 ||
        data === 19 ||
        data === 22 ||
        data === 23 ||
        data === 24 ||
        data === 25 ||
        data === 27 ||
        data === 28 ||
        data === 30 ||
        data === 31
      ) {
        if (Editvisible) {
          dispatch(
            Common_Update_text(
              table_name_value.table_names,
              UserMaster,
              EditStoreData,
              Editvisible
            )
          ).then(() => {
            handleCancel()
            setEditvisible(false);
          });
        } else {
          dispatch(
            Common_insert_text(table_name_value.table_names, UserMaster)
          ).then(() => {
            setEditvisible(false);
            handleCancel()
          });
        }
      } else if (data === 26) {
        if (Editvisible) {
          dispatch(UpdateSubstage(UserMaster, EditStoreData.SubStageEdit, Editvisible, props.SubStage_data && props.SubStage_data[0].stage_id)).then(() => {
            setEditvisible(false);
            handleCancel()
          });
        }
        else {
          dispatch(InsertSubstage(UserMaster, props.SubStage_data && props.SubStage_data[0].stage_id)).then(() => {
            setEditvisible(false);
            handleCancel()
          });
        }
      } else if (data === 4) {
        dispatch(
          InsertStatus(UserMaster, EditStoreData.StatusEdit, Editvisible, Statusvalue)
        ).then(() => {
          setEditvisible(false);
          handleCancel()
        });
      }
    }
    //  console.log(props.Class_Table_Data&&props.Class_Table_Data[0].class_type,"check_whe")
    setUserMaster((prevState) => ({
      ...prevState,
    }));
  }

  const CommonEdit = (id, data) => {
    var group = props.GroupData.find((data) => {
      return data.group_id == id;
    });
    var traits = props.TraitsData.find((data) => {
      return data.traitTable == id;
    });
    var skills = props.SkillsData.find((data) => {
      return data.skill_id == id;
    });
    var certification = props.Certification.find((data) => {
      return data.certification_id == id;
    });
    var specification = props.Specification_data.find((data) => {
      return data.specialization_id == id;
    });
    var qualification = props.Qualification_data.find((data) => {
      return data.qualification_id == id;
    });
    var industry = props.Industry.find((data) => {
      return data.industry_id == id;
    });
    var institute = props.Institute.find((data) => {
      return data.institute_id == id;
    });
    var capability = props.Capability.find((data) => {
      return data.capability_id == id;
    });
    var talents = props.Talents.find((data) => {
      return data.talent_id == id;
    });
    var resource = props.Resource.find((data) => {
      return data.resource_type_id == id;
    });
    var designation = props.Designation.find((data) => {
      return data.designation_id == id;
    });
    var question = props.Question.find((data) => {
      return data.question_id == id
    })
    var department = props.Department.find((data) => {
      return data.department_id == id;
    });
    var activity = props.Activity.find((data) => {
      return data.activity_id == id;
    });

    var court = props.Court.find((data) => {
      return data.location_id == id;
    });
    var range = props.Range.find((data) => {
      return data.range_id == id;
    });
    var stage = props.stage.find((data) => {
      return data.stage_id == id;
    });
    var casetype = props.CaseType.find((data) => {
      return data.case_type_id == id;
    });
    var control = props.getTableControl.find((data) => {
      return data.screen_control_id == id
    })
    var office_Location = props.getLoactionsList.find((data) => {
      return data.office_location_id == id
    })
    UserMaster.groupname.value = data.group_name;
    UserMaster.skill_name.value = data.skill_name;
    UserMaster.certification_name.value = data.certification;
    UserMaster.traits_name.value = data.traits;
    UserMaster.specialization_name.value = data.specilization;
    UserMaster.qualification_name.value = data.qual_name;
    UserMaster.industry.value = data.industry;
    UserMaster.institute.value = data.institute;
    UserMaster.capability.value = data.capability;
    UserMaster.talents.value = data.talent;
    UserMaster.resourse.value = data.resource_type;
    UserMaster.designation.value = data.designation;
    UserMaster.question.value = data.questions;
    UserMaster.department.value = data.department;
    UserMaster.activity.value = data.activity;
    UserMaster.court.value = data.location;
    UserMaster.range.value = data.range;
    UserMaster.stage_name.value = data.stage;
    UserMaster.case_type.value = data.case_type;
    UserMaster.control.value = data.control
    UserMaster.office_Location.value = data.office_location
    setEditStoreData({
      group,
      traits,
      skills,
      certification,
      specification,
      qualification,
      industry,
      institute,
      capability,
      talents,
      resource,
      department,
      designation,
      question,
      activity,
      court,
      range,
      stage,
      casetype,
      control,
      office_Location


    });
    setUserMaster((prevState) => ({
      ...prevState,
    }));
    setEditvisible(true);
  };
  const Editchecklist = (id, data) => {
    UserMaster.project_type.value = data.project_type_id;
    UserMaster.checklist_name.value = data.check_list;
    setEditvisible(true);
    var ChecklistEdit = props.CheckList_Data.find((data) => {
      return data.check_list_id == id;
    });
    setEditStoreData({ ChecklistEdit });
    setUserMaster((prevState) => ({
      ...prevState,
    }));
    // setEditvisible((prevState)=>({
    //   ...prevState,
    // }))
  };
  const EditClass = (id, data) => {
    UserMaster.class_type.value = data.sub_project_type_id;
    UserMaster.class_name.value = data.class;
    UserMaster.description.value = data.class_description;
    var ClassEdit = props.Class_Table_Data.find((data) => {
      return data.class_id == id;
    });
    setEditvisible(true);

    setEditStoreData({ ClassEdit });
    setUserMaster((prevState) => ({
      ...prevState,
    }));
  };

  const EditStatus = (id, data) => {
    UserMaster.status_type.value = data.status_id.toString();
    var StatusEdit = props.StatusTableData.find((data) => {
      return data.status_id == id;
    });
    UserMaster.status_name.value = data.status;

    setEditvisible(true);

    setEditStoreData({ StatusEdit });
    setUserMaster((prevState) => ({
      ...prevState,
    }));
  };

  const EditSubActivity = (id, data) => {
    UserMaster.activity_drop.value = data.activity_id;
    UserMaster.sub_activity.value = data.sub_activity;
    var SubActivityEdit = props.SubActivity_Data.find((data) => {
      return data.proj_activity_id == id;
    });
    setEditvisible(true);

    setEditStoreData({ SubActivityEdit });
    setUserMaster((prevState) => ({
      ...prevState,
    }));
  };

  const EditSubStage = (id, data) => {
    UserMaster.stage_dropdown.value = data.stage_id;
    UserMaster.sub_stage.value = data.sub_stage;
    var SubStageEdit = props.SubStage_data.find((data) => {
      return data.sub_stage_id == id;
    });
    setEditvisible(true);

    setEditStoreData({ SubStageEdit });
    setUserMaster((prevState) => ({
      ...prevState,
    }));
  };
  const handleCancel = () => {
    let From_key = [
      "groupname", "skill_name", "class_name", "class_type", "description", "activity", "activity_drop", "project_type", "checklist_name",
      "status_type", "status_name", "status_name", "traits_name", "specialization_name", "certification_name", "qualification_name",
      "industry", "institute", "capability", "talents", "resourse", "designation", "question", "department", "activity", "sub_activity",
      "court", "range", "stage_dropdown", "stage_name", "case_type", "activity_drop", "sub_stage", "control", "office_Location"
    ];

    From_key.map((data) => {
      UserMaster[data].value = "";
    });


    setUserMaster((prevState) => ({
      ...prevState,
    }));
  };
  const validationHide = () => {
    let From_key = [
      "groupname", "skill_name", "class_name", "class_type", "description", "activity", "activity_drop", "project_type", "checklist_name",
      "status_type", "status_name", "status_name", "traits_name", "specialization_name", "certification_name", "qualification_name",
      "industry", "institute", "capability", "talents", "resourse", "designation", "question", "department", "activity", "sub_activity",
      "court", "range", "stage_dropdown", "stage_name", "case_type", "activity_drop", "sub_stage", "control", "office_Location"
    ];

    From_key.map((data) => {
      UserMaster[data].validation = [];
    });


    setUserMaster((prevState) => ({
      ...prevState,
    }));
  };
  ///*****user permission**********/
  const [saveRights, setSaveRights] = useState([])
  useEffect(() => {
    if (props.UserPermission.length > 0 && props.UserPermission) {
      let data_res_id = props.UserPermission.find((val) => {
        return (
          "User Masters - Save" == val.control
        )
      })
      setSaveRights(data_res_id)
    }

  }, [props.UserPermission]);

  /////////////
  return (
    <div className="user_master_parent">
      <div className="user_master_h">User Master</div>
      <Grid container spacing={2} className="user_master_grid">
        {/* groupname */}

        <div style={{ display: "flex", margin: "20px 0px 20px 0px" }}>
          <Labelbox
            type="select"
            placeholder={"Table Name"}
            changeData={(data) =>
              checkValidation(data, "tablename")
            }
            value={UserMaster.tablename.value}
            error={UserMaster.tablename.error}
            errmsg={UserMaster.tablename.errmsg}
            //  dropdown={[{id:"1",value:"Group Name"},{id:"2",value:"Status"},{id:"3",value:"Class"},{id:"4",value:"CheckList"}
            //  ,{id:"5",value:"SubStage"}]}
            dropdown={tablevalues.table_data}
          />

          {/* group name */}
          {UserMaster?.tablename?.value === 3 && (
            <Labelbox
              type="text"
              placeholder={"Enter Group Name"}
              changeData={(data) => checkValidation(data, "groupname")}
              value={UserMaster.groupname.value}
              error={UserMaster.groupname.error}
              errmsg={UserMaster.groupname.errmsg}
            />
          )}
          {/* status */}
          {UserMaster.tablename.value === 4 && (
            <div className="table_cont_change">
              <Labelbox
                type="select"
                placeholder={"Status Type"}
                dropdown={tablevalues.get_status_type}
                // stringvalue
                // mode="multiple"
                changeData={(data) => checkValidation(data, "status_type")}
                value={UserMaster.status_type.value}
                error={UserMaster.status_type.error}
                errmsg={UserMaster.status_type.errmsg}
              />
              <Labelbox
                type="text"
                placeholder={"Enter Status Name"}
                changeData={(data) => checkValidation(data, "status_name")}
                value={UserMaster.status_name.value}
                error={UserMaster.status_name.error}
                errmsg={UserMaster.status_name.errmsg}
              />
            </div>
          )}
          {/* skills */}
          {UserMaster.tablename.value === 5 && (
            <Labelbox
              type="text"
              placeholder={"Enter Skills Name"}
              changeData={(data) => checkValidation(data, "skill_name")}
              value={UserMaster.skill_name.value}
              error={UserMaster.skill_name.error}
              errmsg={UserMaster.skill_name.errmsg}
            />
          )}

          {/* Traits */}
          {UserMaster.tablename.value === 6 && (
            <Labelbox
              type="text"
              placeholder={"Enter Traits Name"}
              changeData={(data) => checkValidation(data, "traits_name")}
              value={UserMaster.traits_name.value}
              error={UserMaster.traits_name.error}
              errmsg={UserMaster.traits_name.errmsg}
            />
          )}

          {/* certification */}
          {UserMaster.tablename.value === 7 && (
            <Labelbox
              type="text"
              placeholder={"Enter Certification Name"}
              changeData={(data) => checkValidation(data, "certification_name")}
              value={UserMaster.certification_name.value}
              error={UserMaster.certification_name.error}
              errmsg={UserMaster.certification_name.errmsg}
            />
          )}
          {/* Traits */}
          {UserMaster.tablename.value === 8 && (
            <Labelbox
              type="text"
              placeholder={"Enter Specialization Name"}
              changeData={(data) =>
                checkValidation(data, "specialization_name")
              }
              value={UserMaster.specialization_name.value}
              error={UserMaster.specialization_name.error}
              errmsg={UserMaster.specialization_name.errmsg}
            />
          )}

          {/* Qualification */}
          {UserMaster.tablename.value === 9 && (
            <Labelbox
              type="text"
              placeholder={"Enter Qualification Name"}
              changeData={(data) => checkValidation(data, "qualification_name")}
              value={UserMaster.qualification_name.value}
              error={UserMaster.qualification_name.error}
              errmsg={UserMaster.qualification_name.errmsg}
            />
          )}

          {/* Industry */}
          {UserMaster.tablename.value === 11 && (
            <Labelbox
              type="text"
              placeholder={"Enter Industry Name"}
              changeData={(data) => checkValidation(data, "industry")}
              value={UserMaster.industry.value}
              error={UserMaster.industry.error}
              errmsg={UserMaster.industry.errmsg}
            />
          )}
          {/* Institute */}
          {UserMaster.tablename.value === 12 && (
            <Labelbox
              type="text"
              placeholder={"Enter Institute Name"}
              changeData={(data) => checkValidation(data, "institute")}
              value={UserMaster.institute.value}
              error={UserMaster.institute.error}
              errmsg={UserMaster.institute.errmsg}
            />
          )}

          {/* Capability */}
          {UserMaster.tablename.value === 13 && (
            <Labelbox
              type="text"
              placeholder={"Enter Capability Name"}
              changeData={(data) => checkValidation(data, "capability")}
              value={UserMaster.capability.value}
              error={UserMaster.capability.error}
              errmsg={UserMaster.capability.errmsg}
            />
          )}
          {/* Talents */}
          {UserMaster.tablename.value === 14 && (
            <Labelbox
              type="text"
              placeholder={"Enter Talents Name"}
              changeData={(data) => checkValidation(data, "talents")}
              value={UserMaster.talents.value}
              error={UserMaster.talents.error}
              errmsg={UserMaster.talents.errmsg}
            />
          )}

          {/* Type of resource */}
          {UserMaster.tablename.value === 15 && (
            <Labelbox
              type="text"
              placeholder={"Enter Type of resource Name"}
              changeData={(data) => checkValidation(data, "resourse")}
              value={UserMaster.resourse.value}
              error={UserMaster.resourse.error}
              errmsg={UserMaster.resourse.errmsg}
            />
          )}

          {/* Designation  */}
          {UserMaster.tablename.value === 16 && (
            <Labelbox
              type="text"
              placeholder={"Enter Designation  Name"}
              changeData={(data) => checkValidation(data, "designation")}
              value={UserMaster.designation.value}
              error={UserMaster.designation.error}
              errmsg={UserMaster.designation.errmsg}
            />
          )}

          {/* Question  */}
          {UserMaster.tablename.value === 17 && (
            <Labelbox
              type="text"
              placeholder={"Enter Question  Name"}
              changeData={(data) => checkValidation(data, "question")}
              value={UserMaster.question.value}
              error={UserMaster.question.error}
              errmsg={UserMaster.question.errmsg}
            />
          )}

          {/* Department  */}
          {UserMaster.tablename.value === 18 && (
            <Labelbox
              type="text"
              placeholder={"Enter Department  Name"}
              changeData={(data) => checkValidation(data, "department")}
              value={UserMaster.department.value}
              error={UserMaster.department.error}
              errmsg={UserMaster.department.errmsg}
            />
          )}

          {/* Activity  */}
          {UserMaster.tablename.value === 19 && (
            <Labelbox
              type="text"
              placeholder={"Enter Activity  Name"}
              changeData={(data) => checkValidation(data, "activity")}
              value={UserMaster.activity.value}
              error={UserMaster.activity.error}
              errmsg={UserMaster.activity.errmsg}
            />
          )}

          {/* sub Activity  */}
          {UserMaster.tablename.value === 20 && (
            <div className="table_cont_change">
              <Labelbox
                type="select"
                placeholder={"Activity"}
                changeData={(data) => checkValidation(data, "activity_drop")}
                dropdown={tablevalues.activity_list}
                value={UserMaster.activity_drop.value}
                error={UserMaster.activity_drop.error}
                errmsg={UserMaster.activity_drop.errmsg}
              />
              <Labelbox
                type="text"
                placeholder={"Enter Sub Activity  Name"}
                changeData={(data) => checkValidation(data, "sub_activity")}
                value={UserMaster.sub_activity.value}
                error={UserMaster.sub_activity.error}
                errmsg={UserMaster.sub_activity.errmsg}
              />
            </div>
          )}

          {/* class type */}
          {UserMaster.tablename.value === 21 && (
            <div className="table_cont_change">
              <Labelbox
                type="select"
                placeholder={"Class Type"}
                changeData={(data) => checkValidation(data, "class_type")}
                dropdown={tablevalues.class_type_data}
                value={UserMaster.class_type.value}
                error={UserMaster.class_type.error}
                errmsg={UserMaster.class_type.errmsg}
              />
              <Labelbox
                type="text"
                placeholder={"Enter Class Name"}
                changeData={(data) => checkValidation(data, "class_name")}
                value={UserMaster.class_name.value}
                error={UserMaster.class_name.error}
                errmsg={UserMaster.class_name.errmsg}
              />
              <div className="des_crip">
                <Labelbox
                  type="textarea"
                  placeholder={"Enter Description"}
                  changeData={(data) => checkValidation(data, "description")}
                  value={UserMaster.description.value}
                  error={UserMaster.description.error}
                  errmsg={UserMaster.description.errmsg}
                />
              </div>
            </div>
          )}

          {/* Mark  */}
          {UserMaster.tablename.value === 22 && (
            <Labelbox
              type="text"
              placeholder={"Enter Mark Name"}
              changeData={(data) => checkValidation(data, "mark")}
              value={UserMaster.mark.value}
              error={UserMaster.mark.error}
              errmsg={UserMaster.mark.errmsg}
            />
          )}

          {/* Court  */}
          {UserMaster.tablename.value === 23 && (
            <Labelbox
              type="text"
              placeholder={"Enter Court Name"}
              changeData={(data) => checkValidation(data, "court")}
              value={UserMaster.court.value}
              error={UserMaster.court.error}
              errmsg={UserMaster.court.errmsg}
            />
          )}

          {/* Range  */}
          {UserMaster.tablename.value === 24 && (
            <Labelbox
              type="text"
              placeholder={"Enter Range Name"}
              changeData={(data) => checkValidation(data, "range")}
              value={UserMaster.range.value}
              error={UserMaster.range.error}
              errmsg={UserMaster.range.errmsg}
            />
          )}

          {/* Stage  */}
          {UserMaster.tablename.value === 25 && (
            <Labelbox
              type="text"
              placeholder={"Enter Stage Name"}
              changeData={(data) => checkValidation(data, "stage_name")}
              value={UserMaster.stage_name.value}
              error={UserMaster.stage_name.error}
              errmsg={UserMaster.stage_name.errmsg}
            />
          )}

          {/* substage */}
          {UserMaster.tablename.value === 26 && (
            <div className="table_cont_change">
              <Labelbox
                type="select"
                placeholder={" Stage"}
                dropdown={tablevalues.stage_list}
                changeData={(data) => checkValidation(data, "stage_dropdown")}
                value={UserMaster.stage_dropdown.value}
                error={UserMaster.stage_dropdown.error}
                errmsg={UserMaster.stage_dropdown.errmsg}
              />

              <Labelbox
                type="text"
                placeholder={"Enter Sub Stage Name"}
                changeData={(data) => checkValidation(data, "sub_stage")}
                value={UserMaster.sub_stage.value}
                error={UserMaster.sub_stage.error}
                errmsg={UserMaster.sub_stage.errmsg}
              />
            </div>
          )}

          {/* Case Type  */}
          {UserMaster.tablename.value === 28 && (
            <Labelbox
              type="text"
              placeholder={"Enter Case Type Name"}
              changeData={(data) => checkValidation(data, "case_type")}
              value={UserMaster.case_type.value}
              error={UserMaster.case_type.error}
              errmsg={UserMaster.case_type.errmsg}
            />
          )}

          {/* checklist */}
          {UserMaster.tablename.value === 29 && (
            <div className="table_cont_change">
              <Labelbox
                type="select"
                placeholder={"Project Type"}
                dropdown={tablevalues.ProjectType}
                changeData={(data) => checkValidation(data, "project_type")}
                value={UserMaster.project_type.value}
                error={UserMaster.project_type.error}
                errmsg={UserMaster.project_type.errmsg}
              />

              <Labelbox
                type="text"
                placeholder={"Enter CheckList Name"}
                changeData={(data) => checkValidation(data, "checklist_name")}
                value={UserMaster.checklist_name.value}
                error={UserMaster.checklist_name.error}
                errmsg={UserMaster.checklist_name.errmsg}
              />
            </div>
          )}
          {UserMaster.tablename.value === 30 && (
            <Labelbox
              type="text"
              placeholder={"Control Name"}
              changeData={(data) => checkValidation(data, "control")}
              value={UserMaster.control.value}
              error={UserMaster.control.error}
              errmsg={UserMaster.control.errmsg}
            />)}

          {UserMaster.tablename.value === 31 && (
            <Labelbox
              type="text"
              placeholder={"Office Location Name"}
              changeData={(data) => checkValidation(data, "office_Location")}
              value={UserMaster.office_Location.value}
              error={UserMaster.office_Location.error}
              errmsg={UserMaster.office_Location.errmsg}
            />)}

          <div>
            {UserMaster.tablename.value >= 3 && (
              <img
                src={PlusIcon}
                onClick={() => saveRights && saveRights.display_control && saveRights.display_control === 'Y' && Submit(UserMaster.tablename.value)}
                style={{ cursor: saveRights && saveRights.display_control && saveRights.display_control === "Y" ? 'pointer' : 'not-allowed' }}
                className="plus_icon_user"
              />
            )}
          </div>
        </div>
      </Grid>

      <div className="rate_enhanced_table">
        {/* <EnhancedTable headCells={header1}
          rows={""}
           aligncss="aligncss"/> */}

        {UserMaster.tablename.value === 3 && (
          <EnhancedTable
            headCells={header1}
            rows={TableData.group_data}
            aligncss="aligncss"
          />
        )}

        {UserMaster.tablename.value === 4 && (
          <EnhancedTable
            headCells={header2}
            rows={TableData.get_table_status_data}
            aligncss="aligncss"
          />
        )}
        {UserMaster.tablename.value === 5 && (
          <EnhancedTable
            headCells={header3}
            rows={TableData.skills_data}
            aligncss="aligncss"
          />
        )}
        {UserMaster.tablename.value === 6 && (
          <EnhancedTable
            headCells={header4}
            rows={TableData.traits_data}
            aligncss="aligncss"
          />
        )}
        {UserMaster.tablename.value === 7 && (
          <EnhancedTable
            headCells={header5}
            rows={TableData.certification_data}
            aligncss="aligncss"
          />
        )}
        {UserMaster.tablename.value === 8 && (
          <EnhancedTable
            headCells={header6}
            rows={TableData.specification_data}
            aligncss="aligncss"
          />
        )}
        {UserMaster.tablename.value === 9 && (
          <EnhancedTable
            headCells={header7}
            rows={TableData.qualification_data}
            aligncss="aligncss"
          />
        )}
        {UserMaster.tablename.value === 11 && (
          <EnhancedTable
            headCells={header8}
            rows={TableData.insdustry_data}
            aligncss="aligncss"
          />
        )}
        {UserMaster.tablename.value === 12 && (
          <EnhancedTable
            headCells={header9}
            rows={TableData.institute_data}
            aligncss="aligncss"
          />
        )}
        {UserMaster.tablename.value === 13 && (
          <EnhancedTable
            headCells={header10}
            rows={TableData.capability_data}
            aligncss="aligncss"
          />
        )}
        {UserMaster.tablename.value === 14 && (
          <EnhancedTable
            headCells={header11}
            rows={TableData.talents_data}
            aligncss="aligncss"
          />
        )}
        {UserMaster.tablename.value === 15 && (
          <EnhancedTable
            headCells={header12}
            rows={TableData.resource_data}
            aligncss="aligncss"
          />
        )}
        {UserMaster.tablename.value === 16 && (
          <EnhancedTable
            headCells={header13}
            rows={TableData.desgination_data}
            aligncss="aligncss"
          />
        )}
        {UserMaster.tablename.value === 17 && (
          <EnhancedTable
            headCells={header14}
            rows={TableData.question_data}
            aligncss="aligncss"
          />
        )}
        {UserMaster.tablename.value === 18 && (
          <EnhancedTable
            headCells={header15}
            rows={TableData.department_data}
            aligncss="aligncss"
          />
        )}
        {UserMaster.tablename.value === 19 && (
          <EnhancedTable
            headCells={header16}
            rows={TableData.activity_data}
            aligncss="aligncss"
          />
        )}
        {UserMaster.tablename.value === 20 && (
          <EnhancedTable
            headCells={header17}
            rows={TableData.sub_activity}
            aligncss="aligncss"
          />
        )}
        {UserMaster.tablename.value === 21 && (
          <EnhancedTable
            headCells={header18}
            rows={TableData.class_data}
            aligncss="aligncss"
          />
        )}
        {UserMaster.tablename.value === 22 && (
          <EnhancedTable headCells={header19} rows={""} aligncss="aligncss" />
        )}
        {UserMaster.tablename.value === 23 && (
          <EnhancedTable
            headCells={header20}
            rows={TableData.court_data}
            aligncss="aligncss"
          />
        )}
        {UserMaster.tablename.value === 24 && (
          <EnhancedTable
            headCells={header21}
            rows={TableData.range_data}
            aligncss="aligncss"
          />
        )}
        {UserMaster.tablename.value === 25 && (
          <EnhancedTable
            headCells={header22}
            rows={TableData.stage_data}
            aligncss="aligncss"
          />
        )}
        {UserMaster.tablename.value === 26 && (
          <EnhancedTable
            headCells={header23}
            rows={TableData.substage_data}
            aligncss="aligncss"
          />
        )}
        {UserMaster.tablename.value === 29 && (
          <EnhancedTable
            headCells={header25}
            rows={TableData.checklist_data}
            aligncss="aligncss"
          />
        )}
        {UserMaster.tablename.value === 28 && (
          <EnhancedTable
            headCells={header24}
            rows={TableData.case_type_data}
            aligncss="aligncss"
          />
        )}

        {UserMaster.tablename.value === 30 &&
          <EnhancedTable headCells={header26}
            rows={TableData.control_data}
            aligncss="aligncss" />}

        {UserMaster.tablename.value === 31 &&
          <EnhancedTable headCells={header27}
            rows={TableData.office_Location_data}
            aligncss="aligncss" />}

      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  table_name: state.UserMasterReducer.TableNamedropdownData,
  class_type: state.getOptions.getClass || [],
  stage: state.UserMasterReducer.getStage,
  activity: state.getOptions.getActivity,
  project_type_value: state.getOptions.getProjectType,
  Status: state.getOptions.getUserStatus,
  // table get api
  GroupData: state.UserMasterReducer.getTableGroup || [],
  StatusTableData: state.UserMasterReducer.getTableStatus || [],
  SkillsData: state.UserMasterReducer.getTableSkills,
  TraitsData: state.UserMasterReducer.getTableTraits,
  Certification: state.UserMasterReducer.getTableCertification,
  Specification_data: state.UserMasterReducer.getTableSpecification,
  Qualification_data: state.UserMasterReducer.getTableQualification,
  Industry: state.UserMasterReducer.getTableIndustry,
  Institute: state.UserMasterReducer.getTableInsitute,
  Capability: state.UserMasterReducer.getTableCapability,
  Talents: state.UserMasterReducer.getTableTalents,
  Resource: state.UserMasterReducer.getTableResource,
  Designation: state.UserMasterReducer.getTableDesgination,
  Question: state.UserMasterReducer.getTableQuestion,
  Department: state.UserMasterReducer.getTableDepartment,
  Activity: state.UserMasterReducer.getTableActivity,
  Court: state.UserMasterReducer.getTableCourt,
  Range: state.UserMasterReducer.getRange,
  CaseType: state.getOptions.getCaseType,
  SubStage_data: state.UserMasterReducer.getSubStage,
  Class_Table_Data: state.UserMasterReducer.getClass,
  SubActivity_Data: state.UserMasterReducer.getSubActivity,
  CheckList_Data: state.UserMasterReducer.getChecklist,
  ClassDropdown: state.UserMasterReducer.get_user_class,
  Update_text: state.UserMasterReducer.Common_Update_text,
  UpdateSubstage: state.UserMasterReducer.Update_Substage,
  UpdateSubActivity: state.UserMasterReducer.Update_subactivity,
  getTableControl: state.UserMasterReducer.getControls,
  getLoactionsList: state.UserMasterReducer.getLoactionsList,
  UserPermission: state.UserPermissionReducer.getUserPermission,
});

export default connect(mapStateToProps)(UserMaster);
