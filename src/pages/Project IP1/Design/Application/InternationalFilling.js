import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../../../helpers/labelbox/labelbox';
import CustomButton from "../../../../component/Butttons/button";
import ValidationLibrary from "../../../../helpers/validationfunction";
import Checklist from "../../../../images/checklist.png";
import Stage from "../../../../images/stage.png";
import Task from "../../../../images/task.png";
import Application from "../../../../images/application.png";

function InternationalFilling() {
  const [InternationlForm, setInternationlForm] = useState({
    file_cover: {
      value: "",
      validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
      error: null,
      errmsg: null,
    },
    our_ref: {
      value: "",
      validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
      error: null,
      errmsg: null,
    },
    applicant: {
      value: "",
      validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
      error: null,
      errmsg: null,
    },
    country: {
      value: "",
      validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
      error: null,
      errmsg: null,
    },
    class: {
      value: "",
      validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
      error: null,
      errmsg: null,
    },
    title: {
      value: "",
      validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
      error: null,
      errmsg: null,
    },
    assoc_ref: {
      value: "",
      validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
      error: null,
      errmsg: null,
    },
    app_num: {
      value: "",
      validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
      error: null,
      errmsg: null,
    },
    app_date: {
      value: "",
      validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
      error: null,
      errmsg: null,
    },
    status: {
      value: "",
      validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
      error: null,
      errmsg: null,
    },
    comments: {
      value: "",
      validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
      error: null,
      errmsg: null,
    },
    status: {
      value: "",
      validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
      error: null,
      errmsg: null,
    },
    priority_country: {
      value: "",
      validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
      error: null,
      errmsg: null,
    },
    priority_date: {
      value: "",
      validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
      error: null,
      errmsg: null,
    },
    prior_app_no: {
      value: "",
      validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
      error: null,
      errmsg: null,
    },
    next_renew: {
      value: "",
      validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
      error: null,
      errmsg: null,

    }

  })


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

    setInternationlForm(prevState => ({
      ...prevState,
      [key]: dynObj,
    }));
    // var filtererr = targetkeys.filter(
    //     (obj) =>
    //         InternationlForm[obj].error == true ||
    //         InternationlForm[obj].error == null
    // );
    // if (filtererr.length > 0) {
    //     setResumeFrom({ error: true, errordummy: false });
    // } else {
    //     setResumeFrom({ error: false });
    // }
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
      // setInternationlForm({ error: true });
    } else {
      // setInternationlForm({ error: false });

      // dispatch(InesertResume(InternationlForm)).then(()=>{
      //     handleCancel()
      // })
    }

    setInternationlForm(prevState => ({
      ...prevState
    }));


  }
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

          <Labelbox type="select"
            placeholder={"applicant"}
            changeData={(data) => checkValidation(data, "applicant")}
            value={InternationlForm.applicant.value}
            error={InternationlForm.applicant.error}
            errmsg={InternationlForm.applicant.errmsg}
          />

          <Labelbox type="select"
            placeholder={"Our Reference"}
            changeData={(data) => checkValidation(data, "our_ref")}
            value={InternationlForm.our_ref.value}
            error={InternationlForm.our_ref.error}
            errmsg={InternationlForm.our_ref.errmsg}
          />


          <Labelbox type="select"
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

          <Labelbox type="select"
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
            changeData={(data) => checkValidation(data, "class")}
            value={InternationlForm.class.value}
            error={InternationlForm.class.error}
            errmsg={InternationlForm.class.errmsg}
          />


          <Labelbox type="select"
            placeholder={"Country"}
            changeData={(data) => checkValidation(data, "country")}
            value={InternationlForm.country.value}
            error={InternationlForm.country.error}
            errmsg={InternationlForm.country.errmsg}
          />

          <Labelbox type="select"
            placeholder={"priority Country"}
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

          />
        </Grid>
      </Grid>
      <div className="custombtnOposition">
        <CustomButton btnName={"SAVE"} btnCustomColor="customPrimary" onBtnClick={SubmitFunction} custombtnCSS={"TMopositionbuttons"} />
        <CustomButton btnName={"CANCEL"} custombtnCSS={"TMopositionbuttons"} />
      </div>



    </div>
  )
}
export default InternationalFilling;