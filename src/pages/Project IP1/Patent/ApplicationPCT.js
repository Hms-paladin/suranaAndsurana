import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import './Patent.scss'
import Labelbox from "../../../helpers/labelbox/labelbox";
import CustomButton from "../../../component/Butttons/button";
import { useDispatch, connect } from "react-redux";
import ValidationLibrary from "../../../helpers/validationfunction";
import { getProjectDetails } from "../../../actions/ProjectFillingFinalAction";
import { useParams } from "react-router-dom";
import {
  getTradeMarkStatus, getCountryDetails,
} from "../../../actions/tradeMarkAction";
import { insertPatent,getPatentDetails } from "../../../actions/PatentAction";
import moment from 'moment'

function ApplicationPCT(props) {
  const [projectDetails, setProjectDetails] = useState({})
  const [idDetails, setidDetails] = useState({})
  const dispatch = useDispatch()
  const [tradeStatusList, settradeStatusList] = useState({})
  const [countryDetList, setcountryDetList] = useState({})

  const [patentForm, setpatentForm] = useState({

    file_cover: {
      value: "",
      // validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },
    our_ref: {
      value: "",
      // validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },
    associate: {
      value: "",
      // validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },
    deadline: {
      value: "",
      // validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },
    client_ref: {
      value: "",
      // validation: [{ "name": "required" }],
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
      // validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },
    status: {
      value: "",
      // validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },
    priority_country: {
      value: "",
      // validation: [{ "name": "required" }],
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
    dispatch(getPatentDetails(rowId));
  }, []);

  useEffect(() => {
    setProjectDetails(props.ProjectDetails);
    props.ProjectDetails.length > 0 && setidDetails({
      project_id: props.ProjectDetails[0].project_id,
      client_id: props.ProjectDetails[0].client_id,
    })

    let tradeStatusData = []
    props.tradeStatusList.map((data) =>
      tradeStatusData.push({
        value: data.Status,
        id: data.status_id
      })
    )
    settradeStatusList({ tradeStatusData })

    let countryListsData = []
    props.countriesList.map((data) =>
      countryListsData.push({
        value: data.country,
        id: data.country_id
      })
    )
    setcountryDetList({ countryListsData })



  }, [props.ProjectDetails,
  props.tradeStatusList, props.countriesList
  ]);

  useEffect(() => {
    handleCancel()
    if (props.getPatentDetails&&props.getPatentDetails.length > 0) {
      let indiaFil_key = ["file_cover", "our_ref", "associate", "deadline", "client_ref", "app_num", "app_date", "comments", "status", "priority_country", "priority_num", "priority_date"]

      let indiaFil_value = ["file_cover", "our_reference","associate", "dead_line","client_reference", "application_no", "application_date",  "comments","status_id","priority_country", "priority_application_no","priority_date" ]

      indiaFil_key.map((data, index) => {
        // console.log(indiaFil_value[index], indiaFil_value[index] !== "application_date", props.getPatentDetails[0][indiaFil_value[index]],"indiaFil_value[index]")
        if (indiaFil_value[index] !== "application_date" && indiaFil_value[index] !== "priority_date" ) {
          patentForm[data].value = props.getPatentDetails[0][indiaFil_value[index]];
          // patentForm[data].disabled = indiaFil_value[index]!=='status_id'&&props.getPatentDetails[0][indiaFil_value[index]] ? true : false;
        }
        else {
          console.log(props.getPatentDetails[0][indiaFil_value[index]], "props.getPatentDetails[0]")
          patentForm[data].value = props.getPatentDetails[0][indiaFil_value[index]] === "0000-00-00" ? "" : moment(props.getPatentDetails[0][indiaFil_value[index]]);
          // patentForm[data].disabled = props.getPatentDetails[0][indiaFil_value[index]] === "0000-00-00" ? false : true;

        } 
      });
      setpatentForm((prevState) => ({
        ...prevState,
      }));
    }
  }, [props.getPatentDetails])

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
    let params = {
      "project_id": idDetails.project_id,
      "file_cover": patentForm.file_cover.value,
      "associate": patentForm.associate.value,
      "our_reference": patentForm.our_ref.value,
      "client_reference": patentForm.client_ref.value,
      "application_no": patentForm.app_num.value,
      "application_date": patentForm.app_date.value===''?'0000-00-00':moment(patentForm.app_date.value,"YYYY-MM-DD").format("YYYY-MM-DD"),
      "priority_country": patentForm.priority_country.value===''?0:patentForm.priority_country.value,
      "priority_application_no": patentForm.priority_num.value,
      "priority_date": patentForm.priority_date.value===''?'0000-00-00':moment(patentForm.priority_date.value,"YYYY-MM-DD").format("YYYY-MM-DD"),
      "status_id": patentForm.status.value===''?0:patentForm.status.value,
      "comments": patentForm.comments.value,
      "dead_line": patentForm.deadline.value===''?'0000-00-00':moment(patentForm.deadline.value,"YYYY-MM-DD").format("YYYY-MM-DD"),
      "created_by": localStorage.getItem("empId"),
      "created_on": moment().format('YYYY-MM-DD HH:m:s'),
      "updated_on": moment().format('YYYY-MM-DD HH:m:s'),
      "updated_by": localStorage.getItem("empId"),
    }

   if (props.getPatentDetails[0]?.patent_id != "0") {
      params["patent_id"] = props.getPatentDetails[0]?.patent_id;
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
      "file_cover", "our_ref", "associate", "deadline", "client_ref", "app_num", "app_date", "comments", "status", "priority_country"
      , "priority_num", "priority_date"
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
          <Grid>
            <div className="Fieldheadings">File Cover</div>
            <Labelbox type="text"
              changeData={(data) => checkValidation(data, "file_cover")}
              value={patentForm.file_cover.value}
              error={patentForm.file_cover.error}
              errmsg={patentForm.file_cover.errmsg} />
          </Grid>

          <Grid>
            <div className="Fieldheadings">Associate</div>
            <Labelbox type="text"
              changeData={(data) => checkValidation(data, "associate")}
              value={patentForm.associate.value}
              error={patentForm.associate.error}
              errmsg={patentForm.associate.errmsg} />
          </Grid>

          <Grid>
            <div className="Fieldheadings">Our Reference</div>
            <Labelbox type="text"
              changeData={(data) => checkValidation(data, "our_ref")}
              value={patentForm.our_ref.value}
              error={patentForm.our_ref.error}
              errmsg={patentForm.our_ref.errmsg} />
          </Grid>

          <Grid>
            <div className="Fieldheadings">Client Reference</div>
            <Labelbox type="text"
              changeData={(data) => checkValidation(data, "client_ref")}
              value={patentForm.client_ref.value}
              error={patentForm.client_ref.error}
              errmsg={patentForm.client_ref.errmsg} />
          </Grid>

          <Grid>
            <div className="Fieldheadings">Application number</div>
            <Labelbox type="number"
              changeData={(data) => checkValidation(data, "app_num")}
              value={patentForm.app_num.value}
              error={patentForm.app_num.error}
              errmsg={patentForm.app_num.errmsg} />
          </Grid>

          <Grid>
            <div className="Fieldheadings">Application Date</div>
            <Labelbox type="datepicker"
              changeData={(data) => checkValidation(data, "app_date")}
              value={patentForm.app_date.value}
              error={patentForm.app_date.error}
              errmsg={patentForm.app_date.errmsg} />
          </Grid>

          <Grid>
            <div className="Fieldheadings">Priority Country</div>
            <Labelbox type="select"
              dropdown={countryDetList.countryListsData}
              changeData={(data) => checkValidation(data, "priority_country")}
              value={patentForm.priority_country.value}
              error={patentForm.priority_country.error}
              errmsg={patentForm.priority_country.errmsg} />
          </Grid>

          <Grid>
            <div className="Fieldheadings">Priority No</div>
            <Labelbox type="number"
              changeData={(data) => checkValidation(data, "priority_num")}
              value={patentForm.priority_num.value}
              error={patentForm.priority_num.error}
              errmsg={patentForm.priority_num.errmsg} />
          </Grid>

          <Grid>
            <div className="Fieldheadings">Priority Date</div>
            <Labelbox type="datepicker"
              changeData={(data) => checkValidation(data, "priority_date")}
              value={patentForm.priority_date.value}
              error={patentForm.priority_date.error}
              errmsg={patentForm.priority_date.errmsg} />
          </Grid>

          <Grid>
            <div className="Fieldheadings">Status</div>
            <Labelbox type="select"
              changeData={(data) => checkValidation(data, "status")}
              dropdown={tradeStatusList.tradeStatusData}
              value={patentForm.status.value}
              error={patentForm.status.error}
              errmsg={patentForm.status.errmsg} />
          </Grid>


        </Grid>
        <Grid item xs={12} md={12} className="comments_line">
          <Grid>
            <div className="Fieldheadings">Comments</div>
            <div className="coments_div"><Labelbox type="textarea"
              changeData={(data) => checkValidation(data, "comments")}
              value={patentForm.comments.value}
              error={patentForm.comments.error}
              errmsg={patentForm.comments.errmsg}
            /></div>
          </Grid>

          <Grid>
            <div className="Fieldheadings">DeadLine</div>
            <div><Labelbox type="datepicker"
              changeData={(data) => checkValidation(data, "deadline")}
              value={patentForm.deadline.value}
              error={patentForm.deadline.error}
              errmsg={patentForm.deadline.errmsg} /></div>
          </Grid>



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
  countriesList: state.tradeMarkReducer.getCountryList || [],
  getPatentDetails: state.PatentReducer.getPatentDetails || [],
  ProjectDetails: state.ProjectFillingFinalReducer.getProjectDetails || [],
});

export default connect(mapStateToProps)(ApplicationPCT);