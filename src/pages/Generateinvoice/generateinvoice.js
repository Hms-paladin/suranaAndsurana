import React, { useState, useEffect } from 'react';
import './generateinvoice.scss';
import { Grid } from '@material-ui/core';
import CustomButton from "../../component/Butttons/button";
import Labelbox from "../../helpers/labelbox/labelbox";
import EnhancedTable from "../../component/DynTable/table";
import { Checkbox } from 'antd';
import { notification } from "antd";
import ValidationLibrary from "../../helpers/validationfunction";
import { useDispatch, connect } from "react-redux";
import { Collapse } from "antd";
import {
  getClientlist,
} from "../../actions/MasterDropdowns";
import { getBeiSearch, getBeiListByProjectId, insertGenerateInvoice } from "../../actions/GenerateInvoiceAction";
const { Panel } = Collapse;

function GenerateInvoice(props) {
  const [billabletable, setBillabletable] = useState(false)
  const [billhours, setbillhours] = useState([])
  const [searchRigths, setSearchRights] = useState([])
  const [client, setClient] = useState({});
  const [generateRights, setGenerateRights] = useState([])
  const dispatch = useDispatch();
  const [multiplePanel, setMultiplePanel] = useState([]);
  const [Billablerows, setBillablerows] = useState({});

  const [eeeeeee, setEeeeeee] = useState([]);
  const [test,setTest]=useState(false);
  const [generateInvoice, setGenerateInvoice] = useState({
    client: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    }, from_date: {
      value: "",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },
    to_date: {
      value: "",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },
    billablehours: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
  });



  useEffect(() => {
    dispatch(getClientlist());
  }, []);

  useEffect(() => {

    //Client List
    let Client = [];
    props.Client.map((data) =>
      Client.push({ value: data.client, id: data.client_id })
    );
    setClient({ Client });

  }, [props.Client,]);


  const BillableCells = [
    { id: 'billed', label: 'Billed' },
    { id: 'activity', label: 'Activity' },
    { id: 'desription', label: 'Description' },
    { id: 'resource', label: 'Resource' },
    { id: 'acthours', label: 'Actual Hours' },
    { id: 'startdate', label: 'Start Date' },
    { id: 'enddate', label: 'End Date' },
    { id: 'rate', label: 'Rate (Rs)' },
    { id: 'billablehours', label: 'Billable Hours' },
    { id: 'amount', label: 'Amount(Rs)' },
  ];

  function callback(key) {
    console.log(key);
  }

  function onClickProject(project_id) {
    setBillabletable(true)
    dispatch(getBeiListByProjectId(project_id))
  }

  function onSubmit() {

    dispatch(insertGenerateInvoice(Billablerows))
  }

  function onSearch() {
    var mainvalue = {};
    var targetkeys = Object.keys(generateInvoice);
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(
        generateInvoice[targetkeys[i]].value,
        generateInvoice[targetkeys[i]].validation
      );
      generateInvoice[targetkeys[i]].error = !errorcheck.state;
      generateInvoice[targetkeys[i]].errmsg = errorcheck.msg;
      mainvalue[targetkeys[i]] = generateInvoice[targetkeys[i]].value;
    }
    var filtererr = targetkeys.filter((obj) => generateInvoice[obj].error == true);

    if (filtererr.length > 0) {

    }
    else {
      dispatch(getBeiSearch(generateInvoice))
    }

    setGenerateInvoice((prevState) => ({
      ...prevState,
    }));
  }



  const headCells = [
    { id: 'projectName', label: 'Project Name' },
    { id: 'billabletype', label: 'Billable Type' },
    { id: 'totalhours', label: 'Total No.Of Hours' },
    { id: 'totalamount', label: 'Total Amount' },
  ];

  useEffect(() => {
    // console.log(props.getBeiSearch, "projectLength")
    let project_details_length = 0;
    let multipleTab = [];
    // if(props.getBeiSearch.length>0){
    props.getBeiSearch.map((data, index) => {
      let ipProjectDataList = [];

      data.project_details.length > 0 && data.project_details.map((data1, index) => {
        project_details_length = 1

        var rowdataListobj = {};
        // if (data.project_type_id === 1) {
        rowdataListobj["projectName"] = <div className="projectlink" onClick={() => onClickProject(data1.project_id)}>{data1.project_name}</div>;
        rowdataListobj["billabletype"] = data1.billable_type;
        rowdataListobj["totalhours"] = data1.total_hours;
        rowdataListobj["totalamount"] = data1.total_amount;
        // } 
        ipProjectDataList.push(rowdataListobj);
      });

      if (data.project_details.length > 0) {
        multipleTab.push(
          <Panel
            header={`${data.project_type}`}
            key={index + 1}
          >
            <EnhancedTable
              headCells={
                headCells
              }
              rows={ipProjectDataList}
              tabletitle={""}
            />
          </Panel>
        );
      }

    });

    if (project_details_length === 0) {
      setBillabletable(false)
      setBillablerows({});
    }

    setMultiplePanel(multipleTab);
  }, [props.getBeiSearch]);
  
  useEffect(() => {
    let ipProjectDataList = [];
    eeeeeee.map((data, index) => {
console.log("testsssssss")
      var rowdataListobj = {};
      rowdataListobj["billed"] = <Checkbox />;
      rowdataListobj["activity"] = data.activity;
      rowdataListobj["description"] = data.description;
      rowdataListobj["emp_name"] = data.emp_name;
      rowdataListobj["actual_hrs"] = data.actual_hrs;
      rowdataListobj["start_date"] = data.start_date;
      rowdataListobj["end_date"] = data.end_date;
      rowdataListobj["base_rate"] = data.base_rate;
      rowdataListobj["billablehours"] = <Labelbox type="text" changeData={(data) => (checkValidation(data, "billablehours", index),setTest(!test))} value={billhours[index] && billhours[index]} />;
      rowdataListobj["amount"] = data.amount;

      ipProjectDataList.push(rowdataListobj);

    });

    setBillablerows({ipProjectDataList});

  }, [eeeeeee, billhours]);

  
  useEffect(() => {
     
  }, [test])

  useEffect(() => {
    setEeeeeee(props.getBeiListByProjectId)
  }, [props.getBeiListByProjectId])

  function checkValidation(data, key, index) {

    setBillablerows(prevState => ({
      ...prevState,
    }));

    var errorcheck = ValidationLibrary.checkValidation(
      data,
      generateInvoice[key].validation
    );
    let dynObj = {
      value: data,
      error: !errorcheck.state,
      errmsg: errorcheck.msg,
      validation: generateInvoice[key].validation,
    };

    // if (key === "billablehours") {
      setbillhours((prevState) => ({
        ...prevState,
        [index]: data,
      }));
      console.log(Billablerows, "Billablerows[index]")
      // let amount1 = props.getBeiListByProjectId[index].base_rate * data;
      setBillablerows(prevState => ({
        ...prevState,
      }));

    // }

    setGenerateInvoice((prevState) => ({
      ...prevState,
      [key]: dynObj,
    }));
  }
  console.log(Billablerows, "billhours")
  ///***********user permission**********/
  useEffect(() => {
    if (props.UserPermission.length > 0 && props.UserPermission) {
      let data_res_id = props.UserPermission.find((val) => {
        return (
          "Generate Invoice - Search" == val.control
        )
      })
      setSearchRights(data_res_id)

      data_res_id = props.UserPermission.find((val) => {
        return (
          "Generate Invoice - Generate" == val.control
        )
      })
      setGenerateRights(data_res_id)
    }

  }, [props.UserPermission]);

  /////////////
  return (
    <div>
      {/* { permission.allow_view==='Y'&&<div> */}
      <Grid container spacing={3}>
        <Grid item xs={4}>
          {/* <div className="Fieldheading">Client</div> */}
          <Labelbox
            type="select"
            placeholder="Client Name"
            dropdown={client.Client}
            changeData={(data) => checkValidation(data, "client")}
            value={generateInvoice.client.value}
            error={generateInvoice.client.error}
            errmsg={generateInvoice.client.errmsg}
          />
        </Grid>

        <Grid item xs={3} >
          <Labelbox type="datepicker"
            placeholder="From Date"
            changeData={(data) =>
              checkValidation(data, "from_date")
            }
            value={generateInvoice.from_date.value}
            error={generateInvoice.from_date.error}
            errmsg={generateInvoice.from_date.errmsg} />
        </Grid>
        <Grid item xs={3} >
          <Labelbox type="datepicker"
            placeholder="To date"
            changeData={(data) =>
              checkValidation(data, "to_date")
            }
            value={generateInvoice.to_date.value}
            error={generateInvoice.to_date.error}
            errmsg={generateInvoice.to_date.errmsg} />
        </Grid>
        <Grid item xs={2}>
          <CustomButton btnName={"Search"} btnCustomColor="customPrimary" custombtnCSS={"goSearchbtn"} btnDisable={!searchRigths || searchRigths.display_control && searchRigths.display_control === 'N' ? true : false} onBtnClick={onSearch} />
        </Grid>
      </Grid>

      <Collapse >{multiplePanel}</Collapse>


      {billabletable && <><div>
        <p style={{ color: '#0353A4', marginTop: '20px', marginBottom: '0px' }}>Billable Hours</p>
        <EnhancedTable headCells={BillableCells} rows={Billablerows.length===0?Billablerows:Billablerows.ipProjectDataList} />
      </div>

        <div className="btngenerate">
          <CustomButton btnName={"Grand Total"} btnCustomColor="customPrimary" btnDisable={!generateRights || generateRights.display_control && generateRights.display_control === 'N' ? true : false} onBtnClick={''} />
          <CustomButton btnName={"Generate"} btnCustomColor="customPrimary" btnDisable={!generateRights || generateRights.display_control && generateRights.display_control === 'N' ? true : false} onBtnClick={onSubmit} />
        </div></>
      }

      {/* </div> } */}

    </div>
  )
}

const mapStateToProps = (state) =>
// console.log(state,"statestatestate")
({
  Client: state.getOptions.getClientlist,
  getBeiSearch: state.GenerateInvoiceReducer.getBeiSearch || [],
  getBeiListByProjectId: state.GenerateInvoiceReducer.getBeiListByProjectId || [],
  UserPermission: state.UserPermissionReducer.getUserPermission,
});

export default connect(mapStateToProps)(GenerateInvoice);