import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import './Patent.scss'
import Labelbox from "../../../helpers/labelbox/labelbox";
import CustomButton from "../../../component/Butttons/button";
import { useDispatch, connect } from "react-redux";
import ValidationLibrary from "../../../helpers/validationfunction";
import { getProjectDetails } from "../../../actions/ProjectFillingFinalAction";  
import { useParams } from "react-router-dom";
import { getTradeMarkStatus,getCountryDetails,
  } from "../../../actions/tradeMarkAction";
import {insertPatent,getPatent} from  "../../../actions/PatentAction";
import moment from 'moment'

function ApplicationPCT(props) {
  const [projectDetails, setProjectDetails] = useState({})
  const [idDetails, setidDetails] = useState({})
  const dispatch = useDispatch()
  const [tradeStatusList, settradeStatusList] = useState({})
  const [countryDetList, setcountryDetList] = useState({})
  
  const [patentForm, setpatentForm] = useState({
    patent_id: {
      value: 0,
      validation: [{ "name": "required" },],
      error: null,
      errmsg: null,
  },
    file_cover: {
      value: "",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },
    our_ref: {
      value: "",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },
    associate: {
      value: "",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },
    deadline: {
      value: "",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },
    client_ref: {
      value: "",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },
    app_num: {
      value: "",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },
    app_date: {
      value: "",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },
    comments: {
      value: "",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },
    status: {
      value: "",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },
    priority_country: {
      value: "",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },
    priority_num: {
      value: "",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },

    priority_date: {
      value: "",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },





  })

  let { rowId } = useParams()
  useEffect(() => {
    dispatch(getPatent(rowId));
    dispatch(getProjectDetails(rowId))
    dispatch(getTradeMarkStatus());
    dispatch(getCountryDetails());
    
  }, []);

  useEffect(() => {

    if(props.patent && props.patent[0]){

      let obj = props.patent[0];
      //patent_id
      patentForm.patent_id.value =obj.patent_id;
      patentForm.file_cover.value =obj.file_cover;
      patentForm.associate.value =obj.associate;
      patentForm.our_ref.value =obj.our_reference;
      patentForm.client_ref.value =obj.client_reference;
      patentForm.app_num.value =obj.application_no;
      patentForm.app_date.value =obj.application_date;
      patentForm.priority_country.value =obj.priority_country;
      patentForm.priority_num.value =obj.priority_application_no;
      patentForm.priority_date.value =obj.priority_date;
      patentForm.status.value =obj.status_id;
      patentForm.comments.value =obj.comments;
      patentForm.deadline.value =obj.dead_line;

     /* "file_cover":patentForm.file_cover.value,
      "associate":patentForm.associate.value,
      "our_reference":patentForm.our_ref.value,
      "client_reference":patentForm.client_ref.value,
      "application_no":patentForm.app_num.value,
      "application_date":patentForm.app_date.value,
      "priority_country":patentForm.priority_country.value,
      "priority_application_no":patentForm.priority_num.value,
      "priority_date":patentForm.priority_date.value,
      "status_id":patentForm.status.value,
      "comments":patentForm.comments.value,
      "dead_line":patentForm.deadline.value,*/
         
  }
    setProjectDetails(props.ProjectDetails);
    props.ProjectDetails.length > 0 && setidDetails({
        project_id:props.ProjectDetails[0].project_id,
        client_id:props.ProjectDetails[0].client_id,
    })

    let tradeStatusData = []
    props.tradeStatusList.map((data) =>
tradeStatusData.push({ value: data.Status,
    id: data.status_id })
)
settradeStatusList({ tradeStatusData })

let countryListsData = []
props.countriesList.map((data) =>
countryListsData.push({ value: data.country,
id: data.country_id })
) 
setcountryDetList({ countryListsData })



}, [props.ProjectDetails,
props.tradeStatusList,props.countriesList
]);

  function onSubmit() {
    var mainvalue = {};
    var targetkeys = Object.keys(patentForm);
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(
        patentForm[targetkeys[i]].value,
        patentForm[targetkeys[i]].validation
      );
      patentForm[targetkeys[i]].error = !errorcheck.state;
      patentForm[targetkeys[i]].errmsg = errorcheck.msg;
      mainvalue[targetkeys[i]] = patentForm[targetkeys[i]].value;
    }
    var filtererr = targetkeys.filter(
      (obj) => patentForm[obj].error == true
    );
    console.log(filtererr.length);
    let params ={
      "project_id":idDetails.project_id,
      "file_cover":patentForm.file_cover.value,
      "associate":patentForm.associate.value,
      "our_reference":patentForm.our_ref.value,
      "client_reference":patentForm.client_ref.value,
      "application_no":patentForm.app_num.value,
      "application_date":patentForm.app_date.value,
      "priority_country":patentForm.priority_country.value,
      "priority_application_no":patentForm.priority_num.value,
      "priority_date":patentForm.priority_date.value,
      "status_id":patentForm.status.value,
      "comments":patentForm.comments.value,
      "dead_line":patentForm.deadline.value,
      "created_by" :localStorage.getItem("empId"),
      "created_on" : moment().format('YYYY-MM-DD HH:m:s')   ,
      "updated_on" : moment().format('YYYY-MM-DD HH:m:s')   ,
      "updated_by" :localStorage.getItem("empId"),
      }

    
    if (filtererr.length > 0) {
      // setpatentForm({ error: true });
    } else {
      // setpatentForm({ error: false });

      dispatch(insertPatent(params)).then(() => {
        handleCancel()
      })
    }

    setpatentForm(prevState => ({
      ...prevState
    }));
  };

  const handleCancel = () => {
    let formKey = [
      "file_cover", "our_ref","associate", "deadline","client_ref", "app_num","app_date", "comments","status", "priority_country"
      ,"priority_num", "priority_date"
    ]

    formKey.map((data) => {
      patentForm[data].value = ""
    })
    setpatentForm(prevState => ({
      ...prevState,
    }));
  }

  function checkValidation(data, key, multipleId) {

    var errorcheck = ValidationLibrary.checkValidation(
      data,
      patentForm[key].validation
    );
    let dynObj = {
      value: data,
      error: !errorcheck.state,
      errmsg: errorcheck.msg,
      validation: patentForm[key].validation
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

    setpatentForm(prevState => ({
      ...prevState,
      [key]: dynObj,
    }));

  };
  return (
    <div>
      <Grid container direction={"column"}>
        <Grid item xs={12} md={12} className="app_cont_domestic">
          <Labelbox type="text" placeholder={"File Cover"}
            changeData={(data) => checkValidation(data, "file_cover")}
            value={patentForm.file_cover.value}
            error={patentForm.file_cover.error}
            errmsg={patentForm.file_cover.errmsg} />

          <Labelbox type="text" placeholder={"Associate"}
            changeData={(data) => checkValidation(data, "associate")}
            value={patentForm.associate.value}
            error={patentForm.associate.error}
            errmsg={patentForm.associate.errmsg} />

          <Labelbox type="text" placeholder={"Our Reference"}
            changeData={(data) => checkValidation(data, "our_ref")}
            value={patentForm.our_ref.value}
            error={patentForm.our_ref.error}
            errmsg={patentForm.our_ref.errmsg} />

          <Labelbox type="text" placeholder={"Client Reference"}
            changeData={(data) => checkValidation(data, "client_ref")}
            value={patentForm.client_ref.value}
            error={patentForm.client_ref.error}
            errmsg={patentForm.client_ref.errmsg} />

          <Labelbox type="number" placeholder={"Application number"}
            changeData={(data) => checkValidation(data, "app_num")}
            value={patentForm.app_num.value}
            error={patentForm.app_num.error}
            errmsg={patentForm.app_num.errmsg} />

          <Labelbox type="datepicker" placeholder={"Application Date"}
            changeData={(data) => checkValidation(data, "app_date")}
            value={patentForm.app_date.value}
            error={patentForm.app_date.error}
            errmsg={patentForm.app_date.errmsg} />

          <Labelbox type="select" placeholder={"Priority Country"} 
           dropdown={countryDetList.countryListsData}  
           changeData={(data) => checkValidation(data, "priority_country")}
           value={patentForm.priority_country.value}
           error={patentForm.priority_country.error}
           errmsg={patentForm.priority_country.errmsg}/>

          <Labelbox type="number" placeholder={"Priority No"}
            changeData={(data) => checkValidation(data, "priority_num")}
            value={patentForm.priority_num.value}
            error={patentForm.priority_num.error}
            errmsg={patentForm.priority_num.errmsg} />
          <Labelbox type="datepicker" placeholder={"Priority Date"}
            changeData={(data) => checkValidation(data, "priority_date")}
            value={patentForm.priority_date.value}
            error={patentForm.priority_date.error}
            errmsg={patentForm.priority_date.errmsg} />

          <Labelbox type="select" placeholder={"Status"} 
          changeData={(data) => checkValidation(data, "status")}
          dropdown={tradeStatusList.tradeStatusData} 
          value={patentForm.status.value}
          error={patentForm.status.error}
          errmsg={patentForm.status.errmsg}/>

        </Grid>
        <Grid item xs={12} md={12} className="comments_line">
          <div className="coments_div"><Labelbox type="text" placeholder={"Comments"}
            changeData={(data) => checkValidation(data, "comments")}
            value={patentForm.comments.value}
            error={patentForm.comments.error}
            errmsg={patentForm.comments.errmsg}
          /></div>
          <div><Labelbox type="datepicker" placeholder={"DeadLine"}
            changeData={(data) => checkValidation(data, "deadline")}
            value={patentForm.deadline.value}
            error={patentForm.deadline.error}
            errmsg={patentForm.deadline.errmsg} /></div>


        </Grid>
      

      </Grid>
      <div className="custombtnOposition">
        <CustomButton btnName={"SAVE"} btnCustomColor="customPrimary" custombtnCSS={"TMopositionbuttons"} onBtnClick={onSubmit} />
        <CustomButton btnName={"CANCEL"} onBtnClick={handleCancel} custombtnCSS={"TMopositionbuttons"} />
      </div>
    </div>
  )
}
const mapStateToProps = (state) =>
({
    
    tradeStatusList: state.tradeMarkReducer.getTradeMarkStatusList || [],
    countriesList : state.tradeMarkReducer.getCountryList || [],
    ProjectDetails: state.ProjectFillingFinalReducer.getProjectDetails || [],
    patent: state.PatentReducer.getPatent || {},
});

export default connect(mapStateToProps)(ApplicationPCT);