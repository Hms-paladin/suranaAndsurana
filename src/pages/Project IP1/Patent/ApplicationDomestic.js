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
import {insertPatent} from  "../../../actions/PatentAction";
import moment from 'moment'
function ApplicationDomestic(props) {

  const [projectDetails, setProjectDetails] = useState({})
  const [idDetails, setidDetails] = useState({})
  const dispatch = useDispatch()
  const [tradeStatusList, settradeStatusList] = useState({})
  const [countryDetList, setcountryDetList] = useState({})
  const [patentForm, setpatentForm] = useState({
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
    country: {
      value: "",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },
    title: {
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
    dispatch(getProjectDetails(rowId))
    dispatch(getTradeMarkStatus());
    dispatch(getCountryDetails());
    
  }, []);

  useEffect(() => {
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
    let params={
  "project_id":idDetails.project_id,
  "application_no":patentForm.app_num.value,
  "patent_title":patentForm.title.value,
  "application_date":patentForm.app_date.value,
  "comments":patentForm.comments.value,
  "file_cover":patentForm.file_cover.value,
  "associate":patentForm.associate.value,
  "our_reference":patentForm.our_ref.value,
  "client_reference":patentForm.client_ref.value,
  "priority_country":patentForm.country.value,
  "priority_application_no":patentForm.priority_num.value,
  "priority_date":patentForm.priority_date.value,
  "status_id":patentForm.status.value,
  "created_by" :localStorage.getItem("empId"),
  "created_on" : moment().format('YYYY-MM-DD HH:m:s')   ,
  "updated_on" : moment().format('YYYY-MM-DD HH:m:s')   ,
  "updated_by" :localStorage.getItem("empId"),
    }
  


 /* "filing_type_id":"2",
  "opposition_filled_date":"2021-02-01",
  "types_of_grant":"Grant",
  
  "patent_applicant":"Patent Appilcant ",
  "application_agent":"AGENT",
  "opponent":"Opponent Level",
  "opponent_agent":"Agent 1",
  
  "application_date":"2021-03-02",
  
  "dead_line":"2021-03-20", */
  
  
    if (filtererr.length > 0) {
      // setpatentForm({ error: true });
    } else {
      // setpatentForm({ error: false });

      dispatch(insertPatent(params)).then(() => {
        //handleCancel()
      })
    }

    setpatentForm(prevState => ({
      ...prevState
    }));
  };

  const handleCancel = () => {
    let ResumeFrom_key = [
      "mark", "projecttype"
    ]

    ResumeFrom_key.map((data) => {
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
      <Grid container>
        <Grid item xs={12} md={12} className="app_cont_domestic">
          <Labelbox type="text" placeholder={"File Cover"}
            changeData={(data) => checkValidation(data, "file_cover")}
            value={patentForm.file_cover.value}
            error={patentForm.file_cover.error}
            errmsg={patentForm.file_cover.errmsg} />

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

          <Labelbox type="text" placeholder={"Title"}
            changeData={(data) => checkValidation(data, "title")}
            value={patentForm.title.value}
            error={patentForm.title.error}
            errmsg={patentForm.title.errmsg} />

          <Labelbox type="select" placeholder={"Country"}
          dropdown={countryDetList.countryListsData}  
          changeData={(data) => checkValidation(data, "country")}
          value={patentForm.country.value}
          error={patentForm.country.error}
          errmsg={patentForm.country.errmsg} />

          <Labelbox type="select" placeholder={"Status"} 
          changeData={(data) => checkValidation(data, "status")}
          dropdown={tradeStatusList.tradeStatusData} 
          value={patentForm.status.value}
          error={patentForm.status.error}
          errmsg={patentForm.status.errmsg}/>

          <Labelbox type="text" placeholder={"Associate"}
            changeData={(data) => checkValidation(data, "associate")}
            value={patentForm.associate.value}
            error={patentForm.associate.error}
            errmsg={patentForm.associate.errmsg} />
            
            <Labelbox type="select" placeholder={"Status"}
            changeData={(data) => checkValidation(data, "status")}
            dropdown={tradeStatusList.tradeStatusData} 
            value={patentForm.status.value}
            error={patentForm.status.error}
            errmsg={patentForm.status.errmsg}

          />
           <div className="coments_div"><Labelbox type="text" placeholder={"Comments"}
            changeData={(data) => checkValidation(data, "comments")}
            value={patentForm.comments.value}
            error={patentForm.comments.error}
            errmsg={patentForm.comments.errmsg} /></div>

        </Grid>
       
      </Grid>
      <div className="custombtnOposition">
        <CustomButton btnName={"SAVE"} btnCustomColor="customPrimary" custombtnCSS={"TMopositionbuttons"} onBtnClick={onSubmit} />
        <CustomButton btnName={"CANCEL"} custombtnCSS={"TMopositionbuttons"} />
      </div>
    </div>
  )
}
const mapStateToProps = (state) =>
({
    
    tradeStatusList: state.tradeMarkReducer.getTradeMarkStatusList || [],
    countriesList : state.tradeMarkReducer.getCountryList || [],
    ProjectDetails: state.ProjectFillingFinalReducer.getProjectDetails || [],
});

export default connect(mapStateToProps)(ApplicationDomestic);