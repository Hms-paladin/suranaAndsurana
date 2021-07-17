import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../../../helpers/labelbox/labelbox';
import CustomButton from "../../../../component/Butttons/button";
import ValidationLibrary from "../../../../helpers/validationfunction";
import { useSelector, useDispatch } from 'react-redux';
import { getClass, getCountry, getIPStatus } from "../../../../actions/IPDropdown.js";
import { InsertDesign, getDesignDetails } from "../../../../actions/InsertDesign";
import moment from "moment";


function InternationalFilling(props) {
  const [InternationlForm, setInternationlForm] = useState({
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
  const [interFilGetList, setInterFilGetList] = useState({
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
      InternationlForm[key].validation
    );
    let dynObj = {
      value: data,
      error: !errorcheck.state,
      errmsg: errorcheck.msg,
      validation: InternationlForm[key].validation
    }
    setInternationlForm(prevState => ({
      ...prevState,
      [key]: dynObj,
    }));
  };

  function SubmitFunction() {
    var mainvalue = {};
    var targetkeys = Object.keys(InternationlForm);
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(
        InternationlForm[targetkeys[i]].value,
        InternationlForm[targetkeys[i]].validation
      );
      InternationlForm[targetkeys[i]].error = !errorcheck.state;
      InternationlForm[targetkeys[i]].errmsg = errorcheck.msg;
      mainvalue[targetkeys[i]] = InternationlForm[targetkeys[i]].value;
    }
    var filtererr = targetkeys.filter(
      (obj) => InternationlForm[obj].error == true
    );
    console.log(filtererr.length);
    if (filtererr.length > 0) {
    } else {
      dispatch(InsertDesign(InternationlForm, props.projectDetails && props.projectDetails[0], getDesign[0])).then(() => {
        // handleCancel()
      })
    }

    setInternationlForm(prevState => ({
      ...prevState
    }));
  }

  const handleCancel = () => {
    let interFil_key = ["file_cover", "associate", "our_ref", "client_ref", "app_num", "app_date", "applicant", "title", "class", "country", "priority_country", "priority_date", "status", "comments", "renewal_date"]

    let interFil_value = ["file_cover", "associate", "our_reference", "client_reference", "application_no", "application_date", "applicant", "title", "class_id", "country_id", "priority_country_id", "priority_date", "status", "comments", "renewal_date"]

    if (getDesign.length > 0) {
      interFil_key.map((data, index) => {
        InternationlForm[data].value = getDesign[0][interFil_value[index]] ? getDesign[0][interFil_value[index]] : "";
      });
    } else {
      interFil_key.map((data) => {
        InternationlForm[data].value = "";
      });
    }

    setInternationlForm((prevState) => ({
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
    if (getDesign.length > 0) {
      let interFil_key = ["file_cover", "associate", "our_ref", "client_ref", "app_num", "app_date", "applicant", "title", "class", "country", "priority_country", "priority_date", "status", "comments", "renewal_date"]

      let interFil_value = ["file_cover", "associate", "our_reference", "client_reference", "application_no", "application_date", "applicant", "title", "class_id", "country_id", "priority_country_id", "priority_date", "status", "comments", "renewal_date"]

      interFil_key.map((data, index) => {
        console.log(interFil_value[index], interFil_value[index] !== "application_date", "interFil_value[index]")
        if (interFil_value[index] !== "application_date" && interFil_value[index] !== "priority_date" && interFil_value[index] !== "renewal_date") {
          InternationlForm[data].value = getDesign[0][interFil_value[index]];
          InternationlForm[data].disabled = getDesign[0][interFil_value[index]] ? true : false;
        }
        else {
          console.log(getDesign[0][interFil_value[index]], "getDesign[0]")
          InternationlForm[data].value = getDesign[0][interFil_value[index]] === "0000-00-00" ? "" : moment(getDesign[0][interFil_value[index]]);
          InternationlForm[data].disabled = getDesign[0][interFil_value[index]] === "0000-00-00" ? false : true;

        }
      });
      setInternationlForm((prevState) => ({
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

    setInterFilGetList({ getClassList, getCountryList, getStatusList })
  }, [DesignDropDowns])

  return (
    <div className="container">
      <Grid container direction={"column"}>
        <Grid item xs={12} md={12} className="app_cont_domestic">
          <Grid>
            <div className="Fieldheadings">File cover</div>
            <Labelbox type="text"
              placeholder={"File cover"}
              changeData={(data) => checkValidation(data, "file_cover")}
              value={InternationlForm.file_cover.value}
              error={InternationlForm.file_cover.error}
              errmsg={InternationlForm.file_cover.errmsg}
              disabled={InternationlForm.file_cover.disabled}
            />
          </Grid>

          <Grid>
            <div className="Fieldheadings">Associate</div>
            <Labelbox type="text"
              changeData={(data) => checkValidation(data, "associate")}
              value={InternationlForm.associate.value}
              error={InternationlForm.associate.error}
              errmsg={InternationlForm.associate.errmsg}
              disabled={InternationlForm.associate.disabled}
            />
          </Grid>

          <Grid>
            <div className="Fieldheadings">Our Reference</div>
            <Labelbox type="text"
              changeData={(data) => checkValidation(data, "our_ref")}
              value={InternationlForm.our_ref.value}
              error={InternationlForm.our_ref.error}
              errmsg={InternationlForm.our_ref.errmsg}
              disabled={InternationlForm.our_ref.disabled}
            />
          </Grid>

          <Grid>
            <div className="Fieldheadings">Client Reference</div>
            <Labelbox type="text"
              changeData={(data) => checkValidation(data, "client_ref")}
              value={InternationlForm.client_ref.value}
              error={InternationlForm.client_ref.error}
              errmsg={InternationlForm.client_ref.errmsg}
              disabled={InternationlForm.client_ref.disabled}
            />
          </Grid>

          <Grid>
            <div className="Fieldheadings">Application Number</div>
            <Labelbox type="text"
              changeData={(data) => checkValidation(data, "app_num")}
              value={InternationlForm.app_num.value}
              error={InternationlForm.app_num.error}
              errmsg={InternationlForm.app_num.errmsg}
              disabled={InternationlForm.app_num.disabled}
            />
          </Grid>

          <Grid>
            <div className="Fieldheadings">Application Date</div>
            <Labelbox type="datepicker"
              changeData={(data) => checkValidation(data, "app_date")}
              value={InternationlForm.app_date.value}
              error={InternationlForm.app_date.error}
              errmsg={InternationlForm.app_date.errmsg}
              disabled={InternationlForm.app_date.disabled}
            />
          </Grid>

          <Grid>
            <div className="Fieldheadings">Applicant</div>
            <Labelbox type="text"
              changeData={(data) => checkValidation(data, "applicant")}
              value={InternationlForm.applicant.value}
              error={InternationlForm.applicant.error}
              errmsg={InternationlForm.applicant.errmsg}
              disabled={InternationlForm.applicant.disabled}
            />
          </Grid>

          <Grid>
            <div className="Fieldheadings">Title</div>
            <Labelbox type="text"
              changeData={(data) => checkValidation(data, "title")}
              value={InternationlForm.title.value}
              error={InternationlForm.title.error}
              errmsg={InternationlForm.title.errmsg}
              disabled={InternationlForm.title.disabled}
            />
          </Grid>

          <Grid>
            <div className="Fieldheadings">Class</div>
            <Labelbox type="select"
              dropdown={interFilGetList.getClassList}
              changeData={(data) => checkValidation(data, "class")}
              value={InternationlForm.class.value}
              error={InternationlForm.class.error}
              errmsg={InternationlForm.class.errmsg}
              disabled={InternationlForm.class.disabled}
            />
          </Grid>

          <Grid>
            <div className="Fieldheadings">Country</div>
            <Labelbox type="select"
              dropdown={interFilGetList.getCountryList}
              changeData={(data) => checkValidation(data, "country")}
              value={InternationlForm.country.value}
              error={InternationlForm.country.error}
              errmsg={InternationlForm.country.errmsg}
              disabled={InternationlForm.country.disabled}
            />
          </Grid>

          <Grid>
            <div className="Fieldheadings">priority Country</div>
            <Labelbox type="select"
              dropdown={interFilGetList.getCountryList}
              changeData={(data) => checkValidation(data, "priority_country")}
              value={InternationlForm.priority_country.value}
              error={InternationlForm.priority_country.error}
              errmsg={InternationlForm.priority_country.errmsg}
              disabled={InternationlForm.priority_country.disabled}
            />
          </Grid>

          <Grid>
            <div className="Fieldheadings">priority Date</div>
            <Labelbox type="datepicker"
              changeData={(data) => checkValidation(data, "priority_date")}
              value={InternationlForm.priority_date.value}
              error={InternationlForm.priority_date.error}
              errmsg={InternationlForm.priority_date.errmsg}
              disabled={InternationlForm.priority_date.disabled}
            />
          </Grid>

          <Grid>
            <div className="Fieldheadings">Status</div>
            <Labelbox type="select"
              dropdown={interFilGetList.getStatusList}
              changeData={(data) => checkValidation(data, "status")}
              value={InternationlForm.status.value}
              error={InternationlForm.status.error}
              errmsg={InternationlForm.status.errmsg}
              disabled={InternationlForm.status.disabled}
            />
          </Grid>

          <Grid>
            <div className="Fieldheadings">Comments</div>
            <Labelbox type="textarea"
              changeData={(data) => checkValidation(data, "comments")}
              value={InternationlForm.comments.value}
              error={InternationlForm.comments.error}
              errmsg={InternationlForm.comments.errmsg}
              disabled={InternationlForm.comments.disabled}
            />
          </Grid>

          <Grid>
            <div className="Fieldheadings">Renewal Date</div>
            <Labelbox type="datepicker" disablePas={true}
              changeData={(data) => checkValidation(data, "renewal_date")}
              value={InternationlForm.renewal_date.value}
              error={InternationlForm.renewal_date.error}
              errmsg={InternationlForm.renewal_date.errmsg}
              disabled={InternationlForm.renewal_date.disabled}
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

export default InternationalFilling;