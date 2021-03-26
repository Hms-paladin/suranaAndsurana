import react, { useEffect, useState } from 'react';
import './projectFormcreate.scss';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../../helpers/labelbox/labelbox";
import CustomButton from "../../../component/Butttons/button";
import Axios from 'axios';
import ValidationLibrary from "../../../helpers/validationfunction";
import { apiurl } from "../../../utils/baseUrl";
import { Redirect, Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import DynModel from '../../../component/Model/model';
import { getProjectSubType, getProcessType } from '../../../actions/MasterDropdowns';
import VariableRate from '../../stages/RateMaster';
import EnhancedTable from "../../../component/DynTable/table";
import AddVarData from '../../../images/addvardata.svg';
import SuccessIcon from '../../../images/successicon.svg';
import moment from "moment";
import { notification } from 'antd';

// Table Data ==>

const header = [
    { id: 'activity', label: 'Activity' },
    { id: 'sub_activity', label: 'Sub Activity' },
    { id: 'amount', label: 'Amount' },
    { id: 'range', label: 'Range of Project cost' },
    { id: 'court', label: 'Court' },
    { id: 'lower_limit', label: 'Lower Limit' },
    { id: 'upper_limit', label: 'Upper Limit' },
    { id: 'unit', label: 'Unit of Measurement' },
    { id: 'designation', label: 'Designation' },
];

const rows = [
    { table_name: "Table 1", activity: "Activity 1", lower_limit: "lowerlimit1", upper_limit: "upperlimit1", designation: "designation1", cost: "cost", sub_activity: "Subactivity1", court: "court", measurement: "measurement" }

];


function ProjectFormCreate(props) {
    const dispatch = useDispatch()
    const [pathname, setpathname] = useState(window.location.pathname)
    const [ProjectType, setProjectType] = useState({})
    const [projectSubType,setprojectSubType]=useState({})
    const [processType,setprocessType]=useState({}) 
    const [fillingType,setfillingType]=useState({})
    

    const [ProcessType, setProcessType] = useState({})
    const [FillingType, setFillingType] = useState({})
    const [clientName, setClientName] = useState({})
    const [clientType, setClientType] = useState({})
    const [projectRange, setprojectRange] = useState({});
    const [SubType_Project, setSubType_Project] = useState({})
    const [BillableType, setBillableType] = useState({})
    const [projectUnit, setprojectUnit] = useState({})
    const [variableid, setVariableid] = useState(false)
    const [successmodel, setSuccessmodel] = useState(false)
    const [searchdata, setSearchdata] = useState()
    const [addsearchdata, setAddsearchdata] = useState()




    const [attorneylist, setattorneylist] = useState({})
    const [projectform, setprojectform] = useState({
        client_det: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },project_name: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        project_type: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        }, 
        project_sub_type: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        billable_type: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        process_type: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        filling_type: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        unit_measurement: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },attorney: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },counsel: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },range_project_cost: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
          },baseRate: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },limit: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },additional_rate: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
          }
          ,comments: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
          }
          ,directAttorney: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
          },deputyAttorney: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
          }
    })  
    useEffect(() => {
        console.log("value", projectform.project_sub_type.value)
    })



    useEffect(() => {

        Axios({
            method: "GET",
            url: apiurl + 'get_project_type',
        }).then((response) => {
            // SubType_Project_Api()
            console.log(response.data.data, " response.data.data")
            let projectTypedata = []
            response.data.data.map((data) =>
                projectTypedata.push({ value: data.project_type, id: data.project_type_id })
            )
            setProjectType({ projectTypedata })
            console.log({ projectTypedata }, " {projectTypedata}")
        })

        //attorney
        Axios({
            method: "GET",
            url: apiurl + 'get_employee_list',
        }).then((response) => {
            console.log(response.data.data, " response.data.data")
            let attorneydata = []
            response.data.data.map((data) =>
            attorneydata.push({ value: data.name, id: data.emp_id })
            )
            setattorneylist({ attorneydata })
        })

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
      });

        // billable type
        Axios({
            method: "GET",
            url: apiurl + 'get_billable_type',
        })
            .then((response) => {
                console.log("response", response)
                let BillableData = []
                response.data.data.map((data) =>
                    BillableData.push({ id: data.billable_type_id, value: data.billable_type })
                )
                setBillableType({ BillableData })
            })

            // filling type
            Axios({
                method: "POST",
                url: apiurl + 'get_filing_type',
                data:{
                    "project_type_id":projectform.project_type.value,
                    "sub_project_type_id":projectform.project_sub_type.value,
                    "process_id":projectform.process_type.value
                    
                }
                })
                .then((response) => {
                 let fillingTypedata=[]
                 response.data.data.map((data)=>
                 fillingTypedata.push({value:data.sub_project_type,id:data.sub_project_type_id})
                 )
                 setfillingType({fillingTypedata})
                }) 

                // Client  name
        Axios({
            method: "GET",
            url: apiurl + 'get_client_list',
        })
            .then((response) => {
                console.log("response", response)
                let clientNameData = []
                response.data.data.map((data) =>
                clientNameData.push({ id: data.client_id, value: data.client })
                )
                setClientName({ clientNameData })
            })

        // Filling Type
        // Axios({
        //     method: "post",
        //     url: apiurl + 'get_project_type',
        //     data: {
        //         "project_type_id": projectform.project_type.value,
        //         "sub_project_type_id": projectform.project_sub_type.value,
        //         "process_id": projectform.project_type.value
        //     },
        // })
        //     .then((response) => {
        //         console.log("response", response)
        //         let fillingData = []
        //         response.data.data.map((data) =>
        //             fillingData.push({ id: data.process_id, value: data.process })
        //         )
        //         setFillingType({ fillingData })

        //     })
        // 


            // Client 
        Axios({
            method: "GET",
            url: apiurl + 'get_client_type',
        })
            .then((response) => {
                console.log("response", response)
                let clientData = []
                response.data.data.map((data) =>
                clientData.push({ id: data.client_type_id, value: data.client_type })
                )
                setClientType({ clientData })
            })

        // Unit of Measurement 
        Axios({
            method: "GET",
            url: apiurl + 'get_unit_of_measure',
        })
            .then((response) => {
                let projectUnitdata = []
                response.data.data.map((data) =>
                    projectUnitdata.push({ value: data.unit, id: data.unit_id })
                )
                setprojectUnit({ projectUnitdata })
            })
            

        //

    }, [])



    function getFillingType(){
        Axios({
            method: "POST",
            url: apiurl + 'get_filing_type',
            data:{
                "project_type_id":projectform.project_type.value,
                "sub_project_type_id":projectform.project_sub_type.value,
                "process_id":projectform.process_type.value
                
            }
            })
            .then((response) => {
             let fillingTypedata=[]
             response.data.data.map((data)=>
             fillingTypedata.push({value:data.sub_project_type,id:data.sub_project_type_id})
             )
             setfillingType({fillingTypedata})
            }) 
    }


    function checkValidation(data, key, multipleId) {

        // if (key === "project_type") {
        //     SubType_Project_Api(data)
        // }
        // if (key === "project_type" || key === "project_sub_type") {
        //     setprojectform(prevState => ({
        //         ...prevState,
        //         process_type: { value: data }
        //     }));
        // }
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            projectform[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: projectform[key].validation
        }

        //  projectSubTypeValue

        if (key === "project_type" && data) {
            dispatch(getProjectSubType(data))
        }

        if (key === "project_Subtype" && data) {
            // console.log(data, "projectform.project_type.value")
            let values = { ProjectType: 1, ProjectSubtype: data }
            dispatch(getProcessType(values))
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

        if (key == "project_type"){

            // Sub project type
            Axios({
              method: "POST",
              url: apiurl + 'get_project_sub_type',
              data:{
                "project_type_id":data
              }
              })
              .then((response) => {
               let projectSubTypedata=[]
               response.data.data.map((data)=>
               projectSubTypedata.push({value:data.sub_project_type,id:data.sub_project_type_id})
               )
               setprojectSubType({projectSubTypedata})
               getFillingType();
              }) 

             
            }
            else if (key == "project_sub_type"){
            //process type
              Axios({
                method: "POST",
                url: apiurl + 'get_process_type',
                data:{
                  "project_type_id": projectform.project_type.value,
                  "sub_project_type_id" : data
                }
                })
                .then((response) => {
                 let processTypedata=[]
                 response.data.data.map((data)=>
                 processTypedata.push({value:data.process,id:data.process_id})
                 )
                 setprocessType({processTypedata})
                 getFillingType();
                }) 
                
               } else if(key == "process_type"){
                getFillingType();
               }


        setprojectform(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));

        // variable popup==>

        if (key === "billable_type" && data === 2) {
            setVariableid(true)
        }

        function closevariableModel() {

        }
    };

   
    function onSubmit() {

        var mainvalue = {};
        var targetkeys = Object.keys(projectform);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                projectform[targetkeys[i]].value,
                projectform[targetkeys[i]].validation
            );
            projectform[targetkeys[i]].error = !errorcheck.state;
            projectform[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = projectform[targetkeys[i]].value;
        }

        if(!projectform.project_type.value === 1 ){
           var params =  {
                "sub_project_id":projectform.project_sub_type.value,
                "process_id":projectform.process_type.value,
                "file_type_id":projectform.filling_type.value,
                "councel_id":projectform.counsel.value,
                "hod_hr_id":projectform.attorney.value,
                "project_name":projectform.project_name.value,
                "billable_type_id":projectform.billable_type.value,
                "range_id":projectform.range_project_cost.value,
                "comments":projectform.comments.value,
                "base_rate":projectform.baseRate.value,
                "unit_of_measure":projectform.unit_measurement.value,
                "limit_in_hours":projectform.limit.value,
                "additional_rate":projectform.additional_rate.value,
                created_on: moment().format("YYYY-MM-DD HH:m:s"),
              updated_on: moment().format("YYYY-MM-DD HH:m:s"),
              created_by: localStorage.getItem("empId"),
              updated_by: localStorage.getItem("empId"),
                }
        }else{
            var params =  {
        
                "client_id":projectform.client_det.value,
                "project_type_id":projectform.project_type.value,
                "project_name":projectform.project_name.value,
                created_on: moment().format("YYYY-MM-DD HH:m:s"),
              updated_on: moment().format("YYYY-MM-DD HH:m:s"),
              created_by: localStorage.getItem("empId"),
              updated_by: localStorage.getItem("empId"),
                }  
        }

        Axios({
            method: "POST",
            url: apiurl + "insert_vairable_rate",
            data: params,
          }).then((response) => {
            if (response.data.status === 1) {
              
              notification.success({
                message: "Project Created Successfully",
              });
              return Promise.resolve();
            }
          });


        var filtererr = targetkeys.filter(
            (obj) => projectform[obj].error == true
        );
        console.log(filtererr.length);
        if (filtererr.length > 0) {
            // setpostData({ error: true });
        } else {
            // setpostData({ error: false });


        }


        projectform(prevState => ({
            ...prevState
        }));
    };

    useEffect(() => {
        let projectSubTypeValue = []
        props.ProjectSubType.map((data) =>
            projectSubTypeValue.push({ value: data.sub_project_type, id: data.sub_project_type_id })
        )
        setSubType_Project({ projectSubTypeValue })

    }, [props.ProjectSubType])

    useEffect(() => {
        let Processtypevalue = []
        props.ProcessType.map((data) =>
            Processtypevalue.push({ value: data.process, id: data.process_id })
        )
        setProcessType({ Processtypevalue })

    }, [props.ProcessType])


    const variablerateModel = () => {
        function onSearch() {
            setSearchdata(true)
            setAddsearchdata(false)
        }

        function addSearchData() {
            setAddsearchdata(true)
            setSearchdata(false)
            setSuccessmodel(true)
        }

        return (
            <div>
                <VariableRate variablebtnchange={true} variabletablechange={true} />
                <CustomButton
                    btnName={"Search"}
                    btnCustomColor="customPrimary"
                    custombtnCSS="custom_save"
                    onBtnClick={onSearch}
                />
                {searchdata &&
                    <div className="addvariableData">
                        <img src={AddVarData} onClick={addSearchData} />

                    </div>
                }
                {addsearchdata &&
                    <div>
                        <EnhancedTable
                            headCells={header}
                            rows={rows}
                        />

                    </div>
                }
                <DynModel modelTitle={"Success"} handleChangeModel={successmodel} handleChangeCloseModel={(bln) => setSuccessmodel(bln)} content={<div className="successModel">
                    <img src={SuccessIcon} />
                    <div>Data Successfully Added in Variable Rate Master</div>
                </div>} width={400} />


            </div>
        )
    }

    return (
        <div>

            <Grid item xs={12} className="projectFormTitle">Project Form</Grid>
            <div className="projectFormContent">
                <Grid item xs={12} container direction="row" justify="center" spacing={2} >
                    <Grid item xs={4}  >
                        <Labelbox type="select" dropdown={clientName.clientNameData}
                            placeholder={"Client"} 
                            value={projectform.client_det.value}
                            error={projectform.client_det.error}
                            errmsg={projectform.client_det.errmsg}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Link to="/addclient" >
                            <CustomButton btnName={"Create Client "} btnCustomColor="customPrimary" custombtnCSS="btnCreateClient"
                                onBtnClick={() => setpathname("/addclient")}
                            />
                        </Link>

                    </Grid>
                    <Grid item xs={6}>
                        <Labelbox type="text"
                            placeholder={"Project Name "} value={projectform.project_name.value}
                            error={projectform.project_name.error}
                            errmsg={projectform.project_name.errmsg}
                        />
                    </Grid>
                    <Grid item xs={6} >
                        <Labelbox type="select"
                            placeholder={"Project Type "}
                            dropdown={ProjectType.projectTypedata}
                            changeData={(data) => checkValidation(data, "project_type")}
                            value={projectform.project_type.value}
                            error={projectform.project_type.error}
                            errmsg={projectform.project_type.errmsg}
                        />
                    </Grid>
                    {projectform.project_type.value === 1 ?
                        <>
                            <Grid item xs={6} >
                                <Labelbox type="select"
                                dropdown={projectSubType.projectSubTypedata}
                                changeData={(data) => checkValidation(data, "project_sub_type")}
                                value={projectform.project_sub_type.value}
                                error={projectform.project_sub_type.error}
                                errmsg={projectform.project_sub_type.errmsg}

                                    placeholder={"Project Sub Type"}
                                    dropdown={SubType_Project.projectSubTypeValue}
                                    changeData={(data) => checkValidation(data, "project_Subtype")}
                                    value={projectform.project_Subtype.value}
                                    error={projectform.project_Subtype.error}
                                    errmsg={projectform.project_Subtype.errmsg}
                                />
                            </Grid>
                            <Grid item xs={6} >
                                <Labelbox type="select"
                                    placeholder={"Process Type"}
                                    dropdown={ProcessType.Processtypevalue}
                                    changeData={(data) => checkValidation(data, "process_type")}
                                    value={projectform.process_type.value}
                                    error={projectform.process_type.error}
                                    errmsg={projectform.process_type.errmsg}
                                />
                            </Grid>
                            <Grid item xs={6} >
                                <Labelbox type="select"
                                    placeholder={"Filling Type"}
                                    dropdown={fillingType.fillingTypedata}
                                    changeData={(data) => checkValidation(data, "filling_type")}
                                    value={projectform.filling_type.value}
                                    error={projectform.filling_type.error}
                                    errmsg={projectform.filling_type.errmsg}
                                />
                            </Grid>
                            <Grid item xs={6} >
                                <Labelbox type="select"
                                    placeholder={"HOD/Attorney"} 
                                    dropdown={attorneylist.attorneydata}
                                    changeData={(data) => checkValidation(data, "attorney")}
                                    value={projectform.attorney.value}
                                    error={projectform.attorney.error}
                                    errmsg={projectform.attorney.errmsg}
                                />
                            </Grid>
                            <Grid item xs={6} >
                                <Labelbox type="select"
                                    placeholder={"Counsel"}
                                    dropdown={attorneylist.attorneydata}
                                    changeData={(data) => checkValidation(data, "counsel")}
                                    value={projectform.counsel.value}
                                    error={projectform.counsel.error}
                                    errmsg={projectform.counsel.errmsg}
                                />

                            </Grid>
                            <Grid item xs={6} >
                                <Labelbox type="select"
                                    placeholder={"Billable Type"}
                                    dropdown={BillableType.BillableData}
                                    changeData={(data) => checkValidation(data, "billable_type")}
                                    value={projectform.billable_type.value}
                                    error={projectform.billable_type.error}
                                    errmsg={projectform.billable_type.errmsg}
                                />
                            </Grid>
                            <Grid item xs={6} >
                                <Labelbox type="select"
                                    placeholder={"Project Cost Range"} 
                                    dropdown={projectRange.projectRangedata}
            changeData={(data) => checkValidation(data, "range_project_cost")}
            value={projectform.range_project_cost.value}
            error={projectform.range_project_cost.error}
            errmsg={projectform.range_project_cost.errmsg}
                                />
                            </Grid>
                            {projectform.billable_type.value === 3 ?
                                <Grid xs={12} container direction="row" spacing={2}>

                                    <Grid item xs={3} >
                                        <Labelbox type="text"
                                            placeholder={"Base Rate"}
                                            value={projectform.baseRate.value}
                                            error={projectform.baseRate.error}
                                            errmsg={projectform.baseRate.errmsg}
                                        />
                                    </Grid>
                                    <Grid item xs={3} >
                                        <Labelbox type="select"
                                            placeholder={"Unit of Measurement"}
                                            dropdown={projectUnit.projectUnitdata}
                                            changeData={(data) => checkValidation(data, "unit_measurement")}
                                            value={projectform.unit_measurement.value}
                                            error={projectform.unit_measurement.error}
                                            errmsg={projectform.unit_measurement.errmsg}
                                        />
                                    </Grid>
                                    <Grid item xs={3} >
                                        <Labelbox type="text"
                                            placeholder={"Limit"}
                                            value={projectform.limit.value}
                                            error={projectform.limit.error}
                                            errmsg={projectform.limit.errmsg}
                                        />
                                    </Grid>
                                    <Grid item xs={3} >
                                        <Labelbox type="text"
                                            placeholder={"Additional Rate Hourly"}
                                            value={projectform.additional_rate.value}
                                            error={projectform.additional_rate.error}
                                            errmsg={projectform.additional_rate.errmsg}
                                        />
                                    </Grid>
                                </Grid>

                                :
                                (projectform.billable_type.value === 5 || projectform.billable_type.value === 1 || projectform.billable_type.value === 4) ?

                                    <Grid item xs={6} container direction="row" spacing={2}>
                                        <Grid item xs={6} >
                                            <Labelbox type="text"
                                                placeholder={"Base Rate"}
                                                value={projectform.baseRate.value}
                                            error={projectform.baseRate.error}
                                            errmsg={projectform.baseRate.errmsg}
                                            />
                                        </Grid>
                                        <Grid item xs={6} >
                                            <Labelbox type="select"
                                                placeholder={"Unit of Measurement"}
                                                dropdown={projectUnit.projectUnitdata}
                                                changeData={(data) => checkValidation(data, "unit_measurement")}
                                                value={projectform.unit_measurement.value}
                                                error={projectform.unit_measurement.error}
                                                errmsg={projectform.unit_measurement.errmsg}
                                            />
                                        </Grid>

                                    </Grid>
                                    :
                                    <Grid item xs={6}>

                                    </Grid>
                            }
                            <Grid item xs={6} >
                                <div className="projectFormComments">
                                    <Labelbox type="textarea"
                                        placeholder={"Comments"}
                                        value={projectform.comments.value}
                                                        error={projectform.comments.error}
                                                        errmsg={projectform.comments.errmsg}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={6}>


                            </Grid>
                        </>
                        :
                        projectform.project_type.value === 6 ?
                            <>
                                <Grid item xs={6} >
                                    <Labelbox type="select"
                                        placeholder={"Filling Type"}
                                        dropdown={fillingType.fillingTypedata}
                                    changeData={(data) => checkValidation(data, "filling_type")}
                                    value={projectform.filling_type.value}
                                    error={projectform.filling_type.error}
                                    errmsg={projectform.filling_type.errmsg}
                                    />
                                </Grid>
                                <Grid item xs={6} >
                                    <Labelbox type="select"
                                        placeholder={"Deputy Direct Responsible Attorney"}
                                        dropdown={attorneylist.attorneydata}
                                    changeData={(data) => checkValidation(data, "attorney")}
                                    value={projectform.deputyAttorney.value}
                                    error={projectform.deputyAttorney.error}
                                    errmsg={projectform.deputyAttorney.errmsg}
                                    />
                                </Grid>

                                <Grid item xs={6} >
                                    <Labelbox type="select"
                                        placeholder={"Direct Responsible Attorney"}
                                        dropdown={attorneylist.attorneydata}
                                    changeData={(data) => checkValidation(data, "attorney")}
                                    value={projectform.directAttorney.value}
                                    error={projectform.directAttorney.error}
                                    errmsg={projectform.directAttorney.errmsg}
                                    />
                                </Grid>
                                <Grid item xs={6} >
                                    <Labelbox type="select"
                                        placeholder={"Billable Type"}
                                        dropdown={BillableType.BillableData}
                                        changeData={(data) => checkValidation(data, "billable_type")}
                                        value={projectform.billable_type.value}
                                        error={projectform.billable_type.error}
                                        errmsg={projectform.billable_type.errmsg}
                                    />
                                </Grid>


                                <Grid item xs={6} >
                                    <Labelbox type="select"
                                        placeholder={"Project Cost Range"}
                                        dropdown={projectRange.projectRangedata}
            changeData={(data) => checkValidation(data, "range_project_cost")}
            value={projectform.range_project_cost.value}
            error={projectform.range_project_cost.error}
            errmsg={projectform.range_project_cost.errmsg}
                                    />
                                </Grid>
                                {projectform?.billable_type?.value === 3 ?
                                    <Grid xs={12} container direction="row" spacing={2}>
                                        <Grid item xs={3} >
                                            <Labelbox type="text"
                                                placeholder={"Base Rate"}
                                                value={projectform.baseRate.value}
                                            error={projectform.baseRate.error}
                                            errmsg={projectform.baseRate.errmsg}
                                            />
                                        </Grid>
                                        <Grid item xs={3} >
                                            <Labelbox type="select"
                                                placeholder={"Unit of Measurement"}
                                                dropdown={projectUnit.projectUnitdata}
                                                        changeData={(data) => checkValidation(data, "unit_measurement")}
                                                        value={projectform.unit_measurement.value}
                                                        error={projectform.unit_measurement.error}
                                                        errmsg={projectform.unit_measurement.errmsg}
                                            />
                                        </Grid>
                                        <Grid item xs={3} >
                                        <Labelbox type="text"
                                            placeholder={"Limit"}
                                            value={projectform.limit.value}
                                            error={projectform.limit.error}
                                            errmsg={projectform.limit.errmsg}
                                        />
                                    </Grid>
                                    <Grid item xs={3} >
                                        <Labelbox type="text"
                                            placeholder={"Additional Rate Hourly"}
                                            value={projectform.additional_rate.value}
                                            error={projectform.additional_rate.error}
                                            errmsg={projectform.additional_rate.errmsg}
                                        />
                                    </Grid>
                                    </Grid>
                                    :
                                    (projectform.billable_type.value === 5 || projectform.billable_type.value === 1 || projectform.billable_type.value === 4) ?
                                        <Grid item xs={6} container direction="row" spacing={2}>
                                            <Grid item xs={6} >
                                                <Labelbox type="text"
                                                    placeholder={"Base Rate"}
                                                    value={projectform.baseRate.value}
                                            error={projectform.baseRate.error}
                                            errmsg={projectform.baseRate.errmsg}
                                                />
                                            </Grid>
                                            <Grid item xs={6} >
                                                <Labelbox type="select"
                                                    placeholder={"Unit of Measurement"}
                                                    dropdown={projectUnit.projectUnitdata}
                                                    changeData={(data) => checkValidation(data, "unit_measurement")}
                                                    value={projectform.unit_measurement.value}
                                                    error={projectform.unit_measurement.error}
                                                    errmsg={projectform.unit_measurement.errmsg}
                                                />
                                            </Grid>

                                        </Grid>
                                        :
                                        <Grid item xs={6}>

                                        </Grid>
                                }

                                <Grid item xs={6} >
                                    <div className="projectFormComments">
                                        <Labelbox type="textarea"
                                            placeholder={"Comments"}
                                            value={projectform.comments.value}
                                                        error={projectform.comments.error}
                                                        errmsg={projectform.comments.errmsg}
                                        />
                                    </div>
                                </Grid>

                                <Grid item xs={6} >
                                </Grid>
                            </>
                            :
                            (projectform.project_type.value === 2 || projectform.project_type.value === 3 || projectform.project_type.value === 4 || projectform.project_type.value === 5) ?
                                <>


<Grid item xs={6} >
                                <Labelbox type="select"
                                    placeholder={"HOD/Attorney"} 
                                    dropdown={attorneylist.attorneydata}
                                    changeData={(data) => checkValidation(data, "attorney")}
                                    value={projectform.attorney.value}
                                    error={projectform.attorney.error}
                                    errmsg={projectform.attorney.errmsg}
                                />
                            </Grid>
                            <Grid item xs={6} >
                                <Labelbox type="select"
                                    placeholder={"Counsel"}
                                    dropdown={attorneylist.attorneydata}
                                    changeData={(data) => checkValidation(data, "counsel")}
                                    value={projectform.counsel.value}
                                    error={projectform.counsel.error}
                                    errmsg={projectform.counsel.errmsg}
                                />
                                
                            </Grid>
                                    <Grid item xs={6} >
                                        <Labelbox type="select"
                                            placeholder={"Project Cost Range"}
                                            dropdown={projectRange.projectRangedata}
            changeData={(data) => checkValidation(data, "range_project_cost")}
            value={projectform.range_project_cost.value}
            error={projectform.range_project_cost.error}
            errmsg={projectform.range_project_cost.errmsg}
                                        />
                                    </Grid>
                                    <Grid item xs={6} >
                                        <Labelbox type="select"
                                            placeholder={"Billable Type"}
                                            dropdown={BillableType.BillableData}
                                            changeData={(data) => checkValidation(data, "billable_type")}
                                            value={projectform.billable_type.value}
                                            error={projectform.billable_type.error}
                                            errmsg={projectform.billable_type.errmsg}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>

                                    </Grid>

                                    {projectform?.billable_type?.value === 3 ?
                                        <Grid xs={12} container direction="row" spacing={2}>
                                            <Grid item xs={3} >
                                                <Labelbox type="text"
                                                    placeholder={"Base Rate"}
                                                    value={projectform.baseRate.value}
                                            error={projectform.baseRate.error}
                                            errmsg={projectform.baseRate.errmsg}
                                                />
                                            </Grid>
                                            <Grid item xs={3} >
                                                <Labelbox type="select"
                                                    placeholder={"Unit of Measurement"}
                                                    dropdown={projectUnit.projectUnitdata}
                                                        changeData={(data) => checkValidation(data, "unit_measurement")}
                                                        value={projectform.unit_measurement.value}
                                                        error={projectform.unit_measurement.error}
                                                        errmsg={projectform.unit_measurement.errmsg}
                                                />
                                            </Grid>
                                            <Grid item xs={3} >
                                        <Labelbox type="text"
                                            placeholder={"Limit"}
                                            value={projectform.limit.value}
                                            error={projectform.limit.error}
                                            errmsg={projectform.limit.errmsg}
                                        />
                                    </Grid>
                                    <Grid item xs={3} >
                                        <Labelbox type="text"
                                            placeholder={"Additional Rate Hourly"}
                                            value={projectform.additional_rate.value}
                                            error={projectform.additional_rate.error}
                                            errmsg={projectform.additional_rate.errmsg}
                                        />
                                    </Grid>
                                        </Grid>

                                        :
                                        (projectform.billable_type.value === 5 || projectform.billable_type.value === 1 || projectform.billable_type.value === 4) ?

                                            <Grid item xs={6} container direction="row" spacing={2}>
                                                <Grid item xs={6} >
                                                    <Labelbox type="text"
                                                        placeholder={"Base Rate"}
                                                        value={projectform.baseRate.value}
                                            error={projectform.baseRate.error}
                                            errmsg={projectform.baseRate.errmsg}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} >
                                                    <Labelbox type="select"
                                                        placeholder={"Unit of Measurement"}
                                                        dropdown={projectUnit.projectUnitdata}
                                                        changeData={(data) => checkValidation(data, "unit_measurement")}
                                                        value={projectform.unit_measurement.value}
                                                        error={projectform.unit_measurement.error}
                                                        errmsg={projectform.unit_measurement.errmsg}
                                                    />
                                                </Grid>

                                            </Grid>
                                            :
                                            <Grid item xs={6}>

                                            </Grid>
                                    }



                                    <Grid item xs={6} >
                                        <div className="projectFormComments">
                                            <Labelbox type="textarea"
                                                placeholder={"Comments"}
                                                value={projectform.comments.value}
                                                        error={projectform.comments.error}
                                                        errmsg={projectform.comments.errmsg}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} >
                                    </Grid>

                                </>
                                :
                                <Grid item xs={6} >
                                </Grid>
                    }
                </Grid>
            </div>

            <div className="customFormbtn">
                <CustomButton btnName={"SAVE "} btnCustomColor="customPrimary" custombtnCSS={"btnProjectForm"} onBtnclick={onsubmit} />
                <CustomButton btnName={"CANCEL "} custombtnCSS={"btnProjectForm"} />

            </div>
            <DynModel modelTitle={"Variable Rate"} handleChangeModel={variableid} handleChangeCloseModel={(bln) => setVariableid(bln)} content={variablerateModel()} width={1300} />
        </div>
    )
}
const mapStateToProps = (state) => (
    // console.log(state.getOptions.getProcessType, "getProcessType")
    {
        ProjectSubType: state.getOptions.getProjectSubType || [],
        ProcessType: state.getOptions.getProcessType || []
    }
);

export default connect(mapStateToProps)(ProjectFormCreate);



