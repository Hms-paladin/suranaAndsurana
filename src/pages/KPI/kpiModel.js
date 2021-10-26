import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from '../../component/Butttons/button';

import EnhancedTable from '../../component/DynTable/table';
import ValidationLibrary from "../../helpers/validationfunction";
import DynModel from "../../component/Model/model";
import './KPI.scss'
import { Checkbox } from 'antd';
import { getEmpListDepartment} from '../../actions/MasterDropdowns'
import { connect,useDispatch} from 'react-redux';
import {GetKpiApproval,ApproveKpi} from '../../actions/KPIActions'
import moment from 'moment'
const KPI = (props) => {
    let dispatch=useDispatch()

    const header = [
        // { id: 'table_name', label: 'Table Name' },
        { id: 'activity', label: 'Activity' },
        { id: 'subactivity', label: 'Subactivity' },
        { id: 'target', label: 'Target' },
        { id: 'achievement', label: 'Achievement' },
    ];

    const [kpimodel, setKpimodel] = useState(false);

    const [isLoaded, setIsLoaded] = useState(true);
    const [ApprovalData,setApprovalData]=useState("")
    const [achiveTotal,setachiveTotal]=useState("")
    const [kpi_form, setKpi_form] = useState({
        qualification:{
            value:"",
            validation:[{ name: "required" }],
            error: null,
            errmsg: null,
        },
        achivements:{
            value:"",
            validation:[{ name: "required" }],
            error: null,
            errmsg: null,
        },
        seminar:{
            value:"",
            validation:[{ name: "required" }],
            error: null,
            errmsg: null,
        },
        trainings:{
            value:"",
            validation:[{ name: "required" }],
            error: null,
            errmsg: null,
        }

    });

    function checkValidation(data, key, multipleId) {

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
    const ApproveData=()=>{
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
        var filtererr = targetkeys.filter((obj) => kpi_form[obj].error == true);
        if (filtererr.length > 0) {
          
        } else{
            dispatch(ApproveKpi(kpi_form,props.KpiId)).then(()=>{
                props.closemodal()
                StateClear()
             })
        }
      
        setKpi_form((prevState) => ({
            ...prevState,
        }));
    }
 useEffect(()=>{
 dispatch(GetKpiApproval(props.KpiId))

 },[props.KpiId])
 console.log("props",props)
useEffect(()=>{
    let Data=[]
    let Achivement=[]
    props.KpiApproval.length>0&&props.KpiApproval.map((data)=>{
        Data.push(data)
        Achivement.push(data.achievement)
    })
    setApprovalData(Data)
    let achive_total=0
    for(let i=0;i<Achivement.length;i++){
        achive_total+=Achivement[i]
    }

    setachiveTotal(Math.abs(achive_total))
},[props.KpiApproval])

 const StateClear=()=>{
    const Key=["qualification","achivements","seminar","trainings"]
    Key.map((data)=>{
        kpi_form[data].value=""
    })
 }

    return (
        <div>
            <div className="kpi_sudb">
                <Grid container spacing={2} className="ratemaster_firstgrid" className="kpi_sub">
                    <Grid item xs={7} container direction="row" className="spaceBtGrid" alignItems="center">
                        <Grid item xs={6}>
                            <div><label style={{ fontSize: 11 }}>Employee Name</label></div>
                            <div><label style={{ fontWeight: 'bold' }}>{ApprovalData[0]?.name}</label></div>
                        </Grid>
                        <Grid item xs={6}>
                            <div><label style={{ fontSize: 11 }}>Period</label></div>
                            <div><label style={{ fontWeight: 'bold' }}>
                            {moment(ApprovalData[0]?.period_from).format("MMM-YYYY")} to {moment(ApprovalData[0]?.period_to).format("MMM-YYYY")}</label></div>
                        </Grid>
                    </Grid>


                </Grid>
            </div>
            <div className="kpi_table">
                <Grid container >
                    <Grid item xs={12} container direction="row" className="spaceBtnGrid kpi_table_header title_label" alignItems="center">
                        <Grid item xs={3}><label >Activity</label></Grid>
                        <Grid item xs={3}> <label >Target %</label></Grid>
                        <Grid item xs={3}><label >Achievement</label></Grid>

                    </Grid>

                    {ApprovalData.length>0&&ApprovalData.map((data)=>
                    <Grid item xs={12} container direction="row" className="spaceBtnGrid title_label" alignItems="center" style={{ borderBottom: " 1px solid lightgray" }}>
                        <Grid item xs={3}><label >{data.activity}</label></Grid>
                        <Grid item xs={3}> <label >{data.kra_percentage}</label></Grid>
                        {/* <Grid item xs={3} ><div style={{ width: '70%' }}>
                            <Labelbox
                                type="text"
                                placeholder={""}
                                value={35}
                                changeData={(data) => checkValidation(data, "achivements")}
                                value={data.achievement}
                                // error={kpi_form.achivements.error}
                                // errmsg={kpi_form.achivements.errmsg}
                            /></div> */}
                         <Grid item xs={3} > <label>{data.achievement===null?"-":data.achievement}</label></Grid>    

                    </Grid>
                    )}
                  

                    <Grid item xs={12} container direction="row" className="spaceBtnGrid title_label" alignItems="center" style={{ backgroundColor: "#D8D8D8", height: 50 }}>
                        <Grid item xs={3}><label style={{ color: 'black' }}>Total </label></Grid>                        
                        <Grid item xs={3}><label style={{ color: 'black' }}>{ApprovalData[0]?.total}</label> </Grid>
                        <Grid item xs={3}><label style={{ color: 'black' }}>{achiveTotal}</label></Grid>
                    </Grid>
                </Grid>
            </div>

            <div style={{ marginTop: 20 }}>
                <Grid container >
                    <Grid item xs={12} container direction="row" className="spaceBtnGrid  title_label" alignItems="center">
                        <Grid item xs={3}><label >Qualification</label></Grid>
                        <Grid item xs={3}> <label >Achievements</label> </Grid>
                        <Grid item xs={3}> <label >Seminar</label></Grid>
                        <Grid item xs={3}><label >Trainings</label></Grid>

                    </Grid>


                    <Grid item xs={12} container direction="row" className="spaceBtnGrid title_label" alignItems="center" >
                        <Grid item xs={3}><div style={{ width: '70%', display: 'inline-block' }}>
                            <Labelbox
                                type="text"
                                placeholder={""}
                                value={35}
                                changeData={(data) => checkValidation(data, "qualification")}
                                value={kpi_form.qualification.value}
                                error={kpi_form.qualification.error}
                                errmsg={kpi_form.qualification.errmsg}
                            /></div>
                        </Grid>
                        <Grid item xs={3}><div style={{ width: '70%', display: 'inline-block' }}>
                            <Labelbox
                                type="text"
                                placeholder={""}
                                value={35}
                                changeData={(data) => checkValidation(data, "achivements")}
                                value={kpi_form.achivements.value}
                                error={kpi_form.achivements.error}
                                errmsg={kpi_form.achivements.errmsg}
                            /></div>
                        </Grid>
                        <Grid item xs={3}><div style={{ width: '70%', display: 'inline-block' }}>
                            <Labelbox
                                type="text"
                                placeholder={""}
                                value={35}
                                changeData={(data) => checkValidation(data, "seminar")}
                                value={kpi_form.seminar.value}
                                error={kpi_form.seminar.error}
                                errmsg={kpi_form.seminar.errmsg}
                            /></div>
                        </Grid>
                        <Grid item xs={3}><div style={{ width: '70%', display: 'inline-block' }}>
                            <Labelbox
                                type="text"
                                placeholder={""}
                                value={35}
                                changeData={(data) => checkValidation(data, "trainings")}
                                value={kpi_form.trainings.value}
                                error={kpi_form.trainings.error}
                                errmsg={kpi_form.trainings.errmsg}
                            /></div>
                        </Grid>

                    </Grid>

                </Grid>
            </div>

            <div className="kpi_btn">
                <CustomButton
                    btnName={"Approve"}
                    btnCustomColor="customPrimary"
                    custombtnCSS={"btnUsergroup"}
                    onBtnClick={ApproveData}
                />
                {/* <CustomButton
                    btnName={"Return"}
                    btnCustomColor="customPrimary"
                    custombtnCSS={"btnUsergroup"}
                    onBtnClick={() =>props.closemodal()}

                /> */}
            </div>
        </div>

    )
}

const mapStateToProps=(state)=>({
    EmployeeList: state.getOptions.getEmpListDepartment,
    KpiApproval:state.KpiReducer.ApprovalData,
    ApproveKpi:state.KpiReducer.kpiApproval
})
export default connect(mapStateToProps)(KPI);