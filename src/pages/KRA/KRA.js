import React, { useCallback, useEffect, useState, useRef } from 'react'
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from '../../component/Butttons/button';
import { useDispatch, connect } from "react-redux";
import EnhancedTable from "../../component/DynTable/table";
import ValidationLibrary from "../../helpers/validationfunction";
import DynModel from "../../component/Model/model";
import './KRA.scss'
import PlusIcon from "../../images/plusIcon.svg";
import KRAModal from "./KRAViewModal"
import Edit from "../../images/editable.svg";
import { getActivity } from '../../actions/MasterDropdowns';
import { InsertKra, getKra } from '../../actions/KraAction';
import moment from "moment";
import { notification } from "antd";
import { apiurl } from "../../utils/baseUrl.js";
import axios from "axios";

const KRA = (props) => {
    const dispatch = useDispatch();
    const header = [
        { id: 'activitys', label: 'Activity' },
        { id: 'percent', label: 'Percentage' },
        { id: 'action', label: 'Action' },
    ];

    const [kramodel, setKramodel] = useState(false);
    const [activity, setActivity] = useState({});
    const [rowUpdate, setRowUpdate] = useState(false)
    const [saveRights, setSaveRights] = useState([])
    const [viewRights, setViewRights] = useState([])
    const [kraViewModal, setKraViewModal] = useState(false)
    const [disabledate, setDisabledate] = useState(false);
    const [Todisable,setTodisable]=useState(false)
    const [totalPercentage, setTotalPercentage] = useState(0)
    const [count, setCount] = useState(0)
    const [index, setIndex] = useState()
    const [minDate,setminDate]=useState("")
    const [datechange,setdatechange]=useState(false)
    const [empId, setEmpId] = useState(localStorage.getItem("empId"))
    const [EmpIdTrue,setEmpIdTrue]=useState(false)
    const [kpi_form, setKpi_form] = useState({

        activity: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        toperiod: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        fromperiod: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        percentage: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
    });
    const [reference,setReference] = useState([]);
    const [testDate, setTestDate] = useState({})


    useEffect(() => {
        dispatch(getActivity());
    }, [kpi_form]);

    useEffect(()=>{
        dispatch(getKra())
        // console.log(props.getKra,"datechange")
    },[]);

    useEffect(() => {
        let Activity = []
        props.getActivity.map((data, index) => {
            Activity.push({
                value: data.activity,
                id: data.activity_id,
            });
        });
        setActivity({ Activity })
        setTestDate(props.getKra[0])

    }, [props.getActivity, props.getKra, kpi_form,datechange,testDate])

    function checkValidation(data, key) {
        var startDate = kpi_form.fromperiod.value
        if (data && key === "fromperiod") {
            startDate = moment(data).format("MMM-yyyy");
            setminDate(data)
        }
        var toDate = kpi_form.toperiod.value
        if (data && key === "toperiod") {
            toDate = moment(data).format("MMM-yyyy");
            // dispatch(getKra(startDate, toDate))
            // checking()
        }
        if(moment(kpi_form.toperiod.value).format("MMM-yyyy")==moment().format("MMM-yyyy")){
            setdatechange(false)
        }
        if(moment(kpi_form.toperiod.value).format("MMM-yyyy")!=moment().format("MMM-yyyy")){
            setTodisable(false)
        }else if(kpi_form.toperiod.value){
            setTodisable(false)
        }
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            kpi_form[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: kpi_form[key].validation,
        };

        setKpi_form((prevState) => ({
            ...prevState,
            [key]: dynObj,
        }));
    }

    ///***********user permission**********/
    useEffect(() => {
        if (props.UserPermission.length > 0 && props.UserPermission) {
            let data_res_id = props.UserPermission.find((val) => {
                return (
                    "KRA - Save" == val.control
                )
            })
            setSaveRights(data_res_id)

            data_res_id = props.UserPermission.find((val) => {
                return (
                    "KRA - View KRA" == val.control
                )
            })
            setViewRights(data_res_id)
        }

    }, [props.UserPermission]);
    /////////////

    useEffect(() => {
        axios({
                method: 'POST',
                url: apiurl + 'get_period_by_id',
                data: {
                    "emp_id": localStorage.getItem("empId"),
                }
            })
            .then((response) => {
                    
                if(response.data.status===1){

                    kpi_form.fromperiod.value=response.data.data[0].period_from
                    kpi_form.toperiod.value=moment(moment(response.data.data[0].period_from,'YYYY-MM-DD').add(6, "months")).format('YYYY-MM-DD')
                  
                    setKpi_form(prevState => ({
                        ...prevState,
                    }));
                }  
            }) 
    }, []);

    
    const addkraDetails =async () => {
        let activityName;
        activity.Activity.filter((data) => {
            if (data.id === kpi_form.activity.value) {
                activityName = data.value
            }
        })

        if (kpi_form.fromperiod.value != "" && kpi_form.toperiod.value != "") {
            setDisabledate(true)
            setTodisable(true)
        }

        if (reference && reference.length >= 0) {
            setCount(count + 1)
        }
        var mainvalue = {};
        var targetkeys = Object.keys(kpi_form);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                kpi_form[targetkeys[i]].value,
                kpi_form[targetkeys[i]].validation
            );
            kpi_form[targetkeys[i]].error = !errorcheck.state;
            kpi_form[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = kpi_form[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter(
            (obj) => kpi_form[obj].error == true
        );

        if (filtererr.length > 0) {
        }
       
        else {

                if (totalPercentage + Number(kpi_form.percentage.value) > 100) {
                    notification.error({
                        message: 'Total Percent Value should be 100 only',
                    });
    
                }
                else {
                    await setReference(prevState => ([...prevState, {
                        activitys: activityName,
                        percent: kpi_form.percentage.value,
                        action: <img src={Edit} className="editicon" onClick={() => editRows(count)} />
                    }]))
    
                    kpi_form.activity.value = "";
                    kpi_form.percentage.value = "";
    
                }

    }

        setKpi_form(prevState => ({
            ...prevState,
        }));
    }

    const editRows = (data) => {
        setRowUpdate(true)
        setIndex(data)
        let Activity_Name = reference[data].activitys
        let activityId;

        activity.Activity && activity.Activity.filter((data) => {
            if (data.value === Activity_Name) {
                activityId = data.id
            }
        })
        setKpi_form((prevState) => ({
            ...prevState,
            // kpi_form:{
            percentage: {
                value: reference[data].percent,
                validation: [{ name: "required" }],
                error: null,
                errmsg: null,
            },
            activity: {
                value: activityId,
                validation: [{ name: "required" }],
                error: null,
                errmsg: null,
            },
            // }
        }));

    }
useEffect(()=>{
    addpercentage()
},[reference])

    const addpercentage = () => {

        let Percentage = []
        reference.map((data) => {
            Percentage.push(Number(data.percent))
        })

        console.log(Percentage.reduce((a, b) => a + b, 0), "Percentage")

        setTotalPercentage(Percentage.reduce((a, b) => a + b, 0))

    }

    const updateRow = () => {

        let activityName;

        activity.Activity.filter((data) => {
            if (data.id === kpi_form.activity.value) {
                activityName = data.value
            }
        })

        reference[index].activitys = activityName
        reference[index].percent = kpi_form.percentage.value
        setRowUpdate(false)
        addpercentage()

        kpi_form.activity.value = "";
        kpi_form.percentage.value = "";
    }

    // console.log(reference.activitys, "percent")

    const handleCancel = () => {
        let From_key = [
            "activity",
            "toperiod",
            "fromperiod",
            "percentage",
        ];

        From_key.map((data) => {
            try {
                kpi_form[data].value = "";
                // console.log("mapping", kpi_form[data].value);
            } catch (error) {
                throw error;
            }
        });
        setKpi_form((prevState) => ({
            ...prevState,
        }));
    };


    const onsubmit = () => {
        
        if (totalPercentage > 100 || totalPercentage < 100) {
            notification.error({
                message: 'Total Percent Value should be 100 only',
            });
        }
        else {
            let refLength = reference.length
            for (let i = 0; i < refLength; i++) {
                console.log(reference[i].activitys, "length")
                let activityId;
                activity.Activity && activity.Activity.filter((data) => {
                    if (data.value === reference[i].activitys) {
                        activityId = data.id
                    }
                })
                   
                
                dispatch(InsertKra(kpi_form, activityId, reference[i].percent, reference.length, i + 1)).then((response) => {
                    setDisabledate(false)
                })
               
            }
        }

        setKpi_form((prevState) => ({
            ...prevState,

        }));
    }




    return (
        <div>
            <div className="kra">KRA</div>
            <div className="kra_main">
                <div >
                    <Grid container className="kra_sub">
                        <Grid
                            item
                            xs={12}
                            container
                            direction="row"
                            className="spaceBtGrid"
                            alignItems="center"
                            style={{ padding: 10 }}
                            spacing={1}
                        >
                            <Grid item xs={2} style={{ padding: 0 }}>
                                <div className="KRAhead lblemp"><label onClick={() => setKramodel(true)}>Employee Name</label></div>
                                <div className="lblname"><label style={{ fontWeight: 'bold', paddingTop: "6px", position: "relative", top: "-10px" }}> {JSON.parse(localStorage.getItem("token")).user_name}</label></div>
                            </Grid>
                            <Grid item xs={6} container direction="row">
                                <div className="KRAhead per_head"><label >From Period</label></div>
                                <div className="KRAhead per_head"><label >To Period</label></div>
                                <div className="period_div">
                                    <Labelbox
                                        type="datepicker"
                                        view={["year", "month"]}
                                        format={"MMM-yyyy"}
                                        changeData={(data) => checkValidation(data, "fromperiod")}
                                        value={kpi_form.fromperiod.value}
                                        error={kpi_form.fromperiod.error}
                                        errmsg={kpi_form.fromperiod.errmsg}
                                        disabled
                                    />
                                    <Labelbox
                                        type="datepicker"
                                        view={["year", "month"]}
                                        format={'MMM-yyyy'}
                                        changeData={(data) => checkValidation(data, "toperiod")}
                                        value={kpi_form.toperiod.value}
                                        error={kpi_form.toperiod.error}
                                        errmsg={kpi_form.toperiod.errmsg}
                                        disabled
                                        minDate={minDate}
                                    />
                                    </div>
                                {/* <div><label style={{ fontWeight: 'bold' ,paddingTop:"6px"}}>April 2021 to March 2021</label></div> */}
                            </Grid>
                            <Grid item xs={2}>
                                <div style={{ display: "flex", justifyContent: "center" }}><CustomButton
                                    btnName={"View KRA"}
                                    btnCustomColor="customPrimary"
                                    custombtnCSS={"btnUsergroup"}
                                    btnDisable={!viewRights || viewRights.display_control && viewRights.display_control === 'N' ? true : false}
                                    onBtnClick={() => setKraViewModal(!kraViewModal)}

                                /></div>
                            </Grid>
                            <Grid item xs={4}></Grid>
                        </Grid>
                    </Grid>

                    <Grid container className="kra_sub">
                        <Grid
                            item
                            xs={12}
                            container
                            direction="row"
                            className="spaceBtGrid"
                            alignItems="center"
                            style={{ padding: 10 }}
                            spacing={2}
                        >
                            <Grid item xs={2} style={{ padding: 0 }} >

                            </Grid>
                            <Grid item xs={6} container direction="row" spacing={2}>
                                <Grid item xs={6}>
                                    <div className="KRAhead"><label style={{ fontSize: 15 }}>Activity</label></div>
                                    <div style={{ width: '100%', display: 'inline-block' }}>
                                        <Labelbox
                                            type="select"
                                            placeholder={""}
                                            dropdown={activity.Activity}
                                            changeData={(data) => checkValidation(data, "activity")}
                                            value={kpi_form.activity.value}
                                            error={kpi_form.activity.error}
                                            errmsg={kpi_form.activity.errmsg}
                                        /></div>
                                </Grid>

                                <Grid item xs={6}>
                                    <div className="KRAhead"><label style={{ fontSize: 15 }}>Percentage</label></div>
                                    <div style={{ width: '100%', display: 'inline-block' }}>
                                        <Labelbox
                                            type="text"
                                            placeholder={""}
                                            changeData={(data) => checkValidation(data, "percentage")}
                                            value={kpi_form.percentage.value}
                                            error={kpi_form.percentage.error}
                                            errmsg={kpi_form.percentage.errmsg}
                                        /></div>
                                </Grid>
                            </Grid>
                            {/* <Grid item xs={2}></Grid> */}
                            <Grid item xs={2} container direction="row">
                                {rowUpdate ? <div>
                                    <CustomButton
                                        btnName={"Update"}
                                        btnCustomColor="customPrimary"
                                        custombtnCSS={"btnUsergroup"}
                                        // btnDisable={!saveRights || saveRights.display_control && saveRights.display_control === 'N' ? true : false}
                                        // btnDisable={totalPercentage >= 101 ? true : false}
                                        onBtnClick={updateRow}
                                    />

                                </div>
                                    :
                                    <div style={{ display: 'flex', justifyContent: "center", padding: "15px" }}>
                                        <img src={PlusIcon} style={{ cursor: 'pointer', width: 19 }} onClick={addkraDetails} />
                                    </div>
                                }

                            </Grid>
                            <Grid item xs={4}></Grid>


                        </Grid>

                    </Grid>
                </div>

                <div style={{ padding: "20px 10px 10px 10px" }}>
                    <EnhancedTable headCells={header} aligncss="kra_table"
                        rows={reference} />
                </div>
                <div className="totalPercentage">
                    <div>Total</div>
                    <div>{totalPercentage > 0 ? totalPercentage : ""}
                    </div>
                </div>



                <div className="kpi_btn">
                    <CustomButton
                        btnName={"Save"}
                        btnCustomColor="customPrimary"
                        custombtnCSS={"btnUsergroup"}
                        // btnDisable={!saveRights || saveRights.display_control && saveRights.display_control === 'N' ? true : false}
                        btnDisable={totalPercentage === 100 ? false : true}
                        onBtnClick={onsubmit}
                    />
                    <CustomButton
                        btnName={"Cancel"}
                        custombtnCSS={"btnUsergroup"}
                    />
                </div>

                <DynModel modelTitle={"KRA View"} handleChangeModel={kraViewModal} modalchanges="recruit_modal_css" handleChangeCloseModel={(bln) => setKraViewModal(bln)} width={900} content={<KRAModal />} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) =>

(
    {
        UserPermission: state.UserPermissionReducer.getUserPermission,
        getActivity: state.getOptions.getActivity,
        getKra: state.KraReducer.getKra
    });
export default connect(mapStateToProps)(KRA);