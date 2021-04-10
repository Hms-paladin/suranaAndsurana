import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../../../helpers/labelbox/labelbox';
import CustomButton from "../../../../component/Butttons/button";
import ValidationLibrary from "../../../../helpers/validationfunction";
import { useSelector, useDispatch } from 'react-redux';
import { getClass, getCountry, getIPStatus } from "../../../../actions/IPDropdown.js";
import { InsertDesign } from "../../../../actions/InsertDesign";

function InternationalFilling(props) {
  const [InternationlForm, setInternationlForm] = useState({
    file_cover: {
      value: "",
      validation: [{ "name": "alphabetwithspace" }],
      error: null,
      errmsg: null,
    },
    associate: {
      value: "",
      validation: [{ "name": "alphabetwithspace" }],
      error: null,
      errmsg: null,
    },
    our_ref: {
      value: "",
      validation: [{ "name": "alphabetwithspace" }],
      error: null,
      errmsg: null,
    },
    client_ref: {
      value: "",
      validation: [{ "name": "alphabetwithspace" }],
      error: null,
      errmsg: null,
    },
    app_num: {
      value: "",
      validation: [{ "name": "required" }, { "name": "alphaNumaricOnly" }],
      error: null,
      errmsg: null,
    },
    app_date: {
      value: "",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },
    applicant: {
      value: "",
      validation: [{ "name": "alphabetwithspace" }],
      error: null,
      errmsg: null,
    },
    title: {
      value: "",
      validation: [{ "name": "alphabetwithspace" }],
      error: null,
      errmsg: null,
    },
    class: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    country: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    priority_country: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    priority_date: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    status: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    comments: {
      value: "",
      validation: [{ "name": "alphabetwithspace" }],
      error: null,
      errmsg: null,
    },
    renewal_date: {
      value: "",
      validation: [],
      error: null,
      errmsg: null
    }
  })
  const [interFilGetList, setInterFilGetList] = useState({
    getClassList: [],
    getCountryList: [],
    getStatusList: []
  })
  const DesignDropDowns = useSelector((state) => state.IPDropdownReducer)
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
      dispatch(InsertDesign(InternationlForm, props.projectDetails && props.projectDetails[0])).then(() => {
        handleCancel()
      })
    }

    setInternationlForm(prevState => ({
      ...prevState
    }));
  }

  const handleCancel = () => {
    let interFil_key = ["file_cover", "associate", "our_ref", "client_ref", "app_num", "app_date", "applicant", "title", "class", "country", "priority_country", "priority_date", "status", "comments", "renewal_date"]

    interFil_key.map((data) => {
      InternationlForm[data].value = "";
    });
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
          <Labelbox type="text"
            placeholder={"File cover"}
            changeData={(data) => checkValidation(data, "file_cover")}
            value={InternationlForm.file_cover.value}
            error={InternationlForm.file_cover.error}
            errmsg={InternationlForm.file_cover.errmsg}
          />
          <Labelbox type="text"
            placeholder={"Associate"}
            changeData={(data) => checkValidation(data, "associate")}
            value={InternationlForm.associate.value}
            error={InternationlForm.associate.error}
            errmsg={InternationlForm.associate.errmsg}
          />
          <Labelbox type="text"
            placeholder={"Our Reference"}
            changeData={(data) => checkValidation(data, "our_ref")}
            value={InternationlForm.our_ref.value}
            error={InternationlForm.our_ref.error}
            errmsg={InternationlForm.our_ref.errmsg}
          />
          <Labelbox type="text"
            placeholder={"Client Reference"}
            changeData={(data) => checkValidation(data, "client_ref")}
            value={InternationlForm.client_ref.value}
            error={InternationlForm.client_ref.error}
            errmsg={InternationlForm.client_ref.errmsg}
          />
          <Labelbox type="text"
            placeholder={"Application Number"}
            changeData={(data) => checkValidation(data, "app_num")}
            value={InternationlForm.app_num.value}
            error={InternationlForm.app_num.error}
            errmsg={InternationlForm.app_num.errmsg}
          />
          <Labelbox type="datepicker"
            placeholder={"Application Date"}
            changeData={(data) => checkValidation(data, "app_date")}
            value={InternationlForm.app_date.value}
            error={InternationlForm.app_date.error}
            errmsg={InternationlForm.app_date.errmsg}
          />
          <Labelbox type="text"
            placeholder={"Applicant"}
            changeData={(data) => checkValidation(data, "applicant")}
            value={InternationlForm.applicant.value}
            error={InternationlForm.applicant.error}
            errmsg={InternationlForm.applicant.errmsg}
          />
          <Labelbox type="text"
            placeholder={"Title"}
            changeData={(data) => checkValidation(data, "title")}
            value={InternationlForm.title.value}
            error={InternationlForm.title.error}
            errmsg={InternationlForm.title.errmsg}
          />
          <Labelbox type="select"
            placeholder={"Class"}
            dropdown={interFilGetList.getClassList}
            changeData={(data) => checkValidation(data, "class")}
            value={InternationlForm.class.value}
            error={InternationlForm.class.error}
            errmsg={InternationlForm.class.errmsg}
          />
          <Labelbox type="select"
            placeholder={"Country"}
            dropdown={interFilGetList.getCountryList}
            changeData={(data) => checkValidation(data, "country")}
            value={InternationlForm.country.value}
            error={InternationlForm.country.error}
            errmsg={InternationlForm.country.errmsg}
          />
          <Labelbox type="select"
            placeholder={"priority Country"}
            dropdown={interFilGetList.getCountryList}
            changeData={(data) => checkValidation(data, "priority_country")}
            value={InternationlForm.priority_country.value}
            error={InternationlForm.priority_country.error}
            errmsg={InternationlForm.priority_country.errmsg}
          />
          <Labelbox type="datepicker"
            placeholder={"priority Date"}
            changeData={(data) => checkValidation(data, "priority_date")}
            value={InternationlForm.priority_date.value}
            error={InternationlForm.priority_date.error}
            errmsg={InternationlForm.priority_date.errmsg}
          />
          <Labelbox type="select"
            placeholder={"Status"}
            dropdown={interFilGetList.getStatusList}
            changeData={(data) => checkValidation(data, "status")}
            value={InternationlForm.status.value}
            error={InternationlForm.status.error}
            errmsg={InternationlForm.status.errmsg}
          />
          <Labelbox type="textarea"
            placeholder={"Comments"}
            changeData={(data) => checkValidation(data, "comments")}
            value={InternationlForm.comments.value}
            error={InternationlForm.comments.error}
            errmsg={InternationlForm.comments.errmsg}
          />
          <Labelbox type="datepicker"
            placeholder={"Renewal Date"}
            changeData={(data) => checkValidation(data, "renewal_date")}
            value={InternationlForm.renewal_date.value}
            error={InternationlForm.renewal_date.error}
            errmsg={InternationlForm.renewal_date.errmsg}
          />
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