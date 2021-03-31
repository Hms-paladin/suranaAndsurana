import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../../../helpers/labelbox/labelbox';
import CustomButton from "../../../../component/Butttons/button";
import ValidationLibrary from "../../../../helpers/validationfunction";
import Checklist from "../../../../images/checklist.png";
import Stage from "../../../../images/stage.png";
import Task from "../../../../images/task.png";
import Application from "../../../../images/application.png";

function IndiaFilling() {
  const [IndiaForm, setIndiaForm] = useState({
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
    client_ref: {
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
    associate: {
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
  })


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

    setIndiaForm(prevState => ({
      ...prevState,
      [key]: dynObj,
    }));
    // var filtererr = targetkeys.filter(
    //     (obj) =>
    //         IndiaForm[obj].error == true ||
    //         IndiaForm[obj].error == null
    // );
    // if (filtererr.length > 0) {
    //     setResumeFrom({ error: true, errordummy: false });
    // } else {
    //     setResumeFrom({ error: false });
    // }
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
    console.log(filtererr.length);
    if (filtererr.length > 0) {
      // setIndiaForm({ error: true });
    } else {
      // setIndiaForm({ error: false });

      // dispatch(InesertResume(IndiaForm)).then(()=>{
      //     handleCancel()
      // })
    }

    setIndiaForm(prevState => ({
      ...prevState
    }));


  }
  return (
    <div className="container">
      

      <Grid container spacing={2}   >
        <Grid item md={2}>
          <Labelbox type="text"
            placeholder={"File cover"}
            changeData={(data) => checkValidation(data, "file_cover")}
            value={IndiaForm.file_cover.value}
            error={IndiaForm.file_cover.error}
            errmsg={IndiaForm.file_cover.errmsg}
          />
        </Grid>
        <Grid item md={2}>
          <Labelbox type="select"
            placeholder={"Our Reference"}
            changeData={(data) => checkValidation(data, "our_ref")}
            value={IndiaForm.our_ref.value}
            error={IndiaForm.our_ref.error}
            errmsg={IndiaForm.our_ref.errmsg}
          />
        </Grid>
        <Grid item md={2}>
          <Labelbox type="select"
            placeholder={"Applicant"}
            changeData={(data) => checkValidation(data, "applicant")}
            value={IndiaForm.applicant.value}
            error={IndiaForm.applicant.error}
            errmsg={IndiaForm.applicant.errmsg}
          />
        </Grid>
        <Grid item md={2}>
          <Labelbox type="select"
            placeholder={"Country"}
            changeData={(data) => checkValidation(data, "country")}
            value={IndiaForm.country.value}
            error={IndiaForm.country.error}
            errmsg={IndiaForm.country.errmsg}
          />
        </Grid>
        <Grid item md={2}>
          <Labelbox type="select"
            placeholder={"Class"}
            changeData={(data) => checkValidation(data, "class")}
            value={IndiaForm.class.value}
            error={IndiaForm.class.error}
            errmsg={IndiaForm.class.errmsg}
          />
        </Grid>
        <Grid md={2} />
        <Grid item md={2}>
          <Labelbox type="text"
            placeholder={"Title"}
            changeData={(data) => checkValidation(data, "title")}
            value={IndiaForm.title.value}
            error={IndiaForm.title.error}
            errmsg={IndiaForm.title.errmsg}
          />
        </Grid>
        <Grid item md={2}>
          <Labelbox type="select"
            placeholder={"Client Reference"}
            changeData={(data) => checkValidation(data, "client_ref")}
            value={IndiaForm.client_ref.value}
            error={IndiaForm.client_ref.error}
            errmsg={IndiaForm.client_ref.errmsg}
          />
        </Grid>
        <Grid item md={2}>
          <Labelbox type="text"
            placeholder={"Application Number"}
            changeData={(data) => checkValidation(data, "app_num")}
            value={IndiaForm.app_num.value}
            error={IndiaForm.app_num.error}
            errmsg={IndiaForm.app_num.errmsg}
          />
        </Grid>
        <Grid item md={2}>
          <Labelbox type="datepicker"
            placeholder={"Application Date"}
            changeData={(data) => checkValidation(data, "app_date")}
            value={IndiaForm.app_date.value}
            error={IndiaForm.app_date.error}
            errmsg={IndiaForm.app_date.errmsg}
          />
        </Grid>
        <Grid item md={2}>
          <Labelbox type="select"
            placeholder={"Associate"}
            changeData={(data) => checkValidation(data, "associate")}
            value={IndiaForm.associate.value}
            error={IndiaForm.associate.error}
            errmsg={IndiaForm.associate.errmsg}
          />
        </Grid>
        <Grid item md={4}>
          <Labelbox type="textarea"
            placeholder={"Comments"}
            changeData={(data) => checkValidation(data, "comments")}
            value={IndiaForm.comments.value}
            error={IndiaForm.comments.error}
            errmsg={IndiaForm.comments.errmsg}
          />
        </Grid>
        <Grid item md={2}>
          <Labelbox type="select"
            placeholder={"Status"}
            changeData={(data) => checkValidation(data, "status")}
            value={IndiaForm.status.value}
            error={IndiaForm.status.error}
            errmsg={IndiaForm.status.errmsg}
          />
        </Grid>
        <Grid item md={2}>
          <Labelbox type="select"
            placeholder={"priority Country"}
            changeData={(data) => checkValidation(data, "priority_country")}
            value={IndiaForm.priority_country.value}
            error={IndiaForm.priority_country.error}
            errmsg={IndiaForm.priority_country.errmsg}

          />
        </Grid>
        <Grid item md={2}>
          <Labelbox type="datepicker"
            placeholder={"priority Date"}
            changeData={(data) => checkValidation(data, "priority_date")}
            value={IndiaForm.priority_date.value}
            error={IndiaForm.priority_date.error}
            errmsg={IndiaForm.priority_date.errmsg}
          />
        </Grid>



        <div className="custombtnOposition">
          <CustomButton btnName={"SAVE"} btnCustomColor="customPrimary" onBtnClick={SubmitFunction} custombtnCSS={"TMopositionbuttons"} />
          <CustomButton btnName={"CANCEL"} custombtnCSS={"TMopositionbuttons"} />
        </div>

      </Grid>


    </div>
  )
}
export default IndiaFilling;