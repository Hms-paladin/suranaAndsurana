import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../../../helpers/labelbox/labelbox';
import CustomButton from "../../../../component/Butttons/button";
import ValidationLibrary from "../../../../helpers/validationfunction";
import { useSelector, useDispatch } from 'react-redux';
import { getClass, getCountry, getIPStatus } from "../../../../actions/IPDropdown.js";
import { InsertDesign, getDesignDetails } from "../../../../actions/InsertDesign";
import moment from "moment";


function IndiaFilling(props) {
  const [IndiaForm, setIndiaForm] = useState({
    file_cover: {
      value: "",
      validation: [{ "name": "alphabetwithspace" }],
      error: null,
      errmsg: null,
      disabled: false
    },
    associate: {
      value: "",
      validation: [{ "name": "alphabetwithspace" }],
      error: null,
      errmsg: null,
      disabled: false
    },
    our_ref: {
      value: "",
      validation: [{ "name": "alphabetwithspace" }],
      error: null,
      errmsg: null,
      disabled: false
    },
    client_ref: {
      value: "",
      validation: [{ "name": "alphabetwithspace" }],
      error: null,
      errmsg: null,
      disabled: false
    },
    app_num: {
      value: "",
      validation: [{ "name": "required" }, { "name": "alphaNumaricOnly" }],
      error: null,
      errmsg: null,
      disabled: false
    },
    app_date: {
      value: "",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
      disabled: false
    },
    applicant: {
      value: "",
      validation: [{ "name": "alphabetwithspace" }],
      error: null,
      errmsg: null,
      disabled: false
    },
    title: {
      value: "",
      validation: [{ "name": "alphabetwithspace" }],
      error: null,
      errmsg: null,
      disabled: false
    },
    class: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
      disabled: false
    },
    country: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
      disabled: false
    },
    priority_country: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
      disabled: false
    },
    priority_date: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
      disabled: false
    },
    status: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
      disabled: false
    },
    comments: {
      value: "",
      validation: [{ "name": "alphabetwithspace" }],
      error: null,
      errmsg: null,
      disabled: false
    },
    renewal_date: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
      disabled: false
    }
  })
  const [indFilGetList, setIndFilGetList] = useState({
    getClassList: [],
    getCountryList: [],
    getStatusList: []
  })
  const DesignDropDowns = useSelector((state) => state.IPDropdownReducer)
  const getDesign = useSelector((state) => state.getDesignDetails)
  const dispatch = useDispatch();

  function checkValidation(data, key, multipleId) {
    var errorcheck = ValidationLibrary.checkValidation(
      data,
      IndiaForm[key].validation
    );
    let dynObj = {
      value: data,
      error: !errorcheck.state,
      errmsg: errorcheck.msg,
      validation: IndiaForm[key].validation
    }
    setIndiaForm(prevState => ({
      ...prevState,
      [key]: dynObj,
    }));
  };

  function SubmitFunction() {
    var mainvalue = {};
    var targetkeys = Object.keys(IndiaForm);
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(
        IndiaForm[targetkeys[i]].value,
        IndiaForm[targetkeys[i]].validation
      );
      IndiaForm[targetkeys[i]].error = !errorcheck.state;
      IndiaForm[targetkeys[i]].errmsg = errorcheck.msg;
      mainvalue[targetkeys[i]] = IndiaForm[targetkeys[i]].value;
    }
    var filtererr = targetkeys.filter(
      (obj) => IndiaForm[obj].error == true
    );

    if (filtererr.length > 0) {
    } else {
      dispatch(InsertDesign(IndiaForm, props.projectDetails && props.projectDetails[0], getDesign[0])).then(() => {
        // handleCancel()
      })
    }

    setIndiaForm(prevState => ({
      ...prevState
    }));
  }

  const handleCancel = () => {
    let indiaFil_key = ["file_cover", "associate", "our_ref", "client_ref", "app_num", "app_date", "applicant", "title", "class", "country", "priority_country", "priority_date", "status", "comments", "renewal_date"]

    let indiaFil_value = ["file_cover", "associate", "our_reference", "client_reference", "application_no", "application_date", "applicant", "title", "class_id", "country_id", "priority_country_id", "priority_date", "status", "comments", "renewal_date"]

    if (getDesign.length > 0) {
      indiaFil_key.map((data, index) => {
        IndiaForm[data].value = getDesign[0][indiaFil_value[index]] ? getDesign[0][indiaFil_value[index]] : "";
      });
    } else {
      indiaFil_key.map((data) => {
        IndiaForm[data].value = "";
      });
    }
    setIndiaForm((prevState) => ({
      ...prevState,
    }));
  };

  useEffect(() => {
    dispatch(getClass());
    dispatch(getCountry());
    dispatch(getIPStatus());
  }, [])

  useEffect(() => {
    dispatch(getDesignDetails(props.projectDetails && props.projectDetails[0].project_id));
  }, [props.projectDetails])

  useEffect(() => {
    handleCancel()
    if (getDesign.length > 0) {
      let indiaFil_key = ["file_cover", "associate", "our_ref", "client_ref", "app_num", "app_date", "applicant", "title", "class", "country", "status", "priority_country", "priority_date", "comments", "renewal_date"]

      let indiaFil_value = ["file_cover", "associate", "our_reference", "client_reference", "application_no", "application_date", "applicant", "title", "class_id", "country_id", "status_id", "priority_country_id", "priority_date", "comments", "renewal_date"]

      indiaFil_key.map((data, index) => {

        if (indiaFil_value[index] !== "application_date" && indiaFil_value[index] !== "priority_date" && indiaFil_value[index] !== "renewal_date") {
          IndiaForm[data].value = getDesign[0][indiaFil_value[index]];
          // IndiaForm[data].disabled = indiaFil_value[index]!=='status_id'&&getDesign[0][indiaFil_value[index]] ? true : false;
        }
        else {

          IndiaForm[data].value = getDesign[0][indiaFil_value[index]] === "0000-00-00" ? "" : moment(getDesign[0][indiaFil_value[index]]);
          // IndiaForm[data].disabled = getDesign[0][indiaFil_value[index]] === "0000-00-00" ? false : true;

        }
      });
      setIndiaForm((prevState) => ({
        ...prevState,
      }));
    }
  }, [getDesign])

  useEffect(() => {

    const getClassList = []
    const getCountryList = []
    const getStatusList = []


    DesignDropDowns.getClass.map((data) => {
      getClassList.push({ id: data.class_id, value: data.class })
    })
    DesignDropDowns.getCountry.map((data) => {
      getCountryList.push({ id: data.country_id, value: data.country })
    })
    DesignDropDowns.getIPStatus.map((data) => {
      getStatusList.push({ id: data.status_id, value: data.Status })
    })

    setIndFilGetList({ getClassList, getCountryList, getStatusList })
  }, [DesignDropDowns])

  return (
    <div className="container">
      <Grid container direction={"column"}>
        <Grid item xs={12} md={12} className="app_cont_domestic">
          <Grid item xs={2}>
            <div className="Fieldheadings">File cover</div>
            <Labelbox type="text"
              changeData={(data) => checkValidation(data, "file_cover")}
              value={IndiaForm.file_cover.value}
              error={IndiaForm.file_cover.error}
              errmsg={IndiaForm.file_cover.errmsg}
              disabled={IndiaForm.file_cover.disabled}
            />
          </Grid>

          <Grid item xs={2}>
            <div className="Fieldheadings">Associate</div>
            <Labelbox type="text"
              changeData={(data) => checkValidation(data, "associate")}
              value={IndiaForm.associate.value}
              error={IndiaForm.associate.error}
              errmsg={IndiaForm.associate.errmsg}
              disabled={IndiaForm.associate.disabled}
            />
          </Grid>

          <Grid item xs={2}>
            <div className="Fieldheadings">Our Reference</div>
            <Labelbox type="text"
              changeData={(data) => checkValidation(data, "our_ref")}
              value={IndiaForm.our_ref.value}
              error={IndiaForm.our_ref.error}
              errmsg={IndiaForm.our_ref.errmsg}
              disabled={IndiaForm.our_ref.disabled}
            />
          </Grid>

          <Grid item xs={2}>
            <div className="Fieldheadings">Client Reference</div>
            <Labelbox type="text"
              changeData={(data) => checkValidation(data, "client_ref")}
              value={IndiaForm.client_ref.value}
              error={IndiaForm.client_ref.error}
              errmsg={IndiaForm.client_ref.errmsg}
              disabled={IndiaForm.client_ref.disabled}
            />
          </Grid>

          <Grid item xs={2}>
            <div className="Fieldheadings">Application Number</div>
            <Labelbox type="text"
              changeData={(data) => checkValidation(data, "app_num")}
              value={IndiaForm.app_num.value}
              error={IndiaForm.app_num.error}
              errmsg={IndiaForm.app_num.errmsg}
              disabled={IndiaForm.app_num.disabled}
            />
          </Grid>

          <Grid item xs={2}>
            <div className="Fieldheadings">Application Date</div>
            <Labelbox type="datepicker"
              changeData={(data) => checkValidation(data, "app_date")}
              value={IndiaForm.app_date.value}
              error={IndiaForm.app_date.error}
              errmsg={IndiaForm.app_date.errmsg}
              disabled={IndiaForm.app_date.disabled}
            />
          </Grid>

          <Grid item xs={2}>
            <div className="Fieldheadings">Applicant</div>
            <Labelbox type="text"
              changeData={(data) => checkValidation(data, "applicant")}
              value={IndiaForm.applicant.value}
              error={IndiaForm.applicant.error}
              errmsg={IndiaForm.applicant.errmsg}
              disabled={IndiaForm.applicant.disabled}
            />
          </Grid>

          <Grid item xs={2}>
            <div className="Fieldheadings">Title</div>
            <Labelbox type="text"
              changeData={(data) => checkValidation(data, "title")}
              value={IndiaForm.title.value}
              error={IndiaForm.title.error}
              errmsg={IndiaForm.title.errmsg}
              disabled={IndiaForm.title.disabled}
            />
          </Grid>

          <Grid item xs={2}>
            <div className="Fieldheadings">Class</div>
            <Labelbox type="select"
              dropdown={indFilGetList.getClassList}
              changeData={(data) => checkValidation(data, "class")}
              value={IndiaForm.class.value}
              error={IndiaForm.class.error}
              errmsg={IndiaForm.class.errmsg}
              disabled={IndiaForm.class.disabled}
            />
          </Grid>

          <Grid item xs={2}>
            <div className="Fieldheadings">Country</div>
            <Labelbox type="select"
              dropdown={indFilGetList.getCountryList}
              changeData={(data) => checkValidation(data, "country")}
              value={IndiaForm.country.value}
              error={IndiaForm.country.error}
              errmsg={IndiaForm.country.errmsg}
              disabled={IndiaForm.country.disabled}
            />
          </Grid>

          <Grid item xs={2}>
            <div className="Fieldheadings">Priority Country</div>
            <Labelbox type="select"
              dropdown={indFilGetList.getCountryList}
              changeData={(data) => checkValidation(data, "priority_country")}
              value={IndiaForm.priority_country.value}
              error={IndiaForm.priority_country.error}
              errmsg={IndiaForm.priority_country.errmsg}
              disabled={IndiaForm.priority_country.disabled}
            />
          </Grid>

          <Grid item xs={2}>
            <div className="Fieldheadings">Priority Date</div>
            <Labelbox type="datepicker"
              changeData={(data) => checkValidation(data, "priority_date")}
              value={IndiaForm.priority_date.value}
              error={IndiaForm.priority_date.error}
              errmsg={IndiaForm.priority_date.errmsg}
              disabled={IndiaForm.priority_date.disabled}
            />
          </Grid>

          <Grid item xs={2}>
            <div className="Fieldheadings">Status</div>
            <Labelbox type="select"
              dropdown={indFilGetList.getStatusList}
              changeData={(data) => checkValidation(data, "status")}
              value={IndiaForm.status.value}
              error={IndiaForm.status.error}
              errmsg={IndiaForm.status.errmsg}
              disabled={IndiaForm.status.disabled}
            />
          </Grid>

          <Grid item xs={2}>
            <div className="Fieldheadings">Comments</div>
            <div className="projectTaskCmd">
              <Labelbox type="textarea"
                changeData={(data) => checkValidation(data, "comments")}
                value={IndiaForm.comments.value}
                error={IndiaForm.comments.error}
                errmsg={IndiaForm.comments.errmsg}
                disabled={IndiaForm.comments.disabled}
              />
            </div>

          </Grid>

          <Grid item xs={2}>
            <div className="Fieldheadings">Renewal Date</div>
            <Labelbox type="datepicker" disablePas={true}
              changeData={(data) => checkValidation(data, "renewal_date")}
              value={IndiaForm.renewal_date.value}
              error={IndiaForm.renewal_date.error}
              errmsg={IndiaForm.renewal_date.errmsg}
              disabled={IndiaForm.renewal_date.disabled}
            />
          </Grid>

        </Grid>
      </Grid>
      <div className="custombtnOposition">
        <CustomButton btnName={"SAVE"} btnCustomColor="customPrimary" onBtnClick={SubmitFunction} custombtnCSS={"TMopositionbuttons"} />
        <CustomButton btnName={"CANCEL"} custombtnCSS={"TMopositionbuttons"} onBtnClick={handleCancel} />
      </div>
    </div>
  )
}

export default IndiaFilling;