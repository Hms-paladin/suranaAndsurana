import React, { useEffect, useMemo, useState, useCallback} from "react";
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
import { connect, useDispatch, useSelector } from "react-redux";
import { getVariableRateTableData, InsertVariableRate, SearchVariableRate } from "../../actions/VariableRateMaster"
import DynModel from "../../component/Model/model";



const RateMaster = (props) => {
  const header = [
    { id: "designation", label: "Designation" },
    { id: "activity", label: "Activity" },
    { id: "sub_activity", label: "Sub Activity" },
    { id: "court", label: "Court" },
    { id: "range", label: "Range of Project cost" },
    { id: "lower_limit", label: "Lower Limit" },
    { id: "upper_limit", label: "Upper Limit" },
    { id: "amount", label: "Amount" },
    { id: "unit", label: "Unit of Measurement" },
  ];

  const dispatch = useDispatch();
  const [varRateList, setvarRateList] = useState([]);
  const [projectRange, setprojectRange] = useState({});
  const [projectCourt, setprojectCourt] = useState({});
  const [projectActivity, setprojectActivity] = useState({});
  const [projectSubActivity, setprojectSubActivity] = useState({});
  const [projectUnit, setprojectUnit] = useState({});
  const [projectTableName, setprojectTableName] = useState({});
  const [projectDesignation, setprojectDesignation] = useState({});
  const [modelclose, setmodelclose] = useState();
  const [variablebtnchange, setVariablebtnchange] = useState(true)
  const [variabletablechange, setVariabletablechange] = useState(true)
  const [isLoaded, setIsLoaded] = useState(true);
  const [disabled, setEnabled] = useState(true);
  const [permission, setPermission] = useState([])
  const [activity_id, setActivity_id] = useState();
  const [notfoundmodel, setNotfoundmodel] = useState(false);
  const [project_id,setproject_id]=useState(false)
  // props.setShowSearchTable = props.setShowSearchTable.bind(this);
  const [RateMaster, setRateMaster] = useState({
    activity: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    lower_limit: {
      value: "",
      validation: [{ name: "numericanddot" }],
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
    upper_limit: {
      value: "",
      validation: [{ "name": "numericanddot" }, { "name": "customminValue", "params": "0" }],
      error: null,
      errmsg: null,
    },
    amount: {
      value: "",
      validation: [{ name: "required" }, { name: "allowNumaricOnly" },
        // { name: amountError === 1 ? "Upto5lakh":'' }
        // { name: "Upto5lakh" },
        // { name: "custommaxValue",params:"0" },
        // { name: "customminValue",params:"0" }
      ],
      error: null,
      errmsg: null,
    },
    court: {
      value: "",
      // validation: [],
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
  useEffect(() => {
    setVariablebtnchange(props.variablebtnchange)
    setVariabletablechange(props.variabletablechange)

    // setAmountDis(false)
  }, [props.variabletablechange, props.variablebtnchange]);
  // useEffect(() => {
  //   // setAmountDis(false)
  // }, [props.variableRateCall]);

  useEffect(() => {
    dispatch(getVariableRateTableData());
  }, []);

  useEffect(() => {

    let variableRateList = [];
    props.getTableData.map((data) => variableRateList.push(data));
    var rateList = [];
    for (var m = 0; m < variableRateList.length; m++) {
      var listarray = {
        designation: variableRateList[m].designation,
        activity: variableRateList[m].activity,
        sub_activity: variableRateList[m].sub_activity,
        court: variableRateList[m].location,
        range: variableRateList[m].range,
        lower_limit: variableRateList[m].lower_limit,
        upper_limit: variableRateList[m].upper_limit,
        amount: variableRateList[m].rate,
        unit: variableRateList[m].unit,
      };
      rateList.push(listarray);
    }
    setvarRateList({ rateList });
    // permission.allow_view==='Y'?setvarRateList({ rateList }):setvarRateList([]);
  }, [props.getTableData])
  
  const SearchTable = useCallback( () => {
    props.setShowSearchTable()
    props.handleChangeCloseModel()
  }, []);
  

  const onSubmit = () => {
    
    setNotfoundmodel(false)
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
    var filtererr = targetkeys.filter(
      (obj) => RateMaster[obj].error === true
    );
    if (filtererr.length > 0) {
      // setRateMaster({ error: true });
    } else {
      if(variablebtnchange===false){
        dispatch(SearchVariableRate(RateMaster)).then((response) => {
          props.setShowSearchTable()
          handleCancel();

       })
      }
      else{
      dispatch(InsertVariableRate(RateMaster)).then((response) => {
        // dispatch(SearchVariableRate(RateMaster)).then((response) => {
        //   // setNotfoundmodel(false);
        //   SearchTable()
        //    props.setShowSearchTable()
        //   // props.handleChangeCloseModel()
        // })
        // if(variablebtnchange===true){
          // handleCancel()
        // }
        setNotfoundmodel(false);
      

      });
    }
     
      

      
    }
    // console.log(props.lenghtData, "props.lenghtData")
    console.log("ratemasterdddd",RateMaster)


    setRateMaster((prevState) => ({
      ...prevState,
    }));
  };
  // console.log("checkval",props.)
  function checkValidation(data, key, multipleId) {

    if (key === "activity") {
      setActivity_id(data)
    }

    if (data && key == "range_project_cost") {
      setEnabled(false)
      RateMaster.amount.value = "";
      // projectRange.projectRangedata.filter((sl)=> {
      //   if(data===sl.id){
      //     switch (true) {
      //       case sl.value.includes("Upto"):
      //         RateMaster.amount.validation[2].params = Number((sl.value.slice(5,sl.value.length).replace(/,/g, "")))
      //         RateMaster.amount.validation[3].params = ""


      //         console.log("Upto",Number(sl.value.slice(5,sl.value.length).replace(/,/g, "")),)
      //         console.log("Upto",sl.value.includes("Upto"))
      //         break;
      //       case sl.value.includes("Above"):
      //         RateMaster.amount.validation[3].params = Number((sl.value.slice(6,sl.value.length).replace(/,/g, "")))

      //         RateMaster.amount.validation[2].params = ""

      //         console.log("Above",Number(sl.value.slice(6,sl.value.length).replace(/,/g, "")),)
      //         console.log("Above",sl.value.includes("Above"))
      //         break;  
      //       default:
      //         break;
      //     }
      //   }
      // })

    }
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

    // upper Limit Validation==>

    if (data && key == "lower_limit") {
      RateMaster.upper_limit.validation[1].params = data
      setRateMaster((prevState) => ({
        ...prevState,
      }));
    }

    // Lower Limit Validation ==>

    // if (data && key == "lower_limit") {
    //   RateMaster[key].validation[1].params = RateMaster.upper_limit.value
    // }

    // let multipleIdList = [];
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
    setEnabled(true)
    let From_key = [
      "designation",
      "activity",
      "lower_limit",
      "range_project_cost",
      "sub_activity",
      "upper_limit",
      "amount",
      "court"
      , "unit_measurement"];

    From_key.map((data) => {

      try {
        RateMaster[data].value = "";
        console.log("mapping", RateMaster[data].value)
      } catch (error) {
        throw (error)
      }
    });

    setRateMaster((prevState) => ({
      ...prevState,
    }));
  };

  useEffect(() => {
    console.log("propslength",props.lenghtData!==0)
    if(variablebtnchange){
    if (props.lenghtData !== 0) {
      setNotfoundmodel(false);
    } else {
      setNotfoundmodel(true)
    }
  }

  }, [props.searchVariableRate, props.lenghtData]);
  useEffect(() => {
    if (isLoaded) {
      // Axios({
      //   method: "GET",
      //   url: apiurl + "get_variable_rate",
      // }).then((response) => {
      //   let variableRateList = [];
      //   response.data.data.map((data) => variableRateList.push(data));
      //   var rateList = [];
      //   for (var m = 0; m < variableRateList.length; m++) {
      //     var listarray = {
      //       designation: variableRateList[m].designation,
      //       activity: variableRateList[m].activity,
      //       sub_activity: variableRateList[m].sub_activity,
      //       court: variableRateList[m].location,
      //       range: variableRateList[m].range,
      //       lower_limit: variableRateList[m].lower_limit,
      //       upper_limit: variableRateList[m].upper_limit,
      //       amount: variableRateList[m].rate,
      //       unit: variableRateList[m].unit,
      //     };
      //     rateList.push(listarray);
      //   }
      //   setvarRateList({ rateList });
      // });

      // Range
      Axios({
        method: "GET",
        url: apiurl + 'get_range',
      }).then((response) => {
        let projectRangedata = [];
        response.data.data.map((data) =>
          projectRangedata.push({ value: data.range, id: data.range_id })
        );
        setprojectRange({ projectRangedata });
        console.log(projectRange, "projectRange")
        console.log(projectRangedata, "projectRange")
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
  const onSearch = () => {
    // var mainvalue = {};
    // var targetkeys = Object.keys(RateMaster);
    // for (var i in targetkeys) {
    //   var errorcheck = ValidationLibrary.checkValidation(
    //     RateMaster[targetkeys[i]].value,
    //     RateMaster[targetkeys[i]].validation
    //   );
    //   RateMaster[targetkeys[i]].error = !errorcheck.state;
    //   RateMaster[targetkeys[i]].errmsg = errorcheck.msg;
    //   mainvalue[targetkeys[i]] = RateMaster[targetkeys[i]].value;
    // }
    // var filtererr = targetkeys.filter(
    //     (obj) => RateMaster[obj].error === true
    // );
    // if (filtererr.length > 0) {
    // setRateMaster({ error: true });

    // } else {


    dispatch(SearchVariableRate(RateMaster))
      .then(() => {
        props.setShowSearchTable()
        setNotfoundmodel(false)
      })

    setRateMaster((prevState) => ({
      ...prevState,
    }));

  }


  console.log(RateMaster, "RateMasterRateMaster")

  useEffect(() => {
    if (props.UserPermission.length > 0 && props.UserPermission[0].item[0].item) {
      let data_res_id = props.UserPermission[0].item[0].item.find((val) => {
        return (
          "Variable Rate Master" == val.screen_name
        )
      })
      setPermission(data_res_id)
    }

  }, [props.UserPermission]);

  function rights() {
    notification.success({
      message: "You Dont't Have Rights To Access This Page",
    });
  }

  console.log(permission, "permission");
  return (
    <div>
      <div className="var_rate_master">Variable Rate Master</div>
      <Grid container spacing={6} className="ratemaster_firstgrid">
        <Grid item xs={4} spacing={4} direction={"column"}>
          <Labelbox
            type="select"
            placeholder={"Designation*"}
            dropdown={projectDesignation.projectDesignationData}
            changeData={(data) => checkValidation(data, "designation")}
            value={RateMaster.designation.value}
            error={RateMaster.designation.error}
            errmsg={RateMaster.designation.errmsg}
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
            type="select"
            placeholder={"Activity"}
            dropdown={projectActivity.projectActivitydata}
            changeData={(data) => checkValidation(data, "activity")}
            value={RateMaster.activity.value}
            error={RateMaster.activity.error}
            errmsg={RateMaster.activity.errmsg}
          />
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
            // disabled={disabled}
            type="text"
            placeholder={"Amount*"}
            changeData={(data) => checkValidation(data, "amount")}
            value={RateMaster.amount.value}
            error={RateMaster.amount.error}
            errmsg={RateMaster.amount.errmsg}
          />

        </Grid>
        <Grid item xs={4} spacing={2}>
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
            placeholder={"Lower Limit"}
            changeData={(data) => checkValidation(data, "lower_limit")}
            value={RateMaster.lower_limit.value}
            error={RateMaster.lower_limit.error}
            errmsg={RateMaster.lower_limit.errmsg}
          />
          <Labelbox
            type="select"
            placeholder={"Unit of Measurement*"}
            dropdown={projectUnit.projectUnitdata}
            changeData={(data) => checkValidation(data, "unit_measurement")}
            value={RateMaster.unit_measurement.value}
            error={RateMaster.unit_measurement.error}
            errmsg={RateMaster.unit_measurement.errmsg}
          />
        </Grid>


        {variablebtnchange ?
          <div className="rate_cus_btns"><CustomButton
            btnName={"Search"}
            btnCustomColor="customPrimary"
            custombtnCSS="custom_save"
            onBtnClick={onSearch}
          /> </div>
          :
          <div className="rate_cus_btns">
            <CustomButton
              btnName={"Save"}
              btnCustomColor="customPrimary"
              custombtnCSS="custom_save"
              // onBtnClick={onSubmit}
              onBtnClick={onSubmit}
            />
            <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" onBtnClick={handleCancel} />
          </div>
        }
      </Grid>

      {variabletablechange
        ? <div className="rate_enhanced_table">

        </div>
        :
        <div className="rate_enhanced_table">
          <EnhancedTable
            headCells={header}
            rows={varRateList.length == 0 ? varRateList : varRateList.rateList}
            // rows={varRateList.rateList}
          />
        </div>}

      <DynModel
        modelTitle={"Billing Criteria Not Found"}
        handleChangeModel={notfoundmodel}
        handleChangeCloseModel={(bln) => setNotfoundmodel(bln)}
        content={
          <div className="successModel">
            <div>
              {" "}
              <label className="notfound_label">
                Do You Want To Continue ?
                </label>
            </div>
            <div className="customNotFoundbtn">
              <CustomButton btnName={"Yes"} btnCustomColor="customPrimary" custombtnCSS={"btnNotFound"} onBtnClick={onSubmit} />
              <CustomButton btnName={"No "} btnCustomColor="customPrimary" custombtnCSS={"btnNotFound"} onBtnClick={() => setNotfoundmodel(false)} />
            </div>
          </div>
        }
        width={400}
      />
    </div>
  );
}

const mapStateToProps = (state) => (
  {
    getTableData: state.variableRateMaster.getVariableRateTableData || [],
    getInsertStatus: state.variableRateMaster.insertVariableRateStatus,
    UserPermission: state.UserPermissionReducer.getUserPermission,
    searchVariableRate: state.variableRateMaster.searchVariableRate,
    lenghtData: state.variableRateMaster.lengthData,
  }
);

export default connect(mapStateToProps)(RateMaster);