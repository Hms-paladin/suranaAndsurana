import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from "../../component/Butttons/button";
import ValidationLibrary from "../../helpers/validationfunction";
import "./RateMaster.scss";
import EnhancedTable from "../../component/DynTable/table";
import Axios from "axios";
import { notification } from "antd";
import { apiurl } from "../../utils/baseUrl";
import moment from "moment";
export default function RateMaster() {
  const header = [
    // { id: 'table_names', label: 'Table Name' },
    { id: "activity", label: "Activity" },
    { id: "lower_limit", label: "Lower Limit" },
    { id: "upper_limit", label: "Upper Limit" },
    { id: "amount", label: "Amount" },
    { id: "designation", label: "Designation" },
    { id: "range", label: "Range of Project cost" },
    { id: "sub_activity", label: "Sub Activity" },
    { id: "court", label: "Court" },
    { id: "unit", label: "Unit of Measurement" },
  ];

  /*const rows = [
       {table_name:"Table 1",activity:"Activity 1",lower_limit:"lowerlimit1",upper_limit:"upperlimit1",designation:"designation1",cost:"cost",sub_activity:"Subactivity1",court:"court",measurement:"measurement"}
       
    ]; */

  const rows = [];
  const [varRateList, setvarRateList] = useState([]);
  const [projectRange, setprojectRange] = useState({});
  const [projectCourt, setprojectCourt] = useState({});
  const [projectActivity, setprojectActivity] = useState({});
  const [projectSubActivity, setprojectSubActivity] = useState({});
  const [projectUnit, setprojectUnit] = useState({});
  const [projectTableName, setprojectTableName] = useState({});
  const [projectDesignation, setprojectDesignation] = useState({});

  const [isLoaded, setIsLoaded] = useState(true);
  const [RateMaster, setRateMaster] = useState({
    table_name: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    activity: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    lower_limit: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    designation: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    range_project_cost: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    sub_activity: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    upper_limit: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    amount: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    court: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    unit_measurement: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
  });
  const onSubmit = () => {
    var mainvalue = {};
    var targetkeys = Object.keys(RateMaster);
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(
        RateMaster[targetkeys[i]].value,
        RateMaster[targetkeys[i]].validation
      );
      RateMaster[targetkeys[i]].error = !errorcheck.state;
      RateMaster[targetkeys[i]].errmsg = errorcheck.msg;
      mainvalue[targetkeys[i]] = RateMaster[targetkeys[i]].value;
    }
    Axios({
      method: "POST",
      url: apiurl + "insert_vairable_rate",
      data: {
        range_id: RateMaster.range_project_cost.value,
        location_id: RateMaster.court.value,
        designation_id: RateMaster.designation.value,
        activity_id: RateMaster.activity.value,
        created_on: moment().format("YYYY-MM-DD HH:m:s"),
        updated_on: moment().format("YYYY-MM-DD HH:m:s"),
        created_by: localStorage.getItem("empId"),
        updated_by: localStorage.getItem("empId"),
        sub_activity_id: RateMaster.sub_activity.value,
        rate: RateMaster.amount.value,
        upper_limit: RateMaster.upper_limit.value,
        lower_limit: RateMaster.lower_limit.value,
        unit_id: RateMaster.unit_measurement.value,
        table_id: RateMaster.table_name.value,
      },
    }).then((response) => {
      if (response.data.status === 1) {
        getVariablerateMaster();
        notification.success({
          message: "Variable Rate Master Updated Successfully",
        });
        return Promise.resolve();
      }
    });

    var filtererr = targetkeys.filter((obj) => RateMaster[obj].error == true);
    console.log(filtererr.length);
    if (filtererr.length > 0) {
      // setResumeFrom({ error: true });
    } else {
      // setResumeFrom({ error: false });
    }
    setRateMaster((prevState) => ({
      ...prevState,
    }));
  };
  function checkValidation(data, key, multipleId) {
    var errorcheck = ValidationLibrary.checkValidation(
      data,
      RateMaster[key].validation
    );
    let dynObj = {
      value: data,
      error: !errorcheck.state,
      errmsg: errorcheck.msg,
      validation: RateMaster[key].validation,
    };
    let multipleIdList = [];
    if (key == "activity") {
      // Sub Activity
      Axios({
        method: "POST",
        url: apiurl + "get_sub_activity",
        data: {
          activity_id: data,
        },
      }).then((response) => {
        let projectSubActivitydata = [];
        response.data.data.map((data) =>
          projectSubActivitydata.push({
            value: data.sub_activity,
            id: data.sub_activity_id,
          })
        );
        setprojectSubActivity({ projectSubActivitydata });
      });
    }

    setRateMaster((prevState) => ({
      ...prevState,
      [key]: dynObj,
    }));
  }
  const handleCancel = () => {
    let From_key = [];

    From_key.map((data) => {
      RateMaster[data].value = "";
    });
    setRateMaster((prevState) => ({
      ...prevState,
    }));
  };

  const getVariablerateMaster = () => {
    Axios({
      method: "GET",
      url: apiurl + "get_variable_rate",
    }).then((response) => {
      let variableRateList = [];
      response.data.data.map((data) => variableRateList.push(data));
      var rateList = [];
      for (var m = 0; m < variableRateList.length; m++) {
        var listarray = {
          table_names: variableRateList[m].table_names,
          activity: variableRateList[m].activity,
          lower_limit: variableRateList[m].lower_limit,
          upper_limit: variableRateList[m].upper_limit,
          amount: variableRateList[m].rate,
          designation: variableRateList[m].table_names,
          range: variableRateList[m].range,
          sub_activity: variableRateList[m].sub_activity,
          court: variableRateList[m].location,
          unit: variableRateList[m].unit,
        };
        rateList.push(listarray);
      }
      setvarRateList({ rateList });
    });
  };

  useEffect(() => {
    if (isLoaded) {
      Axios({
        method: "GET",
        url: apiurl + "get_variable_rate",
      }).then((response) => {
        let variableRateList = [];
        response.data.data.map((data) => variableRateList.push(data));
        var rateList = [];
        for (var m = 0; m < variableRateList.length; m++) {
          var listarray = {
            // "table_names": variableRateList[m].table_names,
            activity: variableRateList[m].activity,
            lower_limit: variableRateList[m].lower_limit,
            upper_limit: variableRateList[m].upper_limit,
            amount: variableRateList[m].rate,
            designation: variableRateList[m].table_names,
            range: variableRateList[m].range,
            sub_activity: variableRateList[m].sub_activity,
            court: variableRateList[m].location,
            unit: variableRateList[m].unit,
          };
          rateList.push(listarray);
        }
        setvarRateList({ rateList });
      });

      // Range
      Axios({
        method: "GET",
        //url: apiurl + 'get_range',
        url: "http://54.198.55.249:8159/api/v1/get_range",
      }).then((response) => {
        let projectRangedata = [];
        response.data.data.map((data) =>
          projectRangedata.push({ value: data.range, id: data.range_id })
        );
        setprojectRange({ projectRangedata });
      });

      // Court
      Axios({
        method: "GET",
        url: apiurl + "get_court",
      }).then((response) => {
        let projectCourtdata = [];
        response.data.data.map((data) =>
          projectCourtdata.push({ value: data.location, id: data.location_id })
        );
        setprojectCourt({ projectCourtdata });
      });

      // Unit
      Axios({
        method: "GET",
        url: apiurl + "get_unit_of_measure",
      }).then((response) => {
        let projectUnitdata = [];
        response.data.data.map((data) =>
          projectUnitdata.push({ value: data.unit, id: data.unit_id })
        );
        setprojectUnit({ projectUnitdata });
      });

      // Activity
      Axios({
        method: "GET",
        url: apiurl + "get_activity",
      }).then((response) => {
        let projectActivitydata = [];
        response.data.data.map((data) =>
          projectActivitydata.push({
            value: data.activity,
            id: data.activity_id,
          })
        );
        setprojectActivity({ projectActivitydata });
      });

      // Sub Activity
      Axios({
        method: "POST",
        url: apiurl + "get_sub_activity",
        data: {
          activity_id: 1,
        },
      }).then((response) => {
        let projectSubActivitydata = [];
        response.data.data.map((data) =>
          projectSubActivitydata.push({
            value: data.sub_activity,
            id: data.sub_activity_id,
          })
        );
        setprojectSubActivity({ projectSubActivitydata });
      });

      // Table Name
      Axios({
        method: "GET",
        url: apiurl + "get_table_names",
      }).then((response) => {
        let projectTableNamedata = [];
        response.data.data.map((data) =>
          projectTableNamedata.push({
            value: data.table_names,
            id: data.table_id,
          })
        );
        setprojectTableName({ projectTableNamedata });
      });

      // Designation
      Axios({
        method: "GET",
        url: apiurl + "get_s_tbl_m_designation",
      }).then((response) => {
        let projectDesignationData = [];
        response.data.data.map((data) =>
          projectDesignationData.push({
            value: data.designation,
            id: data.designation_id,
          })
        );
        setprojectDesignation({ projectDesignationData });
      });

      setIsLoaded(false);
    }
  });

  return (
    <div>
      <div className="var_rate_master">Variable Rate Master</div>
      <Grid container spacing={6} className="ratemaster_firstgrid">
        <Grid item xs={4} spacing={4} direction={"column"}>
          {/* <Labelbox type="select" placeholder={"Table Name"}
                        dropdown={projectTableName.projectTableNamedata}
                        changeData={(data) => checkValidation(data, "table_name")}
                        value={RateMaster.table_name.value}
                        error={RateMaster.table_name.error}
                        errmsg={RateMaster.table_name.errmsg}
                    /> */}
          <Labelbox
            type="select"
            placeholder={"Range of project cost "}
            dropdown={projectRange.projectRangedata}
            changeData={(data) => checkValidation(data, "range_project_cost")}
            value={RateMaster.range_project_cost.value}
            error={RateMaster.range_project_cost.error}
            errmsg={RateMaster.range_project_cost.errmsg}
          />
          <Labelbox
            type="select"
            placeholder={"Sub Activity"}
            dropdown={projectSubActivity.projectSubActivitydata}
            changeData={(data) => checkValidation(data, "sub_activity")}
            value={RateMaster.sub_activity.value}
            error={RateMaster.sub_activity.error}
            errmsg={RateMaster.sub_activity.errmsg}
          />
          <Labelbox
            type="text"
            placeholder={"Upper Limit"}
            changeData={(data) => checkValidation(data, "upper_limit")}
            value={RateMaster.upper_limit.value}
            error={RateMaster.upper_limit.error}
            errmsg={RateMaster.upper_limit.errmsg}
          />
        </Grid>
        <Grid item xs={4} spacing={2}>
          <Labelbox
            type="text"
            placeholder={"Amount"}
            changeData={(data) => checkValidation(data, "amount")}
            value={RateMaster.amount.value}
            error={RateMaster.amount.error}
            errmsg={RateMaster.amount.errmsg}
          />

          <Labelbox
            type="select"
            placeholder={"Court"}
            dropdown={projectCourt.projectCourtdata}
            changeData={(data) => checkValidation(data, "court")}
            value={RateMaster.court.value}
            error={RateMaster.court.error}
            errmsg={RateMaster.court.errmsg}
          />
          <Labelbox
            type="select"
            placeholder={"Unit of Measurement"}
            dropdown={projectUnit.projectUnitdata}
            changeData={(data) => checkValidation(data, "unit_measurement")}
            value={RateMaster.unit_measurement.value}
            error={RateMaster.unit_measurement.error}
            errmsg={RateMaster.unit_measurement.errmsg}
          />
        </Grid>

        <Grid item xs={4} spacing={2}>
          <Labelbox
            type="select"
            placeholder={"Activity"}
            dropdown={projectActivity.projectActivitydata}
            changeData={(data) => checkValidation(data, "activity")}
            value={RateMaster.activity.value}
            error={RateMaster.activity.error}
            errmsg={RateMaster.activity.errmsg}
          />
          <Labelbox
            type="text"
            placeholder={"Lower Limit"}
            changeData={(data) => checkValidation(data, "lower_limit")}
            value={RateMaster.lower_limit.value}
            error={RateMaster.lower_limit.error}
            errmsg={RateMaster.lower_limit.errmsg}
          />
          <Labelbox
            type="select"
            placeholder={"Designation"}
            dropdown={projectDesignation.projectDesignationData}
            changeData={(data) => checkValidation(data, "designation")}
            value={RateMaster.designation.value}
            error={RateMaster.designation.error}
            errmsg={RateMaster.designation.errmsg}
          />
        </Grid>
        <div className="rate_cus_btns">
          <CustomButton
            btnName={"Save"}
            btnCustomColor="customPrimary"
            custombtnCSS="custom_save"
            onBtnClick={onSubmit}
          />
          <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" />
        </div>
      </Grid>

      <div className="rate_enhanced_table">
        <EnhancedTable
          headCells={header}
          rows={varRateList.length == 0 ? varRateList : varRateList.rateList}
        />
      </div>
    </div>
  );
}
